'use strict';

import * as App from './App.js';
import * as Route from '../lib/Route.js';
import { force } from '../lib/Util.js'; 

import { View_SelectTranslation } from '../views/select-translation.js';

import { Component_SelectButton }    from '../components/button-select.js';
import { Component_TranslationCard } from '../components/card-translation.js';
import { Component_ItemGenerator }   from '../components/item-generator.js';

import { loadSelectClient }    from './loadSelectClient.js';

//
// @function loadSelectTranslation
//  @note @todo
//
export function loadSelectTranslation (clientKey) {
    
    //
    // 0. Create data
    //
    const view             = new View_SelectTranslation;
    const button           = new Component_SelectButton;
    const generator        = new Component_ItemGenerator;
    const translationArray = new Array();    
    const languageArray    = new Array();
    const buttonArray      = new Array();
    const cardArray        = new Array();
    const activeCard       = {};

    //
    // 1. Async calls
    //
    __async__getDefaultLanguages({ languageArray: languageArray, clientKey: clientKey });
    
    __async__generateSelectButtons({ view: view, 
                                     generator: generator, 
                                     buttonArray: buttonArray, 
                                     cardArray: cardArray, 
                                     clientKey: clientKey });
    
    __async__generateTranslationCards({ view: view, 
                                        generator: generator, 
                                        cardArray: cardArray,
                                        languageArray: languageArray, 
                                        clientKey: clientKey, 
                                        containerKey: '' });

    //
    // 2. Setup header
    //
    App.HEADER.setTextSmall( 'Ordbase');
    App.HEADER.setTextBig( `Select Translation`);
    App.HEADER.setButtonIconLeft  ( App.ICON_BARS);
    App.HEADER.setButtonIconRight0( App.ICON_NONE);
    App.HEADER.setButtonIconRight1( App.ICON_TRASH);
    App.HEADER.setButtonIconRight2( App.ICON_ARROW_LEFT);    

    App.HEADER.getButtonLeft().onclick   = App.defaultHandler;
    App.HEADER.getButtonRight0().onclick = App.defaultHandler;    
    App.HEADER.getButtonRight1().onclick = e => {
            
        cardArray.forEach(card => {
            card.toggleDeleteable();
        })

        if(cardArray[0].isDeleteable())
            App.HEADER.setTextBig('Delete Translation');
        else {
            App.HEADER.setTextBig('Select Translation'); 
        }               
    }
    App.HEADER.getButtonRight2().onclick = e => loadSelectClient();

    //
    // 3. Component_SelectButton
    //
    button.setId('');
    button.setText('All containers');
    button.setSelected(true);

    button.OnClick(() => {

        view.getActiveContainerButton().setSelected(false);
        button.setSelected(true);
        view.setActiveContainerButton(button);

        generator.clearItems();
        generator.deactivate();
        cardArray.length = 0;
        __async__generateTranslationCards({ view: view, 
                                            generator: generator, 
                                            languageArray: languageArray,
                                            cardArray: cardArray, 
                                            clientKey: clientKey, 
                                            containerKey: button.getId() });
    });

    //
    // 4.Component_ItemGenerator
    //
    generator.OnGenerate(() => {
        let containerKey   = view.getActiveContainerButton().getId();
        let translationKey = generator.getValue();
       
        let translationArray = new Array();
        languageArray.forEach(language => {
        
            translationArray.push({
                clientKey : clientKey,
                languageKey : language,
                containerKey : containerKey,
                key : translationKey,
                text : 'default',
                isComplete : false,
            });
        });

        __async__generateTranslationCard({ view: view, 
                                           generator: generator, 
                                           cardArray: cardArray, 
                                           translationArray: translationArray});
    });
    generator.setButtonHeight(60);
    generator.deactivate();

    //
    // 5. Insert components into view, and add view to DOM
    //
    view.setTranslationGenerator(generator);
    view.setActiveContainerButton(button);
    view.addContainerButton(button);
    App.switchView(view);
}

//
// @function makeTranslationCard
//  @note @todo
//
function makeTranslationCard({ groupMeta = force('groupMeta'), 
                               generator = force('generator') } = {}) { 

    let card = new Component_TranslationCard;
    card.setTranslationKey(groupMeta.key);

    groupMeta.items.forEach(item => {
        card.addLanguagekeyComplete(item.languageKey, item.isComplete);
    })

    card.OnOpen(() => { 

        let activeCard = generator.getActiveItem();
        if (activeCard) {
            activeCard.setSelected(false);
        }
        
        card.setSelected(true);
        activeCard = 

        __async_populateFieldsets({ card: card, 
                                    clientKey: groupMeta.clientKey, 
                                    containerKey: groupMeta.containerKey, 
                                    translationKey: groupMeta.key })
    });

    card.OnDelete(() => { 
        __async__deleteTranslationCard({card: card, 
                                        cardArray: cardArray,
                                        clientKey: groupMeta.clientKey, 
                                        containerKey: groupMeta.containerKey, 
                                        translationKey: groupMeta.key});

    });            
    card.button.onclick = card.selectHandler;

    return card;
}

