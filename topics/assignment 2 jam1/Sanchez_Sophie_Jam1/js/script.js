/**
 * Sophie Sanchez 
 
 */

"use strict";

let moon= { // giving the moon the different variables to move around 
    x:100,
    y:120,
    size: 85,
velocity: {
    x: 0.5,
    y: 0,
    isMoving: true, 
},
    stopPosition: {
        x:560,
        y:150
    }

};

let movingCircle= { // creating the variables 

    x: 110,
    y: 115,
    size:70,

 velocity: {
    x: 0.5,
    y:0
 }

};

let img; 
let img2;
let img3;
let imgSize= 20;
let maxImgSize=200;
let imgRate= 0.2;
let imgGrothRate = 3;
let imageVisible= true;
let moonStop = true;
let gameOver= false;
let catAlive= false;


    function preload() {
        img = loadImage("assets/images/XenaSleep.png");
        img2 = loadImage("assets/images/XenaAfter.png");
        img3= loadImage("assets/images/survived.png");
      }

function setup() {
   createCanvas (700,600);
     
}

function draw() { // i create a background with the color of the dark sky 
    background(0);

// draw the mountains for decoration of the canvas
    fill(108,47,47);
    strokeWeight(0);
    triangle(600,195,1000,600,-100,400);

    fill(70,8,14);
    strokeWeight(0);
    triangle(320,210,520,500,-300,500);

// ground 
  fill(60,145,57);
  ellipse(60,640,1000,400);

  fill(69,168,66);
  ellipse(540,690,1000,400);

   drawMoon(); // draw the moving moon 
   drawCircle(); // draw the moving circle 

   if (!gameOver){
    imgSize= max(20, imgSize - imgRate);
    drawGrowingImage();
   }


  if (moon.x>= moon.stopPosition.x && moon.velocity.x > 0.7) {
     gameOver= true;
     catAlive= (imgSize >= maxImgSize);

     // the results of the game 

     textSize(38);
     textAlign(CENTER);
     fill(255);

     if (catAlive) {
         image(img3, width/2,height/2,300,400);
         text( "Xena survived from the full moon", width/2, height/2);
     }else { 
             image(img2, width/2,height/2,300,400);
             text("Xena got into an eternal dream",width/2, height/2);
         }

        }
  }

   function drawMoon() {

    //draw the moon 
    fill(255);
    ellipse(moon.x, moon.y, moon.size);

    if (! gameOver) {
        moon.x+= moon.velocity.x;
    }

    if (moon.x> width + moon.size) {
        moon.x = -moon.size; // reset the position of the moon
        moon.velocity.x += 0.5; // increment velocity of the moon, when reset
    }
   
} 
    function drawCircle() { // funciton circle moving  
    fill(0); // color of the circle 
    ellipse(movingCircle.x,movingCircle.y,movingCircle.size);
    movingCircle.x += 0.5;
   
}
   function drawGrowingImage(){

    image(img, 400, 400, imgSize,imgSize); // image of my cat Xena 
   }
     
   function mousePressed() {
    let catX= 400 +imgSize/2;
    let catY= 400 +imgSize/2;

     let clickOncat= dist( mouseX,mouseY,catX,catY) < imgSize/2;
    
     if (!gameOver && clickOncat) {
        imgSize +=5;
     }

     if (imgSize >= maxImgSize){

        image(img3,0,0, 200,200);

     }

   }
