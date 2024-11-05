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
        //Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    },

};

// fly Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 300, // Will be random
    size: 20,
    speed: 3,
};

const fly2= {

    x: 0,
    y: 400, // will be random 
    size:40,
    speed:3.5,
    yOffset:0
}

let flyImage;
let flyImage2;
let forest1;
let forest2;
let score= 0;
let gameOver= false;
let gameWin= false;

function preload() {

    flyImage= loadImage("assets/images/fly1.png");
    flyImage2=loadImage("assets/images/fly2.png");
    forest1= loadImage("assets/images/forest.jpeg");
    forest2= loadImage("assets/images/forest2.jpg");
}

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(780,540);
    // Give the fly its first random position
    resetFly();
    resetFly2();
}

function draw() {
    
    //changing of the background 
    background(frog.isTransformed ? forest2: forest1);

    if (gameOver){
       displayGameOver();
     return;
}
     if (gameWin) {
        displayWinScreen();
        return;
     }

    // conditions for level-up the game 
    if (score >= 10 && !frog.isTransformed)
      { frog.isTransformed= true; 
        fly.speed =5;
      }

      if (score >= 17) {
        gameOver=true;
        return;
      }
        
    // the instructions 
      displayInstructions();
    // the score 
      displayScore();

    // draw tree  
     drawTree();
    
    // move and draw the flies 
    moveFly();
    drawFly();

    if(frog.isTransformed){
    moveFly2();
    drawFly2();
    }

    if (frog.tongue.state=== "idle"){
        frog.tongue.angle=atan2(mouseY -frog.tongue.baseY,mouseX-frog.tongue.baseX);
    }
    
    // mouvement of the frog and the tongue 
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
    if (frog.isTransformed) {
    checkTongueFly2Overlap(); 
}

if (frog.isTransformed){
    displayQuitOption();
}

}
function displayGameOver(){
    
    push();
    textAlign(CENTER,CENTER);
    textSize(24);
    fill(255,0,0);
    text("GAME OVER", width/2,height/2 -24);
    pop();
}

function displayWinScreen(){
    push();
    textAlign(CENTER,CENTER);
    textSize(24);
    fill(255,215,0);
    text("YOU WIN", width/2,height/2 -24);
    text("Press R to play again", width/2,height/2 +90);
    pop();   
}

function displayQuitOption(){
  
    push();
    textAlign(RIGHT);
    textSize(20);
    fill(255,188,0);
    text("Press Q to quit and win", width-20,40);
    pop();
}

function keyPressed() {

    if (key==='r' || key== 'R'){
        score = 0;
        gameOver=false;
        gameWon=false;
        frog.isTransformed=false;
        fly.speed=3;
        resetFly();
        resetFly2();   
    } else if (( key === 'q' || key=== 'Q') && frog.isTransformed) {
        gameWon= true;
}

}

function displayInstructions(){
    
    push();
    fill(255,188,0);
    textSize(20);
    text(frog.isTransformed? "Obtain 10 points to upgrade level" : "Level 2: catch the flies or leave the flies live and press Q to quit", 50,20);
    pop();
}

function displayScore(){
    push();
    textSize(20);
    fill(255,188,0);
    text("score" +score,690,40);
    pop();
}

function drawTree(){

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
}
// Moves the fly according to its speed
//Resets the fly if it gets all the way to the right
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly(); }
}

function moveFly2() {
    // Move the fly
    fly2.x += fly2.speed;
    fly2.yOffset= sin (frameCount*0.3)*5;
    // Handle the fly going off the canvas
    if (fly2.x > width) {
        resetFly2(); }
     }

   // draw the image of the flyimage1 
    function drawFly() {
    push();
    imageMode (CENTER);
    image(flyImage,fly.x, fly.y, fly.size, fly.size);
    pop();
}

    // draw the image of the flyimage2 
    function drawFly2() {
    push();
    imageMode (CENTER);
    image(flyImage2,fly2.x, fly2.y + fly2.yOffset, fly2.size, fly2.size);
    pop();
}

// resets the flyimage1 with a random poition 
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 400);
}

// resets the flyimage2 with a random poition 
function resetFly2() {
    fly2.x = 0;
    fly2.y = random(0, 700);
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
 let bodyColor= frog.isTransformed? color(255,255,0): color(123, 245, 66);

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
    fill(frog.isTransformed? color (247,18,18): color (0));
    noStroke();
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

function checkTongueFly2Overlap() {
   
    let tongueTipX = frog.tongue.baseX + cos(frog.tongue.angle) * frog.tongue.length;
    let tongueTipY = frog.tongue.baseY + sin(frog.tongue.angle) * frog.tongue.length;

    const d= dist(tongueTipX, tongueTipY, fly2.x, fly2.y + fly2.yOffset);
    const eaten = (d < frog.tongue.size + fly2.size )/2;

    if (eaten) {
        resetFly2();
        frog.tongue.state= "inbound";
        score+=2;
    }

}
//Launch the tongue on click (if it's not launched yet)
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }

}

