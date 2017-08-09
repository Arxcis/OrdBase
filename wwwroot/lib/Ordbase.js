'use strict';

let containerPromise;

export function loadContainer(clientKey, containeKey) {
    let languageKey = document.querySelector('html').getAttribute('lang');

    console.log(clientKey, languageKey, containeKey);
    let url = 'api/translation/keyvalue/?clientKey=${clientKey}&languageKey=${languageKey}&containeKey=${containeKey}';

    containerPromise = fetch(url, { method: 'GET' })
                       .then(container => { return container.json(); })
                       .catch(err => { throw new Error('Container not found: ${err}'); });                       
}

export function translate(translationKey, success) {

    containerPromise.then(keyvalueArray => {
        let text = keyvalueArray.find(keyvalue => return keyvalue.key == translationKey).value;
        success(text);
    })
    .catch(err => { 
        let text = 'not found...'; 
        success(text);
    })
}