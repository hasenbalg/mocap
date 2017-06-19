var start_time = 0;
var zero_point;
var previousFrame = null;
var damping = 5000;
var fov = 75;
var exposure = 1;

function camera_rotate(handPos) {
  var translation = {
    x: handPos[0] - zero_point[0],
    y: handPos[1] - zero_point[1]
  };
  x_speed = (Math.abs(translation.y) > 10 ? translation.y / damping : 0);
  y_speed = (Math.abs(translation.x) > 10 ? translation.x / damping : 0);
}

function camera_zoom(handPos) {
  stop_rotation();
  fov = map_range(handPos[2] - zero_point[2], -50, 50, 25, 90);
}

function image_exposure(handPos) {
  stop_rotation();
  if (handPos[1] - zero_point[1] > 25) {
    exposure = map_range(handPos[1] - zero_point[1], 10, 100, 1, 2);
  } else if (handPos[1] - zero_point[1] < -25) {
    exposure = map_range(handPos[1] - zero_point[1], -100, -10, 0.25, 1);
  } else {
    exposure = 1;
  }
}

Leap.loop({enableGestures: true}, function(frame) {
  if (frame.hands.length > 0) {
    if (frame.timestamp / 100000 - start_time > 3) {
      if (!zero_point) {
        zero_point = frame.hands[0].palmPosition;
      }

      for (var i = 0; i < frame.hands.length; i++) {
        var hand = frame.hands[i];
        if (previousFrame && previousFrame.valid) {
          if (hand.grabStrength < .5) {
            camera_rotate(hand.palmPosition);
          } else if (hand.grabStrength > .5) {
            camera_zoom(hand.palmPosition);
          }
          if (hand.pinchStrength > 0.2) {
            image_exposure(hand.palmPosition);
          }
        }
      }
    } else {
      stop_rotation();
    }
  } else {
    start_time = frame.timestamp / 100000;
    zero_point = null;
    stop_rotation();
  }
  previousFrame = frame;
});

function map_range(value, low1, high1, low2, high2) {
  if (value > high1) {
    return high2;
  } else if (value < low1) {
    return low2;
  } else {
    return (high2 - low2) * (value - low1) / (high1 - low1) + low2;
  }
}

function stop_rotation() {
  x_speed = 0;
  y_speed = 0;
}
