'use strict';

import { getJSON, postJSON } from './Ajax.js';
import { routeBuilder } from './Util.js';


//
// @doc Destructuring arguments with default values ecma 6 - http://2ality.com/2015/01/es6-destructuring.html
// @doc Async Promises MDN - https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
// @doc Arro functions MDN - https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions
//

// @WARNING! @TODO
// @NOTE RESOLVE NAMING CONFLICTS BELOW§!!! client module scope variables, and client parameters...!!!!
// @WARNING!

//
// @modules - to be exported
//
export let client = {};
export let language = {};
export let container = {}; 
export let translation = {};     

//
// CLIENT ROUTES
//
client.getAll = () => { 
    return getJSON({ 
        httpMethod: 'GET', 
        route: routeBuilder('api','client') 
    });
}

client.get = (_client) => {
    return getJSON({ 
        httpMethod: 'GET', 
        route: routeBuilder('api', _client) 
    });
}

client.create = (_client) => {
    return postJSON({ 
        httpMethod:  'POST', 
        route: routeBuilder('api', 'client', 'create'), 
        data:  _client 
    });
} 

client.createDefaultContainers = (_client, _containers) => {};
client.createDefaultLanguages  = (_client, _languages) => {};

//
// CONTAINER ROUTES
//
container.getOnClient = (_client) => {
    return getJSON({ 
        httpMethod: 'GET', 
        route: routeBuilder('api', _client, 'container') 
    });
}

container.getOnKey = (_client, _accessKey) => {
    return getJSON({ 
        httpMethod: 'GET', 
        route: routeBuilder('api', _client, 'container', _accessKey) 
    });
}

//
// LANGUAGE ROUTES
//
language.getAll = () => {
    return getJSON({ 
        httpMethod: 'GET', 
        route: routeBuilder('api', 'language') 
    });
}

language.getOnClient = (_client) => {
    return getJSON({ 
        httpMethod: 'GET', 
        route: routeBuilder('api', _client, 'language') 
    });
}

language.create = (_language) => {
    return postJSON({ 
        httpMethod: 'POST', 
        route: routeBuilder('api', 'language', 'create'), 
        data:  _language 
    });
}

//
// TRANSLATION ROUTES
//
translation.get = (_client, _container, _accessKey, _language) => { 
    return getJSON({ 
        httpMethod: 'GET', 
        route: routeBuilder('api', _client, 'translation', _container, _accessKey, _language) 
    }); 
}

translation.getOnClient = (_client) => {  
    return getJSON({
        httpMethod:  'GET',
        route: routeBuilder('api', _client, 'translation') 
    }); 
}

translation.getGroupOnClient = (_client) => {
    return getJSON({
        httpMethod: 'GET',
        route: routeBuilder('api', _client, 'translation', 'group')
    })
}

translation.getOnContainer = (_client, _container) => { 
    return getJSON({
        httpMethod: 'GET',
        route: routeBuilder('api', _client, 'translation', 'container', _container) 
    }); 
}

translation.getOnKey = (_client, _accessKey) => {   // @note - convert accesskey -> key
    return getJSON({
        httpMethod:  'GET',
        route: routeBuilder('api', _client, 'translation', 'accesskey', _accessKey) 
    }); 
}   

translation.create = (_translation) => {
    return postJSON({
        httpMethod:  'POST',
        route: routeBuilder('api', 'translation', 'create'),
        data:  _translation 
    }); 
}

translation.update = (_translation) => {  
    return postJSON({
        httpMethod:  'PUT',
        route: routeBuilder('api', 'translation', 'update', _translation.client, _translation.container, _translation.accessKey, _translation.language),
        data:  _translation 
    });
}

translation.delete = (_client, _container, _accessKey, _language) => {
    return getJSON({
        httpMethod:  'DELETE',
        route: routeBuilder('api', 'translation', 'delete', _client, _container, _accessKey, _language) 
    });
}