//
// @project OrdBase
// @file App.js
// @creator Jonas Solsvik
// @created 16.06.2017
//
//  @brief Main script for the OrdBase app. Runs all event-listeneres, and calls event handlers.
//
// @doc modules:  https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc
// @doc keycodes: http://keycode.info/
//

//
// @module App
//  @brief anonymous closure, hides local variable names. Also makes for a nice namespace.
//    This is basically a module.
//
var App = (function () {

    let oldActiveElement;
    //
    // PRIVATE   
    //
    // @function HelloWorld
    //  @brief left just for debugging. Making sure that the script actually runs
    //
    var HelloWorld = function () {
        console.log("Hello world!");
    }

    //
    // PUBLIC
    //
    return {
        //
        // @function Initialize 
        //  @brief This runs first when the app starts.
        //
        Initialize : function () {
            HelloWorld();
            Highlighter.Initialize(4, 7);
        },

        //
        // @function OnKeyDown
        //  @brief EventHandler for OnKeyDown html5 events, mostly for Highlighter in the menu.
        //
        OnKeyDown : function(key) {

            let keyCode = key.which || key.keyCode;  // cross browser support
            //console.log(event.which || event.keyCode); // @debug

            switch(keyCode) {
                case Key.UP:
                case Key.w:  
                    Highlighter.MoveUp();
                    break;

                case Key.DOWN:
                case Key.s:  
                    Highlighter.MoveDown();
                    break;

                case Key.LEFT:
                case Key.a:  
                    Highlighter.MoveLeft();
                    break;

                case Key.RIGHT:
                case Key.d:  
                    Highlighter.MoveRight();
                    break;

                case Key.ESC:
                case Key.BACKSPACE:
                    Highlighter.UnselectActiveElement();
                    break;

                default:
                    console.log("Unhandled key");
                    break;
            }
        },

        //
        // @function OnKeyUp()
        //  @brief TAB events is special for the browser. We want to evaluate them after the browser
        //          has changed focus.
        //
        OnKeyUp : function (key) {
            let keyCode = key.which || key.keyCode; 
            switch(keyCode) {
                case Key.TAB:
                    Highlighter.SetActiveElement(document.activeElement);
                    break;
            }
        },

        // 
        // @function OnCategoryClick()
        //  @brief Should toggle which categories are selected, thus filtering which translations
        //          are shown in the list. The browser automatically swaps it's activeElement
        //          when a click occurs.
        //
        OnCategoryClick : function (button) {
            console.log("Clicked " + button.id);
            Highlighter.SetActiveElement(button);

        },

        //
        // @function OnTranslationClick()
        //  @brief Should fetch the EditView for the specific translation from the server, and
        //          display in-place.
        //
        OnTranslationClick : function (button) {
            console.log("Clicked " + button.id);
            Highlighter.SetActiveElement(button);
        },

        //
        // @function LoadEditor()
        //  @brief Supposed to load in a partial view and dynamicly change the single page app
        //
        LoadEditor() {
            // document.getElementById("selectionGroup").innerHTML='';
            // document.getElementById("editorGroup").innerHTML='<object type="text/html" data="Editor.html"></object>';
        },

        QuitEditor() {
            // document.getElementById("selectionGroup").innerHTML='<object type="text/html" data="Selection.html"></object>';
            // document.getElementById("editorGroup").innerHTML='';
        },
    }
})();

//
// @brief Makes sure all the modules are finished before we call App.initialize
//
document.addEventListener("DOMContentLoaded", function(event) { 
  App.Initialize();
});
