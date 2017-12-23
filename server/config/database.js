const pg = require('pg');

// DB Connect String
const config = {
	user: 'power_user',
	database: 'hong_kong_motors',
	password: 'theonlythingwehavetofearisfearitself',
	host: 'ec2-18-220-122-220.us-east-2.compute.amazonaws.com',
	port: 5432
};

const pool = new pg.Pool(config);

module.exports = pool;