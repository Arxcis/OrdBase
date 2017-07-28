'use strict';

import * as App from './App.js';
import * as Route from '../lib/Route.js';
import { mandatory as panic }  from '../lib/Util.js';

import { View_SelectTranslation } from '../views/select-translation.js';

import { Component_SelectButton }    from '../components/button-select.js';
import { Component_TranslationCard } from '../components/card-translation.js';
import { Component_ItemGenerator }   from '../components/item-generator.js';

import { loadSelectClient }    from './loadSelectClient.js';

//
// @function loadSelectTranslation
//
export function loadSelectTranslation (clientKey) {

    // Create elements
    const view          = new View_SelectTranslation;
    const button        = new Component_SelectButton;
    const generator     = new Component_ItemGenerator;
    let translationArray = new Array();    
    let languageArray    = new Array();
    let buttonArray      = new Array();
    let cardArray        = new Array();

    // Async calls
    __async__getDefaultLanguages({ languageArray: languageArray, clientKey: clientKey });
    __async__generateSelectButtons({view: view, generator: generator, buttonArray: buttonArray, cardArray: cardArray, clientKey: clientKey});
    __async__generateTranslationCards({generator: generator, cardArray: cardArray, clientKey: clientKey, containerKey: 'all'});

    // Setup header
    App.HEADER.setTextBig         ( 'Ordbase');
    App.HEADER.setTextSmall       ( `Select ${clientKey} Translation`);
    App.HEADER.setButtonIconLeft  ( App.ICON_BARS);
    App.HEADER.setButtonIconRight0( App.ICON_NONE);
    App.HEADER.setButtonIconRight1( App.ICON_TRASH);
    App.HEADER.setButtonIconRight2( App.ICON_ARROW_LEFT);    

    App.HEADER.getButtonLeft().onclick   = App.defaultHandler;
    App.HEADER.getButtonRight0().onclick = App.defaultHandler;    
    App.HEADER.getButtonRight1().onclick = App.defaultHandler;
    App.HEADER.getButtonRight2().onclick = event => loadSelectClient();

    //
    // Component_SelectButton
    //
    button.setId('all');
    button.setText('All containers');
    button.setSelected(true);

    button.OnClick(() => {

        view.getActiveContainerButton().setSelected(false);
        button.setSelected(true);
        view.setActiveContainerButton(button);

        generator.clearItems();
        generator.deactivate();
        cardArray = new Array();
        __async__generateTranslationCards({generator: generator, cardArray: cardArray, clientKey: clientKey, containerKey: button.getId()});
    });

    //
    // Component_ItemGenerator
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

        __async__submitNewTranslationGroup({generator: generator, clientKey: clientKey, translationKey: translationKey, translationArray: translationArray});
    });
    generator.setButtonHeight(60);
    generator.deactivate();

    //
    // Insert components into view, and add view to DOM
    //
    view.setTranslationGenerator(generator);
    view.setActiveContainerButton(button);
    view.addContainerButton(button);
    App.switchView(view);
}

//
// ASYNC GET CALLS
//
function __async__getDefaultLanguages({
            clientKey = panic('clientKey'), 
            languageArray = panic('languageArray'),
    }){
        Route.client_getDefaultLanguages(clientKey).then(resLanguageArray => {
            resLanguageArray.forEach(language => {
                languageArray.push(language);
                console.log(language);
            })
        })
        .catch(err => console.error('Error:', err));      
    }

function __async__generateSelectButtons({
            view        = panic('view'), 
            generator   = panic('generator'),  
            buttonArray = panic('buttonArray'), 
            cardArray   = panic('cardArray'), 
            clientKey   = panic('clientKey')
    }) {


    Route.client_getDefaultContainers(clientKey).then(containerArray => {        
        
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

                cardArray = new Array();
                __async__generateTranslationCards({generator: generator, cardArray: cardArray, clientKey: clientKey, containerKey: button.getId()});
            });
            
            buttonArray.push(button)
            view.addContainerButton(button);
        });
    })
}


function __async__generateTranslationCards({
            generator    = panic('generator'), 
            cardArray    = panic('cardArray'), 
            clientKey    = panic('clientKey'), 
            containerKey = panic('containerKey')
    }) {

    Route.translation_getGroupMetaOnContainer(clientKey, containerKey).then(groupMetaArray => {

        groupMetaArray.forEach((groupMeta, i) => {

            let card = new Component_TranslationCard;
            card.key = groupMeta.key;

            groupMeta.isComplete.forEach(keyComplete => {
                card.makeLanguagekeyComplete(keyComplete.key, keyComplete.value);
            })

            cardArray.push(card);
            generator.addItem(card);
        });    
    })
    .catch(err => console.error('Error:', err));  
}

//
// ASYNC CREATE DELETE
//
function __async__submitNewTranslationGroup({
            generator        = panic('generator'), 
            clientKey        = panic('clientKey'), 
            translationKey   = panic('translationKey'),
            translationArray = panic('translationArray'),            
    }) {

    Route.translation_createMany(translationArray).then(res => {

        generator.setInputValue('');
        return Route.translation_getGroupMeta(clientKey, translationKey);
    })
    .then(groupMeta => {

        let card = new Component_TranslationCard;
        card.key = groupMeta.key;

        groupMeta.isComplete.forEach(keyComplete => {
            card.makeLanguagekeyComplete(keyComplete.key, keyComplete.value);
        })
        generator.addItem(card);

    })
    .catch(err => console.error(err));
}

function __async__deleteTranslationGroup({
            clientKey      = panic('clientKey'), 
            containerKey   = panic('containerKey'), 
            translationKey = panic('translationKey'),
    }) {
    Route.translation_deleteGroup(clientKey, containerKey, translationKey).catch(err => console.error('Error:', err));
}