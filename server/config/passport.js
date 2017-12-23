const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const pool = require('./database');

module.exports = function(passport) {
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
	opts.secretOrKey = 'hongkongmotorsjwtsecret';
	passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
//		console.log(jwt_payload);
		pool.connect((err, client, next) => {
			if(err){
				return console.error('Error fetching client from pool', err);
			}

			client.query('SELECT * FROM users WHERE id = ' + jwt_payload.id, function(err, result) {

				if(err) {
					return done(err, false);
				}

//				console.log(result.rows[0]);

				if(result.rows) {
					return done(null, result.rows[0]);
				} else {
					return done(null, false);
				}

//				res.json(result.rows[0]);
//				next();
			});
		});
	}));
}