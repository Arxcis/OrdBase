//
// @file main.js
//
'use strict'
{
    window.addEventListener('load', function(){

        // 1. Register service worker
        navigator.serviceWorker.register(
            '/service-worker.js', {
                scope: '/api/'
            }
        ).then(function(registration){
            console.log('SW registered SCOPE is: ', registration.scope);
        }), function(err){
            console.log('NO Service worker registered... error!');
        }

        // 2. Load client view
        viewLoader.clientSelector();
    });
};