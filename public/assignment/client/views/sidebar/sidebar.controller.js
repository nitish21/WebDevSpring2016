(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope) {

        console.log("Hello from sidebar controller");
    }
})();