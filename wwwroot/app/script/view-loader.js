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
        
        swapView(view);
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