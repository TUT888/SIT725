let express = require('express');
let router = express.Router();
let controller = require('../controllers/controller');

router.get('/getAllHistory', (req, res) => {
    controller.getAllCalculations(req, res);
});

router.post('/postHistory', (req, res) => {
    controller.postCalculation(req, res);
});

module.exports = router;