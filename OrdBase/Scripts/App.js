//
// @project OrdBase
// @file App.js
// @creator Jonas Solsvik
// @created 16.06.2017
//
//  @brief Main script for the OrdBase app. Runs all event-listeneres, and calls event handlers.
//          Manages calls to sub-modules Selector and Editor
//
// @doc modules:  https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc
// @doc keycodes: http://keycode.info/
//

//
// @module App
//  @brief Responsible for the shared and high-level logic of the application. Talks to the 
//          Selector moodule and the Editor module when appropriate.
//
var App = (function () {
    //
    // PRIVATE   
    //
    var OnKeyDown; // 

    // @function HelloWorld
    //  @brief left just for debugging. Making sure that the script actually runs
    //
    var HelloWorld = function () {
        console.log("Hello world!");
    }

    //
    // @function LoadEditor()
    //  @brief Supposed to load in editView, editing a single translation.
    //          while keeping the state of the selectionView.
    //
    var LoadEditor = function(categoryId) {
        document.getElementById("selectorGroup").style.display = 'none'
        document.getElementById("editorGroup").style.display = 'flex';
        document.getElementById("appHeading").innerHTML = 'Editing ' + categoryId;
        OnKeyDown = OnKeyDownEditor;
    }

    //
    // @function LoadEditor()
    //  @brief Supposed to quit the editView, restoring the selectionView, to it's stored state,
    //          loading in changes if they occured.
    //
    var QuitEditor = function() {
        document.getElementById("editorGroup").style.display = 'none';
        document.getElementById("selectorGroup").style.display = 'flex'
        document.getElementById("appHeading").innerHTML = 'Client evil';
        OnKeyDown = OnKeyDownSelector;
    }
    
    //
    // @function OnKeyDown
    //  @brief EventHandler for OnKeyDown html5 events, when the user is in the Selector module.
    //
    var OnKeyDownSelector = function(key) {

        let keyCode = key.which || key.keyCode;  // cross browser support
        //console.log(event.which || event.keyCode); // @debug

        switch(keyCode) {
            case Key.UP:
            case Key.w:  
                Selector.MoveUp();
                break;

            case Key.DOWN:
            case Key.s:  
                Selector.MoveDown();
                break;

            case Key.LEFT:
            case Key.a:  
                Selector.MoveLeft();
                break;

            case Key.RIGHT:
            case Key.d:  
                Selector.MoveRight();
                break;

            case Key.ESC:
            case Key.BACKSPACE:
                Selector.UnselectActiveElement();
                break;

            case Key.SPACE:
                Selector.Debug();
                break;

            default:
                console.log("Unhandled key");
                break;
        }
    };

    //
    // @function OnKeyUpSelector()
    //  @brief TAB events is special for the browser. We want to evaluate them after the browser
    //          has changed focus.
    //
    var OnKeyUpSelector = function (key) {
        let keyCode = key.which || key.keyCode; 
        switch(keyCode) {
            case Key.TAB:
                Selector.SetActiveElement(document.activeElement);
                break;
        }
    };

    var OnKeyDownEditor = function (key) {
        let keyCode = key.which || key.keyCode; 
        console.log("Editor registered " + keyCode + " key");
    };

    //
    // PUBLIC
    //
    return {
        OnKeyDown: OnKeyDownSelector,
        OnKeyUp:   OnKeyUpSelector,

        //
        // @function Run 
        //  @brief This runs first when the app starts.
        //
        Run : function () {
            HelloWorld();
            Selector.Run(3, 4);
        },

        // 
        // @function OnCategoryClick()
        //  @brief Should toggle which categories are selected, thus filtering which translations
        //          are shown in the list. The browser automatically swaps it's activeElement
        //          when a click occurs.
        //
        OnCategoryClick : function (button) {
            console.log("Clicked " + button.id);
            Selector.SetActiveElement(button);

        },

        //
        // @function OnTranslationClick()
        //  @brief Should fetch the EditView for the specific translation from the server, and
        //          display in-place.
        //
        OnTranslationClick : function (button) {
            console.log("Clicked " + button.id);
            Selector.SetActiveElement(button);
            LoadEditor(button.id);
        },

        OnEditorSubmitClick : function () {
            QuitEditor();
        },

        OnEditorCancelClick : function () {
            QuitEditor();
        },
    }
})();

//
// @brief Makes sure all the modules are finished before we call App.Run
//
document.addEventListener("DOMContentLoaded", function(event) { 
  App.Run();
});
