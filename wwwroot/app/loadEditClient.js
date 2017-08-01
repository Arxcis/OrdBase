'use strict';

import * as App from './App.js';
import * as Route from '../lib/Route.js';
import { force } from '../lib/Util.js'; 

import { View_EditClient }        from '../views/edit-client.js';

import { Component_SelectButton  } from '../components/button-select.js';
import { Component_ItemGenerator } from '../components/item-generator.js';
import { Component_ItemFlipper   } from '../components/item-flipper.js';
import { Component_ClientForm    } from '../components/form-client.js';

import { loadSelectClient } from './loadSelectClient.js';

export function loadEditClient(clientKey) {

    //
    // 0. Create component instances
    //
    const header    = App.header;
    const view      = new View_EditClient;     
    const generator = new Component_ItemGenerator;
    const flipper   = new Component_ItemFlipper;
    const form      = new Component_ClientForm;

    //
    // 1. Async calls 
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

        let clientObject   = form.getClient();
        let containerArray = generator.getItemArray().map(button => { return button.getId(); });
        let languageArray  = flipper.getSelectedItemArray().map(button => { return button.getId(); });

        __async__updateClient({ clientKey: clientKey, form: form, generator: generator, flipper: flipper});            
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
// 8. Fill container buttons into generator
//
function __async__populateGenerator({
            generator = force('generator'), 
            clientKey = force('clientKey'),
    }) {

    Route.client_getContainers({clientKey: clientKey})
    .then( containers => {
        console.log('containers ', containers);

        containers.forEach( container => {

            const button = new Component_SelectButton;

            button.setId(container);
            button.setText(container);
            button.setSelected(true);

            button.OnClick(() => {
                generator.removeItem(button);
            });
            generator.addItem(button);
        });
    })
    .catch(reason => console.error('Error:', reason));
}

//
// 9. Fill languages into flipper
//
function __async__populateFlipper({
            flipper = force('flipper'), 
            clientKey = force('clientKey'),
    }) {
    let buttonArray = new Array();

    Route.language_get()
    .then(languages => {
        console.log('global ', languages);

        languages.forEach(lang => {
            let button = new Component_SelectButton;

            button.setId(lang.key);
            button.setText( `${lang.name} - ${lang.key}`);
            button.setSelected(false);

            button.OnClick(() => {
                button.toggleSelected();
            });

            buttonArray.push(button);
            flipper.addItem(button, { selected : false });
        });
        return Route.client_getLanguages({clientKey: clientKey});
    })
    .then(languages => {
        console.log('selected ', languages);
        languages.forEach(lang => {

            let isDefaultButton = false;
            
            for (let i = 0; i < buttonArray.length; i++) {
                
                let button = buttonArray[i];
                if (button.getId() === lang) {
                    button.setSelected(true);     
                    flipper.flipItem(button);
                    break;
                }
            }
        })
    })
    .catch(error => console.log(error));
}

//
// 10. Fill client data into form
//
function __async__populateForm({
            form = force('form'), 
            clientKey = force('clientKey'),
    }) {

    Route.client_get({clientKey: clientKey})
    .then(client => {
        form.setClient(client[0]);
    })
    .catch(error => console.log(error));        
}

const HTTP_CREATED = 201;

//
// 11. Submit data from form, generator and flipper
//
function __async__updateClient({
            header         = force('header'),
            client         = force('client'), 
            containerArray = force('containerArray'), 
            languageArray  = force('languageArray')
    }) {

    Route.client_update({clientKey: client.key, client: client}).then(res => {

        if (res.status == HTTP_CREATED) {

            Route.client_setContainers({clientKey: client.key, containerArray: containerArray}).then(res => {
                if (res.status != HTTP_CREATED) { 
                    header.flashError(`code ${res.status}: clientContainers could not be updated`);
                }
            }).catch(error => console.error(error));

            Route.client_setLanguages({clientKey:  client.key, languageArray: languageArray}).then(res => {
                if (res.status != HTTP_CREATED) { 
                    header.flashError(`code ${res.status}: clientLanguages could not be updated`);
                }
                console.log('client_setLanguages: ', res.status)
            }).catch(error => console.error(error));
            
            loadSelectClient();
        }
        else {
            header.flashError(`code ${res.status}: CRITICAL ERROR, Client could not be updated... `);
        }
    })
    .catch(error => header.flash(error)); // @TODO Display error in view
}