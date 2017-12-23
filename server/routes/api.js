const express = require('express');
const pool = require('../config/database');

const router = express.Router();

// Get all vehicles
router.get('/vehicles', (req, res, next) => {
//  console.log(req.query);

	var conditions = '';
	if(typeof req.query.minprice != 'undefined' && req.query.minprice != '' && req.query.minprice != 'min')
		conditions = conditions + " AND mmr >= " + req.query.minprice;
	if(typeof req.query.maxprice != 'undefined' && req.query.maxprice != '' && req.query.maxprice != 'max')
		conditions = conditions + " AND mmr <= " + req.query.maxprice;
	if(typeof req.query.minyear != 'undefined' && req.query.minyear != '' && req.query.minyear != 'min')
		conditions = conditions + " AND year >= " + req.query.minyear;
	if(typeof req.query.maxyear != 'undefined' && req.query.maxyear != '' && req.query.maxyear != 'max')
		conditions = conditions + " AND year <= " + req.query.maxyear;
	if(typeof req.query.make != 'undefined' && req.query.make != '' && req.query.make != 'all')
		conditions = conditions + " AND make = \'" + req.query.make + "\'";
	if(typeof req.query.mileage != 'undefined' && req.query.mileage != '' && req.query.mileage != 'any')
		conditions = conditions + " AND mileage <= \'" + req.query.mileage + "\'";
//  if(conditions == '')
//	conditions = conditions + " FETCH FIRST 100 ROWS ONLY"

//  console.log(conditions);
	
	pool.connect((err, client, done) => {
		if(err){
			return console.error('Error fetching client from pool', err);
		}

		client.query('SELECT * FROM manheim_vehicles WHERE vin IN (SELECT DISTINCT vin FROM manheim_vehicle_details) AND image_link IS NOT NULL' + conditions, function(err, result) {

			if(err) {
				return console.error('Error running query', err);
			}

//	console.log(result.rows);

			res.json(result.rows);
			done();
		});
	});
});

// Get single vehicle
router.get('/detail/:id', (req, res, next) => {
	pool.connect((err, client, done) => {
		if(err){
			return console.error('Error fetching client from pool', err);
		}

		client.query('SELECT mv.id, mv.vin, mv.year, mv.make, mvd.model, mvd.trim_level, mv.exterior_color, mv.interior_color, mv.mileage, mv.engine, mv.transmission, mv.location, mv.auction_start, mv.auction_end, mv.buy_now, mv.bid, mv.make_an_offer, mv.mmr, mvd.condition, mvd.history, mvd.in_service_date, mvd.fuel_type, mvd.displacement, mvd.window_sticker, mvd.body_style, mvd.doors, mvd.vehicle_type, mvd.salvage, mvd.as_is, mvd.title_state, mvd.title_status, mvd.drive_train, mvd.interior_type, mvd.top_type, mvd.stereo, mvd.airbags, mvd.equipment, mvd.images FROM (SELECT * FROM manheim_vehicles WHERE id = ' + req.params.id + ') mv INNER JOIN (SELECT * FROM manheim_vehicle_details WHERE vin IN (SELECT vin FROM manheim_vehicles WHERE id = ' + req.params.id + ')) mvd ON mv.vin = mvd.vin', function(err, result) {

			if(err) {
				return console.error('Error running query', err);
			}

			console.log(result.rows[0]);

			res.json(result.rows[0]);
			done();
		});
	});
});

module.exports = router;