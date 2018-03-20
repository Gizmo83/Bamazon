var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

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
    console.log("Bamazon - Supervisor Console")
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
                "View Product Sales by Department",
                "Create New Department",
                "Exit"
            ]
        }
    ])
    .then(function(response) {
        //console.log(response);
        switch (response.option) {
            case "View Product Sales by Department":
            viewDepartmentSales();
            break;
            
            case "Create New Department":
            createDepartment();
            break;
            
            case "Exit":
            process.exit();
            break;
        }
    });
};

function viewDepartmentSales() {
    connection.query(
        "SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS department_sales FROM departments INNER JOIN products ON departments.department_name=products.department_name GROUP BY department_id", 
        function(err, data) {
        if (err) throw err;
        var table = new Table({
            head: ['Department ID', 'Department Name', 'Over Head Cost', 'Department Sales', 'Total Profit']
        });
        var profit = [];
        for (var i = 0; i < data.length; i++){
            profit.push(data[i].department_sales - data[i].over_head_costs);
            table.push([data[i].department_id, data[i].department_name, data[i].over_head_costs, data[i].department_sales, profit[i]]); 
        };
        console.log(table.toString() + "\n");
        start();
    });
};

function createDepartment() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "department_name",
            message: "Enter Department: "
        },
        {
            type: "input",
            name: "cost",
            message: "Enter Over Head Costs: ",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
    .then(function(answer){
        connection.query(
            "INSERT INTO departments SET ?",
            {
                department_name: answer.department_name,
                over_head_costs: answer.cost
            },
            function(error) {
                console.log("--------------------------------------------------------------");
                console.log(answer.department_name + " has been added")  
                console.log("--------------------------------------------------------------");
                start();
            }
        );
    })
};