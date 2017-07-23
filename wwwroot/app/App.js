'use strict';

// COMPILE WITH BABEL - https://css-tricks.com/transpiling-es6/
// TRanspile with webpack - https://webpack.github.io/docs/tutorials/getting-started/

import { loadSelectClient } from './loadSelectClient.js';
import { Component_Header }   from '../components/views/header.js'; 


//
// @file main.js
// @doc 2017 es16 modules native in browsers https://jakearchibald.com/2017/es-modules-in-browsers/
//
export const ICON_NONE       = '';
export const ICON_PLUS       = 'fa-plus';
export const ICON_BARS       = 'fa-bars';
export const ICON_SQUARE     = 'fa-square';
export const ICON_ARROW_LEFT = 'fa-arrow-left';
export const ICON_TIMES      = 'fa-times';
export const ICON_CHECK      = 'fa-check';

// Cache static element references
document.getElementById('ordbase-header').appendChild(new Component_Header);
export const HEADER         = document.getElementById('ordbase-header').querySelector('component-header');
export const defaultHandler = (event) => console.log('Default handler... nothing happened');

export function switchView(view) {
    App.MAIN.innerHTML = '';
    App.MAIN.appendChild(view);
    return view;
}



const MAIN = document.getElementById('ordbase-main');    

window.addEventListener('load', () => {
    loadSelectClient();
});
