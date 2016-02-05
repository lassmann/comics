var users = [];
var userLogged;
(function init() {
if(!localStorage.getItem('users')){
    var user1 = new User('admin', 'admin');
    var user2 = new User('lucas', 'lucas');
    users[user1.getUsername()] = user1;
    users[user2.getUsername()] = user2;
    storeUsers();
}

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
    if (users[username] && users[username].getPassword() === password) {
        console.log("entramos")
        sessionStorage.setItem("name", username);
        $("#login").modal('hide');
    } else {
        $('#passform').after("<div class='alert alert-danger'>Incorrect password. Try again o register an account.</div>")
    }

}

function registerUser() {
    var username = document.getElementById("userReg").value;
    var pass = document.getElementById("passReg").value;
    if(username.length === 0){
        $('#passRegister').after("<div class='alert alert-danger'>You have to introduce a username</div>")
    }else {
        var user = new User(username, pass);
        users[user.getUsername()] = user;
        storeUsers();
        $("#register").modal('hide')
    }

}
