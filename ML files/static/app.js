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

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the movie json
// =================================
d3.json("/data").then(function(movieData) {
  // Step 4: Parse the data
  // Format the data and convert to numerical and date values
  // =================================
  // Create a function to parse date and time
  // var parseTime = d3.timeParse("%d-%b");

  // Format the data
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
  movieData.forEach(function(data) {
    data.startYear = +data.startYear;
    all_genre = data.genres.split(",")
    
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

    // genre_lists = all_genre.forEach(function(data){
    //   horror_list = filterItems(data, "horror")
    //   console.log(horror_list)
    // })
    // console.log(horror_list)
  });
//  console.log(horror_list)

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

  console.log("Romance Stat:" + romance_stat)
  console.log("Action stat:" + action_stat)
  console.log("Comedy stat:" + comedy_stat)
  console.log("Drama Stat:" + drama_stat)
  console.log("Mystery Stat:" + mystery_stat)
  console.log("Sci-Fi Stat:" + sci_stat)
  console.log("Noir Stat:" + noir_stat)
  console.log("Family Stat:" + fam_stat)
  console.log("War Stat:" + war_stat)
  // console.log(movieData)
  // Step 5: Create the scales for the chart
  // =================================
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(movieData, d => d.startYear))
    .range([0, width]);

  var yLinearScale = d3.scaleLinear().range([height, 0]);

  // Step 6: Set up the y-axis domain
  // ==============================================
  // @NEW! determine the max y value
  // find the max of the morning data
  var morningMax = d3.max(movieData, d => d.genres);

  // find the max of the evening data
  var eveningMax = d3.max(movieData, d => d.genres);

  var yMax;
  if (morningMax > eveningMax) {
    yMax = morningMax;
  }
  else {
    yMax = eveningMax;
  }

  // var yMax = morningMax > eveningMax ? morningMax : eveningMax;

  // Use the yMax value to set the yLinearScale domain
  yLinearScale.domain([0, yMax]);


  // Step 7: Create the axes
  // =================================
  var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%d-%b"));
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 8: Append the axes to the chartGroup
  // ==============================================
  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y-axis
  chartGroup.append("g").call(leftAxis);

  // Step 9: Set up two line generators and append two SVG paths
  // ==============================================

  // Line generator for morning data
  var line1 = d3.line()
    .x(d => xTimeScale(d.startYear))
    .y(d => yLinearScale(d.genres));

  // Line generator for evening data
  var line2 = d3.line()
    .x(d => xTimeScale(d.startYear))
    .y(d => yLinearScale(d.genres));

  // Append a path for line1
  chartGroup
    .append("path")
    .attr("d", line1(movieData))
    .classed("line green", true);

  // Append a path for line2
  chartGroup
    .data([movieData])
    .append("path")
    .attr("d", line2)
    .classed("line orange", true);


///////////////
//Joe changes
///////////////

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("#filters");

// Create event handlers 
button.on("click", runEnter);
form.on("submit",runEnter);

// Complete the event handler function for the form

function runEnter() {
    
    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#startYear");
    var inputElement2 = d3.select("#endYear");
    var inputElement3 = d3.select("#person");
    //var inputElement4 = d3.select("#country");
    //var inputElement5 = d3.select("#shape");
  
    // Get the value property of the input element
    var inputValue = inputElement.property("value");
    var inputValue2 = inputElement2.property("value");
    var inputValue3 = inputElement3.property("value");
    //var inputValue4 = inputElement4.property("value");
    //var inputValue5 = inputElement5.property("value");
  
    console.log(inputValue);
    console.log(inputValue2);
    //console.log(inputValue3.length);
    //console.log(inputValue4.length);
    //console.log(inputValue5.length);
  
    //filter by 1st criteria
    if (inputValue >= 1894 && inputValue <= 2020 && inputValue < inputValue2) {
      var filteredData = movieData.filter(movieData => movieData.startYear >= inputValue);
      var filteredData2 = filteredData.filter(filteredData => filteredData.startYear <= inputValue2);
      console.log("We use the main IF");
      console.log(filteredData2);
    }
    else {
      //var filteredData = tableData.value[startYear];
      console.log("we used the ELSE");
    };

     //filter by person
    if (inputValue3.length >= 1) {
      var filteredData = movieData.filter(movieData => movieData.Name == inputValue3);
      console.log(filteredData);
    }
    else {
      var filteredData = filteredData;
    };
/*
    //filter by 3rd criteria
    if (inputValue3.length >= 1) {
      var filteredData = filteredData.filter(filteredData => filteredData.city == inputValue3);
    }
    else {
      var filteredData = filteredData;
    };

    //filter by 4th criteria
    if (inputValue4.length >= 1) {
      var filteredData = filteredData.filter(filteredData => filteredData.country == inputValue4);
    }
    else {
      var filteredData = filteredData;
    };

    //filter by 5th criteria
    if (inputValue5.length >= 1) {
      var filteredData = filteredData.filter(filteredData => filteredData.shape == inputValue5);
    }
    else {
      var filteredData = filteredData;
    };


 */
     console.log(filteredData);

 /*    //Clear the table before refreshing filtered data on the screen
    var table = document.getElementById("ufo-table");
    for (var i = table.rows.length - 1; i > 0; i--)
    {
      table.deleteRow(i);
    }

    
    filteredData.forEach((filteredData) => {
        var row = tbody.append("tr");
        Object.entries(filteredData).forEach(([key, value]) => {
          var cell = row.append("td");
          cell.text(value);
        });
      });    */
};

///////////////////////
// End Joe's changes //
///////////////////////




  }).catch(function(error) {
  console.log(error);
});

// d3.json('/data')
// .then(function(data){
//   if (err) throw err;

