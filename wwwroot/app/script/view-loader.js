'use strict';

//
// @module viewLoader
//
let viewLoader = (() => {

    function swapView(view) {
        document.body.innerHTML = '';
        document.body.appendChild(view);
    }   

    let viewLoader = {};

    //
    // @view client-selector
    //
    viewLoader.clientSelector = () => {
        let view = document.createElement('client-selector-view');
        swapView(view);

        api.client
        .getAll()
        .then(data => {
    
            let main = view.querySelector('main');

            data.forEach((element) => {
                let button = document.createElement('button');
                
                button.innerHTML = element.name;
                button.onclick = (e) => viewLoader.translationSelector(element.name);

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
    viewLoader.translationSelector = (client) => {
        let view = document.createElement('translation-selector-view');
        swapView(view);

        view.querySelector('#backToClients')
            .onclick = (e) => viewLoader.clientSelector();
    }

    //
    // @view translation-editor
    //
    viewLoader.translationEditor = (client, accessKey) => {
        let view = document.createElement('translation-editor-view');

        swapView(view);
    }

    return viewLoader;
})();