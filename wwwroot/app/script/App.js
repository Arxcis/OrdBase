'use strict';

//
// @module load
//   - LoadClientSelectorView
//   - LoadTranslationSelectorView
//   - LoadTranslationEditorView
//
let App = (() => {

    function swapView(view) {
        document.body.innerHTML = '';
        document.body.appendChild(view);
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