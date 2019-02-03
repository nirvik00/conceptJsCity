var camera, controls, scene, renderer;
init();
addLights();
render();
document.addEventListener("keypress",function(event){
    console.log('h', event.keyCode);
    if(event.keyCode===104){
      console.log('done');
    }
});

function init(){  
  renderer=new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(500,500);
  document.body.appendChild(renderer.domElement);

  scene=new THREE.Scene();
  scene.background=new THREE.Color( "rgb(255,255,255)" );

  var center = new THREE.Vector3();
  camera = new THREE.PerspectiveCamera(45, 1, 0.01, 300);

  camera.up = new THREE.Vector3(0, 0, 1);
  camera.position.x = 5;
  camera.lookAt(center);

  var color = new THREE.Color(0.2, 0.2, 0.2);
  var ambient = new THREE.AmbientLight(color.getHex());
  scene.add(ambient);

  controls=new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render);
  controls.enableZoom=true;
  var x= genCube();
}
function addLights(){
  var light0=new THREE.DirectionalLight(0xffffff);
  light0.position.set(1,1,1);
  scene.add(light0);
  var light1=new THREE.DirectionalLight(0xffffff);
  light1.position.set(-1,-1,-1);
  scene.add(light1);
  var light2=new THREE.DirectionalLight(0xffffff);
  light2.position.set(-1,1,1);
  scene.add(light2);      
  var light3=new THREE.DirectionalLight(0xffffff);
  light3.position.set(1,-1,1);
  scene.add(light3); 
}
function onWindowResize(){
  camera.aspect=window.innerWidth/window.innerHeight;
  camera.updateProjectionsMatrix();
}
function animate(){
  requestAnimationFrame(animate);
  controls.update();
  stats.update();
  render();
}
function render(){
  renderer.render(scene, camera);
}
