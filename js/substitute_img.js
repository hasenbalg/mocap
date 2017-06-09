



  console.log(url);
  var imgs = document.getElementsByTagName('img'), img_to_substitute;
  for(var i = 0; i < imgs.length; i++) {

    // console.log(imgs[i].src);
    if(imgs[i].src == url){
      img_to_substitute = imgs[i];
    }
  }
    img_to_substitute.style.border = '5px solid red';
