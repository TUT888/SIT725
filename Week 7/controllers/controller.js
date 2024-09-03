let collection = require('../models/calculation');

const getAllCalculations = (req, res) => {
    collection.getAllCalculations((err, result) => {
        if ( result==null ) {
            res.json({
                statuscode: 400,
                data: result,
                message: "Get calculation history failed!"
            }).status(400);
        } else {
            res.json({
                statuscode: 200,
                data: result,
                message: "Get calculation history successful!"
            }).status(200);
        }
    })
}

const postCalculation = (req, res) => {
    let calculation = req.body;
    collection.postCalculation(calculation, (err, result) => {
        if (err) {
            res.json({
                statuscode: 400,
                data: result,
                message: "Save calculation history failed!"
            }).status(400);
        } else {
            res.json({
                statuscode: 200,
                data: result,
                message: "Save calculation history successful!"
            }).status(200);
        }
    })
}

module.exports = {
    getAllCalculations,
    postCalculation
}