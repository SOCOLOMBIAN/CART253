/**
 * introducing variables 
 * Sophie Sanchez 
 * 
 * learning how to introduce variables 
 */

"use strict";

/* Create canvas 
*/
function setup() {
    createCanvas(500,500);

}
/**
 * Draws a circle on the middle of the canvas
*/
function draw() {
    background(0);

    //draw the circle
    push();
    fill(45,87,98);
    noStroke();
    ellipse(width/2,height/2,mouseX,mouseY);
    pop();

}