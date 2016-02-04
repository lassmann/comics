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