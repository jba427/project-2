// // Load data from hours-of-tv-watched.csv
// d3.json("./hours-of-tv-watched.csv").then(function(tvData) {

//   console.log(tvData);

//   // log a list of names
//   var names = tvData.map(data => data.name);
//   console.log("names", names);

//   // Cast each hours value in tvData as a number using the unary + operator
//   tvData.forEach(function(data) {
//     data.hours = +data.hours;
//     console.log("Name:", data.name);
//     console.log("Hours:", data.hours);
//   });
// }).catch(function(error) {
//   console.log(error);
// });

// var mongo = require('mongodb');
var http = require('http');

http.createServer(function (req, res) {
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
  if (err) throw err;
  var db = client.db("moviesDB2")

  var query = {Name: /^S/}

  db.collection("movies").find(query).toArray(function(err, result){
    if (err) throw err;
    console.log(result);
    db.close();
  })

  //finds the name of first document in mongo DB database
  // db.collection("movies").findOne({}, function(err, result){
  //   if (err) throw err;
  //   console.log(result.Name);
  //   db.close
  // })


  // **** lists all collections in a database (debug)
  // db.listCollections().toArray().then((docs) => {

  //     console.log('Available collections:');
  //     docs.forEach((doc, idx, array) => { console.log(doc.name) });

  // }).catch((err) => {

  //     console.log(err);
  // }).finally(() => {

  //     client.close();
  // });


  // var dbo = db.db("moviesDB2");
  // var query = { name: "Blanche Bayliss" };
  // dbo.collection("movies").find(query).toArray(function(err, result) {
  //   if (err) throw err;
  //   console.log(result);
  //   db.close();

})
}).listen(8080);