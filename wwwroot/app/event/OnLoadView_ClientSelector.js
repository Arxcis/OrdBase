'use strict';

import { loadTemplate, loadText, bindTemplate }      from '../library/jet-template-loader.js'
import { client as apiClient }                       from '../library/api.js';
import { overwriteFromTemplate, appendFromTemplate } from '../library/util.js';
import { OnLoadView_TranslationSelector }            from './OnLoadView_TranslationSelector.js';
import { OnLoadView_ClientEditor }                   from './OnLoadView_ClientEditor.js';

//
// @function OnLoadViewClientSelector
//
export function OnLoadView_ClientSelector() {

    let clientCollection = {};
    
    loadTemplate('./app/view/view-client-selector.html').then( viewTemplate => {
        
        let viewContent = viewTemplate.content;        

        // Hook up all buttons
        viewContent.querySelector('#btn-toggle-inactive-menu').addEventListener('click', event => OnLoadView_ClientSelector());
        viewContent.querySelector('#btn-back-to-home-page').addEventListener('click', event => OnLoadView_ClientSelector());
        viewContent.querySelector('#btn-create-new-client').addEventListener('click', event => OnLoadView_ClientEditor('fmsf'));

        // Clear all content, insert new view
        document.body.innerHTML = ''; 
        document.body.appendChild(viewContent);
    
        // Get Client data
        return apiClient.getAll();
    
    }).then( clients => {

        clientCollection = clients;
        return loadText('./app/component/card-client.html');
    
    }).then( cardTemplateText => {
        // Loop through all clients and generate cards for each of thems
        const main = document.querySelector('main');

        clientCollection.forEach( client => {
            const dataBindings = {
                'heading': client.Name,
                'websiteurl': 'https://www.placeholder.no',
                'thumbnailurl' : 'http://placehold.it/250x125/FFC107', 
            };

            const cardTemplate = bindTemplate(cardTemplateText, dataBindings);

            cardTemplate.content.querySelector('button').addEventListener('click', event => OnLoadView_TranslationSelector(client.name));            
            main.appendChild(cardTemplate.content);            
        });      
    })
    .catch(reason => console.error('Error:', reason));
}
