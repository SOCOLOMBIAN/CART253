/**
 * Sophie Sanchez 
 
 */

"use strict";

let moon= {
    x:100,
    y:150,
    size: 70
};
   


// i create the size of the canvas and the commands 

function setup() {
   createCanvas (700,600);
   
}

function draw() { // i create a background with an image of the sky 
    background(0);

      //draw the moon 
     fill(255);
     ellipse(moon.x, moon.y, moon.size);
     moon.x= moon.x+1;
   
     



   


}