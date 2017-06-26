//
// Module language
//

let get = {
    all : function () {
        console.log("Getting all languages...");
    },
    onClient : function(name) {
        console.log("Getting client languages...");
    }
};

let create = function (language) {
    console.log("Creating a new language...");
};

export default { get, create }