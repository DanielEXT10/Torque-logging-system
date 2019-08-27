const express = require('express');
const app = express();

const SerialPort = require('serialport');


const http = require('http');

const ReadLine = SerialPort.parsers.Readline;
const socketIo = require('socket.io');

const mySerial = new SerialPort("/dev/ttyACM0", {
    baudRate: 9600
});

const parser = mySerial.pipe(new ReadLine({ delimiter: '\n' }));

const server = http.createServer(app);
const io = socketIo.listen(server);



app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/index.html');
});
console.log(__dirname);
app.use('/css', express.static(__dirname + '/css'));


mySerial.on('open', function () {
    console.log('Serial Port is Open')
});
parser.on('data', function (data) {
    
    console.log(data.toString());
    io.emit('arduino:data', {
        value: data.toString()
    });
});

mySerial.on('error', function (err) {
    console.log(err);
});

server.listen(3000, () => {
    console.log('server on port', 3000);
})