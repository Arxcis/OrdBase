'use strict';

//
// @module Utill
//  @brief small functions which helps reduce repitition.
//

export function overwriteFromTemplate(target, templatestring) {
    const template = document.createElement(templatestring);
    target.innerHTML = '';
    target.appendChild(template);
    
    return template;
}   

export function appendFromTemplate(target, templatestring) {
    const template = document.createElement(templatestring);
    target.appendChild(template);
    
    return template;
}