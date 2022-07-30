let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getMovies', (req,res) => {

	let connection = mysql.createConnection(config);
	

	let sql = `SELECT * FROM a3kler.movies`;
	console.log(sql);
	
	connection.query(sql, [], (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getActors', (req,res) => {

	let connection = mysql.createConnection(config);

	let sql = `SELECT first_name, last_name, name, role  FROM a3kler.actors a, a3kler.roles r, a3kler.movies m  WHERE m.id = r.movie_id AND a.id = r.actor_id  limit 50`;
	console.log(sql);
	
	connection.query(sql, [], (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/addReview', (req, res) => {
	
	let connection = mysql.createConnection(config);
	let ReviewTitle = req.body.ReviewTitle;
	let ReviewBody = req.body.ReviewBody;
	let ReviewScore = req.body.ReviewScore;
	let MovieID = req.body.MovieID;
	let UserID = req.body.UserID;
	
	let sql = `INSERT INTO review (reviewTitle, reviewContent, reviewScore, movieID, userID) VALUES (?, ?, ?, ?, ?)`;
	console.log(sql);
	let data = [ReviewTitle, ReviewBody, ReviewScore, MovieID, UserID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/search', (req,res) => {

	let connection = mysql.createConnection(config);
	

	let sql = `SELECT DISTINCT(R.movie_id) as movieID, M.name as movie, md.director_id as director, concat(D.first_name, ' ', D.last_name) as directorName FROM a3kler.actors as A INNER JOIN a3kler.roles as R On A.id = R.actor_id INNER JOIN a3kler.movies as M On M.id = R.movie_id INNER JOIN a3kler.movies_directors as md On md.movie_id = M.id INNER JOIN a3kler.directors as D on D.id = md.director_id WHERE concat(A.first_name, ' ', A.last_name) LIKE ('%') AND M.name LIKE ('%') AND  concat(D.first_name, ' ', D.last_name) LIKE ('%')`;
	console.log(sql);
	
	connection.query(sql, [], (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});



app.listen(port, '172.31.31.77');
