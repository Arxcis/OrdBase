//
// @project OrdBase
// @file Selector.js  (renamed from Navigation.js 17.06.17)
// @creator Jonas Solsvik
// @created 16.06.2017
//
//  @brief A moudule which updates the 'Selector' data structure. Let's the user move around in the
//         app using arrow keys. up,down,left,right or  w , a , s , d. 
//
// @doc classList: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
// @doc classList: https://www.w3schools.com/jsref/prop_element_classlist.asp
// @doc const:     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
//

//
// @module Selector
// @brief holds the state of the keyboard Selector of the app.
//
var Selector = (function() {

    //
    // PRIVATE
    //
    const MINROW                = 1;
    const MINCOL                = 0;
    let activeColumn            = 1; // This should be between 0-1  
    let activeRow               = 0; // This should be between 0 and current max rows 
    let currentTranslationCount = 0; // A dynamic number which varies dending on the filtering of the user.
    let maxCategoryCount        = 0; // The number of categories does never change
    let maxTranslationCount     = 0; // Will be decided when the page loads and then never changed.

    let activeElementOld;
    let activeElement;

    var Clamp = function (value, min, max) {
        if (value < min) return min;
        if (value >= max) return max;
        return value;
    }

    var GetNextActiveElement = function (row, col) {
        if (col === 0) { return document.getElementById("category"    + row); }
        else           { return document.getElementById("translation" + row); }
    }

    var DrawNewActiveElement = function (oldElement, newElement) { 
        if(oldElement) 
            oldElement.classList.remove("Highlighted"); 
        newElement.classList.add("Highlighted");
    }

    var UpdateActiveElement = function(row, col) {
        let cell = GetNextActiveElement(row, col);

        Debug(row, col);
        if (cell) {
            activeElementOld = activeElement;
            activeElement = cell;
            activeElement.focus();
            DrawNewActiveElement(activeElementOld, activeElement);   
        }
        else {
            console.log("FATAL ERROR, out of bounds! Asserting....");
            assert(0); 
        }
    }

    var Debug = function (row, col) {
        console.log("ActiveColumn: " + row + " ActiveRow: " + col);
    }

    var isValidButton = function(element) {
        return element.classList.item(0) === "ListButton"; // @note could also use classList.contains here but unsure if Firefox supports it
    }

    //
    // PUBLIC
    //
    return {
        DrawNewActiveElement: DrawNewActiveElement,

        Run : function(categoryCount, translationCount) {
            maxCategoryCount    = categoryCount;
            currentTranslationCount = translationCount;
        },

        UnselectActiveElement : function(){
            activeElement.blur();
            activeElement.classList.remove("Highlighted");
            activeElementOld = activeElement = null;
            activeRow = 0;
            activeColumn = 1;
        },

        SetActiveElement : function (element) {
            if (isValidButton(element)) {
                activeElementOld = activeElement;
                activeElement = element;
                DrawNewActiveElement(activeElementOld, activeElement);
            }   
            else {
                console.log("Note: Not a valid ListButton or element is null.. No new selection drawn!");
            }
        },

        MoveUp : function () { 
            if   (activeColumn === 0) activeRow = Clamp(activeRow - 1, MINROW, maxCategoryCount);
            else                      activeRow = Clamp(activeRow - 1, MINROW, currentTranslationCount); 
            UpdateActiveElement(activeRow, activeColumn);
        },
            
        MoveDown : function () { 
            if   (activeColumn === 0) activeRow = Clamp(activeRow + 1, MINROW, maxCategoryCount);
            else                      activeRow = Clamp(activeRow + 1, MINROW, currentTranslationCount); 
            UpdateActiveElement(activeRow, activeColumn);
        },

        MoveLeft : function () {
            activeColumn = 0;
            activeRow = Clamp(activeRow, MINCOL, maxCategoryCount);
            UpdateActiveElement(activeRow, activeColumn);
        },

        MoveRight : function () {
            activeColumn = 1;
            activeRow = Clamp(activeRow, MINCOL, currentTranslationCount);
            UpdateActiveElement(activeRow, activeColumn);
        },
    }
})()