var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Salzgasse4%",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  showAll();
});


function showAll (){
  connection.query("SELECT * FROM products", function(err, res) {

    if (err) throw err;
    //for (var i = 0; i < res.length; i++) {
      //console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
      console.table(res);
      runSearch(res);
    });
    
}

function runSearch(res) {
  
  var choicesArray = [];
  for (var i = 0; i < res.length; i++) {
    choicesArray[i] = res[i].product_name;
  }
  inquirer
    .prompt(
      {
      name: "action",
      type: "rawlist",
      message: "What would you like to buy?",
      //ASK TA'S HOW TO SET UP A LOOP
      choices: choicesArray
    }
    )
    .then(function(answer) {
      switch (answer.action) {
      case "Find songs by artist":
        artistSearch();
        break;

      case "Find all artists who appear more than once":
        multiSearch();
        break;

      case "Find data within a specific range":
        rangeSearch();
        break;

      case "Search for a specific song":
        songSearch();
        break;

      case "Find artists with a top song and top album in the same year":
        songAndAlbumSearch();
        break;
      }
    });
}