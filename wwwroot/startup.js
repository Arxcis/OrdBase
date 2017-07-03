import './app/event/OnLoad_ViewTranslationSelector.js';
import './app/event/OnLoad_ViewTranslationEditor.js';
import './app/event/OnLoad_ViewClientSelector.js';
import './app/event/OnSubmit_FormClient.js';
import './app/event/OnSubmit_FormTranslation.js';

//
// @file main.js
// @doc 2017 es16 modules native in browsers https://jakearchibald.com/2017/es-modules-in-browsers/

'use strict';

{
    window.addEventListener('load', () => OnLoad_ViewClientSelector());
    
    window.addEventListener('load', () => {

        // 1. Register service worker
        navigator.serviceWorker.register(
            '/service-worker.js', {
                scope: '/api/'
            }
        ).then((registration) => {
            console.log('SW registered SCOPE is: ', registration.scope);
        }), (reason) => {
            console.log('NO Service worker registered..', reason);
        }
    });
};