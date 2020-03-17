let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let port = process.env.PORT || 3000

users = [];
connections = [];

// runserver
server.listen(port, function(){
    console.log('Server running:' + port);
});

// routes
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// static files
app.use(express.static('public'));

io.on('connection', function(socket){
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);
    
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    });
});