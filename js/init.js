(function init(){

    if (typeof (Storage) !== "undefined") {
        (function init(){
            var users = [
                "admin",
                "admin",
                "Lucas",
                "Assmann"
            ];
            localStorage.setItem("usuarios", users);
        })()
    }
})();

function login() {
    var registered = localStorage.getItem("usuarios");
    console.log(registered)
    var user = document.getElementById("username").value;
    console.log(user)
}

