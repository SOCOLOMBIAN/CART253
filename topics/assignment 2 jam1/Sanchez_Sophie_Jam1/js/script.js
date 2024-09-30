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

    x: 105,
    y: 145,
    size:70,

    velocity:{
    x:0.5,
    y:0,
    }
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
   
    moon.x+= moon.velocity.x;

    if (moon.x> width + moon.size) {
        moon.x = -moon.size; // reset the position of the moon
        moon.velocity.x += 0.5; // increment velocity of the moon, when reset

    }

    drawCircle(); //call the function 

}

    function drawCircle() { // funciton circle moving 
    
    // draw the circle on top of the moon to create a semi-moon 
    fill(0);
    ellipse(movingCircle.x,movingCircle.y,movingCircle.size);

    movingCircle.x +=movingCircle.velocity.x;

    if (movingCircle.x > width + movingCircle.x) {
        movingCircle.x = -movingCircle.size;
        movingCircle.velocity.x += 0.5;
        movingCircle.x+= 5;
    
    }
    
}


