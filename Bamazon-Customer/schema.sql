CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(item_id),
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(6,2),
    stock_quantity INTEGER
);

DESCRIBE products;

-- Mock Items
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Black + Decker - Toaster", "Kitchen", 29.99, 100);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("George Foreman - Grill", "Kitchen", 49.99, 80);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Pansonic - Air Fryer", "Kitchen", 149.99, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Dyson - Cordless Vacuum", "Home Appliance", 199.99, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Rowenta - Iron", "Home Appliance", 49.99, 40);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Winix - Air Purifier", "Home Appliance", 79.99, 80);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("LG - 55-Inch TV", "Electronics", 799.99, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Roku - Streaming Stick", "Electronics", 39.99, 100);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Bose - Bluetooth Speaker", "Electronics", 149.99, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Amazon - Echo Dot", "Electronics", 39.99, 50);

SELECT * FROM products;