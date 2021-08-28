const express = require("express")
var app = express();
var server = app.listen(5555);

let rooms = [];

var io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});

app.get('/' , (req , res) => {
    res.send('Hello World');
});

io.on('connection' , (socket) => {

    console.log('new user connected!' , rooms);

    socket.on("create_room", (arg) => {

        let check = false;        

        for(let i = 0; i < rooms.length; i++){

            if(rooms[i].room_id == arg.room_id){
                check = true;
                break;
            }
        }

        if(!check){
            socket.join(arg.room_id);
            let obj = arg;
            obj.admin = socket;
            obj.users = [{id : socket.id , username : arg.admin_name}];
            rooms.push(arg);
            console.log('the rooms are' , rooms);
            socket.emit("create_room_success",  {admin_name : arg.admin_name , room_id : arg.room_id});
        }else{
            console.log('the error');
            socket.emit("create_room_error",  true);
        }

    });

    socket.on('request_kick_user' , (arg) => {
        console.log('kick user ' , arg.user_id);
        
        for(let i = 0; i < rooms.length; i++){

            if(rooms[i].room_id == arg.room_id){
                
                for(let j = 0; j < rooms[i].users.length; j++){

                    if(rooms[i].users[j].id == arg.user_id){
                        rooms[i].users.splice(j , 1);
                        console.log('the user deleted!')
                        io.to(rooms[i].room_id).emit('user_left_event' , rooms[i].users);
                        io.sockets.sockets.get(arg.user_id).emit('admin_kicked' , true)
                        io.sockets.sockets.get(arg.user_id).leave(arg.room_id);
                        break;
                    }

                }

            }

        }

    });

    socket.on("disconnect", (reason) => {
        //handle user disconnecting event. distroy rooms if admins disconnected from their room
        console.log('user disconnected!');

        for(let i = 0; i < rooms.length; i++){

            if(rooms[i].admin.id == socket.id){
                console.log('found room with admin leave');
                io.to(rooms[i].room_id).emit('room_remove_event' , true);
                rooms.splice(i , 1);
                continue;
            }

            if(rooms.length > 0){

                if(rooms[i].users){
                    for(let j = 0; j < rooms[i].users.length; j++){

                        if(rooms[i].users[j].id == socket.id){
                            rooms[i].users.splice(j , 1);
                            console.log('user deleted!');
                            io.to(rooms[i].room_id).emit('user_left_event' , rooms[i].users);
                        }
        
                    }
                }

            }

        }

    });

    socket.on('get_room_user_list' , (arg) => {
        
        for(let i = 0; i < rooms.length; i++){

            if(rooms[i].room_id == arg){
                socket.emit('room_user_list_response' , rooms[i].users);
                break;
            }

        }

    })

    socket.on('user_leave_room_request' , (arg) => {
        socket.leave(arg);
    });


    socket.on('send_message_request' , (arg) => {
        io.to(arg.room_id).emit('receive_message' , {arg});
    });

    socket.on("join_room", (arg) => {

        let check = false;

        
        for(let i = 0; i < rooms.length; i++){

            if(rooms[i].room_id === arg.room_id){
                
                if(rooms[i].password === arg.password ){

                    if(rooms[i].max_users > rooms[i].users.length){
                        rooms[i].users.push({id : socket.id , username : arg.username});
                        socket.join(arg.room_id);
                        socket.emit("login_room_success",  arg);
                        io.to(rooms[i].room_id).emit('user_join_event' , rooms[i].users);
                        check = true;
                    }else{
                        socket.emit("login_room_error",  'exceed the maximum users per room');
                        check = true;
                    }

                }else{
                    socket.emit("login_room_error",  true);
                }
                break;
            }

        }

        if(!check){
            socket.emit("login_room_error",  true);
        }

    });


})

