import express from 'express';

const app = express();

module.exports = app

app.get('/', (req, res) => {
    console.log('GET / request arrive')
    res.send('Hello World');
});

var port = process.env.port || 3000

if(!module.parent){
    app.listen(port)
}
console.log("Application started. Listening on port:" + port)