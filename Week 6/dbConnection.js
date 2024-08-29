// MongoDB connection
const { MongoClient, ServerApiVersion } = require('mongodb');
const url = "mongodb+srv://alice:week4task@cluster0.lh9wwqk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

client.connect();

module.exports = client;