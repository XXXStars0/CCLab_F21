var heroine,dino,btea,owl,pita,rb;
var room_w=2000,room_h=1500,room_name;
var walk_speed=5,move=true,chat=0,lin='';
var item='',friends=[];
var pool,slide,shop,tree1,tree2,tree3;
var slide_found=false;
var cupOfTea=0,rb_tea=false,pita_tea=false,owl_fru=false;


function preload(){
  //Heroine Related
  anim_heroine_F = loadAnimation(loadSpriteSheet('img/heroine-F.png', 96, 96, 4));
  anim_heroine_L = loadAnimation(loadSpriteSheet('img/heroine-L.png', 96, 96, 4));
  anim_heroine_R = loadAnimation(loadSpriteSheet('img/heroine-R.png', 96, 96, 4));
  anim_heroine_B = loadAnimation(loadSpriteSheet('img/heroine-B.png', 96, 96, 4));
  //Friends Related
  anim_dino = loadAnimation(loadSpriteSheet('img/Dinosaur.png', 60, 60, 4));
  anim_btea = loadAnimation(loadSpriteSheet('img/Bubbletea.png', 60, 60, 4));
  anim_owl = loadAnimation(loadSpriteSheet('img/Owl.png', 60, 60, 4));
  anim_pita = loadAnimation(loadSpriteSheet('img/Pitaya.png', 60, 60, 4));
  anim_rb = loadAnimation(loadSpriteSheet('img/RoadBlock.png', 60, 60, 4));
    //items
  spr_coin=loadImage('img/Leafcoin.png');
  spr_btea=loadImage('img/CupOfBubbletea.png');
  spr_heart=loadImage('img/Heart.png');
  spr_fruit=loadImage('img/PFruit.png');
  //landscape
  park=loadImage('img/park.png');
  anim_pool = loadAnimation(loadSpriteSheet('img/Pool.png', 400, 300, 2));
  //audio
    audio_walk=loadSound("audio/Walk.mp3");
    audio_click=loadSound("audio/beat.mp3");
    audio_befriended=loadSound("audio/Chime2.ogg");
}

function profileOff(){
  document.getElementById('dinosaur').style.display='none';
  document.getElementById('bubbletea').style.display='none';
  document.getElementById('roadblock').style.display='none';
  document.getElementById('pitaya').style.display='none';
  document.getElementById('owl').style.display='none';
}

function setup(){
    cnv=createCanvas(800, 500);
    cnv.parent('canvaBox');
    setUpHeroine();
    setUpFriends();
    setLandscapes();
     profileOff();
}

function setLandscapes(){
  anim_pool.frameDelay=10;
  pool = createSprite(1030, 950);
  pool.addAnimation('spring', anim_pool);
  slide= createSprite(200, 200);
  slide.addAnimation('s', 'img/slide.png');
  shop= createSprite(200, 1000);
  shop.addAnimation('s', 'img/BubbleteaShop.png');
  tree1= createSprite(1737, 165);
  tree1.addAnimation('s', 'img/Tree.png');
  tree2= createSprite(1720, 500);
  tree2.addAnimation('s', 'img/Tree.png');
  tree3= createSprite(1900, 480);
  tree3.addAnimation('s', 'img/Tree.png');
}

function setUpHeroine(){
  d=10;
  anim_heroine_L.frameDelay=d;
  anim_heroine_R.frameDelay=d;
  anim_heroine_F.frameDelay=d;
  anim_heroine_B.frameDelay=d;
  heroine = createSprite(1030, 1400);
  heroine.addAnimation('walk_down', anim_heroine_F);
  heroine.addAnimation('walk_left', anim_heroine_L);
  heroine.addAnimation('walk_right', anim_heroine_R);
  heroine.addAnimation('walk_up', anim_heroine_B);
}

function setUpFriends(){
  //dino related
  dino = createSprite(1180, 1180);
  anim_dino.frameDelay=20;
  dino.addAnimation('display', anim_dino);
  //btea
  btea = createSprite(200, 1200);
  anim_btea.frameDelay=20;
  btea.addAnimation('display', anim_btea);
  //rb
  rb = createSprite(1650, 350);
  anim_rb.frameDelay=20;
  rb.addAnimation('display', anim_rb);
  //Pitaya
  pita= createSprite(1880, 320);
  anim_pita.frameDelay=20;
  pita.addAnimation('display', anim_pita);
  //owl
  owl= createSprite(1850, 1280);
  anim_owl.frameDelay=20;
  owl.addAnimation('display', anim_owl);
}

