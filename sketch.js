
var monkey , monkey_running, monkey_collided
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground
var survivalTime = 0;

function preload(){
  
  monkey_collided = loadImage("sprite_0.png")
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
    bananaGroup = createGroup();
    obstaclesGroup = createGroup();

}



function setup() {
 monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4
ground.x = ground.width/2
  
    monkey.addImage("collided",monkey_collided)
  
}


function draw() {
    //displaying the background
  background(255);
  

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,500,50);
  
  //displaying survival time
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival time: "+survivalTime,100,50)
  //console.log(survivalTime)
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
 
  //making the monkey jump when space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
   
  //setting gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground);
  
  if(monkey.isTouching(obstaclesGroup)){
    ground.velocityX = 0;
    monkey.velocityX = 0;
    monkey.changeAnimation("collided",monkey_collided);
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
  }
  


  
  obstacles();
  food();
  
  drawSprites();
}

function food(){
   if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.velocityX = -4;
     banana.scale = 0.1
    banana.setlifetime = 100;
    bananaGroup.add(banana);
}
}

function obstacles(){
  if (frameCount % 300 === 0){
   var obstacle = createSprite(600,315,10,10);
    obstacle.addImage(obstacleImage);
   obstacle.velocityX = -4
    obstacle.scale = 0.15
    obstacle.setLifetime = 100;
   
    obstaclesGroup.add(obstacle);  
}
}






