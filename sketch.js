var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var END, PLAY, gameState;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var restart, gameOver, rImg, gImg;


function preload() {
  rImg = loadImage("restart.png");
  gImg = loadImage("gameOver.png");

  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addImage("aa", trex_collided);
  trex.scale = 0.5;



  END = 0;
  PLAY = 1;
  gameState = PLAY;

  gameOver = createSprite(300, 100, 100, 10);
  restart = createSprite(300, 150, 20, 20);
  gameOver.visible = false;
  restart.visible = false;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -4;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
}

function draw() {
  background(180);
  trex.collide(invisibleGround);
  text("Score: " + score, 500, 50);
  if (gameState === PLAY) {

    trex.changeAnimation("running", trex_running);

    ground.velocityX =-4;
    score = score + Math.round(getFrameRate() / 60);

    if (keyDown("space") && trex.y >= 159) {
      trex.velocityY = -16;
    }

    trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    spawnClouds();
    spawnObstacles();
    if (trex.isTouching(obstaclesGroup))

    {
      gameState = END;
      obstaclesGroup.setVelocityEach(0, 0);
      cloudsGroup.setVelocityEach(0, 0);
      cloudsGroup.setLifetimeEach(-1);
      obstaclesGroup.setLifetimeEach(-1);
      ground.setVelocity(0, 0);
    }
  } else if (gameState === END) {

    gameOver.addImage("g", gImg);
    restart.addImage("r", rImg);

    gameOver.visible = true;
    restart.visible = true;

    restart.scale = 0.5;
    gameOver.scale = 0.6;

    if (mousePressedOver(restart)) {
      gameState = PLAY;
      score = 0;
      obstaclesGroup.destroyEach();
      cloudsGroup.destroyEach();
      gameOver.visible = false;
      restart.visible = false;
      
    }

    trex.changeImage("aa", trex_collided);
  }


  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(80, 120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    //add each cloud to the group
    cloudsGroup.add(cloud);
  }

}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -4;

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}