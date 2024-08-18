let collection = require('../models/calculation');

const getAllCalculations = (req, res) => {
    collection.getAllCalculations((err, result) => {
        if (!err) {
            res.json({
                statuscode: 200,
                data: result,
                message: "Get calculation history successful!"
            })
        }
    })
}

const postCalculation = (req, res) => {
    let calculation = req.body;
    collection.postCalculation(calculation, (err, result) => {
        if (!err) {
            res.json({
                statuscode: 200,
                data: result,
                message: "Save calculation history successful!"
            })
        }
    })
}

module.exports = {
    getAllCalculations,
    postCalculation
}