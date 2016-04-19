(function () {
    angular
        .module("StockPortfolioApp")
        .controller("UserDetailController", UserDetailController);

    function UserDetailController($scope,$rootScope ,$routeParams, $location, UserService, PortfolioService,WatchListService) {

        $scope.Username = $routeParams.Username;
        //$scope.update = update;
        //$scope.toBeDisplayedUser = {};
        $scope.stocks = [];
        $scope.isFollowing = false;

        $scope.follow = follow;
        $scope.unFollow = unFollow;


        getUserFromUserName();


        initialDisplayOfStocks();



        function unFollow(){

            console.log("*****************************************************************");
            console.log($scope.toBeDisplayedUser);

            var tempUser1 = {};
            angular.copy($rootScope.user,tempUser1);
            //delete tempUser1["_id"];
            //tempUser1.following.push($scope.toBeDisplayedUser.username);

            for(var i=0;i<tempUser1.following.length;i++){

                if(tempUser1.following[0] == $scope.toBeDisplayedUser.username){
                    tempUser1.following.splice(i,1);
                }

            }



            var tempUser2 = {};
            angular.copy($scope.toBeDisplayedUser, tempUser2);
            //tempUser2.followers.push($rootScope.user.username);

            for(var i=0;i<tempUser2.followers.length;i++){

                if(tempUser2.followers[0] == $rootScope.user.username){
                    tempUser2.followers.splice(i,1);
                }

            }

            var unfollowJson = {

                "whoWantsToUnFollow" : tempUser1,
                "whom" : tempUser2

            };

            console.log(unfollowJson);

            UserService.unfollow($rootScope.user.id, unfollowJson)
                .then(function(response){

                    console.log("inside then() of UserService.follow");
                    console.log(response.data);

                    $rootScope.user = response.data.whoUnFollowed;
                    $scope.toBeDisplayedUser = response.data.whom;

                    $scope.isFollowing = false;
                    tempUser1 = {};
                    tempUser2 = {};
                    //console.log("////////////////////////////////");
                    //console.log($rootScope.user);
                    //console.log($scope.toBeDisplayedUser);

                });

        }


        function follow(){

            console.log("*****************************************************************");
            console.log($scope.toBeDisplayedUser);

            var tempUser1 = {};
            angular.copy($rootScope.user,tempUser1);
            tempUser1.following.push($scope.toBeDisplayedUser.username);


            var tempUser2 = {};
            angular.copy($scope.toBeDisplayedUser, tempUser2);
            tempUser2.followers.push($rootScope.user.username);


            var followJson = {

                "whoWantsToFollow" : tempUser1,
                "whom" : tempUser2

            };

            console.log(followJson);

            UserService.follow($rootScope.user.id, followJson)
                .then(function(response){

                    console.log("inside then() of UserService.follow");
                    console.log(response.data);

                    $rootScope.user = response.data.whoFollowed;
                    $scope.toBeDisplayedUser = response.data.whom;
                    $scope.isFollowing = true;
                    tempUser1 = {};
                    tempUser2 = {};
                    //console.log("////////////////////////////////");
                    //console.log($rootScope.user);
                    //console.log($scope.toBeDisplayedUser);

                });

        }


        function getUserFromUserName(){

            UserService.findUserByUsername($scope.Username)
                .then(function(response){


                    if(response.data){
                        console.log(response);
                        console.log("yahooooooooooooooooooooooooooooooooooooooooooooooooooooooo");
                        $scope.toBeDisplayedUser = response.data;

                        for(var i=0;i<$rootScope.user.following.length;i++){

                            var friend = $rootScope.user.following[i];

                            //console.log("is following is : " + friend);

                            if($scope.toBeDisplayedUser.username == friend){

                                $scope.isFollowing = true;
                                break;
                            }

                        }

                        console.log("inside getUserFromUserName ::::::::::::::::::");
                        console.log($scope.toBeDisplayedUser);
                        console.log($scope.toBeDisplayedUser);
                    }

                });

        }


        function initialDisplayOfStocks(){

            console.log("to be displayed user is : " + $scope.Username);

            if($scope.Username) {
                WatchListService.findAllWatchlistStocksForUserWithUsername($scope.Username)
                    .then(function (response) {
                        console.log("/////////////////////////////////////////");
                        console.log(response.data);
                        angular.copy(response.data, $scope.stocks);
                        console.log($scope.stocks);
                    });

            }


        }



    }
})();