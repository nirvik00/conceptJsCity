var scene, camera, renderer;

var cube; var ADD=0.01;
var createCube=function(){
  var geometry=new THREE.BoxGeometry(1,1,1);
  var material=new THREE.MeshBasicMaterial({
    color:new THREE.Color("rgb(155,0,0)")
  });
  cube=new THREE.Mesh(geometry, material);
  scene.add(cube);
}

var myShape;
var createMyShape=function(){
  var geometry=new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(3,0,0));
  geometry.vertices.push(new THREE.Vector3(0,3,0));
  geometry.vertices.push(new THREE.Vector3(0,0,2));
  myShape=geometry.faces.push(new THREE.Face3(0,1,2));
  var material=new THREE.MeshBasicMaterial({color:new   THREE.Color("rgb(0,255,0)"), side: THREE.DoubleSide, wireframe:true});
  myShape=new THREE.Mesh(geometry,material);
  scene.add(myShape);
}

var createTextGeometry=function(){
  var loader=new THREE.FontLoader();
  var font = loader.load(
    // resource URL
    'helvetiker_bold.typeface.json',
  
    // onLoad callback
    function ( font ) {
      // do something with the font
      scene.add( font );
    },
  
    // onProgress callback
    function ( xhr ) {
      console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    },
  
    // onError callback
    function ( err ) {
      console.log( 'An error happened' );
    }
  );
  
  var geometry=new THREE.TextGeometry("hello World", {font: font, size:5, height:1});
  var material=new THREE.MeshBasicMaterial({color:new THREE.Color("rgb(124,200,10)")});
  var text=new THREE.Mesh(geometry,material);
  text.position.x=-5;
  scene.add(text);
}
var init=function(){
  scene=new THREE.Scene();
  scene.background=new THREE.Color("rgb(255,255,255)");

  camera=new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z=5;

  var axes=new THREE.AxesHelper(5);
  scene.add(axes);

  createCube();
  createMyShape();
  //createTextGeometry();
  
  renderer=new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
}
var mainLoop=function(){
  cube.position.x+=ADD;
  cube.rotation.y-=ADD;
  myShape.rotation.y+=ADD;
  if (cube.position.x<=-3 || cube.position.x>3){
    ADD*=-1.0;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
}

init();
mainLoop();
