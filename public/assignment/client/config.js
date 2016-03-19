(function (){
    angular
        .module("FormBuilderApp")
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
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller : "FormController"
            })
            .when("/fields", {
                templateUrl: "views/forms/field.view.html",
                controller : "FieldController"
            })
            .when("/form/:formId/fields", {
                templateUrl: "views/forms/field.view.html",
                controller : "FieldController"
            })
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
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
