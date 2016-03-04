(function (){
    angular
        .module("StockPortfolioApp")
        .config(configuration);

    function configuration($routeProvider){
        //$routeProvider allows us to configure the navigation of web page

        $routeProvider
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller : "RegisterController"
            })
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/search", {
                templateUrl: "views/Search/search.view.html",
                controller : "SearchController"
            })
            //.when("/forms", {
            //    templateUrl: "views/forms/forms.view.html",
            //    //controller : "FormController"
            //})
            //.when("/fields", {
            //    templateUrl: "views/forms/fields.view.html",
            //    //controller : "FormController"
            //})
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller : "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller : "ProfileController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/detail/:Symbol", {
                templateUrl: "views/Search/detail.view.html",
                controller: "DetailController"
            })
            .when("/portfolio", {
                templateUrl: "views/portfolio/portfolio.view.html",
                controller: "PortfolioController"
            })
            .when("/watchlist", {
                templateUrl: "views/watchlist/watchList.view.html",
                controller: "WatchlistController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
