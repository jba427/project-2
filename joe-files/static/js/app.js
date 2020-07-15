// from data.js
var tableData = data;

var tbody = d3.select("tbody");

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("#filters");

// Create event handlers 
button.on("click", runEnter);
form.on("submit",runEnter);

tableData.forEach((tableData) => {
  var row = tbody.append("tr");
  Object.entries(tableData).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);
  });
}); 

// Complete the event handler function for the form
function runEnter() {
    
    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");
    var inputElement2 = d3.select("#state");
    var inputElement3 = d3.select("#city");
    var inputElement4 = d3.select("#country");
    var inputElement5 = d3.select("#shape");
  
    // Get the value property of the input element
    var inputValue = inputElement.property("value");
    var inputValue2 = inputElement2.property("value");
    var inputValue3 = inputElement3.property("value");
    var inputValue4 = inputElement4.property("value");
    var inputValue5 = inputElement5.property("value");
  
    console.log(inputValue.length);
    console.log(inputValue2.length);
    console.log(inputValue3.length);
    console.log(inputValue4.length);
    console.log(inputValue5.length);
  
    //filter by 1st criteria
    if (inputValue.length >= 1) {
      var filteredData = tableData.filter(tableData => tableData.datetime === inputValue);
    }
    else {
      var filteredData = tableData;
    };

    //filter by 2nd criteria
    if (inputValue2.length >= 1) {
      var filteredData = filteredData.filter(filteredData => filteredData.state === inputValue2);
    }
    else {
      var filteredData = filteredData;
    };

    //filter by 3rd criteria
    if (inputValue3.length >= 1) {
      var filteredData = filteredData.filter(filteredData => filteredData.city === inputValue3);
    }
    else {
      var filteredData = filteredData;
    };

    //filter by 4th criteria
    if (inputValue4.length >= 1) {
      var filteredData = filteredData.filter(filteredData => filteredData.country === inputValue4);
    }
    else {
      var filteredData = filteredData;
    };

    //filter by 5th criteria
    if (inputValue5.length >= 1) {
      var filteredData = filteredData.filter(filteredData => filteredData.shape === inputValue5);
    }
    else {
      var filteredData = filteredData;
    };


    console.log(filteredData);

    //Clear the table before refreshing filtered data on the screen
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
      });   
};