'use strict';

let api = (function(){

    //
    // @doc vanilla Ajax XMLHttpRequest -  https://www.w3schools.com/xml/ajax_xmlhttprequest_response.asp
    // @doc Destructuring arguments with default values ecma 6 - http://2ality.com/2015/01/es6-destructuring.html
    // @doc Async Promises MDN -  https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
    //
    function mandatory() {
        throw new Error('Missing parameter');
    }

    //
    // @function routeBuilder(...args)
    //
    function routeBuilder() {
        let route = '';
        for (let i = 0; i < arguments.length; i++) {
        	route += '/' + arguments[i];
        }
        return route;
    }

    //
    // @function URIRequest()
    //
    function URIRequest({ type = mandatory(), route = mandatory()} = {}) {
        return new Promise((resolve, reject) => {
            const httpRequest = new XMLHttpRequest();

            httpRequest.open(type, route);  // asynce is default
            httpRequest.onload  = () => resolve(httpRequest.responseText);
            httpRequest.onerror = () => reject(httpRequest.statusText);
            httpRequest.send();
        });
    }

    //
    // @function JSONRequest 
    //
    function JSONRequest({type = mandatory(), route = mandatory(), data = mandatory()} = {}) {
        return new Promise((resolve, reject) => {
            const httpRequest = new XMLHttpRequest();

            httpRequest.open(type, route, true);
            httpRequest.setRequestHeader('Content-type', 'application/json');
            httpRequest.onload = () => resolve(httpRequest.responseText);
            httpRequest.onerror = () => reject(httpRequest.statusText);
            httpRequest.send(JSON.stringify(data));
        });
    }

    //
    // @module api - to be exported
    //
    let api = { client: {}, language: {}, container: {}, translation: {}};     // @adivce ES6 - adobt using let and const, stop using var

    //
    // CLIENT ROUTES
    //
    api.client.getAll = function(successHandler) { 
        return URIRequest({ 
            type: 'GET', 
            route: routeBuilder('api','client') });
    }

    api.client.get = function(client) {
        return URIRequest({ 
            type: 'GET', 
            route: routeBuilder('api', client) });
    }

    api.client.create = function(client) {
        return JSONRequest({ 
            type:  'POST', 
            route: routeBuilder('api', 'client', 'create'), 
            data:  client });
    } 

    //
    // CONTAINER ROUTES
    //
    api.container.getOnClient = function(client) {
        return URIRequest({ 
            type: 'GET', 
            route: routeBuilder('api', client, 'container') });
    }

    api.container.getOnKey =function(client, accessKey) {
        return URIRequest({ 
            type: 'GET', 
            route: routeBuilder('api', client, 'container', accessKey) });
    }
    
    //
    // LANGUAGE ROUTES
    //
    api.language.getAll = function() {
        return URIRequest({ 
            type: 'GET', 
            route: routeBuilder('api', 'language') });
    }

    api.language.getOnClient = function (client) {
        return URIRequest({ 
            type: 'GET', 
            route: routeBuilder('api', client, 'language') });
    }

    api.language.create = function(language) {
        return JSONRequest({ 
            type: 'POST', 
            route: routeBuilder('api', 'language', 'create'), 
            data:  language });
    }

    //
    // TRANSLATION ROUTES
    //
    api.translation.get = function(client, container, accessKey, language) { 
        return URIRequest({ 
            type: 'GET', 
            route: routeBuilder('api', client, 'translation', container, accessKey, language) }); 
    }

    api.translation.getOnClient = function(client) {  
        return URIRequest({
            type:  'GET',
            route: routeBuilder('api', client, 'translation') }); 
    }

    api.translation.getOnContainer = function(client, container) { 
        return URIRequest({
            type: 'GET',
            route: routeBuilder('api', client, 'translation', 'container', container) }); 
    }

    api.translation.getOnKey = function(client, accessKey) {
        return URIRequest({
            type:  'GET',
            route: routeBuilder('api', client, 'translation', 'accesskey', accessKey) }); 
    }

    api.translation.create = function(translation) {
        return JSONRequest({
            type:  'POST',
            route: routeBuilder('api', 'translation', 'create'),
            data:  translation }); 
    }

    api.translation.update = function(translation) {  
        return JSONRequest({
            type:  'PUT',
            route: routeBuilder('api', 'translation', 'update', translation.client, translation.container, translation.accessKey, translation.language),
            data:  translation });
    }

    api.translation.delete = function(key) {
        return URIRequest({
            type:  'DELETE',
            route: routeBuilder('api', 'translation', 'delete', client, container, accessKey, language) });
    }

    return api;
})();