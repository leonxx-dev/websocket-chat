let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log('Server running...');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});