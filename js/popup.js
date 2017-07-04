var background = chrome.extension.getBackgroundPage();

console.log(localStorage.getItem('zoom_status'));

var zoom_enabled = localStorage.getItem('zoom_status');
zoom_enabled = document.getElementById('zoom_enabled');

/*
zoom-bool will be saved in runime
TODO
[] if page reloads, zoom-bool saves
[] checkbox persists, when popup closed
*/

zoom_enabled.onchange = function(){

  var data = document.getElementById('zoom_enabled').checked;
  console.log("button changed to: " + data);

  localStorage.setItem('zoom_status', data);
  background.toggleZoom(this.checked);
}
