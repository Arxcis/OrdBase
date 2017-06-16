//
// @file App.js
// @creator Jonas Solsvik
// @created 16.06.2017
// @brief User defined Javascript code for App.cshtml
//

//
// @brief anonymous closure, hides local variable names. Also makes for a nice namespace.
// @doc https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc
//
var App = (function () {


	var activeColumn = 0; // This should be between 0-1	
	var activeRow    = 0; // this should be between 0 and current max rows

	var currentCategoryCount    = 0;
	var currentTranslationCount = 0;
	var maxCategoryCount        = 0;
	var maxTranslationCount     = 0;

	var Initialize = function () {
		HelloWorld();
	}

	//
	// @function KeyHandler
	// @brief The plan is to have a giant switch here which handles all the key events.
	// 			Maybe the EVENT-handler should be a different module/file?? TBD - Jonas 16.06.17
	//
	// Keycodes 
	//  space = 32
	//   w = 119
	//   a = 97
	//   d = 100
	//   s = 115
	//   up    = 38
	//   left  = 37
	//   right = 39
	//   down  = 40
	// 
	var KeyHandler = function(event) {
        console.log(event.which || event.keyCode);	// cross browser support
        console.log("Something happening..");
    }

    //
    // @function HelloWorld
    // @brief left just for debugging.
    //
	var HelloWorld = function () {
		console.log("Hello world!");
	}

	//
	// @brief Defining what gets exported to global scope, leaving the local scoped variables
	//   		out of reach.
	//
	return {
		Initialize: Initialize,
		KeyHandler: KeyHandler,
		HelloWorld: HelloWorld,
    }

})();

App.Initialize();

