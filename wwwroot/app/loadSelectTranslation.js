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
    const languageArray = Route.client_getDefaultLanguages(clientKey);

    const buttonArray = new Array();

    // Async calls
    async_generateSelectButtons(view,  buttonArray, clientKey);
    async_generateTranslationCards(generator, clientKey);
    async_selectButtonHandler(view, clientKey);

    // Setup header
    App.HEADER.setTextBig          ( 'Ordbase');
    App.HEADER.setTextSmall        ( `Select ${clientKey} Translation`);
    App.HEADER.setButtonIconLeft   ( App.ICON_BARS);
    App.HEADER.setButtonIconRight1 ( App.ICON_PLUS);
    App.HEADER.setButtonIconRight2 ( App.ICON_ARROW_LEFT);    

    App.HEADER.getButtonLeft().onclick   = App.defaultHandler;
    App.HEADER.getButtonRight0().onclick = App.defaultHandler;    
    App.HEADER.getButtonRight1().onclick = App.defaultHandler;
    App.HEADER.getButtonRight2().onclick = event => loadSelectClient();

    //
    // Component_ItemGenerator
    //
    generator.generateHandler = () => {
        let containerKey   = view.activeContainerButton.getId();
        let translationKey = generator.getValue();
       

        async_submitNewTranslationGroup(clientKey, containerKey, translationKey, languageArray)
        .catch(err => {
            console.error(err);
            loadSelectTranslation(clientKey);
        });

        let card = new Component_TranslationCard;
        card.key = translationKey;
        card.onClickCard = event => console.log('Hello from ${card.key}!!');

        languageArray.forEach(language => {

            // @TODO GENERATE KEY AND ICON HERE, on Component_TranslationCard
        });
        return card;
    };

    generator.destroyHandler = (card) => {

        let containerKey   = view.activeContainerButton.getId();
        let translationKey = card.getKey();

        async_deleteTranslationGroup(clientKey, containerKey, translationKey);
    };

    //
    // Component_SelectButton
    //
    button.setId('all');
    button.setText('All containers');
    button.setSelected(true);

    //
    // Insert components into view, and add view to DOM
    //
    view.setTranslationGenerator(generator);
    view.setContainerButtonAll(button)
    App.switchView(view);
}


function generateTranslationCards(generator, groups) {
            
    groups.forEach((group, i) => {

        let card = new Component_TranslationCard;
        
        card.key = group.key;
        card.onClickCard = event => console.log('Hello from ${group.key}!!');

        Object.keys(group.isComplete).forEach((languageKey, isComplete) => {
            
            // @TODO GENERATE KEY AND ICON HERE, on Component_TranslationCard

        });
        console.log(card);
        generator.addItem(card);
    });               
}


//
// ASYNC CALLS
//
function async_generateSelectButtons(view, buttons, clientKey) {


    Route.client_getDefaultContainers(clientKey)  
    .then(containers => {        
        containers.forEach((container, i) => {

            let button = new Component_SelectButton;

            button.setId( container);
            button.setText( container);
            button.setSelected(false)
        
            view.addContainerButton(button);    
        });
    })
}


function async_generateTranslationCards(generator, clientKey) {

    Route.translation_getGroupMetaAll(clientKey).then(res => {
        generateTranslationCards(generator, res);
    })
    .catch(err => console.error('Error:', err));
}

function async_selectButtonHandler(view, clientKey) {

    view.switchButtonHandler = (newButton, oldButton) => {

        let container = newButton.getId();

        oldButton.setSelected(false);
        newButton.setSelected(true);

        Route.translation_getGroupMetaOnContainer(clientKey, container).then(groups => {
            view.clearTranslationCards();
        
            generateTranslationCards(view, groups)
        })
        .catch(err => console.error('Error:', err));        
    }
}

function async_submitNewTranslationGroup(_clientKey, _containerKey, _translationKey, languageArray) {

    let translationArray = new Array();

    languageArray.forEach(language => {
        
        translationArray.push({
            clientKey : _clientKey,
            languageKey : language,
            containerKey : _containerKey,
            translationKey : _translationKey,
            text : 'default',
            isComplete : false,
        });
    });

    Route.translation_createMany(translationArray).catch(err => console.error('Error:', err));
}

function async_deleteTranslationGroup(clientKey, containerKey, translationKey) {

    Route.translation_deleteGroup(clientKey, containerKey, translationKey).catch(err => console.error('Error:', err));
}