function draw(){
  background(0);
  image(park,0,0);
  drawSprites();
  displayHeroine();
  dinoThing();
  bubbleteaThing();
  pitayaThing();
  owlThing();
  landScapeThing();
  rbThing();
  showTextbox();
}

function landScapeThing(){
  heroine.collide(pool);
  if(heroine.collide(slide)){
    move=false;
    lin='slide';
  }
  heroine.collide(shop);
  for(i=2;i>cupOfTea;i--){
    image(spr_btea,btea.position.x-96+48*i,btea.position.y);
  }
  heroine.collide(tree1);
  heroine.collide(tree2);
  heroine.collide(tree3);
}

function displayHeroine(){
  camSet();
  displayItem();
  kc=(keyCode==87||keyCode==83||keyCode==65||keyCode==68);

  if(keyIsPressed&&move&&kc){
    if(!audio_walk.isPlaying() && frameCount%6==0){
        audio_walk.play();
    }
    heroine.animation.play();
  switch(keyCode){
    case 87:
    if(heroine.position.y>48){
      heroine.changeAnimation('walk_up');
      heroine.position.y-=walk_speed;
    }
    break;
    case 83:
    if(heroine.position.y<room_h-48){
      heroine.changeAnimation('walk_down');
      heroine.position.y+=walk_speed;
    }
    break;
    case 65:
    if(heroine.position.x>48){
      heroine.changeAnimation('walk_left');
      heroine.position.x-=walk_speed;
    }
    break;
    case 68:
    if(heroine.position.x<room_w-48){
      heroine.changeAnimation('walk_right');
      heroine.position.x+=walk_speed;
    }
    break;
  }
}else{

  if(lin==''){heroine.animation.changeFrame(1);heroine.animation.stop();heroine.animation.changeFrame(1);}
}
}

function displayItem(){
  if(item=='coin'){
    image(spr_coin,heroine.position.x+8,heroine.position.y);
  }
  if(item=='bubbletea'){
  image(spr_btea,heroine.position.x+8,heroine.position.y);
  }
  if(item=='fruit'){
  image(spr_fruit,heroine.position.x+8,heroine.position.y);
  }
}

function camSet(){
  px=heroine.position.x;
  py=heroine.position.y;
  if(px>width/2&&px<room_w-width/2){
    camera.position.x = heroine.position.x;
  }else{
    if(px<width/2){camera.position.x = width/2}
    if(px>room_w-width/2){camera.position.x = room_w-width/2;}
  }

  if(py>height/2&&py<room_h-height/2){
    camera.position.y = heroine.position.y;
  }else{
    if(py<height/2)camera.position.y = height/2;
    if(py>room_h-height/2)camera.position.y = room_h-height/2;;
  }
}

function dinoThing(){
  if(heroine.collide(dino)){
//Talk
    move=false;
    if(friends.indexOf('dino')==-1){
    if(slide_found==false){lin='dino1';}
    else lin='dino2';
  }else{
    lin='dino_befirended';
  }
 }
  if(lin==''){
    dino.animation.changeFrame(1);
    dino.animation.stop();
  }
  if(friends.indexOf('dino')!=-1){
    image(spr_heart,dino.position.x,dino.position.y-48);
  }
}

function bubbleteaThing(){

if(heroine.collide(btea)){
  if(lin==''){
    btea.animation.changeFrame(1);
    btea.animation.stop();
  }
  move=false;
  if(cupOfTea<2){
    if(item=='coin')lin='buyTea';
    if(item=='bubbletea')lin='haveTea';
    if(item=='')lin='noCoin';
  }else{
    if(friends.indexOf('btea')==-1){
      lin='outOfStock';
    }else{
      lin='btea_beFriended';
    }
  }
}
if(friends.indexOf('btea')!=-1){
    image(spr_heart,btea.position.x,btea.position.y-48);
}
}

