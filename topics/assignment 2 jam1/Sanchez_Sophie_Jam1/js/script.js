/**
 * Sophie Sanchez 
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

let skyImage= undefined;

let moon= {
    
    x: 310,
    y: 150,
    size: 10,
    velocity: {
        x: 0,
        y: 0,

    },

    minVelocity:{
        x: 2,
        y: 3
    },

    maxVelocity: {
        x: 2,
        y: 3
    },
     
    acceleration:{
        x: 0.025,
        y: 0.025
    }

    
}

function preload() {
    skyImage= loadImage("assets/images/nightsky.jpg");
} 
    // close preload 

// i create the size of the canvas and the commands 

function setup() {
   createCanvas (581,392);
    
}

// i create a background with an image of the sky 
function draw() {
    background(skyImage);

     moon.velocity.x= moon.velocity.x + moon. acceleration.x;
     moon.velocity.y= moon.velocity.y + moon. acceleration.y;
    
    
     moon.velocity.x = constrain(moon.velocity.x,moon.minVelocity.x,moon.maxVelocity.x);
     moon.velocity.y = constrain(moon.velocity.y,moon.minVelocity.y,moon.maxVelocity.y);
    
    moon.x= moon.x + moon.velocity.x;
    moon.y= moon.y + moon.velocity.y;

     //draw the moon 
     fill(255 );
     ellipse(moon.x,moon.y,moon.size);
     
     



   


}