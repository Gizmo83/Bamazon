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
    console.log("Bamazon - Manager Console")
    console.log("--------------------------------------------------------------");
    start();
});

function start(){
    inquirer
    .prompt([
        {
            type: "list",
            name: "option",
            message: "Choose Option Below",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit"
            ]
        }
    ])
    .then(function(response){
        //console.log(response);
        switch (response.option) {
            case "View Products for Sale":
            viewProducts();
            break;
            
            case "View Low Inventory":
            viewLowInventory();
            break;
            
            case "Add to Inventory":
            addInventory();
            break;
            
            case "Add New Product":
            addProduct();
            break;
            
            case "Exit":
            process.exit();
            break;
        }
    });
};

function viewProducts() {
    connection.query("SELECT * FROM products", function(err, data) {
        if (err) throw err;
        //console.log(data);
        for (var i = 0; i < data.length; i++){
            console.log(data[i].item_id +" - "+ data[i].department_name +" - "+ data[i].product_name +" - "+ data[i].price +" - "+ data[i].stock_quantity);
        }
        start();
    });
};

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(err, data) {
        if (err) throw err;
        //console.log(data);
        for (var i = 0; i < data.length; i++){
            console.log(data[i].item_id +" - "+ data[i].department_name +" - "+ data[i].product_name +" - "+ data[i].price +" - "+ data[i].stock_quantity);
        }
        start();
    });
};

function addInventory() {
    connection.query("SELECT * FROM products", function(err, data) {
        if (err) throw err;
        inquirer
        .prompt([
            {
                type: "list",
                message: "Choose an Item to Update Inventory",
                name: "choice",
                type: "list",
                choices: function() {
                    var choiceArray = [];
                    for (var i = 0; i < data.length; i++) {
                        choiceArray.push(data[i].item_id +" - "+ data[i].product_name);
                    }
                    return choiceArray;
                }
            },
            {
                name: "qty",
                type: "input",
                message: "Enter Quantity to Add: ",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function(answer) {
            //console.log(answer.qty);
            var itemArr = (answer.choice).split("-");
            var id = parseInt(itemArr[0]);
            //console.log(id);
            // get the information of the chosen item
            var chosenItem;
            for (var i = 0; i < data.length; i++) {
                if (data[i].item_id === id) {
                    chosenItem = data[i];
                }
            }
            //console.log(chosenItem);
            
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: chosenItem.stock_quantity + parseInt(answer.qty)
                    },
                    {
                        item_id: chosenItem.item_id
                    }
                ],
                function(error) {
                    if (error) throw err;
                    console.log("--------------------------------------------------------------");
                    console.log(answer.qty + " units have been added to " + chosenItem.product_name);
                    console.log("--------------------------------------------------------------");
                    start();
                }
            );
        });
    });
};

function addProduct() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "product_name",
            message: "Enter Product Name (Brand - Item): "
        },
        {
            type: "input",
            name: "department_name",
            message: "Enter Department: "
        },
        {
            type: "input",
            name: "price",
            message: "Enter Price: ",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            type: "input",
            name: "qty",
            message: "Enter Quantity: ",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
    .then(function(answer){
        //console.log(answer);
        connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answer.product_name,
                department_name: answer.department_name,
                price: answer.price,
                stock_quantity: answer.qty
            },
            function(error) {
                console.log("--------------------------------------------------------------");
                console.log(answer.product_name + " has been added")  
                console.log("--------------------------------------------------------------");
                start();
            }
        );
    })
}