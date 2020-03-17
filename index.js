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
    
    // disconnect
    socket.on('disconnect', function(data){
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    });
    
    // send message
    socket.on('send message', function(data){
        io.sockets.emit('new message', {msg: data, user: socket.username});
    });
    
    // new user
    socket.on('new user', function(data, callback){
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
    });
    
    function updateUsernames(){
        io.sockets.emit('get users', users);
    }
});