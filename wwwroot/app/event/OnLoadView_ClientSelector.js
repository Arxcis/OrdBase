'use strict';

import { loadTemplate, loadText, bindTemplate }      from '../library/jet-template-loader.js'
import { client as apiClient }                       from '../library/api.js';
import { overwriteFromTemplate, appendFromTemplate } from '../library/util.js';
import { OnLoadView_TranslationSelector }            from './OnLoadView_TranslationSelector.js';
import { OnLoadView_ClientEditor }                   from './OnLoadView_ClientEditor.js';

registerTemplate('view-client-selector', 'view-client-selector.html');


//
// @function OnLoadViewClientSelector
//
export function OnLoadView_ClientSelector() {

    let clientCollection = {};
    
    
    let viewClientSelector = document.createElement('view-client-selector');

    bindTemplate(viewClientSelector, {
        'header': 'Ordbase',
        'description': 'select client',
    });


function registerTemplate() {

}


































    loadTemplate('./app/view/view-client-selector.html', {
        bigHeader : 'Ordbase',
        smallHeader : 'Select client',
   
    }).then( viewTemplate => {
        
        let viewContent = viewTemplate.content;        

        // Hook up all buttons
        viewContent.querySelector('#btn-toggle-inactive-menu').onclick = event => OnLoadView_ClientSelector();
        viewContent.querySelector('#btn-back-to-home-page').onclick = event => OnLoadView_ClientSelector();
        viewContent.querySelector('#btn-create-new-client').onclick = event => OnLoadView_ClientEditor('fmsf');

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

        clientCollection.forEach( (client, index) => {
            const cardData = {
                id:         `card${index}`,
                name:       client.name,
                website:    'https://www.placeholder.no',
                thumbnail : 'http://placehold.it/250x125/FFC107', 
            };
            const cardTemplate = bindTemplate(cardTemplateText, cardData);
            
            cardTemplate.content.querySelector('button').onclick = event => OnLoadView_TranslationSelector(client.name);
            main.appendChild(cardTemplate.content);            
        });      
    })
    .catch(reason => console.error('Error:', reason));
}
