'use strict';

import * as Fetch from './fetch.js';

//
// @doc Destructuring arguments with default values ecma 6 - http://2ality.com/2015/01/es6-destructuring.html
// @doc Async Promises MDN - https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
// @doc Arro functions MDN - https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions
//

//
// @function routeBuilder(...args)
// @doc https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
//
export function routeBuilder() {
    let route = '';
    for (let i = 0; i < arguments.length; i++) {
        route += '/' + arguments[i];
    }
    return route;
}

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
export function client_getAll () {
    return Fetch.GET({  
        route: routeBuilder('api','client', 'all') 
    });
}

export function client_get (_clientKey) {
    return Fetch.GET({  
        route: routeBuilder('api', _clientKey) 
    });
}

export function client_create (_client) {
    return Fetch.POST({ 
        route: routeBuilder('api', 'client', 'create'), 
        data:  _client 
    });
} 

export function client_update (_client) {  
    return Fetch.PUT({
        route: routeBuilder('api', 'client', 'update', _client.key),
        data:  _client, 
    });
}

export function client_delete (_clientKey) {
    return Fetch.DELETE({
        route: routeBuilder('api', 'client', 'delete', _clientKey)
    });
}

export function client_getDefaultContainers (_client) {
    return Fetch.GET({ 
        route: routeBuilder('api', _client, 'default', 'containers'), 
    });
};

export function client_getDefaultLanguages  (_client) {
    return Fetch.GET({ 
        route: routeBuilder('api', _client, 'default', 'languages'), 
    });
};

export function client_createDefaultContainers (_client, _containers) {
    return Fetch.POST({ 
        route: routeBuilder('api', _client, 'default', 'containers', 'create'), 
        data:  _containers 
    });
};

export function client_createDefaultLanguages  (_client, _languages) {
    return Fetch.POST({ 
        route: routeBuilder('api', _client, 'default', 'languages', 'create'), 
        data:  _languages 
    });
};

export function client_updateDefaultContainers (_client, _containers) {
    return Fetch.POST({ 
        route: routeBuilder('api', _client, 'default', 'containers', 'update'), 
        data:  _containers
    });
};

export function client_updateDefaultLanguages  (_client, _languages) {
    return Fetch.POST({ 
        route: routeBuilder('api', _client, 'default', 'languages', 'update'), 
        data:  _languages 
    });
};


//
// CONTAINER ROUTES
//
export function container_getGlobal (_client) {
    return Fetch.GET({  
        route: routeBuilder('api', 'container') 
    });
}

export function container_getGroup (_client, _translationKey) {
    return Fetch.GET({  
        route: routeBuilder('api', _client, 'container', _translationKey) 
    });
}

//
// LANGUAGE ROUTES
//
export function language_getGlobal () {
    return Fetch.GET({  
        route: routeBuilder('api', 'language') 
    });
}

export function language_create (_language) {
    return Fetch.POST({ 
        route: routeBuilder('api', 'language', 'create'), 
        data:  _language 
    });
}

//
// TRANSLATION ROUTES
//
export function translation_get (_client, _container, _translationKey, _language) { 
    return Fetch.GET({  
        route: routeBuilder('api', _client, 'translation', _container, _translationKey, _language) 
    }); 
}

export function translation_getOnClient (_client) {  
    return Fetch.GET({
        route: routeBuilder('api', _client, 'translation') 
    }); 
}

export function translation_getGroupAll (_client) {
    return Fetch.GET({
        route: routeBuilder('api', _client, 'translation', 'group')
    })
}

export function translation_getOnContainer (_client, _container) { 
    return Fetch.GET({
        route: routeBuilder('api', _client, 'translation', 'container', _container) 
    }); 
}

export function translation_getGroup (_client, _translationKey) {   // @note - convert translationKey -> key
    return Fetch.GET({
        route: routeBuilder('api', _client, 'translation', 'translationKey', _translationKey) 
    }); 
}   

export function translation_create (_translation) {
    return Fetch.POST({
        route: routeBuilder('api', 'translation', 'create'),
        data:  _translation 
    }); 
}

export function translation_update (_translation) {  
    return Fetch.PUT({
        route: routeBuilder('api', 'translation', 'update', _translation.client, _translation.container, _translation.translationKey, _translation.language),
        data:  _translation 
    });
}

export function translation_delete(_client, _container, _translationKey, _language) {
    return Fetch.DELETE({
        route: routeBuilder('api', 'translation', 'delete', _client, _container, _translationKey, _language) 
    });
}