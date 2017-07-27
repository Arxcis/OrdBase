'use strict';

import * as App from './App.js';
import * as Route from '../lib/Route.js';

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
    const buttonArray   = new Array();

    // Async calls
    async_generateSelectButtons(view, generator, buttonArray, clientKey);
    async_generateTranslationCards(generator, clientKey, 'all');

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

        async_generateTranslationCards(generator, clientKey, button.getId());
    });

    //
    // Component_ItemGenerator
    //
    generator.OnGenerate(() => {
        let containerKey   = view.getActiveContainerButton().getId();
        let translationKey = generator.getValue();
       
        async_submitNewTranslationGroup(generator, clientKey, containerKey, translationKey)
    });

    //
    // Insert components into view, and add view to DOM
    //
    view.setTranslationGenerator(generator);
    view.setActiveContainerButton(button);
    view.addContainerButton(button);
    App.switchView(view);
}


function makeTranslationCard(groupMeta) {
    
    let card = new Component_TranslationCard;
    card.key = groupMeta.key;

    Object.keys(groupMeta.isComplete).forEach((languageKey, isComplete) => {
        card.makeLanguageKeyAndIcon(languageKey, isComplete);
    });
    return card;
}

//
// ASYNC GET CALLS
//
function async_generateSelectButtons(view, generator, buttons, clientKey) {

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

                async_generateTranslationCards(generator, clientKey, button.getId());
            });
        
            view.addContainerButton(button);
        });
    })
}


function async_generateTranslationCards(generator, clientKey, containerKey) {
    
    
    Route.translation_getGroupMetaOnContainer(clientKey, containerKey).then(groupMetaArray => {

        generator.clearItems();
        
        groupMetaArray.forEach((groupMeta, i) => {
            let card = makeTranslationCard(groupMeta);            
            generator.addItem(card);
        });    
    })
    .catch(err => console.error('Error:', err));  
}

//
// ASYNC CREATE DELETE
//
function async_submitNewTranslationGroup(generator, _clientKey, _containerKey, _translationKey) {

    Route.client_getDefaultLanguages(_clientKey).then(languageArray => {
  
        let translationArray = new Array();

        languageArray.forEach(language => {
        
            translationArray.push({
                clientKey : _clientKey,
                languageKey : language,
                containerKey : _containerKey,
                key : _translationKey,
                text : 'default',
                isComplete : false,
            });
        });

        return translationArray;
    })
    .then(translationArray => { 
        return Route.translation_createMany(translationArray) 
    })
    .then(res => {
        generator.setInputValue('');
        return Route.translation_getGroupMeta(_clientKey, _translationKey);
    })
    .then(groupMeta => {
        let card = makeTranslationCard(groupMeta, generator);
        generator.addItem(card);
    })
    .catch(err => console.error(err));
}

function async_deleteTranslationGroup(clientKey, containerKey, translationKey) {

    Route.translation_deleteGroup(clientKey, containerKey, translationKey).catch(err => console.error('Error:', err));
}