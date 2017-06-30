'use strict';

//
// @module load
//   - LoadClientSelectorView
//   - LoadTranslationSelectorView
//   - LoadTranslationEditorView
//
(() => {

    function swapView(view) {
        document.body.innerHTML = '';
        document.body.appendChild(view);
    }   

    //
    //
    // @function LoadClientSelectorView
    //
    //
    function LoadClientSelectorView () {
        let view = document.createElement('client-selector-view');
        swapView(view);

        API
        .client.getAll()
        .then(data => {

            data.forEach(client => {
                let card = document.createElement('ordbase-card-client');
                view.querySelector('main').appendChild(card);

                card.querySelector('h2').innerHTML = client.name;
                card.querySelector('button').onclick = (event) => LoadTranslationSelectorView(client.name);
            });
        })
        .catch(reason => console.error('Error:', reason));

        // Hook up all buttons
        view.querySelector('#btn-toggle-inactive-menu').onclick = (event) => LoadClientSelectorView();
        view.querySelector('#btn-back-to-home-page').onclick    = (event) => LoadClientSelectorView();
        view.querySelector('#btn-create-new-client').onclick    = (event) => LoadClientSelectorView();
    }

    //
    //
    // @function LoadTranslationSelectorView
    //
    //
    function LoadTranslationSelectorView (client) {

        const iconCheck = '<i class="fa fa-check" aria-hidden="true"></i>';
        const iconCross = '<i class="fa fa-times" aria-hidden="true"></i>';

        let view = document.createElement('translation-selector-view');
        swapView(view);

        //
        // Get all container names
        //
        API
        .container.getOnClient(client)
        .then(data => {

            data.forEach(containerName => {
                let button = document.createElement('button');
                view.querySelector('#list-show-containers-on-client').appendChild(button);

                button.innerHTML = containerName;
                button.id = 'button-' + containerName;
                button.onclick = (event) => button.classList.toggle('selected');
            });      
        })
        .catch(reason => console.error('Error:', reason));

        //
        // Get all translation groups 
        //  @doc template literals - https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals
        //
        API
        .translation.getGroupOnClient(client)
        .then(data => {
            data.forEach(translationGroup => {

                let card = document.createElement('ordbase-card-translation');
                view.querySelector('#list-show-translations-on-client').appendChild(card);
                
                card.querySelector('#btn-load-translation-editor').onclick = (event) => LoadTranslationEditorView(client, translationGroup.key); 
                card.querySelector('#span-show-translation-key').innerHTML = translationGroup.key;
                let divLanguagesComplete = card.querySelector('#div-show-if-languages-are-complete');
                                
                Object.keys(translationGroup.isComplete)
                .forEach((key, value) => {

                    if (value == true) 
                        divLanguagesComplete.innerHTML += `<div class="languages-complete-text-icon"><span>${key}</span>` + iconCheck + '</div class="languages-complete-text-icon">';
                    else
                        divLanguagesComplete.innerHTML += `<div class="languages-complete-text-icon"><span>${key}</span>` + iconCross + '</div class="languages-complete-text-icon">';
                });
            });
        })
        .catch(reason => console.error('Error:', reason));

        // Hook up all buttons
        view.querySelector('#btn-toggle-container-list').onclick    = (event) => LoadClientSelectorView();
        view.querySelector('#btn-back-to-home-page').onclick       = (event) => LoadClientSelectorView();
        view.querySelector('#btn-back-to-client-selector').onclick = (event) => LoadClientSelectorView();
        view.querySelector('#btn-create-new-translation').onclick  = (event) => LoadClientSelectorView();
    }


    //
    //
    // @function LoadTranslationEditorView
    //
    //
    function LoadTranslationEditorView (client, key) {
        
        let view = document.createElement('translation-editor-view');
        swapView(view);
        let containerList = view.querySelector('#list-show-containers-on-translation'); 

        //
        // Get all container on client
        //
        API
        .container.getOnClient(client)
        .then(data => {

            data.forEach(containerName => {
                let button = document.createElement('button');
                button.innerHTML = containerName;
                button.id = 'button-' + containerName;
                button.onclick = (event) => button.classList.toggle('selected'); 

                containerList.appendChild(button);
            });      

            return API.container.getOnKey(client, key)
        })
        .then(data => {
            data.forEach(selectedContainer => {
                let button =  document.querySelector('#button-' + selectedContainer);
                if (button) {
                   button.classList.add('selected');
                }
            });
        })
        .catch(reason => console.error('Error:', reason));

        //
        // Get data about translations with the same key
        //
        API
        .translation.getOnKey(client, key)
        .then(data => {
            let main = view.querySelector('ordbase-form-translation'); 
            console.log('key:', key)
            main.querySelector('#input-key').setAttribute('value', key);
            
            data.forEach(translation => {
                console.log(translation);

                main.innerHTML += `<label for="input-${translation.languageKey}">  ${translation.languageKey} </label><br>`;
                main.innerHTML += `<input  id="input-${translation.languageKey}"  type="text" value="${translation.text}"><br>`;
                
                main.innerHTML += `<label for="input-${translation.languageKey}-approved"> Approved? </label><br>`;
                main.innerHTML += `<input  id="input-${translation.languageKey}-approved" type="checkbox" name="done"><br><br>` 
            })
        })
        .catch(reason => console.error('Error:', reason));
     
        // Hook up buttons
        view.querySelector('#btn-toggle-container-list').onclick        = (event) => LoadTranslationEditorView(client);
        view.querySelector('#btn-back-to-home-page').onclick            = (event) => LoadClientSelectorView(client);
        view.querySelector('#btn-back-to-translation-selector').onclick = (event) => LoadTranslationSelectorView(client);    
        view.querySelector('#btn-save-edited-translation').onclick      = (event) => LoadTranslationEditorView(client);
    }

    window.addEventListener('load', () => LoadClientSelectorView());
})();