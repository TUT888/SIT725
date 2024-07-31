const express= require("express");
const app= express();
app.use(express.static('public'))

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

app.get("/Display", (req, res) => {
    const n1 = "<html><body><H1>HELLO THERE</H1></body></html>";
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(n1));
})

const port = 3040;
app.listen(port, () => {
    console.log("Hello I'm listening to port " + port);
    console.log("http://localhost:" + port);
})