var start_time =0;
var zero_point;
var previousFrame = null;
var damping = 5000;
var fov = 75;

// TODO Delete this if not needed anymore.
function vectorToString(vector, digits) {
  if (typeof digits === "undefined") {
    digits = 1;
  }
  return "(" + vector[0].toFixed(digits) + ", "
             + vector[1].toFixed(digits) + ", "
             + vector[2].toFixed(digits) + ")";
}

// Math.map() of Processing
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function stop_rotation() {
  x_speed = 0;
  y_speed = 0;
}

Leap.loop({enableGestures: true}, function(frame) {

  if (frame.hands.length > 0) {
    if(frame.timestamp/100000 - start_time > 3){
      if(!zero_point) {
        zero_point = frame.hands[0].palmPosition;
      }

      for (var i = 0; i < frame.hands.length; i++) {
        var hand = frame.hands[i];
        if (previousFrame && previousFrame.valid) {

          if(hand.grabStrength < .5){
            var translation = {x: hand.palmPosition[0] - zero_point[0], y: hand.palmPosition[1] - zero_point[1]};
            x_speed = (Math.abs(translation.y) > 10 ? translation.y /damping: 0);
            y_speed = (Math.abs(translation.x) > 10 ? translation.x /damping: 0);
          } else {
            stop_rotation();
          }

          if(hand.roll() < -.9 && hand.roll() > -1.5) {
            fov = map_range(hand.palmPosition[2] - zero_point[2], 100, -30, 90, 50);
            //fov = map_range(hand.pinchStrength, 0, 1, 75, 90);
            stop_rotation();
          }
        }
      }
    }else {
      stop_rotation();
    }
  }else{
    start_time = frame.timestamp/100000;
    zero_point = null;
    stop_rotation();
  }
  previousFrame = frame;
});
