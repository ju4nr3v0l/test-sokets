'use strict';
var app = require('express')();
var cors = require('cors')
var server = require('http').Server(app);
var io = require('socket.io')(server, {
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
var ioRedis = require('ioredis');

var redis = new ioRedis(redisPort, redisHost);

var broadcastPort = process.env.BROADCAST_PORT;
server.listen(broadcastPort, function () {
    console.log('Socket server is running.');
})
redis.on('message', function (channel, message) {
    console.log(channel)
    console.log(JSON.parse(message))
    message  = JSON.parse(message);
    io.emit(channel + ':' + message.event, message.data);
});
app.get('/', function(req, res) {
    console.log('me hicieron request');
    console.log(req.params.channel);
    redis.subscribe('lumen_database_private-example-channel');


    res.send('hello world');
});
