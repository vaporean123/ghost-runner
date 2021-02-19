var gameState = "play";
var sound;
var tower,towerImg
var door , doorImg,doorGroup;
var climber , climberImg , climberGroup;
var ghost , ghostImg;
var invisibleblock , invisibleblockGroup;
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  sound = loadSound("spooky.wav");
  
}

function setup(){
  createCanvas(600,600);
  sound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  
 
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleblockGroup = new Group();
  
  
}
 
function draw(){
  background(0);
  
  if(gameState==="play"){
  
  if(tower.y>600){
    tower.y = 300;
  }
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-2;
  }
  
  if(keyDown("right_arrow")){
    ghost.x= ghost.x+2;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY+0.8;
  spawnDoors();
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
    
  }
  if(invisibleblockGroup.isTouching(ghost) || ghost.y>600)
    {
      ghost.destroy();
    }
    
  drawSprites();
}
  if(gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GameOver",230,250);
}
function spawnDoors(){
  if(frameCount%240===0){
  door = createSprite(200,-50);
  door.addImage("door",doorImg); 
  climber = createSprite(200,10);
  climber.addImage("climber",climberImg);
  
  invisibleblock = createSprite(200,15);
  invisibleblock.width = climber.width;
  invisibleblock.height = 2;
  door.x = Math.round(random(120,400));
  door.velocityY = 1;
  climber.x = door.x;
  climber.velocityY = 1;
  
   ghost.depth = door.depth;
   ghost.depth+=1;
  door.lifetime = 600;
  climber.lifetime = 600;
   doorGroup.add(door);
   climberGroup.add(climber); 
   // invisibleblock.debug = true;
    invisibleblockGroup.add(invisibleblock);
    
}
}
}