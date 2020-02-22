let express = require('express');
let app = express();

let server = require('http').createServer(app);
let io = require('socket.io').listen(server).sockets;

let connections = [];

app.use(express.static('public'));

io.on('connection',function(socket){
    connections.push(socket);
    
    socket.emit('identity',connections.indexOf(socket));
    
    socket.on('input',(data)=>{
        io.emit('sync',data);
    });

    socket.on('winInfo',(data)=>{
        io.emit('syncWin',data);
    });


    socket.on('disconnect',()=>{
        connections.splice(connections.indexOf(socket),1);
        
    });
    
})

server.listen(process.env.PORT || 3000, function(){
    console.log('server is running');
    
});

// app.get('/',function(req,res){
//     res.sendFile(__dirname + "/public/index.html");
// });