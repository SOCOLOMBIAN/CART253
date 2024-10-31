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

    // transformation of the frog 
    isTransformed: false,

    // The frog's tongue has a position, size, speed, and state
     tongue: {
        baseX: 180,
        baseY: 140,
        length: 0, // current length of the tongue 
        maxLength:600,
        angle:0,
        size: 7, // size of the tongue tip 
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    },

};

// fly Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 20,
    speed: 3,
};


let flyImage;
let flyImage2;
let score= 0;

function preload() {

    flyImage= loadImage("assets/images/fly1.png");
    flyImage2= loadImage("assets/images/fly2.png");
}

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

    if (score >= 10 && !frog.isTransformed)
      { frog.isTransformed= true; 
        fly.speed= 5;
      }
        
    // text for the instructions 
    push();
    fill('brown');
    textFont('courier New');
    textSize(20);
    if (!frog.isTransformed) {
    text("OBTAIN 10 POINTS TO UPGRADE LEVEL!", 220, 20);
    } else {
        text("LEVEL 2: CATCH THE FLIES AND WIN OR LEAVE THE FLIES AND LEAVE", 110,20);
    }
    pop();
    
    // current score 
    push();
    textSize(20);
    fill('brown');
    text("score" + score, 690,40)
    pop();

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


    moveFly();
    drawFly();


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
        resetFly(); }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    imageMode (CENTER);
    if (frog.isTransformed){
    fly.size= 40;
    image(flyImage2,fly.x, fly.y, fly.size, fly.size);
    } else {
        image(flyImage,fly.x, fly.y, fly.size, fly.size);
    }
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 500);
}

// moving the tongue based on its state
function moveTongue() {
   
if (frog.tongue.state=== "idle") {
    frog.tongue.length = 30; 
}

else if( frog.tongue.state === "outbound") {
    frog.tongue.length += frog.tongue.speed;
    if( frog.tongue.length >= frog.tongue.maxLength) {
        frog.tongue.state= "inbound";
    }
}

    else if (frog.tongue.state === "inbound") {
         frog.tongue.length -= frog.tongue.speed;
         if(frog.tongue.length <= 30) {
            frog.tongue.state="idle";
            frog.tongue.length=30;
         }

    }
}

// draw the parts of the frog body 
function drawFrog() {

    let bodyColor;
    if (frog.isTransformed){
        bodyColor= color(255,255,0);
    } else {
        bodyColor= color(123, 245, 66);
    }
   
    // Draw the frog's body
    push();
    fill(bodyColor);
    noStroke();
    rotate(PI/21); 
    ellipse(155,170,80,90);
    pop();

   let tongueTipX = frog.tongue.baseX + cos(frog.tongue.angle) * frog.tongue.length;
   let tongueTipY = frog.tongue.baseY + sin(frog.tongue.angle) * frog.tongue.length;

   // draw the frog's tongue line 
   push();
   stroke(247,135,135);
   strokeWeight(4);
   line(frog.tongue.baseX,frog.tongue.baseY,tongueTipX, tongueTipY);
   pop();

   // draw the frog's tongue tip 
   push();
   fill(247,135,135);
   noStroke();
   ellipse(tongueTipX, tongueTipY, frog.tongue.size);
   pop();

   // draw the frog's head 
   push();
   fill(bodyColor);
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

    // draw the frog black part of the eye 
    push();
    fill(0);
    rotate(PI/-190);
    ellipse(175,120,15,15);
    ellipse(147,120,15,15);
    pop();

    // draw the frog legs
    push();
    fill(bodyColor);
    noStroke(0);
    rotate(PI/-5);
    rect(25,226,10,45);
    rect(-8,224,10,52);
    rect(-35,255,10,30);
    pop();

    // draw the frog fingers left and right and back 
    push();
    fill(44,101,19);
    noStroke(0);
    rotate(PI/600); 
    ellipse(160,220,15,15); //left fingers 
    ellipse(185,197,15,15); //rigth fingers
    ellipse(145,245,15,15); // back fingers
    pop();

}
/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
   
    let tongueTipX = frog.tongue.baseX + cos(frog.tongue.angle) * frog.tongue.length;
    let tongueTipY = frog.tongue.baseY + sin(frog.tongue.angle) * frog.tongue.length;

    const d= dist(tongueTipX, tongueTipY, fly.x, fly.y);
    const eaten = (d < frog.tongue.size/ 2 + fly.size /2 );

    if (eaten) {
        resetFly();
        frog.tongue.state= "inbound";
        score+=1;
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

