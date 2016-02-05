var users = [];
var userLogged;
(function init() {
    var user1 = new User('admin', 'admin');
    var user2 = new User('lucas', 'lucas');
    users[user1.getUsername()] = user1;
    users[user2.getUsername()] = user2;
    storeUsers();
})();

function storeUsers() {
    var store = [];
    for (user in users) {
        var array = [];
        array.push(users[user].getUsername());
        array.push(users[user].getPassword());
        store.push(array)
    }
    localStorage.setItem('users', JSON.stringify(store));
}

function validateLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("passLogin").value;

}

function registerUser() {
    console.log("hola")
}
