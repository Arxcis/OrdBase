'use strict';

//
// @module Utill
//  @brief small usefull functions which helps reduce repitition.
//

export function overwriteFromTemplate(target = mandatory(), templatestring = mandatory()) {
    const template = document.createElement(templatestring);
    target.innerHTML = '';
    target.appendChild(template);
    
    return template;
}   

export function appendFromTemplate(target = mandatory(), templatestring = mandatory()) {
    const template = document.createElement(templatestring);
    target.appendChild(template);
    
    return template;
}

export function mandatory() {
    throw new Error('Missing parameter');
}