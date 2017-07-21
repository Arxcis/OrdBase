'use strict';

import * as App from './App.js';
import * as Api from '../jslib/Api.js';

import { Ordbase_ItemGenerator } from '../components/lib/item-generator';
import { Ordbase_ButtonSubmit }  from '../components/lib/button-submit';
import { Ordbase_ButtonSelect }  from '../components/lib/button-select';
import { Ordbase_EditClient }    from '../components/views/edit-client';

import { loadSelectClient } from './loadSelectClient.js';

const ESC = 13;

export function loadNewClient(client) {

    App.HEADER.textBig   = 'Ordbase';    
    App.HEADER.textSmall = 'New client';
    App.HEADER.buttonIconLeft   = App.ICON_BARS;
    App.HEADER.buttonIconRight1 = App.ICON_NONE;    
    App.HEADER.buttonIconRight2 = App.ICON_TIMES;

    App.HEADER.buttonLeft.onclick   = App.defaultHandler;
    App.HEADER.buttonRight1.onclick = App.defaultHandler;
    App.HEADER.buttonRight2.onclick = event => loadSelectClient();

    const view               = new Ordbase_EditClient;    

    let generator = new Ordbase_ItemGenerator;

    generator.input.addEventListener('keyup', (e) => {
        if (e.keyCode === ESC) { // ESC

            let button = new Ordbase_ButtonSelect;
            button.text = e.target.value;
            button.selected = true;

            generator.appendMenuItem(button);
            e.target.value = '';
        }   
    });

    let button = new Ordbase_ButtonSubmit;
    button.text = 'Create client';
    
    view.appendButtonSubmit(button);
    view.appendMenuItem(generator);


    App.MAIN.removeChild(App.MAIN.firstChild);
    App.MAIN.appendChild(view);

    Api.language.getAll()
        .then(languages => {

            languages.forEach(lang => {
                let button = new Ordbase_ButtonSelect;

                button.id       = lang.key;
                button.text     = `${lang.name} - ${lang.key}`;
                button.selected = false;

                view.appendLanguageButton(button);
            });
        })
        .catch(error => console.log(error));

}