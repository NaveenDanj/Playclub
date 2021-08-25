// const { Socket } = require('dgram');
// const express = require('express');
// // const cors = require('cors')
// const app = express();
// // app.use(cors())
// const PORT = 5555 || process.env.PORT;
// const server = require('https').createServer(app);
// const io = require('socket.io')(server , {cors : {origin : "*"}});




// app.listen(PORT , () => {
//     console.log('Server is up and running!');
// })



const express = require("express")
var app = express();
var server = app.listen(5555);



var io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});

app.get('/' , (req , res) => {
    res.send('Hello World');
});

io.on('connection' , (Socket) => {
    console.log('new user connected!');
})

