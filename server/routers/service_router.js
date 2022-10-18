const express = require('express');
const router = express.Router();
const serviceDao = require('../modules/service-dao');

/*** Services APIs ***/

// GET /api/services
router.get('/services', async (req, res) => {

    try {
        const result = await serviceDao.getAllServices();
        return res.status(200).json(result);
    }
    catch(err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }

});

module.exports = router;