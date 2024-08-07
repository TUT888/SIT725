const express= require("express");
const app= express();
const port = process.env.port || 3000;

app.use(express.static(__dirname + "/public"))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');
const url = "mongodb+srv://alice:week4task@cluster0.lh9wwqk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
let collection;

const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('calculation');
    } catch (err) {
        console.error(err);
    }
}

// Database API
function getAllCalculations(callback) {
    collection.find({}).toArray(callback);
}

function saveCalculation(calculation, callback) {
    collection.insertOne(calculation, callback);
}

app.get('/api/getAllHistory', (req, res) => {
    getAllCalculations((err, result) => {
        if (!err) {
            res.json({
                statuscode: 200,
                data: result,
                message: "Get calculation history successful!"
            })
        }
    })
});

app.post('/api/saveHistory', (req, res) => {
    let calculation = req.body;
    saveCalculation(calculation, (err, result) => {
        if (!err) {
            res.json({
                statuscode: 200,
                data: result,
                message: "Save calculation history successful!"
            })
        }
    })
});

// Calculation services 
const addTwoNumber = (n1,n2) => { return n1+n2; }
const subTwoNumber = (n1, n2) => { return n1-n2; }
const mulTwoNumber = (n1, n2) => { return n1*n2; }
const divTwoNumber = (n1, n2) => { return n1/n2; }

app.get("/addTwoNumber", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    const result = addTwoNumber(n1, n2);
    res.json({statuscocde:200, data: result }); 
});

app.get("/subTwoNumber", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    const result = subTwoNumber(n1, n2);
    res.json({statuscocde:200, data: result }); 
});

app.get("/mulTwoNumber", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    const result = mulTwoNumber(n1, n2);
    res.json({statuscocde:200, data: result}); 
});

app.get("/divTwoNumber", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    const result = divTwoNumber(n1, n2);
    res.json({statuscocde:200, data: result}); 
});

// Start server
app.listen(port, () => {
    console.log("Hello I'm listening to port " + port);
    console.log("http://localhost:" + port);
    runDBConnection();
})