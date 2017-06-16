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

	//
	// @function KeyHandler
	// @brief The plan is to have a giant switch here which handles all the key events.
	// 			Maybe the EVENT-handler should be a different module/file?? TBD - Jonas 16.06.17
	//
	var HandleKeys = function(event) {

		let keyCode = event.which || event.keyCode;  // cross browser support
        //console.log(event.which || event.keyCode); // @debug

        switch(keyCode) {
        	// @note RIGHT movement
        	case 38:
        	case 87:  //'w'
        		console.log("Up");
        		Navigation.MoveUp(function(row, col){

        		});
        		break;

        	// @note LEFT movement
        	case 37:
        	case 65:  // 'a'
        		console.log("Left");
        		Navigation.MoveLeft(function(row, col){

        		});
        		break;

        	// @note RIGHT Movement
        	case 39:
        	case 68: // 'd'
        		console.log("Right");
        		Navigation.MoveRight(function(row, col){

        		});
        		break;

        	// @note DOWN Movement
        	case 40:
        	case 83: // 's'
        		console.log("Down");
        		Navigation.MoveDown(function(row, col){

        		});
        		break;

        	// @note ENTER Movement
        	case 13:
        		console.log("Enter");
        		break;

        	// @note BACKSPACE movement
        	case 8:
        		console.log("Backspace");
        		break;

        	default:
        		console.log("Unhandled key");
        		break;
        }
        Navigation.Debug();
    }

    //
    // @function HelloWorld
    // @brief left just for debugging.
    //
	var HelloWorld = function () {
		console.log("Hello world!");
	}

	//
	// @function Initialize 
	//  @brief This runs first when the app starts. Honestly of little use except for debugging.
	//
	var Initialize = function () {
		HelloWorld();
	}

	//
	// @brief Defining what gets exported to global scope, leaving the local scoped variables
	//   		out of reach.
	//
	return {
		Initialize: Initialize,
		HandleKeys: HandleKeys,
		HelloWorld: HelloWorld,
    }
})();

App.Initialize();

