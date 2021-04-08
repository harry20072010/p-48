var gameState = "start";

var edges
var track,trackimg;
var lembo,lemboimg;
var cars,car1img,car2img,car3img,car4img;
var carsg;
var playbutton,playimg;
var gameover,gameoverimg;
var fuel,fuelimg,fuelg;
var time = 500;

function preload(){
  trackimg = loadImage("track.jpg");
  lemboimg = loadImage("main car.png");
  car1img = loadImage("car1.png");
  car2img = loadImage("car2.png");
  car3img = loadImage("car3.png");
  car4img = loadImage("car4.png");
  gameoverimg = loadImage("gameover.jpg");
  fuelimg = loadImage("fuel.png");
  playimg = loadImage("play.jpg");

}
function setup() {
     createCanvas(1000,600);
      edges = createEdgeSprites();
    
    track = createSprite(500,300);
    track.addImage(trackimg);
    track.scale = 4;
    track.velocityY = 3;
    track.visible = false;

    lembo  = createSprite(500,450);
    lembo.addImage(lemboimg);
    lembo.scale = 0.2;
    lembo.visible = false;

    playbutton = createSprite(500,300);
    playbutton.addImage(playimg);
    playbutton.scale = 1;

    carsg = createGroup();
    fuelg = createGroup();
}
function draw() {
    
    lembo.bounceOff(edges);
    drawSprites();
    fill("red");
    textSize(25);
    text("TIME:"+time,800,50);

    if(gameState === "start"){
       playbutton.visible = true;
       fill("red");
       stroke("pink");
       textSize(30);
       textStyle(ITALIC);
       text("TO START THE GAME,CLICK ON THE BELOW BUTTON",150,100)
      if(mousePressedOver(playbutton)){
          gameState = "play"
      }
    }

   if(gameState === "play"){
      lembo.visible = true;
      track.visible = true;
      playbutton.visible = false;
       time = time-1;

    if(track.y > 450){
       track.y = track.width/2;
    }

    if(keyDown(UP_ARROW)){
      lembo.y = lembo.y-5;
    }

    if(keyDown(DOWN_ARROW)){
      lembo.y = lembo.y+5;
    }

    if(keyDown(LEFT_ARROW)){
      lembo.x = lembo.x-10;
    }

    if(keyDown(RIGHT_ARROW)){
      lembo.x = lembo.x+10;
    }
    spawnCars();
    spawnfuel();
    if(fuelg.isTouching(lembo)){
      time = time+250;
      fuelg.destroyEach();
    }
    if(carsg.isTouching(lembo)){
      gameState = "end";
    }
   }
   if(gameState === "end"){
     background(gameoverimg);
     track.velocityY = 0;
     lembo.velocityY = 0;
     carsg.setVelocityYEach(0);
   }
}
function spawnCars(){
  if(frameCount%160 === 0){
    cars = createSprite(500,100);
    cars.velocityY = 8;
    cars.x = Math.round(random(350,650));
    var rand = Math.round(random(1,4));
    switch (rand) {
      case 1: cars.addImage(car1img);
        break;
      case 2: cars.addImage(car2img);
        break;
      case 3: cars.addImage(car3img);
        break;
      case 4: cars.addImage(car4img);
        break;
      default:
        break;
    }
    cars.scale = 0.2;
    cars.lifetime = 130;
    carsg.add(cars);
  }
}
function spawnfuel(){
  if(frameCount%180 === 0){
    fuel = createSprite(500,100);
    fuel.addImage(fuelimg);
    fuel.velocityY = 10;
    fuel.x = Math.round(random(350,650));
    fuel.scale = 0.2
    fuel.lifetime = 130;
    fuelg.add(fuel);
  }
}