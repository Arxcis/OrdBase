'use strict';

import * as App from './App.js';
import * as Route from '../lib/Route.js';
import { force } from '../lib/Util.js'; 

import { View_SelectTranslation } from '../views/select-translation.js';

import { Component_TranslationCard }      from '../components/card-translation.js';
import { Component_TranslationGenerator } from '../components/generator-translation.js';
import { Component_ContainerPicker }      from '../components/picker-container.js';

import { loadSelectClient }    from './loadSelectClient.js';


//
// @function loadSelectTranslation
//  @note @todo
//
export function loadSelectTranslation (clientKey) {
    
    //
    // 0. Init components
    //
    const header           = App.HEADER;
    const view             = new View_SelectTranslation;
    const languageKeyArray = new Array();
    const generator        = new Component_TranslationGenerator;
    const picker           = new Component_ContainerPicker;
    const cardPrototype    = new Component_TranslationCard;
    
    //
    // 1. Async calls
    //
    // Populate languageArray
    __async__client_getLanguageKeyArray({ 
        clientKey: clientKey,
        success: _languageKeyArray => {
            languageKeyArray.push.apply(languageKeyArray, _languageKeyArray);
        }  
    });

    // Populate generator with translation cards
    __async__translation_getGroupMetaArray({ 
        clientKey: clientKey, 
        containerKey: '',
        success: groupMetaArray => {  
             groupMetaArray.forEach(groupMeta => {
                let card = makeTranslationCard({ cardPrototype: cardPrototype,  groupMeta: groupMeta})
                generator.addCard(card);
            });
        }
    });

    // Populate picker and set up default item
    __async__client_getContainerKeyArray({ 
        clientKey: clientKey, 
        success: containerKeyArray => {

            const defaultItemKey = 'All Containers';

            // Add a default item which when clicked on will show ALL translation cards
            containerKeyArray.unshift(defaultItemKey); 
            containerKeyArray.forEach(containerKey => {

                picker.makeItem({
                    key: containerKey, 
                    text: containerKey,

                    // On picker-item click, reload all translation cards
                    onclick: e => {

                        __async__translation_getGroupMetaArray({
                            clientKey: clientKey, 
                            containerKey: picker.getContainerKey(),
                            success: groupMetaArray => {

                                generator.clearItems();
                                
                                if(picker.getContainerKey() != defaultItemKey) 
                                    generator.activate();
                                else                    
                                    generator.deactivate();
                        
                                groupMetaArray.forEach(groupMeta => {

                                    let card = makeTranslationCard({ cardPrototype: cardPrototype, groupMeta: groupMeta});
                                    generator.addCard(card);      
                                }) 
                            },
                        });
                    },
                });
            });
            picker.setDefaultItem();
        }
    });
    

    //
    // 2. Hook up Translation card event handlers
    //
    cardPrototype.OnOpen((card, e) => { 

        // Generate fieldsets
        __async__translation_getGroup({ 
            clientKey:     clientKey, 
            containerKey:  picker.getContainerKey(), 
            translationKey: card.getTranslationKey(),
            success: group => {
                group.items.forEach(item => {
                    card.makeFieldset(item.languageKey, item.isComplete)
                });
            } 
        })
    });

    cardPrototype.OnDelete((card, e) => { 

        // Delete translation
        __async__translation_delete({ 
            clientKey:      clientKey, 
            containerKey:   picker.getContainerKey(), 
            translationKey: card.getTranslationKey(),
            success: () => {
                card.delete();
                generator.getCardArray().forEach(_card => _card.close()); 
            }
        });
    });  

    cardPrototype.OnSubmit((card, e) => { console.log('defaultsubmit....'); });

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

    header.button0_setIcon( App.ICON_BARS);
    header.button1_setIcon( App.ICON_NONE);
    header.button2_setIcon( App.ICON_TRASH);
    header.button3_setIcon( App.ICON_ARROW_LEFT);    


    //
    // 4.Component_TranslationGenerator
    //
    generator.OnGenerate( e => {
       
        let translationArray = new Array();

        languageKeyArray.forEach(languageKey => {
        
            translationArray.push({
                clientKey : clientKey,
                languageKey : languageKey,
                containerKey : picker.getContainerKey(),
                key : generator.getInputValue(),
                text : 'default',
                isComplete : false,
            });
        });

        __async__translation_createArray({ 
            translationArray: translationArray,
            success: (groupMeta) => {
                let card = makeTranslationCard({cardPrototype: cardPrototype, groupMeta: groupMeta}) 
                generator.addCard(card);
            } 
        });
    });

    generator.deactivate();

    //
    // 5. Insert components into view, and add view to DOM
    //
    view.setTranslationGenerator(generator);
    view.setContainerPicker(picker);
    App.switchView(view);
}


//
// @function makeTranslationCard
//
function makeTranslationCard({ cardPrototype = force('cardPrototype'), 
                               groupMeta = force('groupMeta')}) {
                                    
    let card = new Component_TranslationCard;

    card.setTranslationKey(groupMeta.key);
    
    groupMeta.items.forEach(item => {
        card.makeLanguagekeyComplete(item.languageKey, item.isComplete);
    });

    card.OnOpen(cardPrototype._openHandler);
    card.OnSubmit(cardPrototype._submitHandler);
    card.OnDelete(cardPrototype._deleteHandler);

    return card;
}

//
// @function __async__getLanguageKeyArray
//
function __async__client_getLanguageKeyArray({ clientKey = force('clientKey'), 
                                               success   = force('success') }){
        
    Route.client_getLanguages({clientKey: clientKey}).then(languageKeyArray => {
        success(languageKeyArray);
    })
    .catch(err => console.error('Error:', err));      
}


//
// @function __async__translation_getGroup
//
function __async__translation_getGroup({ success       = force('success'),
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
//
function __async__client_getContainerKeyArray ({  success  = force('success'),
                                                  clientKey   = force('clientKey') }) {

    Route.client_getContainers({clientKey: clientKey}).then(containerKeyArray => {        
        success(containerKeyArray);
    })
    .catch(err => console.error('Error:', err));      
}

//
// @function __async__translation_getGroupMetaArray
//
function __async__translation_getGroupMetaArray({ success      = force('success'),
                                                  clientKey    = force('clientKey'), 
                                                  containerKey = force('containerKey') }) {

    Route.translation_getGroupMeta({clientKey:    clientKey, 
                                    containerKey: containerKey}).then(groupMetaArray => {
        success(groupMetaArray);
    })
    .catch(err => console.error('Error:', err));  
}

//
// @function __async__translation_getGroupMeta
//
function __async__translation_getGroupMeta({ success      = force('success'), 
                                             clientKey   = force('clientKey'),
                                             containerKey = force('containerKey'),
                                             translationKey = force('translationKey')}) {

    Route.translation_getGroupMeta(arguments[0]).then(groupMetaArray => {
        let groupMeta = groupMetaArray[0];
        success(groupMeta)
    })
    .catch(err => console.error('Error:', err));      
}

//
// @function __async__translation_createArray
//
function __async__translation_createArray({ success         = force('success'), 
                                      translationArray = force('translationArray')}) {

    Route.translation_createArray({ translationArray: translationArray }).then(res => {

        if(res.status != App.HTTP_CREATED) {
            App.HEADER.flashError(`${res.status}: Was not able to create new translations...`);
            throw new Error('translation_createArray(): ', res.status);
        }

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
// @function __async__translation_delete
//
function __async__translation_delete({  success        = force('success'),
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
            App.HEADER.flashError(`${res.status}: Was not able to delete card...`);
        }        
    }).catch(err => console.error('Error:', err));
}