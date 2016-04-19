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
                templateUrl: "views/home/home.view.html",
                controller : "HomeController",
                resolve: {
                    loggedin: checkCurrentUser
                }

            })
            .when("/search", {
                templateUrl: "views/Search/search.view.html",
                controller : "SearchController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller : "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller : "ProfileController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/admin', {
                templateUrl: 'views/admin/admin.view.html',
                controller: 'AdminController',
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when("/detail/:Symbol", {
                templateUrl: "views/Search/detail.view.html",
                controller: "DetailController"
            })
            .when("/userdetail/:Username", {
                templateUrl: "views/users/user.detail.view.html",
                controller: "UserDetailController"
            })
            .when("/portfolio", {
                templateUrl: "views/portfolio/portfolio.view.html",
                controller: "PortfolioController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/watchlist", {
                templateUrl: "views/watchlist/watchList.view.html",
                controller: "WatchlistController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }


    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.user = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        console.log("inside checkLoggedin:::::::::::::::::::::::::::::::::");

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                console.log(user);
                $rootScope.user = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                console.log(user);
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        console.log("inside checkLoggedin:::::::::::::::::::::::::::::::::");

        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.user = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };


})();
