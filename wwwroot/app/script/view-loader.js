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

        api.client
        .getAll()
        .then(data => {
            swapView(view);
            
            let main = view.querySelector('main');

            data.forEach((element) => {
                main.appendChild(document.createElement('button'))
                    .innerHTML = element.name;
            });
        })
        .catch(reason => {
            console.log("Error:", reason);
        });
    }

    //
    // @view translation-selector
    //
    viewLoader.translationSelector = (client, accessKey) => {
        let view = document.createElement('translation-selector-view');

        

        swapView(view);
    }

    //
    // @view translation-editor
    //
    viewLoader.translationEditor = (client) => {
        let view = document.createElement('translation-editor-view');

        swapView(view);
    }

    return viewLoader;
})();