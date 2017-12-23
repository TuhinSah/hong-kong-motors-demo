const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const cors = require('cors');
const passport = require('passport');

const app = express();

const api = require('./server/routes/api');
const users = require('./server/routes/users');

// CORS
app.use(cors());

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

require('./server/config/passport')(passport);

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// Routes
app.use('/api', api);
app.use('/users', users);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
	console.log(`Running on localhost:${port}`)
});