
    //
    // renderer.setSize(container.clientWidth, container.clientHeight);
    console.log(img_to_substitute.width, img_to_substitute.height);
    var canvas = container.getElementsByTagName('canvas')[0];
    canvas.width = img_to_substitute.width;
    canvas.height = img_to_substitute.height;
    // canvas.style.width = img_to_substitute.width + 'px';
    // canvas.style.height = img_to_substitute.height + 'px';
    container.removeChild(img_to_substitute);
    renderer.setSize(canvas.width, canvas.height);

    camera.aspect = canvas.width/canvas.height;


    tex_loader.load(url, function(texture) {
      mesh.material = new THREE.MeshBasicMaterial({map: texture});
    });
