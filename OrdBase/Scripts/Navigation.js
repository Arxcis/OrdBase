//
// @file Navigation.js
// @creator Jonas Solsvik
// @created 16.06.2017
// @brief A moudule which updates the Navigation data structure. Makes sure that the viewHandler is exectured also.
//				I am not sure if that is a good idea yet, but it's cool to try it.
//

//
// @struct Navigation
// @brief holds the state of the keyboard navigation of the app.
//
var Navigation = {
	activeColumn		    : 0, // This should be between 0-1	
	activeRow   		    : 0, // This should be between 0 and current max rows 
	currentCategoryCount    : 0, // The number of categories does never change
	currentTranslationCount : 0, // A dynamic number which varies dending on the filtering of the user.
	maxTranslationCount     : 0, // Will be decided when the page loads and then never changed.
	

	Initialize(categoryCount, translationCount) {
		this.currentCategoryCount    = categoryCount;
		this.currentTranslationCount = translationCount;
	},

	Debug : function () {
		console.log("ActiveColumn: " + this.activeColumn + " ActiveRow: " + this.activeRow);
	},

	Clamp : function (value, min, max) {
			if (value < min) return min;
			if (value >= max) return max-1;
			return value;
	},

	MoveUp : function (viewHandler) { 
			if      (this.activeColumn === 0) this.activeRow = this.Clamp(this.activeRow - 1, 0, this.currentCategoryCount);
			else if (this.activeColumn === 1) this.activeRow = this.Clamp(this.activeRow - 1, 0, this.currentTranslationCount); 
			else     assert(0);  // activeColumn HAS to be between 0 and 1
			viewHandler(this.activeRow, this.activeColumn);
	},
		
	MoveDown : function (viewHandler) { 
			if      (this.activeColumn === 0) this.activeRow = this.Clamp(this.activeRow + 1, 0, this.currentCategoryCount);
			else if (this.activeColumn === 1) this.activeRow = this.Clamp(this.activeRow + 1, 0, this.currentTranslationCount); 
			else     assert(0);  // this.activeColumn HAS to be between 0 and 1
			viewHandler(this.activeRow, this.activeColumn);
	},

	MoveLeft : function (viewHandler) {
			this.activeColumn = 0;
			this.activeRow = this.Clamp(this.activeRow, 0, this.currentCategoryCount);
			viewHandler(this.activeRow, this.activeColumn);
	},

	MoveRight : function (viewHandler) {
			this.activeColumn = 1;
			this.activeRow = this.Clamp(this.activeRow, 0, this.currentTranslationCount);
			viewHandler(this.activeRow, this.activeColumn);
	},
};