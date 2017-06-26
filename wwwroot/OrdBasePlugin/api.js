import translation from "translation.js"
import language from "language.js"
import client from "client.js"
import container from "container.js"

export let api = (function() {
    return {
        translation: translation,
        language: language,
        client: client,
        container: container,
    }
})();
