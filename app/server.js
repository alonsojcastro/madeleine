
// HTTP Portion
var http = require('http');
// URL module
var url = require('url');
var path = require('path');

// Using the filesystem module
var fs = require('fs');

// var GPIO = require('onoff').Gpio,
//     led = new GPIO(17, 'out'),
//     button = new GPIO(4, 'in', 'both');

var server = http.createServer(handleRequest);
server.listen(4000);

console.log('Server started on port 4000');

function handleRequest(req, res) {
  // What did we request?
  var pathname = req.url;
  
  // If blank let's ask for index.html
  if (pathname == '/') {
    pathname = '/index.html';
  }
  
  // Ok what's our file extension
  var ext = path.extname(pathname);

  // Map extension to file type
  var typeExt = {
    '.html': 'text/html',
    '.js':   'text/javascript',
    '.css':  'text/css'
  };

  var contentType = typeExt[ext] || 'text/plain';

  // Now read and write back the file with the appropriate content type
  fs.readFile(__dirname + pathname,
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + pathname);
      }
      // Dynamically setting content type
      res.writeHead(200,{ 'Content-Type': contentType });
      // res.writeHead(200);
      res.end(data);
    }
  );
}

// dynamo database
// var ddb = require ('dynamodb')
//   .ddb({
//     accessKeyId: process.env.APP_BANK_GAME_HW_ACCESSKEYID,
//     secretAccessKey: process.env.APP_BANK_GAME_HW_ACCESSKEYSECRET,
//     endpoint: "dynamodb.us-west-2.amazonaws.com"
//     });

var ddb = require ('dynamodb')
  .ddb({

    accessKeyId: 'AKIAIEDL5YAJYYOLIEEQ',
    secretAccessKey: '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',
    endpoint: "dynamodb.us-west-2.amazonaws.com"
    });

// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io').listen(server);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {
  
    console.log("We have a new client: " + socket.id);

    // function light(err, state) {
      
    //   // check the state of the button
    //   // 1 == pressed, 0 == not pressed 
    //   if(state == 1) {
    //     led.writeSync(1);

    //   } else {

    //         setTimeout(function() { 
    //         led.writeSync(0);  // Turn LED off
    //     // led.unexport();    // Unexport GPIO and free resources 
    //     }, 20000);
    //   }

    // console.log(state);
    // }

    // pass the callback function to the
    // as the first argument to watch()
    // button.watch(light);

    // button.readSync(light);

    // console.log('it is off: ' + button.readSync(light));

    //     socket.on('voice',
    //         function(data){
    //             console.log("Received: 'voice' " + data);

    //             socket.broadcast.emit('voice', data);

    //             io.sockets.emit('message', "thank you for sharing your memories");

    //   });
    var x = Math.random()*2445324234234;

    socket.on('voice',
      function (data){
        
        var newMemory = {
            "memory": "memory" + x,
            memoryString: data.input
        };

        // ddb.getItem('memories', 'memory1', null, {}, 
        //   function(err, dynamoResult, cap){

        //     console.log(dynamoResult);
        // });          

        ddb.putItem('memories', newMemory, {},
          function(err, dynamoResult, cap) {
            x += Math.random()*2445324234234;

            console.log(data);


          ddb.getItem('memories', newMemory, null, {},
            function(err, dynamoResult, cap) {
              console.log(newMemory);
              socket.emit(data);
            })

        });       

        // ddb.batchGetItem({'memories': { keys: ['memory', 'memoryString'] }}, function(err, res) {
        //   if(err) {
        //     console.log(err);
        //   } else {
        //     console.log(res);
        //   }
        // });

        // app.get('/get-cost', (req, res) => {
        //   ddb.getItem('bankgame', 'newPlayer', null, {},
        //     function(err, dynamoResult, cap) {
        //       res.send(dynamoResult)
        //     });
        // });  

      });
    
    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);


