$(function(){
    // make connection
    let socket = io.connect();
    
    // query DOM
    let $messageForm = $('#messageForm');
    let $message = $('#message');
    let $chat = $('#chat');
    let $chatArea = $('#chatArea');
    let $userFormArea = $('#userFormArea');
    let $userForm = $('#userForm');
    let $users = $('#users');
    let $username = $('#username');
    
    // message form
    $messageForm.submit(function(e){
        e.preventDefault();
        socket.emit('send message', $message.val());
        $message.val('');
    });
    
    // user form
    $userForm.submit(function(e){
        e.preventDefault();
        socket.emit('new user', $username.val(), function(data){
            if(data){
                $userFormArea.hide();
                $chatArea.show();
                $chatArea.attr('style', 'display:flex;');
            }
        });
        $username.val('');
    });
    
    socket.on('get users', function(data){
        let online = '';
        for(i = 0; i < data.length; i++){
            online += '<li class="list-group-item">' +data[i]+ '</li>';
        }
        $users.html(online);
    });
    
    // new message in chat
    socket.on('new message', function(data){
        $chat.append('<li id="singleMessage"><strong>' +data.user+ ':' + '</strong> ' +data.msg+ '</li>');
    });
    
    
    
});