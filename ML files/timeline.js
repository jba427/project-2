
//this works to give unique movies with year

d3.json("/data").then(function(movieData) {
    console.log(movieData);
    let uniqueMovies = [];

    movieData.forEach(function(currentMovie) {
  //some way to get unique movies & store title & year
        if (uniqueMovies.indexOf(currentMovie.movieTitle) === -1){
            uniqueMovies.push((currentMovie.startYear), (currentMovie.movieTitle));
          }

  });
    console.log(uniqueMovies);
    return uniqueMovies;

});

//trying to create a timeline of movies with years
// https://github.com/kristw/d3kit-timeline
//https://bl.ocks.org/zachcp/raw/0f2aadb4a2ea453b0804/
//https://bl.ocks.org/zachcp/0f2aadb4a2ea453b0804

// var chart = new d3KitTimeline('timeline', (uniqueMovies), {
// 	  direction: 'right',
// 	  initialWidth: 600,
// 	  initialHeight: 600,
// 		labelBgColor: "#777",
// 	  textFn: uniqueMovies
// 	})

//milestones version of timeline
//https://github.com/walterra/d3-milestones
// let timeline = milestones('#timeline')
//     .mapping({
//       'timestamp': 'uniqueMovies',
//       'text': 'movieTitle'
//     })
//     .parseTime('%Y')
//     .aggregateBy('startYear')
//     .render(uniqueMovies)
//     // .render([
//     //   { startYear: 1942, movieTitle: 'Casablanca' },
//     //   { startYear: 1957, movieTitle: 'Vikings' },
//     //   { startYear: 1990, movieTitle: 'city of Oslo' },
//     //   { startYear: 2001, movieTitle: 'Battle of Hastings.' }
//     // ]);