var users = [];
var comics = [];
var userLogged;
(function init() {
    var usersArray;
    if (localStorage.getItem('users')) {
        if (isLogged()) {
            $('.logged').show();
            userLogged = localStorage.getItem('name');
        } else {
            $('.logged').hide()
        }
        usersArray = JSON.parse(localStorage.getItem('users'));
        usersArray.forEach(function (user) {
            var temporalUser = new User(user[0], user[1]);
            users[temporalUser.getUsername()] = temporalUser;
        });
        storeUsers();
    } else {
        var user1 = new User('admin', 'admin');
        var user2 = new User('lucas', 'lucas');
        users[user1.getUsername()] = user1;
        users[user2.getUsername()] = user2;
        storeUsers();
    }
    $("#login").modal({show: false, backdrop: "static", keyboard: false});
    $("#register").modal({show: false, backdrop: "static", keyboard: false});
    $('.modal').on('hidden.bs.modal', function () {
        $(this).find('form')[0].reset();
        $('.deleted').hide()
    });
    comics.push(new Comic('Guardians', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', 'images/comics/guardians.jpg', 101, 2, 2000));
    comics.push(new Comic('Nova', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', 'images/comics/guardians.jpg', 101, 2, 2000));
    comics.push(new Comic('Ovi Wan', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', 'images/comics/guardians.jpg', 101, 2, 2000));
    comics.push(new Comic('Scarlet Witch', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', 'images/comics/guardians.jpg', 101, 2, 2000));
    comics.push(new Comic('Star Wars', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', 'images/comics/guardians.jpg', 101, 2, 2000));
    comics.push(new Comic('The Vision', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', 'images/comics/guardians.jpg', 101, 2, 2000));
    comics.push(new Comic('Wolverine', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', 'images/comics/guardians.jpg', 101, 2, 2000));
    comics.push(new Comic('Spidev', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', 'images/comics/guardians.jpg', 101, 2, 2000));
    comics.push(new Comic('Secret Wars', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', 'images/comics/guardians.jpg', 101, 2, 2000));
    renderComics()
})();

function renderComic() {
    var comicContainers = document.getElementById('#comicPlace');
    comicContainers.innerHTML = '';

    comics.forEach(function (comic) {

        }
    )
}

function isLogged() {
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

    function logout() {
        sessionStorage.removeItem("name");
        location.href = "index.html";
    }
}
