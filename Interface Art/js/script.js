console.log("Loaded!");

function setup(){

  cnv=createCanvas(1000,500)
  cnv.parent("pBoard")
  background(document.getElementById('bcol').value);
  eraser=document.getElementById('bcol').value;
  const button = document.querySelector('button');
  button.addEventListener('click', assignBKground);

}
function draw(){

  size=document.getElementById('size').value
  col=document.getElementById('col').value
  dore=document.getElementById('dore').value
//console.log(document.getElementById('Draw').isChecked)

  if(dore==0){stroke(col);}
  else{
    stroke(eraser);
  }
  strokeWeight(size);
  if(mouseIsPressed){
  line(mouseX, mouseY, pmouseX, pmouseY);
}
}

function assignBKground(){
  eraser=document.getElementById('bcol').value;
background(document.getElementById('bcol').value);
}
/*

*/
