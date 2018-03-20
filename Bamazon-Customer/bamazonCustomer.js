var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("--------------------------------------------------------------");
  console.log("Welcome to Bamazon!")
  console.log("--------------------------------------------------------------");
  store();
  //afterPrompt();
});

function store() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function(err, inventory) {
      if (err) throw err;
      //console.log(inventory);
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            name: "choice",
            type: "list",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < inventory.length; i++) {
                choiceArray.push(inventory[i].item_id +" - "+ inventory[i].product_name +" - "+ inventory[i].price);
              }
              return choiceArray;
            },
            message: "Which item would you like to purchase?"
          },
          {
            name: "qty",
            type: "input",
            message: "How many would you like to purchase?"
          }
        ])
        .then(function(answer) {
            //console.log(answer.choice);
            var itemArr = (answer.choice).split("-");
            var id = parseInt(itemArr[0]);
            //console.log(id);
          // get the information of the chosen item
          var chosenItem;
          for (var i = 0; i < inventory.length; i++) {
            if (inventory[i].item_id === id) {
              chosenItem = inventory[i];
            }
          }
          //console.log(chosenItem);
  
          // determine if there is enough inventory
          if (chosenItem.stock_quantity >= parseInt(answer.qty)) {
            var total = answer.qty * chosenItem.price;
            // enough inventory, update db, let the user know
            connection.query(
              "UPDATE products SET ?, ? WHERE ?",
              [
                {
                    stock_quantity: chosenItem.stock_quantity - answer.qty
                },
                {
                    product_sales: chosenItem.product_sales + total
                },
                {
                    item_id: chosenItem.item_id
                }
              ],
              function(error) {
                if (error) throw err;
                console.log("--------------------------------------------------------------");
                console.log("Order placed - Qty:" + answer.qty + " - " + chosenItem.product_name + " Total: " + total);
                console.log("--------------------------------------------------------------");
                afterPrompt();
              }
            );
          }
          else {
            // If not enough inventory
            console.log("--------------------------------------------------------------");
            console.log("Sorry - Insufficient inventory!");
            console.log("--------------------------------------------------------------");
            afterPrompt();
          }
        });
    });
  }

  function afterPrompt(){
      inquirer
        .prompt([
            {
                type: "confirm",
                message: "Would you like to make another purchase?",
                name: "confirm",
            }
        ])
        .then(function(response){
            if (response.confirm){
                store();
            }
            else {
                console.log("--------------------------------------------------------------");
                console.log("Thank You Come Again!")
                console.log("--------------------------------------------------------------");
                connection.end();
            }
        })
  }

  