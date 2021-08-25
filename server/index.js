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
            obj.users = [socket];
            rooms.push(arg);
            console.log('the rooms are' , rooms);
            socket.emit("create_room_success",  arg.room_id);
        }else{
            console.log('the error');
            socket.emit("create_room_error",  true);
        }

    });

    socket.on("join_room", (arg) => {

        let check = false;

        
        for(let i = 0; i < rooms.length; i++){


            if(rooms[i].room_id === arg.room_id){
                
                if(rooms[i].password === arg.password ){
                    socket.emit("login_room_success",  true);
                    check = true;
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

