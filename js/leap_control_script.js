<<<<<<< HEAD
// Values for major control
=======
>>>>>>> 6a3e09860779577a25654878f03ddd147f11ec3d
var start_time = 0;
var zero_point;
var previousFrame = null;
var damping = 5000;

// Values to set the zoom level
var fov = 75;
<<<<<<< HEAD
var FOV_MAX = 125;
var FOV_MIN = 25;
var HAND_IN = 50;
var HAND_OUT = -50;
var zero_zoom;
var reset_pivot;

// Values for setting the image exposure
var exposure = 1;

=======
var exposure = 1;

>>>>>>> 6a3e09860779577a25654878f03ddd147f11ec3d
function camera_rotate(handPos) {
  var translation = {
    x: handPos[0] - zero_point[0],
    y: handPos[1] - zero_point[1]
  };
  x_speed = (Math.abs(translation.y) > 10 ? translation.y / damping : 0);
  y_speed = (Math.abs(translation.x) > 10 ? translation.x / damping : 0);
}

<<<<<<< HEAD
function camera_zoom(handPos, zero_zoom) {
  stop_rotation();
  fov = map_range(handPos[2] - zero_zoom[2], HAND_OUT, HAND_IN, 125, 25);
=======
function camera_zoom(handPos) {
  stop_rotation();
  fov = map_range(handPos[2] - zero_point[2], -50, 50, 25, 90);
>>>>>>> 6a3e09860779577a25654878f03ddd147f11ec3d
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
<<<<<<< HEAD

          console.log(hand.rotationAngle(previousFrame));

          if (hand.grabStrength < .5) {
            camera_rotate(hand.palmPosition);
          }
          if (hand.grabStrength > .5) {
            if(reset_pivot) {
              zero_zoom = zero_point;
              reset_pivot = false;
            }
            camera_zoom(hand.palmPosition, zero_zoom);
          }
          else {
            reset_pivot = true;
          }

=======
          if (hand.grabStrength < .5) {
            camera_rotate(hand.palmPosition);
          } else if (hand.grabStrength > .5) {
            camera_zoom(hand.palmPosition);
          }
>>>>>>> 6a3e09860779577a25654878f03ddd147f11ec3d
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
