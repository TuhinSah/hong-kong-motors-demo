const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/database');

const router = express.Router();

// Register
router.post('/register', (req, res, next) => {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(req.body.password, salt, (err, hash) => {
			if(err) {
				throw err;
			}

			pool.connect((err, client, done) => {
				if(err){
					return console.error('Error fetching client from pool', err);
				}

				client.query('INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4)', [req.body.name, req.body.username, req.body.email, hash], function(err, result) {

					if(err) {
						res.json({
							success: false,
							message: 'Failed to register'
						});
					} else {
						res.json({
							success: true,
							message: 'Registed'
						});
					}

					done();
				});
			});
		});
	});
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	pool.connect((err, client, done) => {
		if(err){
			return console.error('Error fetching client from pool', err);
		}

		client.query('SELECT * FROM users WHERE username = \'' + req.body.username + '\'', function(err, result) {

			if(err) {
				throw err;
			}

			if(!result.rows) {
				res.json({
					success: false,
					message: 'User not found'
				});
			} else {
//				console.log(result.rows[0]);
				bcrypt.compare(req.body.password, result.rows[0].password, (err, isMatch) => {
					if(err) {
						throw err;
					}

					if(isMatch) {
						const token = jwt.sign({
							id: result.rows[0].id,
							name: result.rows[0].name,
							username: result.rows[0].username,
							email: result.rows[0].email,
							password: result.rows[0].password
						}, 'hongkongmotorsjwtsecret', {
							expiresIn: 3600	// 1 hour
						});

						res.json({
							success: true,
							token: 'JWT ' + token,
							user: {
								id: result.rows[0].id,
								name: result.rows[0].name,
								username: result.rows[0].username,
								email: result.rows[0].email
							}
						});
					} else {
						res.json({
							success: false,
							message: 'Wrong password'
						});
					}
				});
			}

			done();
		});
	});
});

// Sell
router.get('/sell', passport.authenticate('jwt', {session:false}), (req, res, next) => {
	res.json({user: req.user})
});

module.exports = router;