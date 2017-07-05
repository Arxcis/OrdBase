'use strict'

// fetch API - https://davidwalsh.name/fetch
// fetch API parse to HTML - http://javascript.tutorialhorizon.com/2016/09/01/parse-html-response-with-fetch-api/
// HTML loader - https://stackoverflow.com/questions/37818401/importing-html-files-with-es6-template-string-loader
// Template databinding - https://www.joezimjs.com/javascript/javascript-templating-adding-html-the-right-way/

//
// @module jetloader
// @file   jetloader.js
// @created 05.07.17
// @creator Jonas J. Solsvik
// @brief For loading html <template> elements from separate files, using Fetch API (ajax)
// 
// @methods
//   loadTemplate(url,  databinder = {})  -> promise<template>
//   loadText(url)                        -> promise<text>
//   bindTemplate(text, databinder = {})  -> template
//   bindText(text, databinder = {})      -> text
//

export function loadTemplate(url, dataBinder = {}) {

    return fetch(url)
        .then( response => {
            return response.text();
        })
        .then( text => {
            return bindTemplate(text, dataBinder);
        })
}

export function loadText(url) {
    return fetch(url)
        .then( response => {
            return response.text();
        });
}

export function bindTemplate(text, dataBinder = {}) {

    text = bindText(text, dataBinder);

    const wrapper = document.createElement('div');
    wrapper.innerHTML = text;
    return document.importNode(wrapper.querySelector('template'), true);
}

export function bindText(text, dataBinder = {}) {
    if (dataBinder != {}) { 
        for (const property in dataBinder) {
            const regexp = new RegExp('{{\\s*' + property + '\\s*}}', 'ig');
            text = text.replace(regexp, dataBinder[property]);
        }
    }
    return text;
}