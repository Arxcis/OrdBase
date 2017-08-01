'use strict';

import * as App from './App.js';
import * as Route from '../lib/Route.js';
import { force } from '../lib/Util.js'; 

import { View_SelectTranslation } from '../views/select-translation.js';

import { Component_TranslationCard }      from '../components/card-translation.js';
import { Component_TranslationGenerator } from '../components/generator-translation.js';
import { Component_ContainerPicker }      from '../components/picker-container.js';

import { loadSelectClient }    from './loadSelectClient.js';


function makeTranslationCard({ generator = force('generator'), 
                                cardPrototype = force('cardPrototype'), 
                                groupMeta = force('groupMeta')}) {
                                    
    let card = new Component_TranslationCard;

    card.setTranslationKey(groupMeta.key);
    
    groupMeta.items.forEach(item => {
        card.addLanguagekeyComplete(item.languageKey, item.isComplete);
    });

    card.OnOpen(cardPrototype._openHandler);
    card.OnClose(cardPrototype._closeHandler);
    card.OnSubmit(cardPrototype._submitHandler);
    card.OnDelete(cardPrototype._deleteHandler);

    generator.addCard(card);
}


//
// @function loadSelectTranslation
//  @note @todo
//
export function loadSelectTranslation (clientKey) {
    
    //
    // 0. Create data
    //
    const header    = App.HEADER;
    const view      = new View_SelectTranslation;
    
    const languageKeyArray = new Array();
    const generator = new Component_TranslationGenerator;
    const picker    = new Component_ContainerPicker;

    const cardPrototype = new Component_TranslationCard;
    
    //
    // 1. Async calls
    //
    // Populate languageArray
    __async__getLanguageKeyArray({ 
        clientKey: clientKey,
        success: _languageKeyArray => {
            languageKeyArray = _languageKeyArray;
        }  
    });

    //
    // Populate generator
    //
    __async__getGroupMetaArray({ 
        clientKey: clientKey, 
        containerKey: '',
        success: groupMetaArray => {  
             groupMetaArray.forEach(groupMeta => {
                makeTranslationCard({generator: genrator, 
                                    cardPrototype:cardPrototype, 
                                   groupMeta: groupMeta})
            });
        }
    });

    //
    // Populate picker and set up default item
    //
    __async__getContainerKeyArray({ 
        clientKey: clientKey, 
        success: containerKeyArray => {

            const defaultItemId = 'All Containers';

            containerKeyArray.push(defaultItemId); 
            containerKeyArray.forEach(containerKey => {

                picker.makeItem({
                    key: containerKey, 
                    text: containerKey,

                    //
                    // On picker item click
                    //
                    onClick: () => {
                        __async__getGroupMetaArray({
                            clientKey: clientKey, 
                            containerKey: item.getKey(),
                            success: groupMetaArray => {

                                generator.clearItems();
                                
                                if(item.getKey() != defaultItemId) 
                                    generator.activate();
                                else                    
                                    generator.deactivate();
                        
                                groupMetaArray.forEach(groupMeta => {

                                    makeTranslationCard({generator: genrator, 
                                                        cardPrototype:cardPrototype,
                                                        groupMeta: groupMeta})      
                                }) 
                            },
                        });
                    },
                });
            });
            picker.setDefaultItem(defaultItemId);
        }
    });
    

    //
    // 2. Hook up Translation card event handlers
    //
    cardPrototype.OnOpen((card, e) => { 

        //
        // Generate fieldsets
        //
        __async_getGroupArray({ 
            clientKey: clientKey, 
            containerKey:  picker.getContainerKey(), 
            translationKey: card.getTranslationKey(),
            success: groupArray => {

            } 
        })
    });

    cardPrototype.OnDelete((card, e) => { 
        __async__deleteTranslation({ 
            clientKey:      clientKey, 
            containerKey:   picker.getContainerKey(), 
            translationKey: card.getTranslationKey(),
            success: () => {
                card.delete();
                generator.getCardArray().forEach(_card => _card.close()); 
            }
        });
    });  

    //
    // 2. Setup header events
    //
    header.button0_OnClick(App.defaultHandler);
    header.button1_OnClick(App.defaultHandler);    
    header.button2_OnClick( e => {
        
        let cardArray = generator.getCardArray();

        if(cardArray.length > 0) {
            if (!cardArray[0].isDeleteable()) {
                header.setTextBig('Delete Translation');
                cardArray.forEach(card => { 
                    card.close(); 
                    card.setDeleteable();
                });
            }
            else {
                header.setTextBig('Select Translation');
                cardArray.forEach(card => card.setOpenable());            
            }
        }                
    });
    header.button3_OnClick( e => loadSelectClient());


    //
    // 2. Setup header data
    //
    header.setTextSmall( 'Ordbase');
    header.setTextBig( `Select Translation`);

    header.button0_setIcon  ( App.ICON_BARS);
    header.button1_setIcon( App.ICON_NONE);
    header.button2_setIcon( App.ICON_TRASH);
    header.button3_setIcon( App.ICON_ARROW_LEFT);    


    //
    // 4.Component_TranslationGenerator
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
// @function __async__getLanguageKeyArray
//  @note @todo
//
function __async__getLanguageKeyArray({ clientKey = force('clientKey'), 
                                          success   = force('success') }){
        
    Route.client_getLanguages({clientKey: clientKey}).then(languageKeyArray => {
        success(languageKeyArray);
    })
    .catch(err => console.error('Error:', err));      
}


//
// @function __async__getGroup
//  @note @todo
//
function __async__getGroup({ success       = force('success'),
                             clientKey     = force('clientKey'),
                             containerKey  = force('containerKey'),
                             translationKey = force('translationKey'), }) {

    Route.translation_getGroup(arguments[0]).then((groupArray) => {
        
        let group = groupArray[0];
        success(group);

    }).catch(err => console.error('Error: ', err));
}


//
// @function __async__getContainerKeyArray 
//  @note @todo
//
function __async__getContainerKeyArray ({  success  = force('success'),
                                          clientKey   = force('clientKey') }) {

    Route.client_getContainers({clientKey: clientKey}).then(containerKeyArray => {        
        successs(containerKeyArray);
    })
    .catch(err => console.error('Error:', err));      
}

//
// @function __async__getGroupMetaArray
//  @note @todo
//
function __async__getGroupMetaArray({ success      = force('success'),
                                      clientKey    = force('clientKey'), 
                                      containerKey = force('containerKey') }) {

    Route.translation_getGroupMeta({clientKey:    clientKey, 
                                    containerKey: containerKey}).then(groupMetaArray => {
        success(groupMetaArray);
    })
    .catch(err => console.error('Error:', err));  
}


//
// @function __async__createTranslation
//  @note @todo
//
function __async__createTranslation({ success          = force('success'), 
                                      translationArray = force('translationArray')}) {

    Route.translation_createArray({ translationArray: translationArray }).then(res => {

        return Route.translation_getGroupMeta({ clientKey: translationArray[0].clientKey, 
                                                containerKey: translationArray[0].containerKey, 
                                                translationKey: translationArray[0].key }); 
    })
    .then(groupMeta => {
        success(groupMeta);
    })
    .catch(err => console.error(err));
}



//
// @function __async__deleteTranslation
//  @note @todo
//
function __async__deleteTranslation({  success        = force('success'),
                                       clientKey      = force('clientKey'), 
                                       containerKey   = force('containerKey'), 
                                       translationKey = force('translationKey'), }) {

    Route.translation_deleteGroup({clientKey: clientKey, 
                                   containerKey: containerKey, 
                                   translationKey: translationKey}).then(res => {
        console.log('translation_deleteGroup():', res.status);
        
        if (res.status == App.HTTP_CREATED) {
            success();
        }
        else {
            header.flashError(`${res.status}: Was not able to delete card...`);
        }        
    }).catch(err => console.error('Error:', err));
}