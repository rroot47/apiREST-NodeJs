// imports
var express = require('express');

// Instantion de server
var server = express();

// configuration desroutes
server.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour Toute le monde</h1>')
});
//launcher server
server.listen(3000, () => {
    console.log('server running in port 3000');
})