require("dotenv").config();

var axios = require("axios");

let keys = require("./keys.js");

const Spotify = require("node-spotify-API");

var moment = require("moment");

var spotify = new Spotify(keys.spotify);

var date;

var phrase = process.argv[2];

var media;

var input = [];

var fs = require("fs");

for (i = 3; i < process.argv.length; i++) {
    input.push(process.argv[i])
};

var search = function() {spotify.search({ type: "track", query: input.join(" "), limit: 1 }, function (err, data) {
    if (err) {
        return console.log("error occurred " + err);
    }
    console.log("\nArtist(s): " + data.tracks.items[0].album.artists[0].name);
    console.log("\nAlbum: " + data.tracks.items[0].album.name);
    console.log("\nTitle: " + data.tracks.items[0].name);
    console.log("\nPreview Clip: " + data.tracks.items[0].preview_url);
    
    fs.appendFile("log.txt", data.tracks.items[0].album.artists[0].name + data.tracks.items[0].album.name + data.tracks.items[0].name + data.tracks.items[0].preview_url, function(err) {
        if (err) {
            console.log(err);
        }
        else {
           
            
        }
    });
});
}

var concert = function() {
    axios.get("https://rest.bandsintown.com/artists/" + input.join(" ") + "/events?app_id=codingbootcamp&limit=1").then(
        function (response) {
            console.log(response);
            // console.log(media);

            for (i = 0; i < response.data.length; i++) {
                let date = response.data[i].datetime;
                console.log("\nVenue: " + response.data[i].venue.name);
                console.log("\n Date: " + moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a"));
                console.log("\n City: " + response.data[i].venue.city);
                console.log("\n Country: " + response.data[i].venue.country + "\n");

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

var movies = function() {
    if (process.argv.length === 3) {
        console.log("F this");
        axios.get("http://www.omdbapi.com/?t=Mr Nobody&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log("\nTitle: " + response.data.Title);
                console.log("\nYear: " + response.data.Year);
                console.log("\nRating(IMDB): " + response.data.imdbRating);
                console.log("\nRating(RottenTomatoes): " + response.data.Ratings[1].Value);
                console.log("\n Country: " + response.data.Country);
                console.log("\n Language: " + response.data.Language);
                console.log("\n Plot: " + response.data.Plot);
                console.log("\n Actors: " + response.data.Actors);
            })

    }
    else {
        axios.get("http://www.omdbapi.com/?t=" + input.join(" ") + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                // console.log(response);
                console.log("\nTitle: " + response.data.Title);
                console.log("\nYear: " + response.data.Year);
                console.log("\nRating(IMDB): " + response.data.imdbRating);
                console.log("\nRating(RottenTomatoes): " + response.data.Ratings[1].Value);
                console.log("\n Country: " + response.data.Country);
                console.log("\n Language: " + response.data.Language);
                console.log("\n Plot: " + response.data.Plot);
                console.log("\n Actors: " + response.data.Actors);

                fs.appendFile("log.txt", response.data.Title + response.data.Year + response.data.imdbRating + response.data.Ratings[1].Value + response.data.Country + response.data.Language + response.data.Plot + response.data.Actors, function(err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        
                        
                    }
                });

            });
    }
}
// console.log(input);
// console.log(input.join("&"));
// console.log(process.argv.length);
// if (phrase === "do-what-it-says") {
//     fs.readFile("random.txt", "utf8", function(error, data) {
//         if (error) {
//             return console.log(error);
            
//         }
//         // console.log(data);
//         var dataArr = data.split(",")
//         console.log(dataArr[0]);
//         console.log(dataArr[1]);
//         dataArr[0] = process.argv[2];
//         dataArr[1] = process.argv[3];
//         console.log(process.argv[2]);
        
//     })
// }
if (phrase === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
            
        }
        process.argv = [];
        // console.log(data);
        var dataArr = data.split(",")
        // console.log(dataArr[0]);
        // console.log(dataArr[1]);
        // dataArr[0] = process.argv[2];
        // dataArr[1] = process.argv[3];
        // process.argv.push("node", "liri.js", dataArr[0], dataArr[1])
        // console.log(process.argv[2]);
        // console.log(process.argv[3]);
        phrase = dataArr[0];
        input.push(dataArr[1])
        // console.log(input.join());
        
        // process.argv(dataArr[0], dataArr[1])
        if (phrase === "spotify-this-song") {
        search();
        }
        if (phrase === "concert-this") {
        concert();
        }
        if (phrase === "movie-this") {
            movies();
        }
    });  

}

