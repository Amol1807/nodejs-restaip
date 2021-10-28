const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

app.use(bodyParser.json());

//create Database Connection
const conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "crud",
});

// connect to database
conn.connect((err) => {
	if (err) throw err;
	console.log("MySQL connected");
});

// creat a new Record
app.post("/api/create", (req, res) => {
	let data = { name: req.body.name, location: req.body.location };
	let sql = "INSERT INTO user SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
	});
});

// show all records
app.get("/api/view", (req, res) => {
	let sql = "SELECT * FROM user";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

// show a single record
app.get("/api/view/:id", (req, res) => {
	let sql = "SELECT * FROM user WHERE id=" + req.params.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

// delete the record
app.delete("/api/delete/:id", (req, res) => {
	let sql = "DELETE FROM user WHERE id=" + req.params.id + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record deleted successfully" }));
	});
});

// update the Record
app.put("/api/update/", (req, res) => {
	let sql = "UPDATE user SET name='" + req.body.name + "', location='" + req.body.location + "' WHERE id=" + req.body.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record updated SuccessFully" }));
	});
});

app.listen(8000, () => {
	console.log("server started on port 8000...");
});
