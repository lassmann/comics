function Comic (title, description, image, sells, ranking, searches){
    var title = title;
    var description = description;
    var image = image;
    var sells = sells;
    var ranking = ranking;
    var searches = searches;

    this.getTitle = function () {
        return title;
    };
    this.getDescription = function () {
        return description;
    };
    this.getImage = function () {
        return image;
    };
    this.getSells = function () {
        return sells;
    };
    this.getSearches = function () {
        return searches;
    };

}