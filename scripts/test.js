
var GPIO = require('onoff').Gpio,
    led = new GPIO(17, 'out'),
    button = new GPIO(4, 'in', 'both');

function light(err, state) {
  
  // check the state of the button
  // 1 == pressed, 0 == not pressed
  if(state == 1) {
    led.writeSync(1);

  } else {

        setTimeout(function() { 
        led.writeSync(0);  // Turn LED off
    // led.unexport();    // Unexport GPIO and free resources 
    }, 20000);
  }

console.log(state);
}

// pass the callback function to the
// as the first argument to watch()
button.watch(light);

button.readSync(light);

console.log('it is off: ' + button.readSync(light));