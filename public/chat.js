$(function(){
    // make connection
    let socket = io.connect();
    
    // query DOM
    let $messageForm = $('#messageForm');
    let $message = $('#message');
    let $chat = $('#chat');
    
    $messageForm.submit(function(e){
        e.preventDefault();
        socket.emit('send message', $message.val());
        $message.val('');
    });
    
    socket.on('new message', function(data){
        $chat.append('<li id="single-message">' +data.msg+ '</li>');
    });
});