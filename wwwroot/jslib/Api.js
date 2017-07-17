'use strict';

import { getJSON, postJSON } from './Ajax.js';
import { routeBuilder } from './Util.js';


//
// @doc vanilla Ajax XMLHttpRequest -  https://www.w3schools.com/xml/ajax_xmlhttprequest_response.asp
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
let client = {};
let language = {};
let container = {}; 
let translation = {};     

//
// CLIENT ROUTES
//
client.getAll = () => { 
    return getJSON({ 
        httpMethod: 'GET', 
        route: routeBuilder('api','client') 
    });
}

client.get = (client) => {
    return getJSON({ 
        httpMethod: 'GET', 
        route: routeBuilder('api', client) 
    });
}

client.create = (client) => {
    return postJSON({ 
        httpMethod:  'POST', 
        route: routeBuilder('api', 'client', 'create'), 
        data:  client 
    });
} 

//
// CONTAINER ROUTES
//
container.getOnClient = (client) => {
    return getJSON({ 
        httpMethod: 'GET', 
        route: routeBuilder('api', client, 'container') 
    });
}

container.getOnKey = (client, accessKey) => {
    return getJSON({ 
        httpMethod: 'GET', 
        route: routeBuilder('api', client, 'container', accessKey) 
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

language.getOnClient = (client) => {
    return getJSON({ 
        httpMethod: 'GET', 
        route: routeBuilder('api', client, 'language') 
    });
}

language.create = (language) => {
    return postJSON({ 
        httpMethod: 'POST', 
        route: routeBuilder('api', 'language', 'create'), 
        data:  language 
    });
}

//
// TRANSLATION ROUTES
//
translation.get = (client, container, accessKey, language) => { 
    return getJSON({ 
        httpMethod: 'GET', 
        route: routeBuilder('api', client, 'translation', container, accessKey, language) 
    }); 
}

translation.getOnClient = (client) => {  
    return getJSON({
        httpMethod:  'GET',
        route: routeBuilder('api', client, 'translation') 
    }); 
}

translation.getGroupOnClient = (client) => {
    return getJSON({
        httpMethod: 'GET',
        route: routeBuilder('api', client, 'translation', 'group')
    })
}

translation.getOnContainer = (client, container) => { 
    return getJSON({
        httpMethod: 'GET',
        route: routeBuilder('api', client, 'translation', 'container', container) 
    }); 
}

translation.getOnKey = (client, key) => {   // @note - convert accesskey -> key
    return getJSON({
        httpMethod:  'GET',
        route: routeBuilder('api', client, 'translation', 'accesskey', key) 
    }); 
}   

translation.create = (translation) => {
    return postJSON({
        httpMethod:  'POST',
        route: routeBuilder('api', 'translation', 'create'),
        data:  translation 
    }); 
}

translation.update = (translation) => {  
    return postJSON({
        httpMethod:  'PUT',
        route: routeBuilder('api', 'translation', 'update', translation.client, translation.container, translation.accessKey, translation.language),
        data:  translation 
    });
}

translation.delete = (key) => {
    return getJSON({
        httpMethod:  'DELETE',
        route: routeBuilder('api', 'translation', 'delete', client, container, accessKey, language) 
    });
}


export { translation, client, container, language };