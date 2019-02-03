function genCube(){
  var geometry=new THREE.BoxGeometry(1,1,1);
  var material=new THREE.MeshPhongMaterial({color:new THREE.Color('rgb(155,0,0)')});
  var cube=new THREE.Mesh(geometry,material);
  scene.add(cube);
  
  return cube;
}