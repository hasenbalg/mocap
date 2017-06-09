
  var previousFrame = null;
  Leap.loop({enableGestures: true}, function(frame) {
    if (frame.hands.length > 0) {
      for (var i = 0; i < frame.hands.length; i++) {
        var hand = frame.hands[i];
        if (previousFrame && previousFrame.valid) {
          if(hand.grabStrength < .5){
            var translation = hand.translation(previousFrame);
            // console.log(translation);
            translation[0] = Math.round(translation[0]*100)/100;
            translation[1] = Math.round(translation[1]*100)/100;
            document.getElementById('debug').innerHTML = (hand.type == 'left' ? translation[0] + '\n' + translation[1] : '');
            y_speed = translation[0] /100;
            x_speed = translation[1] /250;
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
    previousFrame = frame;
  });
