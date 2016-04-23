(function (){
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider){
        //$routeProvider allows us to configure the navigation of web page

        $routeProvider
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller : "RegisterController",
                controllerAs : "model"

            })
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })

            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller : "FormController",
                controllerAs : "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/fields", {
                templateUrl: "views/forms/field.view.html",
                controller : "FieldController",
                controllerAs : "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/form/:formId/fields", {
                templateUrl: "views/forms/field.view.html",
                controller : "FieldController",
                controllerAs : "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller : "LoginController",
                controllerAs : "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller : "ProfileController",
                controllerAs : "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                //controllerAs: "model",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }



    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        console.log("ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg");
        $http.get('/api/assignment/loggedin').success(function(user)
        {
            console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
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

        $http.get('/api/assignment/loggedin').success(function(user)
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

        $http.get('/api/assignment/loggedin').success(function(user)
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