function rbThing(){
  if(lin==''){
    rb.animation.changeFrame(1);
    rb.animation.stop();
  }
  if(heroine.collide(rb)){
    move=false;
    if(friends.indexOf('rb')!=-1){
      lin='rb_beFriended'
    }else{
      if(item=='bubbletea')lin='rbGotTea';
      if(item=='coin')lin='uGotaCoin';
      if(item=='') lin='require';
    }
  }
  if(friends.indexOf('rb')!=-1){
    image(spr_heart,rb.position.x,rb.position.y-48);
  }
  if(rb_tea==true){
        image(spr_btea,rb.position.x-36,rb.position.y);
  }
}

function pitayaThing(){
  if(lin==''){
    pita.animation.changeFrame(1);
    pita.animation.stop();
  }
  if(pita_tea==true){
        image(spr_btea,pita.position.x-36,pita.position.y);
  }else{
    image(spr_fruit,pita.position.x-36,pita.position.y);
  }
    if(heroine.collide(pita)){
      move=false;
      if(friends.indexOf('pita')!=-1){
        lin='pita_beFriended'
      }else{
        if(item=='bubbletea')lin='pitaGotTea';
        if(item=='coin')lin='pitaGiveCoin';
        if(item=='') lin='pitaRequire';
      }}
    if(friends.indexOf('pita')!=-1){
        image(spr_heart,pita.position.x,pita.position.y-48);
    }

}

function owlThing(){
  if(lin==''){
    owl.animation.changeFrame(1);
    owl.animation.stop();
  }
  if(owl_fru==true){
        image(spr_fruit,owl.position.x-36,owl.position.y);
  }
  if(heroine.collide(owl)){
    move=false;
    if(friends.indexOf('owl')!=-1){
      lin='owl_beFriended'
    }else{
      if(item=='fruit')lin='gotFruit'
      else lin='heardAboutFruit'
    }
  }
  if(friends.indexOf('owl')!=-1){
      image(spr_heart,owl.position.x,owl.position.y-48);
  }
}

//Talk
function mouseReleased(){
  if(lin!=''){
    chat++;
    audio_click.play();
}
}
/*function keyReleased(){
  if(keyCode==ENTER){
    if(lin!=''){
      chat++;
      audio_click.play();
  }
}*/

function chatBox(char,tex){
  push();
  textSize(24);
  translate(char.position.x,char.position.y);
  rectMode(CENTER);
  rect(0,-72,textWidth(tex)+12,32);
  triangle(-6,-56,6,-56,0,-44);
  textAlign(CENTER,CENTER);
  text(tex, 0, -72);
  pop();
}

