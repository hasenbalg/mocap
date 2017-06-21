var canvas = document.createElement('canvas');
// canvas.width = 300; canvas.height = 150;

var x_speed = 0.0005, y_speed = 0.0005, fov = 75, amount = 1, exposure = 1;
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ canvas: canvas });

var geometry = new THREE.SphereGeometry(10, 32, 32);
var material = new THREE.MeshBasicMaterial();
var mesh = new THREE.Mesh(geometry, material);
mesh.scale.x = -1;
scene.add(mesh);
var tex_loader = new THREE.TextureLoader();


function draw_img(data_url){
  tex_loader.load(data_url , function(texture) {
    mesh.material = new THREE.MeshBasicMaterial({map: texture});
    loop();
  });
}

function find_img_by_url(url) {
  var all_imgs = document.getElementsByTagName('img');
  for(var i = 0; i < all_imgs.length ; i++) {
    if(all_imgs[i].src == url){
      return all_imgs[i];
    }
  }
}

function loop(){
  requestAnimationFrame(loop);

  // camera.fov = fov;
  // camera.updateProjectionMatrix();
  camera.rotation.x += x_speed;
  mesh.rotation.y += y_speed;
  renderer.render(scene, camera);
}

function toDataURL(url, callback) {
  // https://stackoverflow.com/a/20285053/4062341
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}


if(url.includes('data:image')){
  draw_img(url);
}else{
  toDataURL(url, function(dataUrl) {
    console.log(dataUrl);
    draw_img(dataUrl);
  });
}


var img2replace = find_img_by_url(url);
canvas.width = img2replace.width;
canvas.height = img2replace.height;

var ratio  = canvas.width/ canvas.height;
var camera = new THREE.PerspectiveCamera(fov,ratio , .1, 1000 );//fov, aspect, near, far



renderer.setSize(canvas.width, canvas.height);
img2replace.replaceWith(canvas);
