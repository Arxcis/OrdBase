    //
    //
    // @function OnLoad_ViewTranslationSelector
    //
    //
    function OnLoad_ViewTranslationSelector (client) {

        const iconCheck = '<i class="fa fa-check" aria-hidden="true"></i>';
        const iconCross = '<i class="fa fa-times" aria-hidden="true"></i>';

        let view = document.createElement('translation-selector-view');
        swapView(view);

        //
        // Get all container names
        //
        API
        .container.getOnClient(client)
        .then(data => {

            data.forEach(containerName => {
                let button = document.createElement('button');
                view.querySelector('#list-show-containers-on-client').appendChild(button);

                button.innerHTML = containerName;
                button.id = 'button-' + containerName;
                button.onclick = (event) => button.classList.toggle('selected');
            });      
        })
        .catch(reason => console.error('Error:', reason));

        //
        // Get all translation groups 
        //  @doc template literals - https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals
        //
        API
        .translation.getGroupOnClient(client)
        .then(data => {
            data.forEach(translationGroup => {

                let card = document.createElement('ordbase-card-translation');
                view.querySelector('#list-show-translations-on-client').appendChild(card);
                
                card.querySelector('#btn-load-translation-editor').onclick = (event) => OnLoad_ViewTranslationEditor(client, translationGroup.key); 
                card.querySelector('#span-show-translation-key').innerHTML = translationGroup.key;
                let divLanguagesComplete = card.querySelector('#div-show-if-languages-are-complete');
                                
                Object.keys(translationGroup.isComplete)
                .forEach((key, value) => {

                    if (value == true) 
                        divLanguagesComplete.innerHTML += `<div class="languages-complete-text-icon"><span>${key}</span>` + iconCheck + '</div class="languages-complete-text-icon">';
                    else
                        divLanguagesComplete.innerHTML += `<div class="languages-complete-text-icon"><span>${key}</span>` + iconCross + '</div class="languages-complete-text-icon">';
                });
            });
        })
        .catch(reason => console.error('Error:', reason));

        // Hook up all buttons
        view.querySelector('#btn-toggle-container-list').onclick   = (event) => OnLoad_ViewClientSelector();
        view.querySelector('#btn-back-to-home-page').onclick       = (event) => OnLoad_ViewClientSelector();
        view.querySelector('#btn-back-to-client-selector').onclick = (event) => OnLoad_ViewClientSelector();
        view.querySelector('#btn-create-new-translation').onclick  = (event) => OnLoad_ViewClientSelector();
    }