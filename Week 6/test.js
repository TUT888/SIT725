var expect = require("chai").expect;
const { json } = require("express");
var request = require("request");

describe("Get all history (GET)", function() {
    var url = "http://localhost:3000/api/getAllHistory";

    it("Should return status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
        });
    })
    it("Return body should have status 200, which is the successful result", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body);
            expect(body.statuscode).to.equal(200);
            done()
        });
    })
    it("Return body should have data in array format", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body);
            // expect(Object.keys(body.data)).to.equal("n1,n2,operation,result");
            expect(body.data).to.be.an("array");
            done();
        });
    })
    it("Return body should have data as an array of calculations, with _id, n1, n2, operation and result", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body);
            body.data.forEach(element => {
                expect(element).to.have.all.keys('_id', 'n1', 'n2', 'operation', 'result');
            });
            done();
        });
    })
})