/**
 * Variation Jam 
 * Sophie Sanchez 
 * 
 * a game that interacts with the brain capability 
 * 
 * Instructions:
 * - 
 * - 
 * - 
 * Made with p5
 * https://p5js.org/
 */

"use strict";
let currentTime= 0;
let startTime=0;
let gameOver= false;
let gameWin=false;
let gameStarted= false;
let eye;

/**
 * set the position for the moving cirlces of color around the canvas 
 */






let string = ` 
Welcome to the magic world of sound and color.
you will be asked to overcome challenges,
win and see what you acomplish. `;

let currentCharacter= 0;

function preload(){

     eye= loadImage("assets/images/ojo.jpg");
}

function setup() {
    createCanvas(700, 650);
    
}

function draw() {

//change the color of the background depending on the game status 
if (gameOver) { 
    background(eye);
    displayGameOver();
 }

 else if (!gameStarted){
    background(0,0,0);
    displayInstructions();
}
else {
    background(0,0,0);
    gameTimer();
    displayGame1();
   }

} 

       
/* draw the function for the instruction page*/
function  displayInstructions() {

    let currentString= string.substring(0,currentCharacter);

    push();
    textSize(20);
    textFont('courier');
    textAlign(CENTER,CENTER);
    fill(255);
    text(currentString, width/2, height/2);

    //condition to start the game
    if (currentCharacter >= string.length) {
        textSize(16);
        textFont('courier');
        text('Press SPACE to start the game',width/2,height/2 +100);
    }
    pop();

    currentCharacter+= 0.3;
    currentCharacter= min(currentCharacter,string.length);
}

function keyPressed(){

    if (!gameStarted && key === ' ' && currentCharacter >= string.length){
     gameStarted= true;
     startTime= millis();
    }

    if (gameOver){
        resetGame();
    }
}    


function resetGame(){

    gameOver= false;
    gameStarted=false;
    milliseconds=0;
    seconds=0;
    currentCharacter=0;

}

function displayGameOver(){
     
    push();
    textAlign(CENTER);
    fill(255,0,0);
    textSize(20);
    textFont('courier');
    text('GAME OVER, KEEP TRYING',width/2, height/2);
    text('Press any key to try again',width/2, height/2 +40);
    pop();
}

function displayGame1(){
    fill(255,255,0);
    ellipse(350,325,50,50);

}
       
/* draw the function for the set timer on the pages*/
function  gameTimer(){

    noStroke();
    fill(255,0,0);
    textSize(30);

    currentTime= 3 - (millis()- startTime) / 1000;

    text(int(currentTime),600,150);

    if (currentTime <= 0){
        gameOver= true;
    }
}





