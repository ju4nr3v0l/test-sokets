'use strict';
var app         = require('express')();
var cors        = require('cors')
var server      = require('http').Server(app);
var ioRedis     = require('ioredis');
var io          = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
require('dotenv').config();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
var redisPort = process.env.REDIS_PORT;
var redisHost = process.env.REDIS_HOST;
var redis = new ioRedis(redisPort, redisHost);

var broadcastPort = process.env.BROADCAST_PORT;
server.listen(broadcastPort, function () {
    console.log('Socket server is running.');
});

io.on('connection', function(socket) {

    socket.on("message", (data) => {
        socket.join(data);
    });

    // handle the event sent with socket.emit()
    console.log('Un cliente se ha conectado');
});


app.get("/send/message/:channel/:message",function (req,res) {
    var sala=req.params.channel;
    var message=req.params.message;
    console.log(sala)
    // io.on('connection', function(socket){
    //     socket.to(sala).emit("Te envio mensaje desde la sala "+sala);
    // });
    io.to(sala).emit(message+" "+sala)
    return res.send("mensaje emitido")
})



