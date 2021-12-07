function preload(){
  beat=loadSound("assets/music.m4a");
  imgBeat=loadImage("assets/BEAT.png");
}

function setup() {
  createCanvas(500, 500);
  background(220);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(220);
  textAlign(CENTER);
  push()
  imageMode(CENTER);
  translate(width/2,height/2);
  let level = mic.getLevel();
  let dia = map(level, 0.0, 1.0, 0.1, 10);
  let vol=map(mouseY,0.0,height,1.00,0.00,true);
  let pan=map(mouseX,0.0,width,-1.00,1.00,true);
  scale(dia);
  image(imgBeat,0,0)
  pop()


  textSize(48);
  if(beat.isPlaying()){
    text("MUSIC! YEAH!",width/2,height/8);
    beat.setVolume(vol);
    beat.pan(pan);
  }else{
  text("Click to MUSIC!",width/2,height/8);
  }
}

function mousePressed(){
  if(beat.isPlaying()){
    beat.stop();
  }else{
    beat.loop();
  }
}
