var users = [];
var userLogged;
(function init() {
    var usersArray;
    isLogged();
    if(localStorage.getItem('users')){
        if(isLogged()){
            $('.logged').show();
        }else {
            $('.logged').hide()
        }
        usersArray = JSON.parse(localStorage.getItem('users'));
        usersArray.forEach(function (user) {
            var temporalUser = new User(user[0], user[1]);
            users[temporalUser.getUsername()] = temporalUser;
        });
        storeUsers();
    }else{
            var user1 = new User('admin', 'admin');
            var user2 = new User('lucas', 'lucas');
            users[user1.getUsername()] = user1;
            users[user2.getUsername()] = user2;
            storeUsers();
    }
    $('.modal').on('hidden.bs.modal', function(){
        $(this).find('form')[0].reset();
        $('.deleted').hide()
    });
})();

function isLogged(){
    return sessionStorage.getItem('name');
}

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
        sessionStorage.setItem("name", username);
        //$('#welcome').html('Hola');
        document.getElementById('#welcome').innerHTML = "welcome User"
        $('.notLogged').css('display', 'none');
        $('.logged').show();
        //$('.logged').css('display','inline');
        $("#login").modal('hide');
    } else {
        $('#errorPass').show();
    }
}

function registerUser() {
    var username = document.getElementById("userReg").value;
    var pass = document.getElementById("passReg").value;
    if (username.length === 0) {
        $('#passRegister').after("<div class='alert alert-danger'>You have to introduce a username</div>")
    } else {
        var user = new User(username, pass);
        users[user.getUsername()] = user;
        storeUsers();
        $("#register").modal('hide')
    }

    function logout(){
        sessionStorage.removeItem("name");
        location.href="index.html";
    }
}
