//                  //
// global variables //
//                  //

// strings that hold the currently featured item ids
let featuredMovie = "343611";
let featuredMeal = "52772";
let featuredDrink = "11007";

// array that holds the previously saved date nights
let savedDateNights = [
    { 
        id: 1, 
        movie: "35056", 
        movieImg: "https://www.themoviedb.org/t/p/w500/oXwpl4mdd8MYPkUMggREzSf9c5R.jpg",
        meal: "52992",
        mealImg: "https://www.themealdb.com/images/media/meals/o2wb6p1581005243.jpg",
        drink: "11001",
        drinkImg: "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg"
    },
    { 
        id: 2, 
        movie: "2493", 
        movieImg: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/whF3YddFYSwJNuHEvi5lpsnty2l.jpg",
        meal: "52987",
        mealImg: "https://www.themealdb.com/images/media/meals/xr0n4r1576788363.jpg",
        drink: "11009",
        drinkImg: "https://www.thecocktaildb.com/images/media/drink/3pylqc1504370988.jpg"
        }
];

//           //
// functions //
//           //

// fetch movie data from api
let getMovieData = function (id)
{
    // format themoviedb.org api url
    let apiUrl = "https://api.themoviedb.org/3/movie/" + id + "?api_key=0a6cff8e56d74eb3ed1b51e6620176c1"

    // make a request to the url
    fetch(apiUrl)
        .then(function(response) {
        // if request was successful 
            if (response.ok) {
                response.json().then(function(data) {
                    populateFeaturedMovie(data);
                    // return data;
                });
            // request fails
            } else {
                $("#modal").addClass("is-active");
                $("#modalTitle").text("Error: Unable to complete request");
                $("#modalMain").empty().append(`<p>` + response.statusText + `</p>`);
                // alert("Error: " + response.statusText);
            }
        })  
        // alert user if there is no responce from themoviedb.org
        .catch(function(error) {
            $("#modalTitle").text("Unable to connect to themoviedb.org");
            $("#modalMain").empty().append(`<p> Please check your connection </p>`);
        })
};

// fetch meal data from api
let getMealData = function (id)
{
    // make and api call to get the meal data using the meal id
};

// fetch drink data from api
let getDrinkData = function (id)
{
    // make and api call to get the drink data using the drink id
};

// get a random movie id by genre
let getRandomMovie = function () {
    // get user genre selection
    let genre = $("#movie-genre").val() || [];
    console.log ("Selected genre id is " + genre);

    // set a random value for one of the first 5 pages of results
    let random = Math.floor(Math.random() * 5) + 1;

    // format themoviedb.org api url to select by genre randomly from the 100 most popular results
    let apiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=0a6cff8e56d74eb3ed1b51e6620176c1&language=en-US&include_adult=false&include_video=false&with_genres=" + genre + "&with_original_language=en&page=" + random;

    // make a request to the url
    fetch(apiUrl)
        .then(function(response) {
        // if request was successful 
            if (response.ok) {
                response.json().then(function(data) {
                    // populateFeaturedMovie(data);
                    let randomMovie = Math.floor(Math.random() * data.results.length);

                    // select a random movie from the returned list
                    featuredMovie = (data.results[randomMovie].id);

                    populateFeaturedMovie(featuredMovie);
                });
            // request fails
            } else {
                $("#modal").addClass("is-active");
                $("#modalTitle").text("Error: Unable to complete request");
                $("#modalMain").empty().append(`<p>` + response.statusText + `</p>`);
                // alert("Error: " + response.statusText);
            }
        })  
        // alert user if there is no responce from themoviedb.org
        .catch(function(error) {
            $("#modalTitle").text("Unable to connect to themoviedb.org");
            $("#modalMain").empty().append(`<p> Please check your connection </p>`);
        })

};

// get a random meal id by type
let getRandomMealByType = function() {
    let type = $("#meal-type").val() || [];
    console.log (type);
    
    // make a search call to the api to get a list of meals

    // select a random meal from the list

    // return the meal id

};

// get a random meal id by country
let getRandomMealByCountry = function() {
    let country = $("#meal-country").val() || [];
    console.log (country);
        
    // make a search call to the api to get a list of meals

    // select a random meal from the list

    // return the meal id

};

// get a random drink id by type
let getRandomDrink = function() {
    let type = $("#drink-type").val() || [];
    console.log (type);
        
    // make a search call to the api to get a list of drinks

    // select a random drink from the list

    // return the drink id

}

