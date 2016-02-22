(function (){
    angular
        .module("MovieApp")
        .config(configuration);

    function configuration($routeProvider){
        //$routeProvider allows us to configure the navigation of web page

        $routeProvider
            .when("/home", {
                templateUrl: "home/home.view.html"
            })
            .when("/search", {
                templateUrl: "search/search.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
