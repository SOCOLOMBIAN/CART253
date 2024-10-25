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

// Our frog
const frog = {
    // The frog's body has a position and size
    head: {
        x: 123,
        y: 255,
        size: 50
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: 123,
        y: 155,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
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


    moveFly();
    drawFly();
    moveFrog();
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
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.head.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.head.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.head.x, frog.head.y);
    pop();

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
   
    // draw the frog eyes 
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