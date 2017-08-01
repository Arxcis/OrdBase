'use strict';

import * as App from './App.js';
import * as Route from '../lib/Route.js';
import { force } from '../lib/Util.js'; 

import { View_EditClient }        from '../views/edit-client.js';

import { Component_ContainerGenerator } from '../components/generator-container.js';
import { Component_LanguageFlipper   } from '../components/flipper-language.js';
import { Component_ClientForm    } from '../components/form-client.js';

import { loadSelectClient } from './loadSelectClient.js';

export function loadEditClient(clientKey) {

    //
    // 0. Create component instances
    //
    const header    = App.HEADER;
    const view      = new View_EditClient;     
    const generator = new Component_ContainerGenerator;
    const flipper   = new Component_LanguageFlipper;
    const form      = new Component_ClientForm;

    //
    // 1. Async calls filling in data in components
    //
    __async__populateGenerator({generator: generator, clientKey: clientKey});
    __async__populateFlipper({flipper: flipper, clientKey: clientKey});
    __async__populateForm({form: form, clientKey: clientKey});

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
    // 5. Set up language flipper
    //
    flipper.setHeaderUp('Selected')    
    flipper.setHeaderDown('Available');

    //
    // 6. Set up form
    //
    form.setSubmitText(`Update ${clientKey}`);
    form.addEventListener('submit', e => {
        e.preventDefault();

        __async__updateClient({ header: header, 
                                client:         form.getClient(), 
                                containerArray: generator.getContainerKeyArray(), 
                                languageArray:  flipper.getLanguageKeyArray(), });
    });

    //
    // 7. Create view, inject components and append view to DOM.
    //
    view.setContainerGenerator(generator);
    view.setLanguageFlipper(flipper);
    view.setClientForm(form);
    App.switchView(view);
}

//
// @function __async__populateGenerator
//  @note @todo
//
function __async__populateGenerator({ generator = force('generator'), 
                                      clientKey = force('clientKey'),
    }) {

    Route.client_getContainers({clientKey: clientKey})
    .then( containers => {

        containers.forEach( container => {
            generator.makeItem({key: container, selected: true}); 
        });
    })
    .catch(reason => console.error('Error:', reason));
}

//
// @function __async__populateFlipper
//  @note @todo
//
function __async__populateFlipper({ flipper = force('flipper'), 
                                    clientKey = force('clientKey'),
    }) {

    Route.language_get()
    .then(languageArray => {

        languageArray.forEach(lang => {

            flipper.makeItem({ key: lang.key, 
                               text: `${lang.name} - ${lang.key}`, 
                               selected: false });
        });
        return Route.client_getLanguages({clientKey: clientKey});
    })
    .then(languageKeyArray => {
        languageKeyArray.forEach(key => {
            flipper.selectItem(key);
        })
    })
    .catch(error => console.error(error));
}

//
// @function __async__populateForm
//  @note @todo
//
function __async__populateForm({ form = force('form'), 
                                 clientKey = force('clientKey'),
    }) {

    Route.client_get({clientKey: clientKey})
    .then(client => {
        form.setClient(client[0]);
    })
    .catch(error => console.error(error));        
}


//
// @function __async__updateClient
//  @note @todo
//
function __async__updateClient({ header         = force('header'),
                                 client         = force('client'), 
                                 containerArray = force('containerArray'), 
                                 languageArray  = force('languageArray')
    }) {

    Route.client_update({clientKey: client.key, client: client}).then(res => {
        console.log('client_update():', res.status);
        if (res.status == App.HTTP_UPDATED) {

            Route.client_setContainers({clientKey: client.key, containerArray: containerArray}).then(res => {
                if (res.status != App.HTTP_CREATED) { 
                    header.flashError(`code ${res.status}: clientContainers could not be updated`);
                }
                console.log('client_setContainers(): ', res.status)

            }).catch(error => console.error(error));

            Route.client_setLanguages({clientKey:  client.key, languageArray: languageArray}).then(res => {
                if (res.status != App.HTTP_CREATED) { 
                    header.flashError(`code ${res.status}: clientLanguages could not be updated`);
                }
                console.log('client_setLanguages(): ', res.status)
            }).catch(error => console.error(error));
            
            loadSelectClient();
        }
        else {
            header.flashError(`code ${res.status}: CRITICAL ERROR, Client could not be updated... `);
        }
    })
    .catch(error => header.flash(error)); // @TODO Display error in view
}