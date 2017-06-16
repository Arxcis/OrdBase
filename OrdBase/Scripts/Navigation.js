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
	MINROW : 1,
	activeColumn		    : 1, // This should be between 0-1	
	activeRow   		    : 0, // This should be between 0 and current max rows 
	currentCategoryCount    : 0, // The number of categories does never change
	currentTranslationCount : 0, // A dynamic number which varies dending on the filtering of the user.
	maxTranslationCount     : 0, // Will be decided when the page loads and then never changed.
	

	// @doc classList: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
	ToggleCell : function(col, row) {
		if (col === 0) { var cell = document.getElementById("category"    + row); }
		else           { var cell = document.getElementById("translation" + row); }
		console.log("row " + row);
		cell.classList.toggle("NavigationSelected");
	},

	ResetSelect : function(){
		this.ToggleCell(this.activeColumn, this.activeRow);
		this.activeRow = 0;
		this.activeColumn = 1;
	},

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

	MoveUp : function () { 
		this.ToggleCell(this.activeColumn, this.activeRow);
		if   (this.activeColumn === 0) this.activeRow = this.Clamp(this.activeRow - 1, this.MINROW, this.currentCategoryCount);
		else 						   this.activeRow = this.Clamp(this.activeRow - 1, this.MINROW, this.currentTranslationCount); 
		this.ToggleCell(this.activeColumn, this.activeRow);
	},
		
	MoveDown : function () { 
		this.ToggleCell(this.activeColumn, this.activeRow);
		if   (this.activeColumn === 0) this.activeRow = this.Clamp(this.activeRow + 1, this.MINROW, this.currentCategoryCount);
		else						   this.activeRow = this.Clamp(this.activeRow + 1, this.MINROW, this.currentTranslationCount); 
		this.ToggleCell(this.activeColumn, this.activeRow);
	},

	MoveLeft : function () {
		this.ToggleCell(this.activeColumn, this.activeRow);
		this.activeColumn = 0;
		this.activeRow = this.Clamp(this.activeRow, 0, this.currentCategoryCount);
		this.ToggleCell(this.activeColumn, this.activeRow);

	},

	MoveRight : function () {
		this.ToggleCell(this.activeColumn, this.activeRow);
		this.activeColumn = 1;
		this.activeRow = this.Clamp(this.activeRow, 0, this.currentTranslationCount);
		this.ToggleCell(this.activeColumn, this.activeRow);
	},
};