if (phrase === "spotify-this-song") {
    search();
}


if (phrase === "concert-this") {
    concert();
}
//     axios.get("https://rest.bandsintown.com/artists/" + input.join(" ") + "/events?app_id=codingbootcamp&limit=1").then(
//         function (response) {
//             console.log(response);
//             // console.log(media);

//             for (i = 0; i < response.data.length; i++) {
//                 let date = response.data[i].datetime;
//                 console.log("\nVenue: " + response.data[i].venue.name);
//                 console.log("\n Date: " + moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a"));
//                 console.log("\n City: " + response.data[i].venue.city);
//                 console.log("\n Country: " + response.data[i].venue.country + "\n");

//                 fs.appendFile("log.txt", response.data[i].venue.name + moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a") + response.data[i].venue.city + response.data[i].venue.country, function(err) {
//                     if (err) {
//                         console.log(err);
//                     }
//                     else {
//                         console.log("Content Added!");
                        
//                     }
//                 });
//             }
//         });
// }

if (phrase === "movie-this") {
    movies();
}
//     if (process.argv.length === 3) {
//         console.log("F this");
//         axios.get("http://www.omdbapi.com/?t=Mr Nobody&y=&plot=short&apikey=trilogy").then(
//             function (response) {
//                 console.log("\nTitle: " + response.data.Title);
//                 console.log("\nYear: " + response.data.Year);
//                 console.log("\nRating(IMDB): " + response.data.imdbRating);
//                 console.log("\nRating(RottenTomatoes): " + response.data.Ratings[1].Value);
//                 console.log("\n Country: " + response.data.Country);
//                 console.log("\n Language: " + response.data.Language);
//                 console.log("\n Plot: " + response.data.Plot);
//                 console.log("\n Actors: " + response.data.Actors);
//             })

//     }
//     else {
//         axios.get("http://www.omdbapi.com/?t=" + input.join(" ") + "&y=&plot=short&apikey=trilogy").then(
//             function (response) {
//                 // console.log(response);
//                 console.log("\nTitle: " + response.data.Title);
//                 console.log("\nYear: " + response.data.Year);
//                 console.log("\nRating(IMDB): " + response.data.imdbRating);
//                 console.log("\nRating(RottenTomatoes): " + response.data.Ratings[1].Value);
//                 console.log("\n Country: " + response.data.Country);
//                 console.log("\n Language: " + response.data.Language);
//                 console.log("\n Plot: " + response.data.Plot);
//                 console.log("\n Actors: " + response.data.Actors);

//                 fs.appendFile("log.txt", response.data.Title + response.data.Year + response.data.imdbRating + response.data.Ratings[1].Value + response.data.Country + response.data.Language + response.data.Plot + response.data.Actors, function(err) {
//                     if (err) {
//                         console.log(err);
//                     }
//                     else {
//                         console.log("Content Added!");
                        
//                     }
//                 });

//             });
//     }

// }

// if (phrase === "do-what-it-says") {
//     fs.readFile("random.txt", "utf8", function(error, data) {
//         if (error) {
//             return console.log(error);
            
//         }
//         // console.log(data);
//         var dataArr = data.split(",")
//         console.log(dataArr[0]);
//         console.log(dataArr[1]);
//         // dataArr[0] = process.argv[2];
//         // dataArr[1] = process.argv[3];
//         process.argv.push(dataArr[0], dataArr[1])
//         console.log(process.argv[2]);
//         console.log(process.argv);
//         // process.argv(dataArr[0], dataArr[1])
        
//     })
// }
