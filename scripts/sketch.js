

// Keep track of our socket connection
var socket;
var myRec;
// var mymap; 

function setup(){
  socket = io.connect('http://localhost:4000');
  console.log("connected");
  // mymap = L.map('city_map')
  //   .setView([51.505, -0.09], 13);

  // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  //   attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  //   maxZoom: 18,
  //   id: 'your.mapbox.project.id',
  //   accessToken: 'your.mapbox.public.access.token'
  // }).addTo(mymap);
  
  myRec= new p5.SpeechRec(); // new P5.SpeechRec object

  myRec.continuous = true; 

    var canv = createCanvas(950, 375);
    canv.position(width/6, 200);
    // createCanvas.position(200, 150);
    background(255, 86, 62);
    noStroke();
    fill(255, 255, 255);
    textSize(20);
    textAlign(CENTER);
    text("Please lightly tap the BLUE sensor! DO YOU FEEL THIS AMAZING SMELL?", width/2, height/2);
    text("Pick up the phone receiver", width/2, (height/2)+25);
    text("Tell me what you think this smells like!", width/2, (height/2)+55);
    text("What memories do you have through this smell?", width/2, (height/2)+85);
    text("Tell me the city you experienced this memory?", width/2, (height/2)+115);

    myRec.onResult = showResult;
    myRec.start();
    console.log(myRec);

    function showResult(){
      console.log("are you working!?");
      if(myRec.resultValue===true) {
        background(30, 145, 130);
        textAlign(CENTER);
        text(myRec.resultString,width/2, height/2 );
        console.log(myRec.resultString);
        sendMsg();
        receiveMSG();
      }
    }
}

function draw() {
  // mymap = L.map('city_map')
  //   .setView([51.505, -0.09], 13);
  // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  //   attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  //   maxZoom: 18,
  //   id: 'your.mapbox.project.id',
  //   accessToken: 'your.mapbox.public.access.token'
  // }).addTo(mymap);

// function makeShape(){
//   shape = new object()
// }

// function Object(){
//   //object from and positions details
//   this.x = random(width) 
// }

}

// Function for sending to the socket
function sendMsg () {

  // Send that object to the socket
  socket.emit('voice', {
    input: myRec.resultString
  });
}

// //Function for receiving data from socket
// function receiveMSG(){
//   socket.on(data, {
//     if ();
//       return(data);
//   });
// }







