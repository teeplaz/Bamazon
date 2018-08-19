var inquiry = require('inquiry');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'bamazon'
});

function checkSelection(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a positive, valid number. Thank you!';
	}
}

function selectProduct() {
	inquiry.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please type in the Item ID for the item you would like to purchase.',
			validate: checkSelection,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many would you like?',
			validate: checkSelection,
			filter: Number
		}
	]).then(function(input) {
		var item = input.item_id;
		var quantity = input.quantity;
		var queryStr = 'SELECT * FROM products WHERE ?';
		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;
			if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID from the bamazon products list.');
                console.log(' \n');
                console.log(' \n');
				displayStock();
			} else {
				var prodD = data[0];
				if (quantity <= prodD.stock_quantity) {
					console.log('Good News, the product you want is in stock! Proceeding with order now!');
					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (prodD.stock_quantity - quantity) + ' WHERE item_id = ' + item;
					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Your order has been placed! Your total is $' + prodD.price * quantity);
						console.log('Thank you for shopping with Bamazon!');
						console.log("\n--------------------------------------------------------------------------\n");

						connection.end();
					})
				} else {
					console.log('Sorry, insufficient quantity, your order cannot be placed as is.');
					console.log('Please modify your order to a lower quantity until we get more in stock.');
                    console.log("\n--------------------------------------------------------------------------\n");
                    
					displayStock();
				}
			}
		})
	})
}

function displayStock() {
	queryStr = 'SELECT * FROM products';
	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Existing Products Listed Below: ');
		console.log('----------------------------------\n');

		var stockList = '';
		for (var i = 0; i < data.length; i++) {
			stockList = '';
			stockList += 'Item ID: ' + data[i].item_id + '  ||  ';
			stockList += 'Product Name: ' + data[i].product_name + '  ||  ';
			stockList += 'Department Name: ' + data[i].department_name + '  ||  ';
            stockList += 'Price: $' + data[i].price + '  ||  ';
            stockList += 'Quantity in Stock: ' + data[i].stock_quantity;

            console.log('=================================================================================================================================================');
            console.log(stockList);
		}
        console.log('=================================================================================================================================================\n');
        console.log("\n--------------------------------------------------------------------------\n");

	  	selectProduct();
	})
}

function initiateBamazon() {
	
	displayStock();
}


initiateBamazon();