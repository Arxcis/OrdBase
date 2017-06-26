//
// Module translation
//

let get = {
    one: function(client, container, key, language) { console.log("Getting one translation..."); },
    all: function (client) {  console.log("Getting all translation...");  },
    onContainer: function(client, container) { console.log("Getting translation on container..."); },
    onKey: function(client, key) { console.log("Getting translation on key...");  },
};

let create = function(translation) {  console.log("Creating translation...");  }
let update = function(translation) {  console.log("Updating translation...");  }
let remove = function(key)         {  console.log("Removing translation..."); }

export default { get, create, update, remove }