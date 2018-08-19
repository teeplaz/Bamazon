CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(40) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Moldavite', 'Gemstones', 44.44, 111),
		('Selenite', 'Gemstones', 9.99, 333),
		('Lavendar Essential Oil', 'Personal Care', 5.55, 777),
		('Jumbo Zafu Zabuton Set', 'Wellness', 123.00, 20),
		('30 LB Dumbbell', 'Fitness', 45.45, 100),
		('Joe Rocket Motorcycle Jacket XL', 'Clothing', 175.00, 20),
		('Almond Milk', 'Grocery', 3.99, 1000),
		('Pineapple', 'Grocery', 2.50, 10000),
		('Toms Toothpaste', 'Personal Care', 2.99, 500),
		('34 inch Brown Belt', 'Accessories', 20.00, 250);

SELECT * FROM products;