function showTextbox(){
  switch (lin){
    //blue dinosaur guy
    case 'dino1':
        switch(chat){
          case 0:
          dino.animation.changeFrame(1);
          dino.animation.stop();
          heroine.animation.play();
          chatBox(heroine,"Hi!");
          break;
          case 1:
          heroine.animation.changeFrame(1);
          heroine.animation.stop();
          dino.animation.play();
          chatBox(dino,"Hi,ga!");
          break;
          case 2:
          chatBox(dino,"The park is so good, ga!");
          break;
          case 3:
          chatBox(dino,"I have heard that here is a");
          break;
          case 4:
          chatBox(dino,"Reeeeeeally good dinosaur slide, ga!");
          break;
          case 5:
          chatBox(dino,"Do you know where is it, ga?");
          break;

          default:
          chat=0;
          lin='';
          move=true;
        }
    break;

    case 'dino2':
        switch(chat){
          case 0:
          dino.animation.changeFrame(1);
          dino.animation.stop();
          heroine.animation.play();
          chatBox(heroine,"I founded the slide!");
          break;
          case 1:
          heroine.animation.changeFrame(1);
          heroine.animation.stop();
          dino.animation.play();
          chatBox(dino,"Really!");
          break;
          case 2:
          chatBox(dino,"So good, ga!");
          break;
          case 3:
          friends.push('dino');
          audio_befriended.play();
            document.getElementById('dinosaur').style.display='block';
          chat++;
          break;

          default:
          chat=0;
          lin='';
          move=true;
        }
    break;

    case 'dino_befirended':
        switch(chat){
          case 0:
          heroine.animation.changeFrame(1);
          heroine.animation.stop();
          dino.animation.play();
          chatBox(dino,"Hi,ga!");
          break;
          case 1:
          dino.animation.changeFrame(1);
          dino.animation.stop();
          heroine.animation.play();
          chatBox(heroine,"Hello!");
          break;
          case 2:
          heroine.animation.changeFrame(1);
          heroine.animation.stop();
          dino.animation.play();
          chatBox(dino,"We have already befireded,ga!");
          break;
          case 3:
          chatBox(dino,"Try to make more frieds!");
        break;
        case 4:
        chatBox(dino,"Enjoy,ga!");
      break;

          default:
          chat=0;
          lin='';
          move=true;
        }
    break;

    case 'pool':
        switch(chat){
          case 0:
          heroine.animation.play();
          chatBox(heroine,"What a big pool!");
          break;

          default:
          chat=0;
          lin='';
          move=true;
        }
    break;

    case 'slide':
        switch(chat){
          case 0:
          heroine.animation.play();
          chatBox(heroine,"Oh! This is the famous slide");
          slide_found=true;
          break;

          default:
          chat=0;
          lin='';
          move=true;
        }
    break;

    //bubble tea guy
    case 'buyTea':
        switch(chat){
          case 0:
          btea.animation.changeFrame(1);
          btea.animation.stop();
          heroine.animation.play();
          chatBox(heroine,"May I have a cup of bubbletea?");
          break;
          case 1:
          chatBox(heroine,"Here is a Leaf Coin!");
          item='';
          break;
          case 2:
          heroine.animation.changeFrame(1);
          heroine.animation.stop();
          btea.animation.play();
          chatBox(btea,"Oh! A Leaf Coin!");
          break;
          case 3:
          item='bubbletea';
          cupOfTea++;
          chat++;
          break;
          case 4:
          chatBox(btea,"Here is it!");
          break;
          default:
          chat=0;
          lin='';
          move=true;
          }
        break;

        case 'haveTea':
            switch(chat){
              case 0:
              heroine.animation.changeFrame(1);
              heroine.animation.stop();
              btea.animation.play();
              chatBox(btea,"I think you have already hold");
              break;
              case 1:
              chatBox(btea,"A cup of bubbletea!");
              break;
              default:
              chat=0;
              lin='';
              move=true;
              }
            break;

          case 'outOfStock':
              switch(chat){
                  case 0:
                  heroine.animation.changeFrame(1);
                  heroine.animation.stop();
                  btea.animation.play();
                  chatBox(btea,"All of milkteas !");
                  break;
                  case 1:
                  chatBox(btea,"Finally I finished my work!");
                  break;
                  case 2:
                  chatBox(btea,"Thanks! Thanks you Very Much!");
                  break;
                  case 3:
                  chatBox(btea,"Because I am a cup of bubbletea,");
                  break;
                  case 4:
                  chatBox(btea,"I believe I would be friend");
                  break;
                  case 5:
                  chatBox(btea,"with a person");
                  break;
                  case 6:
                  chatBox(btea,"love bubbletea like you!");
                  break;
                  case 7:
                  friends.push('btea');
                  audio_befriended.play();
                    document.getElementById('bubbletea').style.display='block';
                  chat++;
                  break;
                  default:
                  chat=0;
                  lin='';
                  move=true;
                  }
          break;

          case 'noCoin':
              switch(chat){
                case 0:
                heroine.animation.changeFrame(1);
                heroine.animation.stop();
                btea.animation.play();
                chatBox(btea,"A cup of bubbletea,");
                break;
                case 1:
                chatBox(btea,"Worth 1 Leaf Coin!");
                break;
                default:
                chat=0;
                lin='';
                move=true;
                }
              break;

              case 'btea_beFriended':
                  switch(chat){
                    case 0:
                    heroine.animation.changeFrame(1);
                    heroine.animation.stop();
                    btea.animation.play();
                    chatBox(btea,"Thanks a lot!");
                    break;
                    case 1:
                    chatBox(btea,"I would remember you forever!");
                    break;
                    default:
                    chat=0;
                    lin='';
                    move=true;
                    }
                  break;
      //road block guy
      case 'require':
          switch(chat){
            case 0:
            rb.animation.changeFrame(1);
            rb.animation.stop();
            heroine.animation.play();
            chatBox(heroine,"Excuseme, may I enter here?");
            break;
            case 1:
            heroine.animation.changeFrame(1);
            heroine.animation.stop();
            rb.animation.play();
            chatBox(rb,"Too busy! Too busy!");
            break;
            case 2:
            chatBox(rb,"I am too busy to buy bubbletea.");
            break;
            case 3:
            item='coin';
            chatBox(rb,"Here is a coin.");
            break;
            case 4:
            chatBox(rb,"If you help me to buy one,");
            break;
            case 5:
            chatBox(rb,"I would let you in!");
            break;
            case 6:
            rb.animation.changeFrame(1);
            rb.animation.stop();
            heroine.animation.play();
            chatBox(heroine,"OK!");
            break;

            default:
            chat=0;
            lin='';
            move=true;
            }
          break;

          case 'uGotaCoin':
              switch(chat){
                case 0:
                heroine.animation.changeFrame(1);
                heroine.animation.stop();
                rb.animation.play();
                chatBox(rb,"Please Help me");
                break;
                case 1:
                chatBox(rb,"to buy a cup of bubbletea!");
                case 2:
                chatBox(rb,"Thaaaaanks!");
                break;
                default:
                chat=0;
                lin='';
                move=true;
                }
              break;

            case 'rbGotTea':
            switch(chat){
              case 0:
              rb.animation.changeFrame(1);
              rb.animation.stop();
              heroine.animation.play();
                            item='';
                            rb_tea=true;
              chatBox(heroine,"Here is bubble tea!");
              break;
              case 1:
              heroine.animation.changeFrame(1);
              heroine.animation.stop();
              rb.animation.play();
              chatBox(rb,"Thanks!");
              break;
              case 2:
              chatBox(rb,"mmmmmmm...");
              break;
              case 3:
              chatBox(rb,"Tased awesome!");
              break;
              case 4:
              chatBox(rb,"Now I dont't have any reason");
              break;
              case 5:
              chatBox(rb,"To block the road!");
              break;
              case 6:
              friends.push('rb');
              rb.position.x=1450;
              rb.position.y=250;
              audio_befriended.play();
                document.getElementById('roadblock').style.display='block';
              chat++;
              break;

                default:
                chat=0;
                lin='';
                move=true;
                }
            break;

            case 'rb_beFriended':
                switch(chat){
                  case 0:
                  heroine.animation.changeFrame(1);
                  heroine.animation.stop();
                  rb.animation.play();
                  chatBox(rb,"Bubbletea is so good!");
                  break;
                  default:
                  rb.animation.changeFrame(1);
                  rb.animation.stop();
                  chat=0;
                  lin='';
                  move=true;
                  }
                break;
//pitaya dragon
case 'pitaRequire':
    switch(chat){
      case 0:
      pita.animation.changeFrame(1);
      pita.animation.stop();
      heroine.animation.play();
      chatBox(heroine,"Hi?");
      break;
      case 1:
      heroine.animation.changeFrame(1);
      heroine.animation.stop();
      pita.animation.play();
      chatBox(pita,"Bibi!");
      break;
      case 2:
      pita.animation.changeFrame(1);
      pita.animation.stop();
      heroine.animation.play();
      item='coin';
      chatBox(heroine,"A coin...");
      break;
      case 3:
      chatBox(heroine,"Are you want a cup of bubbletea?");
      break;
      case 4:
      heroine.animation.changeFrame(1);
      heroine.animation.stop();
      pita.animation.play();
      chatBox(pita,"Pipipi!");
      break;


      default:
      chat=0;
      lin='';
      move=true;
      }
    break;

    case 'pitaGiveCoin':
        switch(chat){
          case 0:
          heroine.animation.changeFrame(1);
          heroine.animation.stop();
          pita.animation.play();
          chatBox(pita,"Bibi!");
          break;
          case 1:
          pita.animation.changeFrame(1);
          pita.animation.stop();
          heroine.animation.play();
          item='coin';
          chatBox(heroine,"Maybe I should buy it");
          break;
          case 2:
          chatBox(heroine,"A cup of bubbletea.");
          break;
          default:
          chat=0;
          lin='';
          move=true;
          }
        break;

      case 'pitaGotTea':
      switch(chat){
        case 0:
        pita.animation.changeFrame(1);
        pita.animation.stop();
        heroine.animation.play();
        item='fruit';
        pita_tea=true;
        chatBox(heroine,"Here is bubble tea!");
        break;
        case 1:
        heroine.animation.changeFrame(1);
        heroine.animation.stop();
        pita.animation.play();
        chatBox(pita,"Pi!Pipipi!");
        break;
        case 2:
        friends.push('pita');
        audio_befriended.play();
          document.getElementById('pitaya').style.display='block';
        chat++;
        break;
        case 3:
        pita.animation.changeFrame(1);
        pita.animation.stop();
        heroine.animation.play();
        chatBox(heroine,"Thanks for the fruit!");
        break;
        case 4:
        chatBox(heroine,"But I don't need it!");
        break;
        case 5:
        chatBox(heroine,"Maybe someone else want it.");
        break;

          default:
          chat=0;
          lin='';
          move=true;
          }
      break;

      case 'pita_beFriended':
          switch(chat){
            case 0:
            heroine.animation.changeFrame(1);
            heroine.animation.stop();
            pita.animation.play();
            chatBox(pita,"Pi,pipi!");
            break;
            case 1:
            chatBox(pita,"So happy!");
            break;
            case 2:
            pita.animation.changeFrame(1);
            pita.animation.stop();
            heroine.animation.play();
            chatBox(heroine,"Wait a sec,");
            break;
            case 3:
            chatBox(heroine,"Actually you can talk?");
            break;
            case 4:
            heroine.animation.changeFrame(1);
            heroine.animation.stop();
            pita.animation.play();
            chatBox(pita,"Pi,pipi!");
            break;
            default:
            chat=0;
            lin='';
            move=true;
            }
          break;

//owl
case 'heardAboutFruit':
    switch(chat){
      case 0:
      heroine.animation.changeFrame(1);
      heroine.animation.stop();
      owl.animation.play();
      chatBox(owl,"Hey!");
      break;
      case 1:
      owl.animation.changeFrame(1);
      owl.animation.stop();
      heroine.animation.play();
      chatBox(heroine,"?");
      break;
      case 2:
      heroine.animation.changeFrame(1);
      heroine.animation.stop();
      owl.animation.play();
      chatBox(owl,"Have you heard that");
      break;
      case 3:
      chatBox(owl,"yummy fruit in the forest?");
      break;
      default:
      chat=0;
      lin='';
      move=true;
      }
    break;

    case 'gotFruit':
    switch(chat){
      case 0:
      owl.animation.changeFrame(1);
      owl.animation.stop();
      heroine.animation.play();
      chatBox(heroine,"It this the fruit you mentioned?");
      break;
      case 1:
      chatBox(heroine,"I am not hungary now,");
      break;
      case 2:
      chatBox(heroine,"So this one is for you!");
      break;
      case 3:
      item='';owl_fru=true;
      chat++;
      break;
      case 4:
      heroine.animation.changeFrame(1);
      heroine.animation.stop();
      owl.animation.play();
      chatBox(owl,"Wow! That so good!");
      break;
      case 5:
      friends.push('owl');
      audio_befriended.play();
      chat++;
        document.getElementById('owl').style.display='block';
      break;
      case 6:
      chatBox(owl,"Happy!");
      break;

        default:
        chat=0;
        lin='';
        move=true;
        }
    break;

    case 'owl_beFriended':
    switch(chat){
      case 0:
      heroine.animation.changeFrame(1);
      heroine.animation.stop();
      owl.animation.play();
      chatBox(owl,"Happy Happy!");
      break;
      case 6:
      chatBox(owl,"I love the fruit!");
      break;

        default:
        chat=0;
        lin='';
        move=true;
        }
    break;
}
}

function savePic(){
  alert("Screen shot finished!");
  saveCanvas("cnv", "png");
}
