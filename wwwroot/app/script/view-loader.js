'use strict';

//
// @module viewLoader
//
let viewLoader = (function (){

    function swapView(view) {
        document.body.innerHTML = '';
        document.body.appendChild(view);
    }   

    let viewLoader = {};

    viewLoader.clientSelector = function() {
        let view = document.createElement('client-selector-view');
        
        api.getAll()
            .then(data => {
                console.log(data.responseText);
                swapView(view);
            })
            .catch(reason => {
                console.log("Error:", reason);
            });
    }

    viewLoader.translationEditor = function(client) {
        let view = document.createElement('translation-editor-view');

        swapView(view);
    }

    viewLoader.translationSelector = function(client, accessKey) {
        let view = document.createElement('translation-selector-view');
        
        swapView(view);
    }
    return viewLoader;
})();