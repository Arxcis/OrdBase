'use strict';

//
// @module viewLoader
//
(() => {

    function swapView(view) {
        document.body.innerHTML = '';
        document.body.appendChild(view);
    }   

    let viewLoader = {};

    //
    // @view client-selector
    //
    viewLoader.clientSelectorView = () => {
        let view = document.createElement('client-selector-view');
        swapView(view);
        let main = view.querySelector('main');

        api.client
        .getAll()
        .then(data => {

            data.forEach(element => {
                let button = document.createElement('button');
                
                button.innerHTML = element.name;
                button.onclick = (e) => viewLoader.translationSelectorView(element.name);

                main.appendChild(button);
            });
        })
        .catch(reason => {
            console.error("Error:", reason);
        });
    }

    //
    // @view translation-selector
    //
    viewLoader.translationSelectorView = (client) => {
        let view = document.createElement('translation-selector-view');
        swapView(view);

        let containerList = document.querySelector('#container-list'); 
        let main         = document.querySelector('main');

        api.container
        .getOnClient(client)
        .then(data => {})
        .catch(reason => {});

        api.translation
        .getOnClient(client)
        .then(data => {})
        .catch(reason => {});


        view.querySelector('#backToClients')
            .onclick = (e) => viewLoader.clientSelectorView();

    }

    //
    // @view translation-editor
    //
    viewLoader.translationEditor = (client, accessKey) => {
        let view = document.createElement('translation-editor-view');
        swapView(view);
    }

    window.addEventListener('load', () => viewLoader.clientSelectorView());
})();