'use strict';

//
// @module Utill
//  @brief small functions which helps reduce repitition.
//

export function swapView(view) {
        document.body.innerHTML = '';
        document.body.appendChild(view);
}   
