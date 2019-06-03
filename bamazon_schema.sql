DROP DATABASE IF EXISTS bamazonJim;

CREATE DATABASE bamazonJim;

USE bamazonJim;


CREATE TABLE  products (
  item_id int NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(8,2) NULL,
  in_stock INTEGER NULL,
  PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, in_stock)
VALUES ("Righthanded Screwdriver", "hardware", 2.50, 100), ("Lefthanded Screwdriver", "hardware", 12.50, 100), 
("Righthanded skillet", "housewares", 12.50, 50), ("Lefthanded skillet", "housewares", 32.50, 50), 
("Women's welders' boots", "women's shoes", 425.00, 75), ("Men's welders' boots", "women's shoes", 225.00, 75), 
("Women's underwear", "Men's clothing", 125.00, 60), ("Straight razor", "cosmetics", 50.00, 85),
 ("Riding lawn mowers", "toys", 4500.00, 25), ("Stiletto high heels", "Men's shoes", 500.00, 50);
 
 SELECT * FROM products;