// populate featured Movie
let populateFeaturedMovie = function(id) {

    console.log("Movie id is " + id);

    // format themoviedb.org api url
    let apiUrl = "https://api.themoviedb.org/3/movie/" + id + "?api_key=0a6cff8e56d74eb3ed1b51e6620176c1"

    // make a request to the url
    fetch(apiUrl)
        .then(function(response) {
        // if request was successful 
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    
                    // generate HTML to populate the featured movie section
                    $("#featured-movie").empty().append(`
                    <!-- Movie Poster -->
                                <article class="tile is-child is-6" >
                                    <figure class="image is-2by3">
                                    <img id="poster_path" src="https://image.tmdb.org/t/p/w500` + data.poster_path +`">
                                    </figure>
                                </article>
                                <!-- Movie Info -->
                                <article id="movie-info" class="m-4">
                                    <p class="title" id="title">` + data.title + `</p>
                                    <p class="subtitle" id="tagline">` + data.tagline + `</p>
                                    <p class="block" id="overview">` + data.overview + `</p>
                                    <span class="tag is-dark mb-1" id="vote_average">Average Rating: ` + data.vote_average + `</span>
                                    <span class="tag is-dark mb-2" id="runtime">Runtime: ` + data.runtime + ` mins</span></br>
                                </article>
                    `);

                    // make a new tag for each item in the movie's genre array
                    data.genres.forEach(genre => $("#movie-info").append(`<span class="tag is-link mb-1 mx-1" id="` + genre.name + `">` + genre.name + `</span>`));

                    $("#movie-info").append(`</br><a href="https://www.imdb.com/title/` + data.imdb_id + `/" target="_blank" class="button is-rounded is-warning mt-2">View on IMDB</a>`);
                    
                });
            // request fails
            } else {
                $("#modal").addClass("is-active");
                $("#modalTitle").text("Error: Unable to complete request");
                $("#modalMain").empty().append(`<p>` + response.statusText + `</p>`);
                // alert("Error: " + response.statusText);
            }
        })  
        // alert user if there is no responce from themoviedb.org
        .catch(function(error) {
            $("#modalTitle").text("Unable to connect to themoviedb.org");
            $("#modalMain").empty().append(`<p> Please check your connection </p>`);
        })

    // let random = Math.floor(Math.random() * movieData.results.length);

    // select a random movie from the returned list
    // featuredMovie = (movieData.results[random].id);

    // console.log(featuredMovie)

    
    // populate the #title with the .title

    // populate the #tagline with .tagline

    // populate the #poster_path with the .poster_path

    // populate the #vote_average && #runtime with the .vote_average && .runtime && .popularity && .genres 

    // populate the #overview with the .overview

    // populate available streaming services
};

// populate featured Meal
let populateFeaturedMeal = function(mealData) {

    // call the API using the global featuredMeal variable

    // populate the #strMealThumb with the .strMealThumb

    // populate the #strMeal with the .strMeal

    // populate the #strCategory with the .strCategory

    // populate the #ingrediants with an .strIngredient[i] for loop

};

// populate featured Drink
let populateFeaturedDrink = function(drinkData) {

    // call the API using the global featuredDrink variable

    // populate the #strDrinkThumb with the .strDrinkThumb

    // populate the #strDrink with the .strDrink

    // populate the #strIBA with the .strIBA

    // populate the #ingrediants with an .strIngredient[i] for loop

};

// populate the modal with movie details
let movieDetail = function(movieData) {
    // make modal visable
    $("#modal").addClass("is-active");

    // call the API using the global featuredMovie variable

    // populate the #modalTitle with the .title

    // populate the #modalImage with the .poster_path

    // populate the #modalDetails with the .vote_average && .runtime && .popularity && .genres 

    // populate the #modalText with the .overview

    // populate the #modalVideo with the .video (if available)
};

// populate the modal with meal details
let mealDetail = function(mealData) {
    // make modal visable
    $("#modal").addClass("is-active");

    // call the API using the global featuredMeal variable

    // populate the #modalTitle with the .strMeal

    // populate the #modalImage with the .strMealThumb

    // populate the #modalDetails with an .strIngredient[i] && .strMeasure[i] for loop

    // populate the #modalText with the .strInstructions

    // populate the #modalVideo with the .strYoutube (if available)
};

// populate the modal with drink details
let drinkDetail = function(drinkData) {
    // make modal visable
    $("#modal").addClass("is-active");

    // call the API using the global featuredDrink variable

    // populate the #modalTitle with the .strDrink

    // populate the #modalImage with the .strDrinkThumb

    // populate the #modalDetails with an .strIngredient[i] && .strMeasure[i] for loop

    // populate the #modalText with the .strInstructions

    // populate the #modalVideo with the .strVideo (if available)
};

// save the current featured values as a date night
let saveCurrentPicks = function() {

};

// save the date nights to local storage
let saveDateNights = function() {

};

// load the date nights from local storage
let loadDateNights = function() {

};


getRandomMovie();

//                //
// event handlers //
//                //

// change arrow to finger to signify click events
$(".link").css('cursor', 'pointer');

// movie detail click event
// $("#featured-movie").on("click", movieDetail);

// meal detail click event
$("#featured-meal").on("click", mealDetail);

// drink detail click event
$("#featured-drink").on("click", drinkDetail);

// close modal click event
$("#modal-close").on("click", function(event){
    $("#modal").removeClass("is-active");
});

// replace movie click event
$("#movie-genre-submit").on("click", getRandomMovie);

// replace meal type click event
$("#meal-type-submit").on("click", getRandomMealByType);

// replace meal country click event
$("#meal-country-submit").on("click", getRandomMealByCountry);

// replace drink click event
$("#drink-type-submit").on("click", getRandomDrink);