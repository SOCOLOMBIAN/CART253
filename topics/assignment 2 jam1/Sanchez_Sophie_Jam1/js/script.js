/**
 * Sophie Sanchez 
 
 */

"use strict";

let moon= {
    
    x: 100,
    y: 150,
    size: 40,
    velocity: {
        x: 0,
        y: 0

    },

    minVelocity:{
        x: -2,
        y:-3
    },

    maxVelocity: {
        x: 2,
        y: 3
    },
     
    acceleration:{
        x: 0.025,
        y: -0.05
    }
   
};

// i create the size of the canvas and the commands 

function setup() {
   createCanvas (700,600);
   
}

function draw() { // i create a background with an image of the sky 
    background(0);

     moon.velocity.x +=  moon. acceleration.x;
     moon.velocity.y +=  moon. acceleration.y;
    
    
     moon.velocity.x = constrain(moon.velocity.x,moon.minVelocity.x,moon.maxVelocity.x);
     moon.velocity.y = constrain(moon.velocity.y,moon.minVelocity.y,moon.maxVelocity.y);
    
    moon.x= moon.x + moon.velocity.x;
    moon.y= moon.y + moon.velocity.y;

     //draw the moon 
     fill(255);
     ellipse(moon.x,moon.y,moon.size);
     
     



   


}