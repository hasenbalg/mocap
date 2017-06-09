
  var previousFrame = null;
  Leap.loop({enableGestures: true}, function(frame) {
    if (frame.hands.length > 0) {
      for (var i = 0; i < frame.hands.length; i++) {
        var hand = frame.hands[i];
        if (previousFrame && previousFrame.valid) {
          var translation = hand.translation(previousFrame);
          y_speed = translation[0] /50;
          x_speed = translation[1] /250;
        }
      }
    }
    else {
      x_speed = 0;
      y_speed = 0;
    }
    previousFrame = frame;
  });
