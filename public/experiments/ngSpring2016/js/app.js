(function () {
    angular
        .module("MovieDBApp", [])
        .controller("MovieListController", movieListController);

    function movieListController($scope){
        var movies = [
            {id:123, title:"AVATAR", year: 2007},
            {id:234, title:"star wars", year: 1977}
        ];

        $scope.movies = movies;

        //event handler definitions
        $scope.removeMovie = removeMovie;
        $scope.addMovie = addMovie;
        $scope.selectMovie = selectMovie;
        $scope.updateMovie = updateMovie;

        // event handler implementations
        function addMovie(newMovie){

            myNewMovie = newMovie;

            var myNewMovie = {
                id:newMovie.id,
                title:newMovie.title,
                year: newMovie.year
            };

            $scope.newMovie = {};

            $scope.movies.push(myNewMovie);

        }

        function removeMovie(currentMovie){
            var index = $scope.movies.indexOf(movie);
            $scope.movies.splice(index,1);
        }

        function removeMovieByIndex(index){
            console.log(index);

            $scope.movies.splice(index,1);
        }

        function selectMovie(movie){

            //$scope.newMovie.id = movie.id;
            //$scope.newMovie.title = movie.title;
            //$scope.newMovie.year = movie.year;

            $scope.selectedMovieIndex = $scope.movies.indexOf(movie);;//This is just to keep track of the selected movie

            $scope.newMovie = {
                id : movie.id,
                title : movie.title,
                year : movie.year
            }


        }

        function updateMovie(movie){

            $scope.movies[$scope.selectedMovieIndex] = {
                id : movie.id,
                title : movie.title,
                year : movie.year
            }

        }

    }



})();