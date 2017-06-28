'use strict';

//
// @module controller
//
let controller = (function (){

    function switchView(viewElementTag) {
        document.body.innerHTML = '';
        let view = document.createElement(viewElementTag);
        document.body.appendChild(view);
        return view;
    }   

    let controller = {};

    controller.clientSelector = function() {
        let clientSelector = switchView('client-selector');
    }

    controller.translationEditor = function(client) {
        let translationEditor = switchView('translation-editor');
    }

    controller.translationSelector = function(client, accessKey) {
        let translationSelector = switchView('translation-selector');
    }
    return controller;
});