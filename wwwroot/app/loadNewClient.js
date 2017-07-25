'use strict';

import * as App from './App.js';
import * as Api from '../lib/Api.js';

import { View_EditClient }  from '../views/edit-client.js';

import { Component_ItemGenerator } from '../components/item-generator.js';
import { Component_ItemFlipper }   from '../components/item-flipper.js';
import { Component_FormClient }    from '../components/form-client.js';
import { Component_ButtonSelect }  from '../components/button-select.js';

import { loadSelectClient } from './loadSelectClient.js';
import { submitNewClient }  from './submitClient.js';


export function loadNewClient(client) {

    // @note 1. Maybe it is faster to call 1 function an pass an object. But then there is overhead of constructing
    //           and accessing the object.
    // 2. The setter functions hides that it is an actual function call. I am not sure I lke that.
    // 3. If getters and setters are spelled wrong in javascript they don't throw an error. Functions on the other hand do. 
    ///    This is because objects in javascript are extensible by default, using duct-typing, and creating new attributes 
    //     on the fly is the default behaviour, when someone tries to set and attribute which is not currently there.
    //      For this reason duct typing may introduces difficult to track down errors.
    // 4. Even accessing a getter which does not exist, does not throw an error.
    //

    //
    // 0. Set up header
    //
    App.HEADER.textBig   = 'Ordbase';    
    App.HEADER.textSmall = 'New client';
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
    form.setSubmitText('Create client');
    form.addEventListener('submit', e => {
        e.preventDefault();

        //
        // @note to use the .map() function i have to convert the HTML-collections into
        //       javascript arrays. This is done with the [].slice.call(htmlcollection)
        //  @doc https://stackoverflow.com/questions/31676135/javascript-map-is-not-a-function
        //
        let form = e.target;
        let containers = [].slice.call(generator.getItems())
            .map(button => {
                return button.getId();
            });

        let languages = [].slice.call(flipper.getSelectedItems())
            .map(button => {                
                return button.getId();
            });
        
        submitNewClient(form, containers, languages);            
    });

    //
    // 3. Create view, inject components and append view to DOM.
    //
    const view = new View_EditClient; 
    view.setContainerGenerator(generator);
    view.setLanguageFlipper(flipper);
    view.setClientForm(form);
    App.switchView(view);

    //
    // 4. Promise fill in available languages
    //
    Api.language.getAll()
        .then(languages => {

            languages.forEach(lang => {
                let button = new Component_ButtonSelect;

                button.setId(lang.key);
                button.setText( `${lang.name} - ${lang.key}`);
                button.setSelected(false);

                flipper.addItem(button);
            });
        })
        .catch(error => console.log(error));
}