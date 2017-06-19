var x_speed = 0.0005, y_speed = 0.0005, fov = 75, amount = 1, exposure = 1;

var container = document.getElementById('360_container');
var ratio = container.clientWidth/ container.clientHeight;
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();

var camera = new THREE.PerspectiveCamera(75,ratio , .1, 1000 );//fov, aspect, near, far
var geometry = new THREE.SphereGeometry(10, 64, 64);
var material = new THREE.MeshBasicMaterial();
var mesh = new THREE.Mesh(geometry, material);
mesh.scale.x = -1;
scene.add(mesh);

var tex_loader = new THREE.TextureLoader();
tex_loader.load(url , function(texture) {

mesh.material = new THREE.MeshBasicMaterial({map: texture});

});

function loop(){
  requestAnimationFrame(loop);

  camera.fov = fov;
  camera.updateProjectionMatrix();
  camera.rotation.x += x_speed;
  mesh.rotation.y += y_speed;
  renderer.render(scene, camera);
}
loop();
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);
