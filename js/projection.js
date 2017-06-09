var x_speed = 0.0005, y_speed = 0.0005;

var container = document.getElementById('container');
var ratio = container.clientWidth/ container.clientHeight;
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();

var camera = new THREE.PerspectiveCamera(75,ratio , .1, 1000 );//fov, aspect, near, far
var mesh = null;
var geometry = new THREE.SphereGeometry(10, 64, 64);
material = new THREE.MeshBasicMaterial({ side: THREE.BackSide});
var mesh = new THREE.Mesh(geometry, material);
mesh.scale.x = -1;
scene.add(mesh);

//
// var texture = THREE.ImageUtils.loadTexture('gear-360_slide360_02.jpg', {}, function() {
//   console.log("huhu");
//   renderer.render(scene);
// });
var tex_loader = new THREE.TextureLoader();
tex_loader.load('gear-360_slide360_02.jpg', function(texture) {

  mesh.material = new THREE.MeshBasicMaterial({map: texture});

});

// var material = new THREE.MeshBasicMaterial({map: texture, side: THREE.BackSide});
// var geometry = new THREE.SphereGeometry(10, 64, 64);
//
//
// var mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);


camera.position.z = 0;

var loop = function(){
  requestAnimationFrame(loop);

  camera.rotation.x += x_speed;
  mesh.rotation.y += y_speed;
  renderer.render(scene, camera);
}
loop();
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);
