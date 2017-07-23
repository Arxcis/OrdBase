'use strict';

import * as App from './App.js';
import * as Api from '../jslib/Api.js';

import { Ordbase_ItemGenerator } from '../components/lib/item-generator.js';
import { Ordbase_FormClient }    from '../components/lib/form-client.js';
import { Ordbase_ButtonSelect }  from '../components/lib/button-select.js';
import { Ordbase_EditClient }    from '../components/views/edit-client.js';

import { loadSelectClient } from './loadSelectClient.js';

const ESC = 13;
const TAB = 9;

export function loadNewClient(client) {

    // 0. Set up header
    //
    // @note 1. Maybe it is faster to call 1 function an pass an object. But then there is overhead of constructing
    //           and accessing the object.
    // 2. The setter functions hides that it is an actual function call. I am not sure I lke that.
    // 3. If getters and setters are spelled wrong in javascript they don't throw an error. Functions on the other hand do. 
    ///    This is because objects in javascript are extensible by default, using duct-typing, and creating new attributes 
    //     on the fly is the default behaviour, when someone tries to set and attribute which is not currently there.
    //      For this reason duct typing may introduces difficult to track down errors.
    // 4. Even accessing a getter which does not exist, does not throw an error.
    //
    App.HEADER.textBig   = 'Ordbase';    
    App.HEADER.textSmall = 'New client';
    App.HEADER.buttonIconLeft   = App.ICON_BARS;
    App.HEADER.buttonIconRight1 = App.ICON_NONE;    
    App.HEADER.buttonIconRight2 = App.ICON_TIMES;

    App.HEADER.buttonLeft.onclick   = App.defaultHandler;
    App.HEADER.buttonRight1.onclick = App.defaultHandler;
    App.HEADER.buttonRight2.onclick = event => loadSelectClient();

    const view = new Ordbase_EditClient; 
    
    // 1. Set up container generator
    const generator = new Ordbase_ItemGenerator;

    generator.input.addEventListener('keyup', (e) => {
        if (e.keyCode === ESC || e.keyCode === TAB) {  // ESC or TAB

            let button = new Ordbase_ButtonSelect;
            button.text = e.target.value;
            button.selected = true;

            generator.appendItem(button);
            e.target.value = '';
        }   
    });
    view.appendItemMenu(generator);

    // 2. Set up submit button 
    const button = new Ordbase_ButtonSubmit;
    button.text = 'Create client';
    view.appendButtonSubmit(button);

    // 3. Set up form submit event
    view.form.addEventListener('submit', e => {
        e.preventDefault();
        console.log(e);
    });


    // 4. Append view to DOM
    App.switchView(view);

    // 5. Promise fill in available languages
    Api.language.getAll()
        .then(languages => {

            languages.forEach(lang => {
                let button = new Ordbase_ButtonSelect;

                button.id       = lang.key;
                button.text     = `${lang.name} - ${lang.key}`;
                button.selected = false;

                view.appendButtonLanguage(button);
            });
        })
        .catch(error => console.log(error));
}