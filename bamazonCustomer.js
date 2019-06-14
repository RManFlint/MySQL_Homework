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
  database: "bamazonJim"
});

connection.connect(function(err) {
  if (err){
     throw err;
  }
  console.log('connection made at ' + connection.threadId);
  showAll();
});


function showAll (){
  connection.query("SELECT * FROM products", function(err, res) {

    if (err) throw err;
    console.log(res);
      console.table(res);
      runSearch(res);
    });
    
}

function runSearch(res) {
  connection.query("SELECT * FROM products", function(err, res) {
  var choicesArray = [];
  for (var i = 0; i < res.length; i++) {
    //console.log("Product name is " + res[i].product_name);
    choicesArray[i] = res[i].product_name;
  }
  inquirer.prompt([
      {
      type: "rawlist",
      name: "itemName",
      message: "What would you like to buy?",
      //ASK TA'S HOW TO SET UP A LOOP
      choices: choicesArray
    },
      {
      type: "number",
      name: "quantity",
      message: "How many do you want to buy? ", 
      choices: choicesArray
    }]).then(function(answer){
      console.log("The chosen item is " + answer.itemName);
      console.log("The number of chosen item is " + answer.quantity);
      
    })
  });

}