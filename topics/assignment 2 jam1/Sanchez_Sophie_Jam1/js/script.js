/**
 * Sophie Sanchez 
 
 */

"use strict";

let moon= { // giving the moon the different variables to move around 
    x:100,
    y:150,
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
    y: 145,
    size:70,

 velocity: {
    x: 0.5,
    y:0
 }

};

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

   drawMoon();
   drawCircle(); // draw the moving circle 
}


   function drawMoon() {

    //draw the moon 
    fill(255);
    ellipse(moon.x, moon.y, moon.size);
    moon.x+= moon.velocity.x;

    if (moon.x> width + moon.size) {
        moon.x = -moon.size; // reset the position of the moon
        moon.velocity.x += 0.5; // increment velocity of the moon, when reset
    }

    if (moon.x > moon.stopPosition.x && moon.velocity.x > 0.7) {
        moon.x = moon.stopPosition.x;
        moon.velocity.isMoving= false;

    }
   
} 
    function drawCircle() { // funciton circle moving  
    fill(0); // color of the circle 
    ellipse(movingCircle.x,movingCircle.y,movingCircle.size);
    
    movingCircle.x += 0.5;

    
}


