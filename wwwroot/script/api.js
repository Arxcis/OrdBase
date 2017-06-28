'use strict';

let api = (function(){

    //
    // @doc https://www.w3schools.com/xml/ajax_xmlhttprequest_response.asp
    // @doc Destructuring arguments with default values ecma 6 - http://2ality.com/2015/01/es6-destructuring.html
    //
    function mandatory() {
        throw new Error('Missing parameter');
    }

    //
    // @function URIRequest() 
    //
    function URIRequest({ 
        type = 'GET',
        route   = mandatory(), 
        success = mandatory(),
    } = {}) {
        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                console.log('STATUS: ' + this.status);
                console.log('STATE:  ' + this.readyState);
                if ( this.status == 200) {
                    success(this);
                }  
            }
        } 
        xhttp.open(type, route, true);  // asynce false on the main thread is depricated
        xhttp.send();
    }

    //
    // @function JSONRequest 
    //
    function JSONRequest({
        type = 'POST',
        route = mandatory(),
        success = mandatory(),
        data = mandatory(),
    } = {}) {
        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) { 
                console.log('STATUS: ' + this.status);
                console.log('STATE:  ' + this.readyState);
                if (this.status == 200) {
                    success(this);
                }
            }
        }

        xhttp.open(type, route, true);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send(JSON.stringify(data));
    }

    //
    // @function routeBuilder(...args)
    //
    function routeBuilder() {
        let route = '';
        for(let i = 0; i < arguments.length; i++) {
        	route += '/' + arguments[i];
        }
        return route;
    }

    //
    // @module api - to be exported
    //
    let api = { client: {}, language: {}, container: {}, translation: {}};     // @adivce ES6 - adobt using let and const, stop using var

    //
    // CLIENT ROUTES
    //
    api.client.getAll = function() {
        URIRequest({
            type: 'GET',
            route: 'api/client',
            success: function(data) {
                console.log(data.responseText);
            },
        });
    }

    api.client.get = function(client) {
        URIRequest({
            type: 'GET',
            route: 'api/' + client,
            success: function(data) {
                console.log(data.responseText);
            }
        });
    }

    api.client.create = function(client) {
        JSONRequest({
            type: 'POST',
            route: 'api/client/create',
            data: client,
            success(data) {
                console.log('Resource created...');
            },
        });
    } 

    //
    // CONTAINER ROUTES
    //
    api.container.getOnClient = function(client) {
        URIRequest({
            type: 'GET',
            route: 'api/' + client + '/container',
            success(data){
                console.log(data.responseText);
            }
        });
    }

    api.container.getOnKey =function(client, key) {
        URIRequest({
            type: 'GET',
            route: 'api/' + client + '/container/' + key,
            success(data){
                console.log(data.responseText);
            }
        });
    }
    
    //
    // LANGUAGE ROUTES
    //
    api.language.getAll = function() {
        URIRequest({
            type: 'GET',
            route: 'api/language',
            success(data){
                console.log(data.responseText);
            }
        });
    }

    api.language.getOnClient = function (client) {
        URIRequest({
            type: 'GET',
            route: 'api/' + client + '/language',
            success(data){
                console.log(data.responseText);
            }
        });
    }

    api.language.create = function(language) {
        JSONRequest({
            type: 'POST',
            route: 'api/language/create',
            data: language,
            success(data){
                console.log('Created a route..');
            },
            
        });
        console.log('Creating a new language...');
    }

    //
    // TRANSLATION ROUTES
    //
    api.translation.get = function(client, container, accessKey, language) { 
        URIRequest({
            type: 'GET',
            route: routeBuilder('api', client, 'translation', container, accessKey, language),
            success(data) {
                console.log(data.responseText);
            }
        }); 
    }

    api.translation.getOnClient = function(client) {  
        URIRequest({
            type: 'GET',
            route: routeBuilder('api', client, 'translation'),
            success(data) {
                console.log(data.responseText);
            }
        }); 
    }
    api.translation.getOnContainer = function(client, container) { 
        URIRequest({
            type: 'GET',
            route: routeBuilder('api', client, 'translation', 'container', container),
            success(data) {
                console.log(data.responseText);
            }
        }); 
    }

    api.translation.getOnKey = function(client, accessKey) {
        URIRequest({
            type: 'GET',
            route: routeBuilder('api', client, 'translation', 'accesskey', accessKey),
            success(data) {
                console.log(data.responseText);
            }
        }); 
    }


    api.translation.create = function(translation) {
        JSONRequest({
            type: 'POST',
            route: routeBuilder('api', 'translation', 'create'),
            data:translation,
            success(data){
                console.log('Translation created...');
            },
        });  
          
    }

    api.translation.update = function(translation) {  
        JSONRequest({
            type: 'PUT',
            route: routeBuilder('api', 'translation', 'update', translation.client, translation.container, translation.accessKey, translation.language),
            success(data){
                console.log('translation updated');
            },
            data: translation,
        });

    }

    api.translation.delete = function(key) {
        URIRequest({
            type: 'DELETE',
            route:routeBuilder('api', 'translation', 'delete', client, container, accessKey, language),  
            success(data){ 
                console.log('Translation deleted...');
            }, 
        });
    }

    return api;
})();

//
// Test 
//
(function() {
    api.client.get('fmsf'); 
    api.translation.get('fmsf', 'main', 'heading', 'en') 

    api.client.getAll();
    api.client.create({
        Name: 'soldata.no',
        ApiKey: 42,
    });
});





