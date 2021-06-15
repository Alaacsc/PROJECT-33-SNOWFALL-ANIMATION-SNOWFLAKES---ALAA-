var Engine = Matter.Engine;
const World= Matter.World;
var Bodies = Matter.Bodies;
var Events = Matter.Events;


var engine, world;
var backgroundImg;
var decorGroup;
var snowflake1,snowflake2;
//var happySound;
//var snowfall = [];
//var bg = "snow6.png";

function preload() {
  getBackgroundImg();

  snowflake1 = loadImage("Snow3.png");
  snowflake2 = loadImage("snow5.webp");

  //happySound = loadSound();
}

function setup() {
  createCanvas(800,800);
  engine = Engine.create();
  earth = engine.world;


  decorGroup = new Group();
}

function draw() {
  if(backgroundImg)
  background(backgroundImg);

  spawnSnowFlakes();

  Engine.update(engine); 

        //display the paricles 

        //if(frameCount%10===0){
        //  snowfall.push(new Snowfall(random(10,700),10,10));
        //  snowfall.scale = 0.3;
       //}
     
        // for (var s = 0; s < snowfall.length; s++){
        //  snowfall[s].display();
      // }

  drawSprites();
}

async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/Europe/Madrid");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  if(hour>=0600 && hour<=1900){
    bg = "snow2.jpg";

  }
  else{
    bg = "snow6.jpeg";     

  }

  backgroundImg = loadImage(bg);
  console.log(backgroundImg);
}

function spawnSnowFlakes(){
  if (frameCount % 90 === 0){
    var flakes = createSprite(600,270,10,40); 
    flakes.setCollider("rectangle",flakes.width,flakes.height,400,400);
    flakes.debug = false;
    flakes.x = Math.round(random(10,700));
    flakes.y = Math.round(random(0,750));
    flakes.velocityY = 3;
    //flakes.lifetime = 300;
  
    var rand = Math.round(random(1,2));
    switch(rand) {
        
      case 1: flakes.addImage(snowflake1);
              break;
      case 2: flakes.addImage(snowflake2);
              break;
      default: break;
      
    }  
    flakes.scale = 0.17; 
    snowflake1.scale = 0.1;
    decorGroup.add(flakes);
    //flakes.depth = cat.depth;
    //cat.depth = cat.depth + 1;
    
  }
}