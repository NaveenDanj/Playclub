import io from 'socket.io-client';
let socket = null;

export function initSocket(){
    socket =  io("http://localhost:5555");
}

export function get_socket_node(){
    return socket;
}