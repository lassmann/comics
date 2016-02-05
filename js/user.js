function User(username, pass){
    var username = username;
    var pass = pass;

    this.getUsername = function(){
        return username;
    };
    this.getPassword = function(){
        return pass;
    }
}
