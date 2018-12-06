//Require the dotenv npm package to make use of the .env file
require("dotenv").config();

//Create a variable to require axios for API calls
var axios = require("axios");

//Create a variable to require keys.js to get the spotify API key
let keys = require("./keys.js");

//Create a variable to hold the node-spotify-API npm to more easily get to spotify data
const Spotify = require("node-spotify-API");

//Create a variable to require the moment npm package to parse dates
var moment = require("moment");

//Create a varaible to hold the spotify keys from .env
var spotify = new Spotify(keys.spotify);

//An empty global variable to hold the date
var date;

//A variable to hold the user input at the index[2] of process.argv (movie this || spotify this || concert this)
var phrase = process.argv[2];

//A variable to hold an empty array that will take in the user input after index[2] of process.argv
var input = [];

//A variable to require the fs npm package
var fs = require("fs");

//A for loop to push the user input after index[2] of process.argv into the input array 
for (i = 3; i < process.argv.length; i++) {
    input.push(process.argv[i])
};

//A variable to hold the search function that searches spotify. Also, takes the users' input, joins it and puts it into the spotify search query
var music = function() {spotify.search({ type: "track", query: input.join(" "), limit: 1 }, function (err, data) {

    //if there is an error log it and tell what the error was
    if (err) {
        return console.log("error occurred " + err);
    }

    //log the info returned from the spotify search to the console
    console.log("\nArtist(s): " + data.tracks.items[0].album.artists[0].name);
    console.log("\nAlbum: " + data.tracks.items[0].album.name);
    console.log("\nTitle: " + data.tracks.items[0].name);
    console.log("\nPreview Clip: " + data.tracks.items[0].preview_url + "\n");

    //Also apppend log.txt with the same information
    fs.appendFile("log.txt", data.tracks.items[0].album.artists[0].name + data.tracks.items[0].album.name + data.tracks.items[0].name + data.tracks.items[0].preview_url, function(err) {
        if (err) {
            console.log(err);
        }
        else {
           
            
        }
    });
});
}

// A variable to hold the concert function that searches the bandsintown API
var concert = function() {

    //search the bandsintown API putting the userinput into the search query
    axios.get("https://rest.bandsintown.com/artists/" + input.join(" ") + "/events?app_id=codingbootcamp&limit=1").then(
        function (response) {
            console.log(response);

            //a for loop to get the information from all the different concert dates and print different info from inside
                for (i = 0; i < response.data.length; i++) {

                    // a variable to hold the date information so we can use moment.js to display it in a nice way
                let date = response.data[i].datetime;

                //log all the information we want from the API call to the console
                console.log("\nVenue: " + response.data[i].venue.name);

                //use moment npm to print the date nicely
                console.log("\n Date: " + moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a"));
                console.log("\n City: " + response.data[i].venue.city);
                console.log("\n Country: " + response.data[i].venue.country + "\n");

                //Also append all that information to log.txt
                fs.appendFile("log.txt", response.data[i].venue.name + moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a") + response.data[i].venue.city + response.data[i].venue.country, function(err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        
                        
                    }
                });
            }
        });

};

//a variable to hold to movies function
var movies = function() {

    //if the user doesn't input a title (if process.argv.length === 3)
    if (process.argv.length === 3) {

        //use axios to search to omdb api and return the information for Mr. Nobody
        axios.get("http://www.omdbapi.com/?t=Mr Nobody&y=&plot=short&apikey=trilogy").then(
            function (response) {
                var movieData1 = response.data;

                //print the Mr. Nobody info to the console
                console.log("\nTitle: " + movieData1.Title);
                console.log("\nYear: " + movieData1.Year);
                console.log("\nRating(IMDB): " + movieData1.imdbRating);
                console.log("\nRating(RottenTomatoes): " + movieData1.Ratings[1].Value);
                console.log("\n Country: " + movieData1.Country);
                console.log("\n Language: " + movieData1.Language);
                console.log("\n Plot: " + movieData1.Plot);
                console.log("\n Actors: " + movieData1.Actors + "\n");
            })

    }

    //else (if the user did put in a title)
    else {

        //use axios to search to omdb api using the user input in the search query
        axios.get("http://www.omdbapi.com/?t=" + input.join(" ") + "&y=&plot=short&apikey=trilogy").then(
            function (response) {

                //create a response.data variable to get into to movie response
                var movieData = response.data

                // Print the information we want from the users desired title to the console
                console.log("\nTitle: " + movieData.Title);
                console.log("\nYear: " + movieData.Year);
                console.log("\nRating(IMDB): " + movieData.imdbRating);
                console.log("\nRating(RottenTomatoes): " + movieData.Ratings[1].Value);
                console.log("\n Country: " + movieData.Country);
                console.log("\n Language: " + movieData.Language);
                console.log("\n Plot: " + movieData.Plot);
                console.log("\n Actors: " + movieData.Actors + "\n");

                //Also append the information to the log.txt file
                fs.appendFile("log.txt", movieData.Title + movieData.Year + movieData.imdbRating + movieData.Ratings[1].Value + movieData.Country + movieData.Language + movieData.Plot + movieData.Actors, function(err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        
                        
                    }
                });

            });
    }
}

// If "phrase" (process.argv[2]) is do-what-it-says then run a function
if (phrase === "do-what-it-says") {

    //Read the random.txt file to get the information
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
            
        }

        //Empty out the process.argv array
        // process.argv = [];

        //A variable to hold the data split into a string separated by a comma
        var dataArr = data.split(",")
        
        //set the phrase variable to get the dataArr information at the index of [0]
        phrase = dataArr[0];
        
        //push the information at dataArr[1] (name of song/movie) to the input array
        input.push(dataArr[1]);
        
        // if random.txt points to a song
        if (phrase === "spotify-this-song") {
        music();
        }
        // if random.txt points to a concert
        if (phrase === "concert-this") {
        concert();
        }
        // if random.txt points to a movie
        if (phrase === "movie-this") {
            movies();
        }
    });  

}
// if the user input at process.argv[2] is searching for a song (spotify-this-song)
if (phrase === "spotify-this-song") {
    //call the search function
    music();
}

// if the user input at process.argv[2] is searching for concert information (concert-this)
if (phrase === "concert-this") {
    //call the concert function
    concert();
}

// if the user input at process.argv[2] is searching for a movie (movie-this)
if (phrase === "movie-this") {
    //call the concert function
    movies();
}
