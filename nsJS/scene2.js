var scene, camera, renderer, controls;
var ADD=0.01;

var cube1, cube2, plane;




var createCube1= function(){
  //geometry
  var geometry=new THREE.BoxGeometry(1,1,1);
  //material
  var material=new THREE.MeshBasicMaterial({color:new THREE.Color("rgb(100,100,0)"), transparency:true, opacity:0.8, wireframe:true});  
  //mesh
  cube1=new THREE.Mesh(geometry, material);
  cube1.position.x=0;
  normals=new THREE.FaceNormalsHelper(cube1, 5);
  scene.add(cube1);
}

var init=function(){
  scene=new THREE.Scene();
  scene.background=new THREE.Color("rgb(255,255,255)");

  camera=new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z=5;

  var axes=new THREE.AxesHelper(5);
  scene.add(axes);

  createCube1();
  
  renderer=new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls=new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change',render);
  controls.enableZoom=true;

  document.body.appendChild(renderer.domElement);
}

// Options to be added to the GUI
var guiControls=new function(){
  this.posX=0.01;
  this.rotationX = 0.01;
}
var datgui=new dat.GUI();
datgui.add(guiControls, "posX", 0, 0.1);
datgui.add(guiControls, "rotationX", 0, 0.1);

var mainLoop=function(){
  cube1.position.x=guiControls.posX;
  cube1.rotation.x+=guiControls.rotationX;
  
  requestAnimationFrame(mainLoop);
  controls.update();
  render();
}

var render=function(){
  renderer.render(scene, camera);
}



init();
mainLoop();
