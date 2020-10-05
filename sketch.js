var backImage,backGround,bg,bg2;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var monkeyFall;
var gameOver;
var gameState = 1;
var score=0;


function preload(){
  backImage=loadImage("jungle.jpg");
  
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
    
  monkeyFall = loadAnimation("Monkey_001.png","Monkey_002.png","Monkey_003.png","Monkey_004.png","Monkey_005.png");
  
  bananaImage = loadImage("Banana.png");
  obstacle_img = loadImage("stone.png"); 
  
  bg2 = loadImage("bg.png");

}

function setup() {
  createCanvas(displayWidth,displayHeight);
  

  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,600,800,10);
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(backImage);
  
    
  
  if(gameState === 1){

    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
       score = score + 2;
    }
  
    switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                 break;
        default: break;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
  
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(player)){ 
       gameState = 2;

    }

    }


    // if(gameState === 2){
     

    // }
  
  drawSprites();

  if(gameState === 2){
   
    
    bg = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
    bg.addImage(bg2)
    bg.scale = displayWidth,displayHeight;
    
    stroke("orange");
    textSize(40);
    fill("white");
    text("GAME OVER",displayWidth/2,displayHeight/2);
    text("YOUR FINAL SCORE :" + score,displayWidth/2,displayHeight/2+100)

    // backImage.setVisibleEach("false");
    // FoodGroup.setVisibleEach ("false");
    // player.setVisibleEach("false");
    // obstaclesGroup.setVisibleEach ("false");

    player.addAnimation("fall",monkeyFall);

    
  }
  if(gameState===1){
      stroke("black");
      textSize(20);
      fill("white");
      text("Score: "+ score, displayWidth/2-100,displayHeight/2);
  }

}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    banana = createSprite(displayHeight+500,200,40,10);
    banana.y = random(100,500);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(displayHeight+500,ground.y-50,10,40);
    obstacle.velocityX = -6 ;
    obstacle.addImage(obstacle_img);
    obstacle.collide(ground)
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}