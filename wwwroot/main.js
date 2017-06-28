//
// @file main.js
//
(function (){
    window.addEventListener('load', function(){

        navigator.serviceWorker.register(
            '/service-worker.js', {
                scope: '/api/'
            }
        ).then(function(registration){
            console.log('SW registered SCOPE is: ', registration.scope);
        }), function(err){
            console.log('NO Service worker registered... error!');
        }
    });
})();