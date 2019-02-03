var scene3d = document.getElementById("scene3d");

var infoPara=document.getElementById("information");

var camera, scene, renderer, controls;

var checkCube;

var mesh2; var gridMeshGrp=new THREE.Group(); 
var gridArr= Array();
/*
* gui variables
  * gridL
  * gridW
  * gridH;
*/

var init=function (){
  scene=new THREE.Scene();
  scene.background=new THREE.Color("rgb(255,255,255)");

  camera=new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight,1,1000);
  camera.lookAt(new THREE.Vector3(0,0,0));
  camera.position.x=5;
  camera.position.y=5;
  camera.position.z=5;

  renderer=new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  scene3d.appendChild(renderer.domElement);
  
  controls=new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render);
  controls.enableZoom=true;
  grid();
}


var grid=function(){
  var axes=new THREE.AxesHelper(5);
  scene.add(axes);

  scene.remove(mesh2);
  var pts=new THREE.Geometry();
  var a=guiControls.Le;
  pts.vertices.push(new THREE.Vector3(0,0,0));
  pts.vertices.push(new THREE.Vector3(a,0,0));
  pts.vertices.push(new THREE.Vector3(a,0,a));
  pts.vertices.push(new THREE.Vector3(0,0,a));
  pts.faces.push(new THREE.Face3(0,1,2));
  pts.faces.push(new THREE.Face3(0,3,2));
  var mat2=new THREE.MeshBasicMaterial({color:new THREE.Color("rgb(0,0,255)"), side:THREE.DoubleSide, wireframe:true });
  mesh2=new THREE.Mesh(pts,mat2);
  mesh2.position.set(1.5, 0.0, 4.0); 
  scene.add(mesh2);

  //remove grid array - three mesh
  for (var i=0; i<gridArr.length; i++){
    gridArr[i].geometry.dispose();
    gridArr[i].material.dispose();
    scene.remove(gridArr[i]);
  }
  gridArr=Array();

  //add grid array - three mesh
  var x=guiControls.Le/5;
  for(var i=0; i<10; i++){
    var p=new THREE.Geometry();  
    p.vertices.push(new THREE.Vector3(0,0,0));
    p.vertices.push(new THREE.Vector3(x,0,0));
    p.vertices.push(new THREE.Vector3(x,0,x));
    p.vertices.push(new THREE.Vector3(0,0,x));
    p.faces.push(new THREE.Face3(0,1,2));
    p.faces.push(new THREE.Face3(0,3,2));
    var mat3=new THREE.MeshBasicMaterial({color:new THREE.Color("rgb(0,100,255)"), side:THREE.DoubleSide, wireframe:true});
    mesh3=new THREE.Mesh(p,mat3);
    mesh3.position.set(i*x,0,0);
    //gridMeshGrp.add(mesh3);
    gridArr.push(mesh3);
  }

  for(var i=0; i<gridArr.length; i++){
    scene.add(gridArr[i]);
  }
}

document.addEventListener("keypress",function(event){
  console.log('h', event.keyCode);
  if(event.keyCode===13){
    console.log(gridArr.length);
    /*
    checkCube.scale.x=guiControls.Le;  
    checkCube.scale.y=guiControls.Wi;
    checkCube.scale.z=guiControls.He;
    */
    var source=infoPara.innerHTML;
    source += "\n change "+ guiControls.Le+", "+ guiControls.Wi+ guiControls.He;
    infoPara.innerHTML=source;
  }
});

function animate(){
  grid();
  requestAnimationFrame(animate);
  controls.update();
  render();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
};

function render(){
  renderer.render(scene, camera);
}

var datGui=new dat.GUI();
var guiControls=new function(){
  this.Le=5;
  this.Wi=5;
  this.He=5;
}
datGui.add(guiControls, "Le", 1, 5);
datGui.add(guiControls, "Wi", 1, 5);
datGui.add(guiControls, "He", 1, 5);

init();
animate();

