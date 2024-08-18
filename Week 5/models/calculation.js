let client = require('../dbConnection');
let collection = client.db().collection('calculation');

// Database access
function getAllCalculations(callback) {
    collection.find({}).toArray(callback);
}

function postCalculation(calculation, callback) {
    collection.insertOne(calculation, callback);
}

module.exports = {
    getAllCalculations,
    postCalculation
}