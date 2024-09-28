/**
 * Sophie Sanchez 
 
 */

"use strict";

let moon= { // giving the moon the different variables to move around 
    x:100,
    y:150,
    size: 85
};

let movingCircle= { // creating the variables 

    x: 105,
    y: 145,
    size:75
};


// i create the size of the canvas and the commands 

function setup() {
   createCanvas (700,600);
}

function draw() { // i create a background with the color of the dark sky 
    background(0);

    //draw the moon 
    fill(255);
    ellipse(moon.x, moon.y, moon.size);
    moon.x= moon.x+1;
    
     drawCircle();

    function drawCircle() { // call the function to move the circle moving 
    
    // draw the circle on top of the moon to create a semi-moon 
    fill(0);
    ellipse(movingCircle.x,movingCircle.y,movingCircle.size);
    movingCircle.x= movingCircle.x +1;
       }
    
};

