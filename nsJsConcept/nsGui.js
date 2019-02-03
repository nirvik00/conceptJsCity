
/* GUI variables
* gridLe
* gridWi
* gridHi
*/
var datgui= new dat.GUI();
var guiControls=new function(){
  this.gridL=2.5;
  this.gridH=2.5;
}
datgui.add(guiControls, "gridL", 1, 5);
datgui.add(guiControls, "gridH", 1, 5);