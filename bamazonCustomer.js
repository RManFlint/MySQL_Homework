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
      }
  ]).then(function(answer){
      console.log("The chosen item is " + answer.itemName);
      console.log("The number of chosen item is " + answer.quantity);
      var chosenItem;
        for (var i = 0; i < res.length; i++) {
          if (res[i].product_name === answer.itemName) {
            chosenItem = res[i];
            console.log("chosenItem is " + chosenItem.product_name);            
          }
        }

        // determine if bid was high enough
        if (chosenItem.in_stock >= parseInt(answer.quantity)) {
          // bid was high enough, so update db, let the user know, and start over
          var newQuantity = parseInt(chosenItem.in_stock - answer.quantity);
          console.log("The NEW QUANTITY, AFTER subtracting order is " + newQuantity);
          console.log("chosenItem.id is " + chosenItem.item_id);
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                in_stock: newQuantity
              },
              {
                //product_name: chosenItem.product_name
                item_id: chosenItem.item_id
              }
            ],
            function(error) {
              if (error) throw err;
              //console.log("We will ship you " + answer.quantity + " " + answer.itemName);
              //showAll();
              console.log("We will ship you " + answer.quantity + " " + answer.itemName);
              console.log("Your total price is $" + parseInt(answer.quantity * chosenItem.price));
            }
          );
        }
        else {
          console.log("Sorry. We don't have enough.  Try again...");
          //showAll();
        }
    })
  });

}