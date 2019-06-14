//requiring mysql and inquirer for the CLI
var mysql = require("mysql");
var inquirer = require("inquirer");
var key = require("./keys.js");


//----------STARTING CONNECTION TO MYSQL --------//
var connection = mysql.createConnection({

    host: "localhost",
    port: 3306,


    user: "root",

    password: key,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    afterConnection();
});


//----------START USER INTERACTION WITH APPLICATION --------//

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("-----------------------------------------");
        console.log("Displaying the products available today!");
        //display to the console all of the items that I have in my database
        console.table(res);
        console.log("-----------------------------------------");
        askUser();
    });
};

//collect information on user purchase information
function askUser() {
    inquirer
        .prompt([
            //asking user for product ID
            {
                type: "input",
                message: "What is the product ID of the item you'd like to buy?",
                name: "item_id",
                validate: function (value) {
                    if (value > 0) {
                        return true
                    }
                    else {
                        return "Please enter an ID number. Thanks, friend."
                    }
                }
            },
            {
                type: "input",
                message: "How many units would you like to buy?",
                name: "units",
                validate: function (value) {
                    if (value > 0) {
                        return true
                    }
                    else {
                        return 'Please enter a number.'
                    }
                }
            },
        ])
        .then(function (inquirerResponse) {
            //uncomment the following to debug if necessary
            // console.log("Item ID ordered " + inquirerResponse.item_id);
            // console.log("Units ordered " + inquirerResponse.units);

            pullDatabase(inquirerResponse.item_id, inquirerResponse.units);
        });
};

//pull inventory information from the approrpriate table
function pullDatabase(item_id, units) {

    connection.query("SELECT stock_quantity, price, product_name FROM products WHERE item_id = " + item_id,
        function (err, res) {
            if (err) throw err;
            var stock_quantity = res[0].stock_quantity;
            var price = res[0].price;
            var product = res[0].product_name;

            //adding conditional to control for inventory 
            if (stock_quantity < units) {
                console.log("-----------------------------------------");
                console.log("\nSorry we were unable to process your order. We do not have " + product.charAt(0).toUpperCase() + product.slice(1) + " in stock. Please check back later.");
                console.log("\n-----------------------------------------");
                additionalOrders();
            }
            else {
                console.log("-----------------------------------------");
                console.log("\nProcesing your order now for " + product.charAt(0).toUpperCase() + product.slice(1));
                console.log("Your order total will be $" + units * price);
                console.log("\n-----------------------------------------");
                updateTable(stock_quantity, item_id, units);
            }
        });
};

//update inventory according to selection
function updateTable(stock_quantity, item_id, units) {
    var queryUpdate = connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: stock_quantity - units
            },

            {
                item_id: item_id
            }
        ],
        function (err, res) {
            console.log("\nOrder processed! Thank you for ordering with bamazon");
            console.log("\n-----------------------------------------");
            additionalOrders();
        }

    );
    //logging the actual query being run for debugging purposes
    // console.log("We ran the following on the databse " + queryUpdate.sql)

};

function additionalOrders() {
    inquirer
        .prompt([
            //asking user for product ID
            {

                type: "list",
                message: "Would you like to place another order?",
                choices: ["Yes", "No"],
                name: "orderDecision"

            },
        ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.orderDecision === "Yes") {
                askUser();
            }
            else {
                console.log("Thank you for ordering with bamazon.")
                connection.end();
            }

        });
};
