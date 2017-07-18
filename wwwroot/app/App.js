'use strict';

// COMPILE WITH BABEL - https://css-tricks.com/transpiling-es6/
// TRanspile with webpack - https://webpack.github.io/docs/tutorials/getting-started/

import { loadSelectClient } from './OnLoadView/loadSelectClient.js';
import { OrdbaseHeader }    from '../components/views/header'; 



//
// @file main.js
// @doc 2017 es16 modules native in browsers https://jakearchibald.com/2017/es-modules-in-browsers/
//

export const ICON_HEADER_NONE       = '';
export const ICON_HEADER_PLUS       = 'fa-plus';
export const ICON_HEADER_BARS       = 'fa-bars';
export const ICON_HEADER_SQUARE     = 'fa-square';
export const ICON_HEADER_ARROW_LEFT = 'fa-arrow-left';
export const ICON_HEADER_TIMES      = 'fa-times';


// Cache static element references
document.getElementById('ordbase-header').appendChild(new OrdbaseHeader);

export const MAIN           = document.getElementById('ordbase-main');    
export const HEADER         = document.getElementById('ordbase-header').querySelector('ordbase-header');
export const defaultHandler = (event) => console.log('Default handler... nothing happened');


window.addEventListener('load', () => {
    loadSelectClient();
});