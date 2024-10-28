/**
 * Frogfrogfrog
 * Sophie Sanchez 
 * 
 * A game of...
 * 
 * Instructions:
 * - 
 * - 
 * - 
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// the tree on the canvas 
const treePoints=  [
    
    [ 200,170], // top of the trunk 
    [ 100,300], // branch start
    [ 30, 250],
    [ 30, 270],
    [ 90,320 ],
    [ 1, 500 ], // continue with the trunk 
    [ 1, 600 ],
    [ 3, 600 ],
    [ 230,250],
];


 const frog ={
    
    // the head of the frog for reference
    headX:150, 
    headY:140,

    // The frog's tongue has a position, size, speed, and state
     tongue: {
        x: 150,
        y: 140,
        length: 30,
        maxLength:300,
        angle:0,
        size: 40,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    },

    // eye of the frog  positions 
      leftEye:{
        x: 175,
        y: 120,
        width:30,
        height:30
      },

      rightEye:{
        x: 147,
        y: 120,
        width:30,
        height:30
      },
};
    
// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(780,540);
    // Give the fly its first random position
    resetFly();
}

function draw() {
    background("#87ceeb");

    //draw the tree
    push();
    fill(101,67,33);
    stroke(81,47,13);
    strokeWeight(1);
    beginShape();
    for (const [x,y] of treePoints){
     vertex(x,y)
    }
    endShape(CLOSE);  
    pop(); 

    // draw the black eyes of the frog 
    drawBlackEye(frog.leftEye); // left black moving  eye 
    drawBlackEye( frog.rightEye);// right black moving eye 

    moveFly();
    drawFly();
    
    frog.tongue.x= frog.headX;
    frog.tongue.y=frog.headY;

    if (frog.tongue.state=== "idle"){
        frog.tongue.angle=atan2(mouseY -frog.tongue.baseY,mouseX-frog.tongue.baseX);
    }

    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
   
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
   
if (frog.tongue.state=== "idle") {
    frog.tongue.length = 30; 
}

else if( frog.tongue.state === "outbound") {
    frog.tongue.length += frog.tongue.speed;
    if( frog.tongue.length >= frog.tongue.maxLength) {
        frog.tongue.state= "inbound";
    }

    else if (frog.tongue.state === "inbound") {
         frog.tongue.length -= frog.tongue.speed;
         if(frog.tongue.length <= 30) {
            frog.tongue.state="idle";
            frog.tongue.length=30;
         }

    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */


function drawFrog() {
   
   // Draw the frog's body
    push();
    fill(123, 245, 66);
    noStroke();
    rotate(PI/21); 
    ellipse(155,170,80,90);
    pop();

    // draw the frog's head 
    push();
    fill(123, 245, 66);
    noStroke();
    rotate(PI/-190); 
    ellipse(150,140,70,50);
    pop();

    //draw the frog eyes (white part) 

    push();
    fill(255);
    noStroke();
    rotate(PI/-190); 
    ellipse(175,120,30,30);
    ellipse(147,120,30,30);
    pop();

    // draw the frog fingers left 
    push();
    fill(113, 209, 75);
    noStroke(0);
    rotate(PI/600); 
    ellipse(160,220,15,15);
    pop();
    
    // draw the frog finger right 
    push();
    fill(113, 209, 75);
    noStroke(0);
    rotate(PI/600); 
    ellipse(185,197,15,15);
    pop();

    // draw the frog legs right 
    push();
    fill(113, 209, 75);
    noStroke(0);
    rotate(PI/-5);
    rect(25,226,10,45);
    pop();

   // draw the frog legs left 
    push();
    fill(113, 200, 75);
    noStroke(0);
    rotate(PI/-5);
    rect(-8,224,10,52);
    pop();

    // draw the frog left side 
    push();
    fill(113, 209, 75);
    noStroke(0);
    rotate(PI/600); 
    ellipse(123,220,50,30);
    pop();

}



/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size/2 + fly.size/2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}