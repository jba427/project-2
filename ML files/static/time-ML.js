
// // Step 1: Set up our chart

// const { map } = require("d3");

// //= ================================
// var svgWidth = 960;
// var svgHeight = 500;

// var margin = {
//   top: 20,
//   right: 40,
//   bottom: 60,
//   left: 50
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Step 2: Create an SVG wrapper,
// // append an SVG group that will hold our chart,
// // and shift the latter by left and top margins.
// // =================================
// var svg = d3
//   .select("body")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the movie json
// =================================
d3.json("/data").then(function(timemovieData) {


    const chart3 = new d3KitTimeline('#crisprtimeline', {
        direction: 'left',
        initialWidth: 804,
        margin: {left: 20, right: 20, top: 20, bottom: 30},
        const result = [];
        const map = new Map();
        forEach(item){
            if (!map.has(item.movieTitle){
                map.set(item.movieTitle, true);
                result.push({
                    title: item.movieTitle,
                    year: item.startYear
                });
            })
        },
        timeFn: function(result){
            return result.year;
          },
        textFn: function(result){
            return return.year + ' - ' + return.title;
          },
        layerGap: 40,
        // dotColor: color3,
        // labelBgColor: color3,
        // linkColor: color3,
        labella: {
          maxPos: 800
        }
      });
      chart3
        .data(timemovieData)
        .visualize()
        .resizeToFit();
    
//     let chart = new d3KitTimeline('#crisprtimeline', {
//     direction: 'right',
//     initialWidth: 600,
//     initialHeight: 600,
//       labelBgColor: "#777",
//     textFn: function(movieData){
//       return movieData.startYear + ' - ' + movieData.movieTitle;
//     }
//   }).data(timemovieData);

//   let setdata = function(d,i){
// //   console.log(d);
// //   console.log(i);
//       let cdata = d3.select("#crisprdata");
//       cdata.selectAll("*").remove()		
//   // cdata.data([d]).append("h3").text(function(d){return d.time.getFullYear() + ' - ' + d.title});
//       cdata.data([d]).append("h3").text(function(d){return d.title});
//       cdata.data([d]).append("hr");
//       cdata.data([d]).append("h4").text(function(d){return d.person + " - " + d.institute});
//       cdata.data([d]).append("h4").text(function(d){return d.date});
//       cdata.data([d]).append("p").text(function(d){return d.discovery});
// //   console.log(d.title);
//   };
  

//   chart.data(timemovieData);
// //   chart.on("labelMouseover", function(d,i){setdata(d,i)} );
})