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
  
  var choicesArray = [];
  for (var i = 0; i < res.length; i++) {
    //console.log("Product name is " + res[i].product_name);
    choicesArray[i] = res[i].product_name;
  }
  inquirer
    .prompt(
      {
      type: "rawlist",
      name: "itemName",
      message: "What would you like to buy?",
      //ASK TA'S HOW TO SET UP A LOOP
      choices: choicesArray
    }
    )
    .then(function(val) {
      console.log("val is " + val);
      console.log("choice is "+ val.itemName);
      inquirer
    .prompt(
      {
      name: "quantity",
      type: "number",
      message: "How many do you want to buy? ", 
      choices: choicesArray
    })
    //new code below here. 6/3
   
    
    //new code above here. 6/3
})

/*function processOrder(item) {
  inquirer
    .prompt(
      {
      name: "action",
      type: "rawlist",
      message: "What would you like to buy? ",
      //ASK TA'S HOW TO SET UP A LOOP
      choices: choicesArray
    }
    )
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      processOrder(answer);
    });
    */

}
