function User(username, pass, type){
    var username = username;
    var pass = pass;
    var type = type;

    this.getUsername = function(){
        return username;
    };
}
