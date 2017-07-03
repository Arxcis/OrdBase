/*
    @project Ordbase
    @file form.js
    @created 03.07.2017
    @creator Jonas J. Solsvik
*/

const form = document.querySelector('form');
const formTextInputs = form.querySelectorAll('.form-textinput');

window.addEventListener('load', event => {
    form.addEventListener('submit', event => {
        event.preventDefault();
        console.log('Default form "submit" event was prevented....');
    });

    formTextInputs.forEach(field => {
        field.addEventListener('keypress', event => {
            _updateInputSize(event.target);
        });
    });
});


let _updateInputSize = target => {

    const minSize = target.getAttribute('data-min-size') || 20;
    const valueSize = target.value.length;

    if (valueSize > minSize)
        target.setAttribute('size', valueSize);
    else 
        target.setAttribute('size', minSize);
};