//
// @function __async_populateFieldsets
//  @note @todo
//
function __async__populateFieldsets({ card          = force('card'),
                                      clientKey     = force('clientKey'),
                                      containerKey  = force('containerKey'),
                                      translationKey = force('translationKey'), }) {

    Route.translation_getGroup({clientKey: clientKey, 
                                containerKey: containerKey, 
                                translationKey: translationKey}).then((groupArray) => {
        
        // We always get an array, even if we just want one group. 
        let group = groupArray[0];

        groupItems.forEach(item => {
            card.addFieldset(item.languageKey, item.isComplete);
        });

        card.displayForm();

    }).catch(err => console.error('Error: ', err));
}


//
// @function __async__getDefaultLanguages
//  @note @todo
//
function __async__getDefaultLanguages({ clientKey     = force('clientKey'), 
                                        languageArray = force('languageArray'), }){
        
        Route.client_getLanguages({clientKey: clientKey}).then(resLanguageArray => {
            resLanguageArray.forEach(language => {
                languageArray.push(language);
            })
        })
        .catch(err => console.error('Error:', err));      
    }

//
// @function __async__generateSelectButtons
//  @note @todo
//
function __async__generateSelectButtons({ view        = force('view'), 
                                          generator   = force('generator'),  
                                          languageArray = force('languageArray'),
                                          buttonArray = force('buttonArray'), 
                                          cardArray   = force('cardArray'), 
                                          clientKey   = force('clientKey') }) {

    Route.client_getContainers({clientKey: clientKey}).then(containerArray => {        
        
        containerArray.forEach((container, i) => {

            let button = new Component_SelectButton;

            button.setId( container);
            button.setText( container);
            button.setSelected(false)

            button.OnClick(() => {

                view.getActiveContainerButton().setSelected(false);
                button.setSelected(true);
                view.setActiveContainerButton(button);

                generator.clearItems();
                generator.activate();

                cardArray.length = 0;
                __async__generateTranslationCards({view: view, 
                                                   generator: generator, 
                                                   languageArray: languageArray,
                                                   cardArray: cardArray, 
                                                   clientKey: clientKey, 
                                                   containerKey: button.getId()});
            });
            
            buttonArray.push(button)
            view.addContainerButton(button);
        });
    })
}

//
// @function __async__generateTranslationCards
//  @note @todo
//
function __async__generateTranslationCards({ view         = force('view'),              
                                             generator    = force('generator'), 
                                             languageArray = force('languageArray'),                        
                                             cardArray    = force('cardArray'),
                                             clientKey    = force('clientKey'), 
                                             containerKey = force('containerKey') }) {

    Route.translation_getGroupMeta({clientKey:    clientKey, 
                                    containerKey: containerKey}).then(groupMetaArray => {

        groupMetaArray.forEach((groupMeta, i) => {
            let card = makeTranslationCard({groupMeta: groupMeta, view: view, cardArray: cardArray});

            card.OnSelect(() => {

            });

            cardArray.push(card);
            generator.addItem(card);
        });    
    })
    .catch(err => console.error('Error:', err));  
}



//
// @function __async__generateTranslationCard
//  @note @todo
//
function __async__generateTranslationCard({ generator        = force('generator'),
                                              cardArray        = force('cardArray'), 
                                              view             = force('view'),             
                                              translationArray = force('translationArray'), }) {

    Route.translation_createArray({ translationArray: translationArray }).then(res => {

        generator.setInputValue('');
        return Route.translation_getGroupMeta({ clientKey: translationArray[0].clientKey, 
                                                containerKey: translationArray[0].containerKey, 
                                                translationKey: translationArray[0].key });
    })
    .then(groupMeta => {
        let card = makeTranslationCard({ groupMeta: groupMeta[0],  view: view, cardArray: cardArray});
        cardArray.push(card);
        generator.addItem(card);
    })
    .catch(err => console.error(err));
}

//
// @function __async__deleteTranslationCard
//  @note @todo
//
function __async__deleteTranslationCard({  card = force('card'),
                                           cardArray = force('cardArray'),
                                           clientKey      = force('clientKey'), 
                                           containerKey   = force('containerKey'), 
                                           translationKey = force('translationKey'), }) {

    Route.translation_deleteGroup(arguments[0]).then(res => {
        if (res.status == 204) {
            card.parentElement.removeChild(card);
        }
        else {
            App.HEADER.flashError(`${res.status}: Was not able to delete card...`);
            console.log('Was not able to delete translation...', res);
        }
        
        cardArray.forEach(card => card.toggleDeleteable() );
    }).catch(err => console.error('Error:', err));
}