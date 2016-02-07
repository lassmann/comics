var users = [];
var comics = [];
var userLogged;
(function init() {
    var usersArray;
    var url = window.location;
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

    $('ul.nav a[href="'+ url +'"]').parent().addClass('active');
    $('ul.nav a').filter(function() {
        return this.href == url;
    }).parent().addClass('active');
    $("#login").modal({show: false, backdrop: "static", keyboard: false});
    $("#register").modal({show: false, backdrop: "static", keyboard: false});
    $('.modal').on('hidden.bs.modal', function () {
        $(this).find('form')[0].reset();
        $('.deleted').hide()
    });
    comics.push(new Comic('Guardians', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', 'images/comics/guardians.jpg', 101, 4, 66));
    comics.push(new Comic('Nova', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', 'images/comics/nova.jpg', 300, 4, 99));
    comics.push(new Comic('Ovi Wan', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', 'images/comics/obi_wan.jpg', 90, 9, 344));
    comics.push(new Comic('Scarlet Witch', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', 'images/comics/scarlet_witch.jpg', 80, 7, 6777));
    comics.push(new Comic('Star Wars', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', 'images/comics/star_wars.jpg', 533, 5, 3434));
    comics.push(new Comic('The Vision', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', 'images/comics/the_vision.jpg', 6000, 6, 768));
    comics.push(new Comic('Wolverine', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', 'images/comics/wolverine.jpg', 350, 8, 345));
    comics.push(new Comic('Spidev', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', 'images/comics/spydev.jpg', 40, 9, 2000));
    comics.push(new Comic('Secret Wars', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', 'images/comics/secret_wars.jpg', 1265, 9, 3400));
    renderComics(comics);
})();

function renderComics(arrayComics) {
    var comicContainers, container, title, anchor, image;
    comicContainers = document.getElementById('comicPlace');
    comicContainers.innerHTML = '';

    arrayComics.forEach(function (comic) {
            container = document.createElement("div");
            container.className = "col-md-4 lucas";
            title = document.createElement("h4");
            title.innerHTML = comic.getTitle();
            anchor = document.createElement("a");
            anchor.href = "#";
            anchor.title = "See More";
            image = document.createElement("img");
            image.src = comic.getImage();
            image.className = "lucas2";
            anchor.appendChild(image);

            container.appendChild(title);
            container.appendChild(anchor);

            comicContainers.appendChild(container);
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
        document.getElementById('#welcome').innerHTML = "welcome User";
        $('.notLogged').css('display', 'none');
        $('.logged').show();
        $("#login").modal('hide');
    } else {
        $('#errorPass').show();
    }
}

function searchComics() {
    var coincidences = [];
    var search = document.getElementById('searchInput').value;
    comics.forEach(function (comic) {
        if (search.toUpperCase() === comic.getTitle().toUpperCase()) {
            coincidences.push(comic)
        }
    });
    renderComics(coincidences);
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
}
function logout() {
    sessionStorage.removeItem("name");
    location.href = "index.html";
}
function orderBy(typeOrder){
    if(typeOrder === 'bestseller'){
        comics.sort(function (a,b) {
            return a.getSells() < b.getSells()
        });
        renderComics(comics)
    }
    if(typeOrder === 'ranking'){
        comics.sort(function (a,b) {
            return a.getRanking() < b.getRanking()
        });
        renderComics(comics)
    }

    if(typeOrder === 'searches'){
        comics.sort(function (a,b) {
            return a.getSearches() < b.getSearches()
        });
        renderComics(comics)
    }

}