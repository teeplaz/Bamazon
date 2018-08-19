
var inquiry = require('inquiry');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'bamazon'
});

var server = http.createServer(handleRequest);

function handleRequest(req, res) {

  var requestData = val;

  req.on("data", function(data) {

    requestData += data;
  });

  req.on("end", function() {

    console.log("You did a", req.method, "with the data:\n", requestData);
    res.end();
  });

}

server.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});

request.post(
  'http://localhost:8080',
  { json: { key: val } },
  function (error, response, body) {
      if (!error && response.statusCode == 200) {
          console.log(body)
      }
  }
);