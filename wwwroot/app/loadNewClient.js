'use strict';

import * as App from './App.js';
import * as Route from '../lib/Route.js';
import { force } from '../lib/Util.js'; 

import { View_EditClient }  from '../views/edit-client.js';

import { Component_ContainerGenerator } from '../components/generator-container.js';
import { Component_LanguageFlipper }   from '../components/flipper-language.js';
import { Component_ClientForm }        from '../components/form-client.js';

import { loadSelectClient } from './loadSelectClient.js';

export function loadNewClient(clientKey) {

    //
    // 0. Create component instances
    //
    const header    = App.HEADER;
    const view      = new View_EditClient;     
    const generator = new Component_ContainerGenerator;
    const flipper   = new Component_LanguageFlipper;
    const form      = new Component_ClientForm;
    
    //
    // 1. Fire async call
    //
    __async__populateFlipper({flipper: flipper});

    //
    // 2. Set up header event handlers
    //
    header.button0_OnClick(App.defaultHandler);
    header.button1_OnClick(App.defaultHandler);    
    header.button2_OnClick(App.defaultHandler);
    header.button3_OnClick(event => loadSelectClient());

    //
    // 3. Bind data to header
    //
    header.setTextSmall('Ordbase');    
    header.setTextBig('New client');
    header.button0_setIcon(App.ICON_BARS);
    header.button1_setIcon(App.ICON_NONE);    
    header.button2_setIcon(App.ICON_NONE);    
    header.button3_setIcon(App.ICON_TIMES);

    //
    // 4. Component flipper
    //
    flipper.setHeaderUp('Selected')    
    flipper.setHeaderDown('Available');

    //
    // 5. Component form
    //
    form.setSubmitText('Create client');
    form.addEventListener('submit', e => {
        e.preventDefault();
        //
        //  @doc https://stackoverflow.com/questions/31676135/javascript-map-is-not-a-function
        //
        let clientData     = form.getData();
        let containerArray = generator.getContainerKeyArray(); 
        let languageArray  = flipper.getLanguageKeyArray(); 
        console.log(clientData, containerArray, languageArray);
        __async__submitNewClient({ client: clientData, 
                                   containerArray: containerArray, 
                                   languageArray: languageArray, 
                                   header: header });            
    });

    //
    // 6. Inject components and append view to DOM.
    //
    view.setContainerGenerator(generator);
    view.setLanguageFlipper(flipper);
    view.setClientForm(form);
    App.switchView(view);

}

const HTTP_CREATED = 201;
//
// @function __async__populateFlipper
//  @note @todo
//
function __async__populateFlipper({ flipper = force('flipper') }) {

    Route.language_get().then(languageArray => {
        console.log('get languageArray:', languageArray.status);        
        
        languageArray.forEach(lang => {
            flipper.makeNewItem({ key: lang.key, 
                                  text: `${lang.name} - ${lang.key}`,
                                  selected: false });
        });
    }) 
    .catch(error => console.log(error));
}

//
// @function __async__submitNewClient
//  @note @todo
//
function __async__submitNewClient({
            header         = force('header'),
            client         = force('client'), 
            containerArray = force('containerArray'), 
            languageArray  = force('languageArray'),
    }) {

    Route.client_create({client: client})
    .then(res => {

        if (res.status == HTTP_CREATED) {

            Route.client_setContainers({clientKey: client.key, containerArray: containerArray}).then(res => {
                if (res.status != HTTP_CREATED) { 
                    header.flashError(`code ${res.status}: clientContainers could not be created`);
                }
            }).catch(error => console.error(error));

            Route.client_setLanguages({clientKey:  client.key, languageArray: languageArray}).then(res => {
                if (res.status != HTTP_CREATED) { 
                    header.flashError(`code ${res.status}: clientLanguages could not be created`);
                }
                console.log('client_setLanguages: ', res.status)
            }).catch(error => console.error(error));
            
            loadSelectClient();
        }
        else {
            header.flashError(`code ${res.status}: Client could not be created. Client may already exist`);
        }
    })
    .catch(error => header.flash(error)); // @TODO Display error in view
} 

