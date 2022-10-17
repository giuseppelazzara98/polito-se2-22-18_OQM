'use strict';

const express = require('express');
const morgan = require('morgan');
const { check, body, validationResult } = require('express-validator');
const cors = require('cors');

const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const userDao = require('./modules/user-dao'); // module for accessing the users in the DB
const serviceDao = require('./modules/service-dao'); // module for accessing the services in the DB
const ticketDao = require('./modules/ticket-dao'); // module for accessing tickets in the DB 

// init express
const app = new express();
const port = 3001;

//setup and enable Cors
const corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200,
	credentials: true
};
app.use(cors(corsOptions));

/*** Set up Passport ***/
// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(
	new LocalStrategy(function (username, password, done) {
		userDao.getUser(username, password).then((user) => {
			if (!user) {
				return done(null, false, {
					message: 'Incorrect username and/or password.'
				});
			}
			return done(null, user);
		});
	})
);

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
	userDao
		.getUserById(id)
		.then((user) => {
			done(null, user); // this will be available in req.user
		})
		.catch((err) => {
			done(err, null);
		});
});

app.use(morgan('dev'));
app.use(express.json());

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next();

	return res.status(401).json({ error: 'User not authenticated' });
};

// set up the session
app.use(
	session({
		// by default, Passport uses a MemoryStore to keep track of the sessions
		secret:
			'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
		resave: false,
		saveUninitialized: false
	})
);

// then, init passport
app.use(passport.initialize());
app.use(passport.session());

/******API******/

/*** Services APIs ***/

// GET /api/services
app.get('/api/services', async (req, res) => {

    try {
        const result = await serviceDao.getAllServices();
        return res.status(200).json(result);
    }
    catch(err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }

});

/*** Tickets APIs ***/

//GET /api/clientsPerService/:id_service
app.get('/api/clientsPerService/:id_service', 
    [check('id_service').notEmpty().isNumeric().isInt({ min: 0 })],
    async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log("Validation of id_service failed!");
        return res.status(422).json({ errors: errors.array() });
    }

    if (!req.params) {
        console.log("Error in request parameters!");
        return res.status(422).json({ error: "Error in request parameters" });
    }

    try {
        const serviceOk = await serviceDao.getServiceById(req.params.id_service); 

        if(serviceOk !== undefined){
            const result = await ticketDao.clientsPerService(req.params.id_service);
            return res.status(200).json(result);
        }
        else{
            return res.status(404).json({ error: "Not Found" });
        }
    }
    catch(err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }

});

// POST /api/ticket
app.post('/api/ticket',
    body('id_service').isInt({ min: 0 }),
    async (req, res) => {

        const errors = validationResult(req);

        if (Object.keys(req.body).length === 0) {
            console.log("Empty body!");
            return res.status(422).json({ error: "Empty Body" });
        }

        if (!errors.isEmpty()) {
            console.log("Validation of request body failed!");
            return res.status(422).json({ errors: errors.array() });
        }

        if (Object.keys(req.body).length !== 1) {
            console.log("Data not formatted properly!");
            return res.status(422).json({ error: "Data not formatted properly" });
        }

        try {
            const serviceOk = await serviceDao.getServiceById(req.body.id_service);

            if(serviceOk !== undefined){
                const result = await ticketDao.storeTicket(req.body.id_service);
                const service_name = await serviceDao.getServiceById(req.body.id_service);

                const receipt_info = {
                    waitListCode: result,
		            queueCode: service_name.name,
		            timeEstimation: '00:10'
                };

                return res.status(201).json(receipt_info);
            }
            else {
                return res.status(404).json({ error: "Not Found" });
            }
        }
        catch(err) {
            return res.status(503).json({ error: "Service Unavailable" });
        }

    });

/*** Users APIs ***/

// POST /sessions
// login
app.post('/api/sessions', function (req, res, next) {
	passport.authenticate('local', (err, user, info) => {
		if (err) return next(err);
		if (!user) {
			// display wrong login messages
			return res.status(401).json(info);
		}
		// success, perform the login
		req.login(user, (err) => {
			if (err) return next(err);

			// req.user contains the authenticated user, we send all the user info back
			// this is coming from userDao.getUser()
			return res.json(req.user);
		});
	})(req, res, next);
});

// DELETE /sessions/current
// logout
app.delete('/api/sessions/current', (req, res) => {
	req.logout();
	res.end();
});

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {
	if (req.isAuthenticated()) {
		res.status(200).json(req.user);
	} else res.status(401).json({ error: 'Unauthenticated user!' });
});

// activate the server
app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;