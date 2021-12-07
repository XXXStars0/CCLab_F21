console.log("Loaded!");
function setup(){
  createCanvas(500,500)
  xspd=5;
  yspd=4;
  xpos=width/2;
  ypos=height/2;
}
function draw(){
  background(100);
  xpos+=xspd;
  ypos+=yspd;
  if(xpos<0||xpos>width){
    xspd=-xspd;
  }
  if(ypos<0||ypos>height){
    ypos=-yspd;
  }
  circle(xpos,ypos,100)
}
