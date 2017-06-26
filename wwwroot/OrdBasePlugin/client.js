//
// Module client
//

let get = {
    all : function () {
            console.log("Getting all clients..."); 
    },
    one : function (name) {
            console.log("Getting one client..."); 
    }
}

let create = function (client) {
        console.log("Creating client..."); 
}

export default { get, create }