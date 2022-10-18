'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const serviceRouter = require('./routers/service_router');
const ticketRouter = require('./routers/ticket_router');
const userRouter = require('./routers/user_router');

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

app.use(morgan('dev'));
app.use(express.json());

/******API******/

app.use('/api',serviceRouter);
app.use('/api',ticketRouter);
app.use('/api',userRouter);

// activate the server
app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;