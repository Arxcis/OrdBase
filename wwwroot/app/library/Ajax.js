// 
// @module Ajax
// @file Ajax.js
//

// @doc Do research on using fetch instead -- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// @doc CORS - https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS


'use strict'

//
// @function mandatory()
//
function mandatory() {
    throw new Error('Missing parameter');
}

//
// @function getJSON()
//
export function getJSON({ type = mandatory(), route = mandatory()} = {}) {
    return new Promise((resolve, reject) => {
        const httpRequest = new XMLHttpRequest();

        httpRequest.open(type, route);  // asynce is default
        httpRequest.onload  = () => resolve(JSON.parse(httpRequest.responseText));
        httpRequest.onerror = () => reject(httpRequest.statusText);
        httpRequest.send();
    });
}

//
// @function postJSON 
//
export function postJSON({ type = mandatory(), route = mandatory(), data = mandatory()} = {}) {
    return new Promise((resolve, reject) => {
        const httpRequest = new XMLHttpRequest();

        httpRequest.open(type, route, true);
        httpRequest.setRequestHeader('Content-type', 'application/json');
        httpRequest.onload = () => resolve(httpRequest.responseText);
        httpRequest.onerror = () => reject(httpRequest.statusText);
        httpRequest.send(JSON.stringify(data));
    });
}