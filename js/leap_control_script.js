
var start_time =0;
var zero_point;
var previousFrame = null;
var damping = 5000;
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
