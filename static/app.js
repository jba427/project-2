// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================

// Step 3:
// Import data from the movie json
// =================================
d3.json("static/film_data.json", function(movieData) {


drawBar(movieData)


///////////////
//Joe changes
///////////////

var tbody = d3.select("tbody");

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("#filters");

// Create event handlers 
button.on("click", runEnter);
form.on("submit",runEnter);

// Complete the event handler function for the form
function runEnter() {
    filteredData = []
    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#startYear");
    var inputElement2 = d3.select("#endYear");
    var inputElement3 = d3.select("#person");
    var inputElement4 = d3.select("#movie");
    var inputElement5 = d3.select("#rating");
    var inputElement6 = d3.select("#genre");
  
    d3.selectAll("svg").remove()
    // Get the value property of the input element
    var inputValue = inputElement.property("value");
    var inputValue2 = inputElement2.property("value");
    var inputValue3 = inputElement3.property("value");
    var inputValue4 = inputElement4.property("value");
    var inputValue5 = inputElement5.property("value");
    var inputValue6 = inputElement6.property("value");
  
    console.log(inputValue);
    console.log(inputValue2);
    console.log(inputValue3);
    console.log(inputValue4);
    console.log(inputValue5);
    console.log(inputValue6);
  
    //Start year and End year both valid years, and start < end
    if (inputValue >= 1894 && inputValue <= 2020 && inputValue2 >=1894 && inputValue2 <= 2020 && inputValue < inputValue2) 
    {
      var filteredData = movieData.filter(movieData => movieData.startYear >= inputValue);
      var filteredData = filteredData.filter(filteredData => filteredData.startYear <= inputValue2);
      console.log("Start year and end year given:", inputValue, inputValue2);
      console.log(filteredData);
    }
    //Start year and End year both valid years, and start = end
    else if (inputValue >= 1894 && inputValue <= 2020 && inputValue2 >=1894 && inputValue2 <= 2020 && inputValue == inputValue2) 
    {
      var filteredData = movieData.filter(movieData => movieData.startYear == inputValue);
      console.log("Start year and end year are the same:", inputValue, inputValue2);
      console.log(filteredData);
    }
    //Valid start year, no end year
    else if (inputValue >= 1894 && inputValue <= 2020 && inputValue2.length < 1)
    {
      var filteredData = movieData.filter(movieData => movieData.startYear >= inputValue);
      console.log("Only Start Year given:", inputValue);
      console.log(filteredData);
    }
    //No start year, only end year
    else if (inputValue.length < 1 && inputValue2 >= 1894 && inputValue2 <= 2020)
    {
      var filteredData = movieData.filter(movieData => movieData.startYear <= inputValue2);
      console.log("Only End Year given:", inputValue);
      console.log(filteredData);
    } 
    //no years to be filtered by
    else {
      var filteredData = movieData;
      console.log("No year filter given");
      console.log(filteredData);
    };

     //filter by person
    if (inputValue3.length >= 1) {
      var filteredData = filteredData.filter(filteredData => filteredData.Name.toUpperCase() == inputValue3.toUpperCase());
      console.log("Person value entered:", inputValue3);
      console.log(filteredData);
    }
    //no person filter
    else {
      var filteredData = filteredData;
      console.log("No Person value entered");
      console.log(filteredData);
    };

    //filter by Movie title
    if (inputValue4.length >= 1) {
      var filteredData = filteredData.filter(filteredData => filteredData.movieTitle.toUpperCase() == inputValue4.toUpperCase());
      console.log("Movie value entered:", inputValue4);
      console.log(filteredData);
    }
    //no movie title filter
    else {
      var filteredData = filteredData;
      console.log("No Movie value entered");
      console.log(filteredData);
    };

    //filter by rating
    if (inputValue5.length >= 1) {
      var filteredData = filteredData.filter(filteredData => filteredData.averageRating >= inputValue5);
      console.log("Rating value entered:", inputValue5);
      console.log(filteredData);
    }
    //no rating filter
    else {
      var filteredData = filteredData;
      console.log("No Rating value entered");
      console.log(filteredData);
    };

    //filter by genre
    if (inputValue6.length >= 1) {
      var filteredData = filteredData.filter(filteredData => filteredData.genres.includes(inputValue6));
      console.log("Genre value entered:", inputValue6);
      console.log(filteredData);
    }
    //no genre filter
    else {
      var filteredData = filteredData;
      console.log("No Genre value entered");
      console.log(filteredData);
    };

    console.log(filteredData);
      drawBar(filteredData)
    
    listData = [];
    
    filteredData.forEach((filteredData) => {
      DumbList = []
      Lister = Object.entries(filteredData).forEach( ([key, value] ) => {
        DumbList.push(value);
      });
      listData.push(DumbList)
    });

    $(document).ready(function() {
      $('#movie-table').DataTable({
        retrieve: true,
        data: listData,
        columns: [
          {title: "Name"},
          {title: "averageRating"},
          {title: "characters"},
          {title: "genres"},
          {title: "movieTitle"},
          {title: "numVotes"},
          {title: "role"},
          {title: "runtimeMinutes"},
          {title: "startYear"},
        ] 
      });
    });
};

function drawBar(Fdata){
  var horror_fil = function(val){
    return val == `Horror`
  }
  var rom_fil = function(val){
    return val == `Romance`
  }
  var comedy_fil = function(val){
    return val == `Comedy`
  }
  var action_fil = function(val){
    return val == `Action`
  }
  var drama_fil = function(val){
    return val == `Drama`
  }
  
  var myst_fil = function(val){
    return val == `Mystery`
  }
  
  var sci_fil = function(val){
    return val == `Sci-Fi`
  }
  var noir_fil = function(val){
    return val == `Film-Noir`
  }
  var fam_fil = function(val){
    return val == `Family`
  }
  var war_fil = function(val){
    return val == `War`
  }
  
  horror_list = []
  romance_list = []
  comedy_list = []
  action_list = []
  drama_list = []
  mystery_list = []
  sci_list = []
  noir_list = []
  family_list = []
  war_list = []
  film_list = []
  year_list = []
  rating_list = []
  
    Fdata.forEach(function(data) {
      data.startYear = +data.startYear;
      all_genre = data.genres.split(",")
      title = data.movieTitle
      rating = data.averageRating

      horror = all_genre.filter(horror_fil)
      romance = all_genre.filter(rom_fil)
      comedy = all_genre.filter(comedy_fil)
      action = all_genre.filter(action_fil)
      drama = all_genre.filter(drama_fil)
      mystery = all_genre.filter(myst_fil)
      sci = all_genre.filter(sci_fil)
      noir = all_genre.filter(noir_fil)
      fam = all_genre.filter(fam_fil)
      war = all_genre.filter(war_fil)
     
      rating_list.push(rating)
      year_list.push(data.startYear)
      film_list.push(title)
      horror_list.push(horror)
      romance_list.push(romance)
      comedy_list.push(comedy)
      action_list.push(action)
      drama_list.push(drama)
      mystery_list.push(mystery)
      sci_list.push(sci)
      noir_list.push(noir)
      family_list.push(fam)
      war_list.push(war)

    });

    horror_stat = horror_list.filter(horror_fil).length
    romance_stat = romance_list.filter(rom_fil).length
    action_stat = action_list.filter(action_fil).length
    comedy_stat = comedy_list.filter(comedy_fil).length
    drama_stat = drama_list.filter(drama_fil).length 
    mystery_stat = mystery_list.filter(myst_fil).length
    sci_stat = sci_list.filter(sci_fil).length
    noir_stat = noir_list.filter(noir_fil).length
    fam_stat = family_list.filter(fam_fil).length
    war_stat = war_list.filter(war_fil).length
  

    // console.log(year_list)
    console.log("Romance Stat:" + romance_stat)
    console.log("Action stat:" + action_stat)
    console.log("Comedy stat:" + comedy_stat)
    console.log("Drama Stat:" + drama_stat)
    console.log("Mystery Stat:" + mystery_stat)
    console.log("Sci-Fi Stat:" + sci_stat)
    console.log("Noir Stat:" + noir_stat)
    console.log("Family Stat:" + fam_stat)
    console.log("War Stat:" + war_stat)
    
    var genreDict = [
      {"genre": "romance", "count":romance_stat},
      {"genre": "action", "count":action_stat},
      {"genre":"comedy", "count":comedy_stat},
      {"genre": "drama", "count": drama_stat},
      {"genre":"Mystery", "count": mystery_stat},
      {"genre":"film-noir", "count":noir_stat},
      {"genre":"family", "count": fam_stat},
      {"genre":"war", "count": war_stat}
    ]
    
    Array.prototype.unique = function() {
      var a = this.concat();
      for(var i=0; i<a.length; ++i) {
          for(var j=i+1; j<a.length; ++j) {
              if(a[i] === a[j])
                  a.splice(j--, 1);
          }
      }
  
      return a;
  };

  var combinedObj = year_list.map(function(x, i){
    return {"year":x, "rating":rating_list[i], "title":film_list[i]}
  });

 var stringarray = combinedObj.map(JSON.stringify)
 var uniqueStringArray = new Set(stringarray)

 let uniqueArray = Array.from(uniqueStringArray, JSON.parse)
  
  

    console.log(genreDict)
    var genres = [];
    var actors = [];
    
    // Iterate through each recipe object
    genreDict.forEach((entry) => {
    
      // Iterate through each key and value
      Object.entries(entry).forEach(([key, value]) => {
    
        // Use the key to determine which array to push the value to
        if (key === "genre") {
          genres.push(value);
        }
        else {
          actors.push(value);
        }
    
       });
    });
    
    console.log(uniqueArray)


// Go into Each part of uniqueArray average out all the review scores by year
const result = [];

outer: for(const {  year, rating,} of uniqueArray) {
   for(const other of result) {
      if(year === other.year) {
        other.rating.push(+rating);

        continue outer;
      }
   }
   result.push({ year, rating: [+rating]});
}

for(const group of result)
  group.rating = group.rating.reduce((a, b) => a + b, 0) / group.rating.length;
 
var sorted_result = result.sort((a, b) =>{
    return a.year - b.year
  })

  console.log(sorted_result)
    var parseTime = d3.timeParse("%Y");    

    sorted_result.forEach(function(data){
      data.year = parseTime(data.year)
      data.rating = +data.rating
    })
    // Step 1: Set up our chart
  //= ================================
  var svgWidth = 960;
  var svgHeight = 500;
  
  var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 50
  };
  
  var chartWidth = svgWidth - margin.left - margin.right;
  var chartHeight = svgHeight - margin.top - margin.bottom;
  
//SVG WRAPPER

var svg2 = d3.select("#svg-area2")
.append("svg")
.attr("height", svgHeight)
.attr("width", svgWidth);

////MAKING RATING/TIME CHART

var chartGroup2 = svg2.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`)
  

  
    var xTimeScale = d3.scaleTime()
    .range([0, chartWidth])
    .domain(d3.extent(sorted_result, data => data.year));
  
  var yLinearScale2 = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, d3.max(sorted_result, data => data.rating)]);
  
    bottomAxis2 = d3.axisBottom(xTimeScale)
    leftAxis2 = d3.axisLeft(yLinearScale2)
    
    var drawLine = d3
      .line()
      .x(data => xTimeScale(data.year))
      .y(data => yLinearScale2(data.rating));
  
    // Append an SVG path and plot its points using the line function
    chartGroup2.append("path")
      // The drawLine function returns the instructions for creating the line for milesData
      .attr("d", drawLine(sorted_result))
      .classed("line", true);
  
      chartGroup2.append("g")
      .classed("axis", true)
      .call(leftAxis2);
      
  
      chartGroup2.append("g")
      .classed("axis", true)
      .attr("transform", "translate(0, " + chartHeight + ")")
      .call(bottomAxis2);
  

    
//Making Genre Chart
var svg = d3.select("#svg-area")
.append("svg")
.attr("height", svgHeight)
.attr("width", svgWidth);

var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

    var xBandScale = d3.scaleBand()
    .domain(genreDict.map(d => d.genre))
    .range([0, chartWidth])
    .padding(0.1);
    
    // Create a linear scale for the vertical axis.
    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(genreDict, d => d.count)])
    .range([chartHeight, 0]);
    
    var barBottomAxis = d3.axisBottom(xBandScale);
    var barLeftAxis = d3.axisLeft(yLinearScale).ticks(10);
    
    chartGroup.append("g")
    .call(barLeftAxis);
    
    chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(barBottomAxis);
    
    
    chartGroup.selectAll(".bar")
      .data(genreDict)
      .html(" ")
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xBandScale(d.genre))
      .attr("y", d => yLinearScale(d.count))
      .attr("width", xBandScale.bandwidth())
      .attr("height", d => chartHeight - yLinearScale(d.count));
  
    chartGroup.exit().remove()
  
  
  }
///////////////////////
// End Joe's changes //
///////////////////////




  }).catch(function(error) {
  console.log(error);
});


