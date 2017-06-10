var imgs = document.getElementsByTagName('img'), img_to_substitute;
for(var i = 0; i < imgs.length; i++) {
  if(imgs[i].src == url){
    img_to_substitute = imgs[i];
  }
}
  img_to_substitute.parentElement.setAttribute("id", "360_container");
