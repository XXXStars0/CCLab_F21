var img,img1,gridSize=24,rr=0,gg=1,bb=2;

function setup(){
  cnv=createCanvas(450,450);
img1=loadImage("img/unnamed.jpg");
img=createImage(900,900);
}

function draw() {
  background(0);

  img1.loadPixels();
  img.loadPixels();

  noStroke();
  for (let y = 0; y < img.height; y += gridSize) {
    for (let x = 0; x < img.width; x += gridSize) {
      let index = (x + y*img.width) * 4;
      let r = img1.pixels[index + rr];
      let g = img1.pixels[index + gg];
      let b = img1.pixels[index + bb];
      fill(r, g, b);
      circle(x/2, y/2, gridSize/2);
    }
  }
}

function reset(){
  rr=0;
  gg=1;
  bb=2;
    gridSize=24;
}
function showA(){
  rr=int(random(-3,3));
  gg=int(random(-3,3));
  bb=int(random(-3,3));
  gridSize=int(random(12,48));
}
function savePic(){
  alert("Picture downloading start!");
  saveCanvas("cnv", "png");
}
