'use strict';

import * as App from './App.js';
import * as Api from '../lib/Api.js';

import { View_EditClient }        from '../views/edit-client.js';

import { Component_ButtonSelect  } from '../components/button-select.js';
import { Component_ItemGenerator } from '../components/item-generator.js';
import { Component_ItemFlipper   } from '../components/item-flipper.js';
import { Component_FormClient    } from '../components/form-client.js';

import { loadSelectClient } from './loadSelectClient.js';


export function loadEditClient(client) {
    
    //
    // 0. Set up header
    //
    App.HEADER.textBig   = 'Ordbase';    
    App.HEADER.textSmall = `Update ${client}`;

    App.HEADER.buttonIconLeft   = App.ICON_BARS;
    App.HEADER.buttonIconRight1 = App.ICON_NONE;    
    App.HEADER.buttonIconRight2 = App.ICON_TIMES;

    App.HEADER.buttonLeft.onclick   = App.defaultHandler;
    App.HEADER.buttonRight1.onclick = App.defaultHandler;
    App.HEADER.buttonRight2.onclick = event => loadSelectClient();

    //
    // 1. Set up container generator
    //
    const generator = new Component_ItemGenerator;
    generator.setGenerateFunction(() => {
        let button = new Component_ButtonSelect;
        let value = generator.getValue();
        button.setId(value);
        button.setText(value);
        button.setSelected(true);
        return button;
    });

    //
    // 2. Set up language flipper
    //
    const flipper = new Component_ItemFlipper;
    flipper.setHeaderUp('Selected')    
    flipper.setHeaderDown('Available');

    //
    // 3. Set up form
    //
    const form = new Component_FormClient;
    form.setSubmitText('Update client');
    form.addEventListener('submit', e => {
        e.preventDefault();

        let form = e.target;
        let containers = [].slice.call(generator.getItems())
            .map(button => {
                return button.getId();
            });

        let languages = [].slice.call(flipper.getSelectedItems())
            .map(button => {                
                return button.getId();
            });
        
        // Handing of the submit request logic to separate script
        submitNewClient(form, containers, languages);            
    });

    //
    // 4. Create view, inject components and append view to DOM.
    //
    const view = new View_EditClient;
    view.setContainerGenerator(generator);
    view.setLanguageFlipper(flipper);
    view.setClientForm(form);
    App.switchView(view);

    //
    // 5. Promise fill containers into generator
    //
    Api.container.getOnClient(client)
        .then( containers => {

            containers.forEach( container => {

                const button = new Component_ButtonSelect;

                button.setId(container);
                button.setText(container);
                button.setSelected(true);

                generator.addItem(button);
            });
        })
        .catch(reason => console.error('Error:', reason));
    
    //
    // 6. Promise fill languages into flipper
    //
    Api.language.getOnClient(client)
        .then(languages => {

            languages.forEach(lang => {
                let button = new Component_ButtonSelect;

                button.setId(lang.key);
                button.setText( `${lang.name} - ${lang.key}`);
                button.setSelected(true);

                flipper.addItem(button, { selected : true });
            });
        })
        .catch(error => console.log(error));
    
    //
    // 7. Promise fill client data into form
    //
    Api.client.get(client)
        .then(client => {
            form.setClient(client[0]);
        })
        .catch(error => console.log(error));        
}