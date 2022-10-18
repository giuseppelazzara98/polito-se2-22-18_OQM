const express = require('express');
const router = express.Router();
const { check, body, validationResult } = require('express-validator');

const ticketDao = require('../modules/ticket-dao');
const serviceDao = require('../modules/service-dao');

/*** Tickets APIs ***/

//GET /api/clientsPerService/:id_service
router.get('/clientsPerService/:id_service',
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

            if (serviceOk !== undefined) {
                const result = await ticketDao.clientsPerService(req.params.id_service);
                return res.status(200).json(result);
            }
            else {
                return res.status(404).json({ error: "Not Found" });
            }
        }
        catch (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }

    });

// POST /api/ticket
router.post('/ticket',
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
            const serviceCounter = await serviceDao.getServiceCounter(req.body.id_service);

            if (serviceOk !== undefined) {
                const serviceTime = serviceOk.service_time;
                let nrPeoplePerService = await ticketDao.clientsPerService(req.body.id_service);
                let nr = nrPeoplePerService.number;
                let ki = 0;

                serviceCounter.forEach(element => {
                    ki += element.n_services;
                });


                const estimatedTime = serviceTime * ((nr / (1 / ki)) + .5);
                const result = await ticketDao.storeTicket(req.body.id_service);
                const receipt_info = {
                    waitListCode: result,
                    queueCode: serviceOk.name,
                    timeEstimation: estimatedTime
                };

                return res.status(201).json(receipt_info);
            }
            else {
                return res.status(404).json({ error: "Not Found" });
            }
        }
        catch (err) {
            return res.status(503).json({ error: "Service Unavailable" });
        }

    });

module.exports = router;