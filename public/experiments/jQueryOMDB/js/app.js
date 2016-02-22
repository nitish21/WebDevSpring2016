(function (){
    $(init);

    //here $ is added to front of variable
    var $movieTitle;
    var $searchButton;

    var $tbody;

    var searchUrl = "http://www.omdbapi.com/?s=TITLE&page=PAGE";

    function init(){

        $movieTitle = $("#movieTitleTxt");
        $searchButton = $("#searchMovieBtn");

        $tbody = $("#searchResults tbody");
        $searchButton.click(searchMovie);

    }

    function searchMovie(){
        //alert("Inside search movie!");
        var movieTitle = $movieTitle.val();


        var url = searchUrl
            .replace("TITLE",movieTitle)
            .replace("PAGE",1);

        //alert("urk is : " + url);

        $.ajax({
            url : url,
            success: renderMovieList
        });
    }


    function renderMovieList(response){

        //alert("Movie List");

        $tbody.empty();
        console.log(response);

        movies = response.Search;

        for(m=0;m<movies.length;m++){

            var movie = movies[m];

            var title = movie.Title;
            var imdbId = movie.imdbID;
            var poster = movie.Poster;

            console.log(title);

            var $tr = $("<tr>");

            var $img = $("<img>")
                .attr("src",poster);

            var $td = $("<td>");
            $td.append($img);
            $tr.append($td);

            $td = $("<td>");
            $td.append(title);
            $tr.append($td);

            $td= $("<td>")
                .append(imdbId);
            $tr.append($td);

            $tbody.append($tr);

        }
    }


})();