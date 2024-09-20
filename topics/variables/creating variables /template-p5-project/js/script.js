/**
 * creating variables 
 * sophie sanchez 
 * 
 * experimenting with variables 
 */

"use strict";

 // is called assign
let cheeseRed=255;
let cheeseGreen = 255;
let cheeseBlue = 0;

let holeShade=0;
let holeSize= 120;
let holeX= 300;
let holeY= 400;

/**
 * creates the canvas 
*/
function setup() {

    createCanvas(480,480);
}


/**
 * i changed for the variables and declare 
*/
function draw() {
    //the cheese
    background(cheeseRed, cheeseGreen, cheeseBlue);
    //the hole 
    push();
    noStroke();
    fill(holeShade);
    ellipse(holeX,holeY,holeSize);
    pop();
      

}