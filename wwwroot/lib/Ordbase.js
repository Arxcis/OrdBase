'use strict';

import { force }  from './Util.js';
import * as Fetch from './Fetch.js';

//
// @doc Destructuring arguments with default values ecma 6 - http://2ality.com/2015/01/es6-destructuring.html
// @doc Async Promises MDN - https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
// @doc Arro functions MDN - https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions
//

//
// CLIENT ROUTES
//

//
// GET api/client
//
export function client_get({ clientKey = '' } = {}) {

    return Fetch.GET({  
        route: `api/client/?clientKey=${clientKey}`, 
    });
}

//
// CREATE, UPDATE, DELETE api/client
//
export function client_create({ client = force('client') } = {}) {

    return Fetch.POST({ 
        route: `api/client`, 
        data:  client 
    });
} 

export function client_update({ clientKey = force('clientKey'), 
                                client    = force('client') } = {}) {  

    return Fetch.PUT({
        route: `api/client/?clientKey=${clientKey}`,
        data:  client, 
    });
}

export function client_delete({ clientKey = force('clientKey'), } = {}) {

    return Fetch.DELETE({
        route: `api/client/?clientKey=${clientKey}`,
    });
}


//
// TRANSLATION ROUTES
//

//
// GET translation
//
export function translation_get({ clientKey      = '',  
                                  languageKey    = '',  
                                  containerKey   = '',  
                                  translationKey = '', } = {}) { 

    const queryString = `clientKey=${clientKey}&languageKey=${languageKey}&containerKey=${containerKey}&translationKey=${translationKey}`;
    
    return Fetch.GET({  
        route: `api/translation/?${queryString}`,
    }); 
}


export function translation_getGroup({ clientKey      = '',  
                                       containerKey   = '', 
                                       translationKey = '', } = {}) {

    const queryString = `clientKey=${clientKey}&containerKey=${containerKey}&translationKey=${translationKey}`;

    return Fetch.GET({
        route: `api/translation/group/?${queryString}`,
    })
}

export function translation_getGroupMeta({ clientKey      = '',  
                                           containerKey   = '', 
                                           translationKey = '', } = {}) {

    const queryString = `clientKey=${clientKey}&containerKey=${containerKey}&translationKey=${translationKey}`;

    return Fetch.GET({
        route: `api/translation/group/meta/?${queryString}`,
    })
}

//
// POST, PUT, DELETE translation
//
export function translation_create({ translation = force('translation') } = {}) {

    return Fetch.POST({
        route: `api/translation`,
        data:  translation 
    }); 
}


export function translation_createArray({ translationArray = force('translationArray') } = {}) {

    return Fetch.POST({
        route: `api/translation/array`,
        data:  translationArray 
    }); 
}

export function translation_update({ clientKey      = force('clientKey'),  
                                     languageKey    = force('languageKey'),  
                                     containerKey   = force('containerKey'),  
                                     translationKey = force('translationKey'),
                                     translation    = force('translation') } = {}) {  

    const queryString = `clientKey=${clientKey}&languageKey=${languageKey}&containerKey=${containerKey}&translationKey=${translationKey}`;

    return Fetch.PUT({
        route: `api/translation/?${queryString}`,       
        data:  translation 
    });
}

export function translation_updateArray({ clientKey        = force('clientKey'),  
                                          containerKey     = force('containerKey'),  
                                          translationKey   = force('translationKey'),
                                          translationArray = force('translationGroup') } = {}) {  

    const queryString = `clientKey=${clientKey}&containerKey=${containerKey}&translationKey=${translationKey}`;

    return Fetch.PUT({
        route: `api/translation/array/?${queryString}`,       
        data:  translationArray
    });
}

export function translation_delete({ clientKey      = force('clientKey'),  
                                     languageKey    = force('languageKey'),  
                                     containerKey   = force('containerKey'),  
                                     translationKey = force('translationKey'), } = {}) {

    const queryString = `clientKey=${clientKey}&languageKey=${languageKey}&containerKey=${containerKey}&translationKey=${translationKey}`;

    return Fetch.DELETE({
        route: `api/translation/?${queryString}`
    });
}

export function translation_deleteGroup({ clientKey      = force('clientKey'),  
                                          containerKey   = force('containerKey'),  
                                          translationKey = force('translationKey'), } = {}) {

    const queryString = `clientKey=${clientKey}&containerKey=${containerKey}&translationKey=${translationKey}`;

    return Fetch.DELETE({
        route: `api/translation/group/?${queryString}`, 
    });
}


//
// ROUTE container
//
export function container_get({ containerKey = '' } = {}) {
    return Fetch.GET({  
        route: `api/container/?containerKey=${containerKey}`,
    });
}

export function container_getNonEmpty({ clientKey = ''} = {}) {
    return Fetch.GET({
        route: `api/container/nonempty/?clientKey=${clientKey}`,
    });
} 

export function container_getClientContainerArray({ clientKey = force('clientKey') } = {}) {

    return Fetch.GET({ 
        route: `api/container/active/?clientKey=${clientKey}`, 
    });
};

export function container_setClientContainerArray({ clientKey            = force('clientKey'),  
                                                    clientContainerArray = force('clientContainerArray') } = {}) {

    return Fetch.PUT({ 
        route: `api/container/active/?clientKey=${clientKey}`, 
        data:  clientContainerArray,
    });
}



//
// ROUTE language
//
export function language_get ({ languageKey = '' } = {}) {
    return Fetch.GET({  
        route: `api/language/?languageKey=${languageKey}`,
    });
}

export function languages_create ({ language = force('language') } = {}) {
    return Fetch.POST({ 
        route: 'api/language/create', 
        data:  language 
    });
}

export function language_getClientLanguageArray({ clientKey = force('clientKey') } = {}) {

    return Fetch.GET({ 
        route: `api/language/active/?clientKey=${clientKey}`, 
    });
};

export function language_setClientLanguageArray({ clientKey           = force('clientKey'),  
                                                  clientLanguageArray = force('clientLanguageArray') } = {}) {
    return Fetch.PUT({ 
        route: `api/language/active/?clientKey=${clientKey}`, 
        data:  clientLanguageArray,
    });
}