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
                button.onclick = (event) => viewLoader.translationSelectorView(element.name);

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
        .then(data => {

            data.forEach(containerName => {
                 let button = document.createElement('button');
                 button.innerHTML = containerName;
                 button.id = 'button-' + containerName;
                 button.onclick = (event) => { button.classList.toggle('selected'); }

                 containerList.appendChild(button);
            });
                
        })
        .catch(reason => {
            console.error("Error:", reason);
        });

        // @doc template literals - https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals
        api.translation
        .getGroupOnClient(client)
        .then(data => {
            data.forEach(translationGroup => {
                let button = document.createElement('button');
                button.innerHTML = translationGroup.key;
                
                Object.keys(translationGroup.isComplete)
                .forEach((key, value) => {
                    console.log(key, value);
                    if (value == true) 
                        button.innerHTML += ` <span>${key}: OK</span>`;
                    else
                        button.innerHTML += ` <span>${key}: NO</span>`;
                });

                main.appendChild(button);
            });
        })
        .catch(reason => {
            console.error("Error:", reason);
        });

        view.querySelector('#backToClients')
            .onclick = (event) => viewLoader.clientSelectorView();

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