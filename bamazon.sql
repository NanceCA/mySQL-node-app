-- Creating the schema for the top songs database and table -- 

-- Dropping the database if the current version exists --
DROP DATABASE IF EXISTS bamazon;

-- Creates the "bamazon" database --
CREATE DATABASE bamazon;

-- Code to confirm that all of the following code will affect the database --
USE bamazon;


-- Create the table products --
CREATE TABLE products (
    item_id INTEGER (11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR (40) NOT NULL,
    department_name VARCHAR(40) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER (11),
    PRIMARY KEY (id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shampoo", "essentials",6.00,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("face wash", "essentials",10.00,100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("conditioner", "essentials",3.00,100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("coffee", "food",7.00,100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("candles", "household",4.00,100);

SELECT * FROM products;