/*
Cubemap instead of sphere for image mapping
[Brightness with pinch after Hand rotated around -90°/+90° for HDR images]
Implement as Google Chrome Plugin
Add Context Menu for Google Chrome
Add Settings of Plugin:
-FOV
-Damping speed
-1:1 / Fullscreen View
*/



var start_time =0;
var zero_point;
var previousFrame = null;
var damping = 5000;

function vectorToString(vector, digits) {
  if (typeof digits === "undefined") {
    digits = 1;
  }
  return "(" + vector[0].toFixed(digits) + ", "
             + vector[1].toFixed(digits) + ", "
             + vector[2].toFixed(digits) + ")";
}

Leap.loop({enableGestures: true}, function(frame) {

  if (frame.hands.length > 0) {
    if(frame.timestamp/100000 - start_time > 3){
      if(!zero_point) {
        zero_point = frame.hands[0].palmPosition;
      }

      // I tried to output the rotation of the hand for more gestures.
      // doing so in the bus doesn't work. At all.
      var rotationAxis = frame.rotationAxis(previousFrame, 2);
      var rotationAngle = frame.rotationAngle(previousFrame);
      handString += "Rotation axis: " + vectorToString(rotationAxis) + "<br />";
      handString += "Rotation angle: " + rotationAngle.toFixed(2) + " radians<br />";
      document.getElementById("debug") = handString;

      for (var i = 0; i < frame.hands.length; i++) {
        var hand = frame.hands[i];
        if (previousFrame && previousFrame.valid) {
          if(hand.grabStrength < .5){
            var translation = {x: hand.palmPosition[0] - zero_point[0], y: hand.palmPosition[1] - zero_point[1]};
            x_speed = (Math.abs(translation.y) > 10 ? translation.y /damping: 0);
            y_speed = (Math.abs(translation.x) > 10 ? translation.x /damping: 0);
          }else {
            x_speed = 0;
            y_speed = 0;
          }
        }
      }
    }else {
      x_speed = 0;
      y_speed = 0;
    }
  }else{
    start_time = frame.timestamp/100000;
    zero_point = null;
    x_speed = 0;
    y_speed = 0;
  }
  previousFrame = frame;
});
