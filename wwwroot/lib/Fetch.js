'use strict'
// 
// @module Ajax
// @file ajax.js
//

// @doc vanilla Ajax XMLHttpRequest -  https://www.w3schools.com/xml/ajax_xmlhttprequest_response.asp
// @doc Do research on using fetch instead -- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// @doc CORS - https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
// @doc fetch POST request example - https://stackoverflow.com/questions/29775797/fetch-post-json-data


import { mandatory } from './Util.js';

//
// @function GET
//
export function GET({ route = mandatory() } = mandatory()) {

    console.log('fetch.get:','\nroute', route);

    return fetch(route, { 
        method: 'GET'  
    })
    .then((res) => { 
        return res.json(); 
    });
}

//
// @function DELETE
//
export function DELETE({ route = mandatory()} = mandatory()) {
    
    console.log('fetch.delete:', '\nroute', route);

    return fetch(route, {  
        method: 'DELETE' 
    });
}

//
// @function PUT
//
export function PUT({ route = mandatory(), data = mandatory()} = mandatory()) {
    console.log('fetch.put:', '\nroute', route, '\ndata', data);

    return fetch(route, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PUT',                 // POST or PUT
        body: JSON.stringify(data),
    });
}

//
// @function POST
//
export function POST({ route = mandatory(), data = mandatory()} = mandatory()) {
    console.log('fetch.post:', '\nroute', route, '\ndata', data);
    return fetch(route, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',                 // POST or PUT
        body: JSON.stringify(data),
    });
}
