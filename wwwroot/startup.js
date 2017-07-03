//
// @file main.js
//
'use strict';

import 'app/event/OnLoad_ViewTranslationSelector';
import 'app/event/OnLoad_ViewTranslationEditor';
import 'app/event/OnLoad_ViewClientSelector';
import 'app/event/OnSubmit_FormClient';
import 'app/event/OnSubmit_FormTranslation';

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