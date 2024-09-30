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
    y: 0
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

    //draw the moon 
    fill(255);
    ellipse(moon.x, moon.y, moon.size);
    moon.x+= moon.velocity.x;

    if (moon.x> width + moon.size) {
        moon.x = -moon.size; // reset the position of the moon
        moon.velocity.x += 0.5; // increment velocity of the moon, when reset
    }

    drawCircle(); // draw the moving circle 
    
}

    function drawCircle() { // funciton circle moving  
    fill(0); // color of the circle 
    ellipse(movingCircle.x,movingCircle.y,movingCircle.size);
    movingCircle.x += 0.5;

    
}


