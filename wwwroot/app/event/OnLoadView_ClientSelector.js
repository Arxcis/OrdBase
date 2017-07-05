'use strict';

import { loadTemplate, unpackTemplate }              from '../library/jet-template-unpacker.js'
import { client as apiClient }                       from '../library/api.js';
import { overwriteFromTemplate, appendFromTemplate } from '../library/util.js';
import { OnLoadView_TranslationSelector }            from './OnLoadView_TranslationSelector.js';
import { OnLoadView_ClientEditor }                   from './OnLoadView_ClientEditor.js';

const viewTemplate = loadTemplate('./app/view/view-client-selector.html');
const cardTemplate = loadTemplate('./app/component/card-client.html');

//
// @function OnLoadViewClientSelector
//
export function OnLoadView_ClientSelector() {
    
    let viewContent = viewTemplate.content;     

    // Hook up all buttons
    viewContent.querySelector('#btn-toggle-inactive-menu').addEventListener('click', event => OnLoadView_ClientSelector());
    viewContent.querySelector('#btn-back-to-home-page').addEventListener('click', event => OnLoadView_ClientSelector());
    viewContent.querySelector('#btn-create-new-client').addEventListener('click', event => OnLoadView_ClientEditor('fmsf'));

    // Clear all content, insert new view
    document.body.innerHTML = ''; 
    document.body.appendChild(viewContent);

    // Get Client data
    apiClient.getAll()
    .then(clientCollection => {

        // Loop through all clients and generate cards for each of thems
        const main = document.querySelector('main');

        clientCollection.forEach( client => {
            const dataBindings = {
                'heading': client.Name,
                'websiteurl': 'https://www.placeholder.no',
                'thumbnailurl' : 'http://placehold.it/250x125/FFC107', 
            };

            const cardContent = unpackTemplate(cardTemplate, dataBindings);

            cardContent.querySelector('button').addEventListener('click', event => OnLoadView_TranslationSelector(client.name));            
            main.appendChild(cardContent);            
        });      
    })
    .catch(reason => console.error('Error:', reason));
}
