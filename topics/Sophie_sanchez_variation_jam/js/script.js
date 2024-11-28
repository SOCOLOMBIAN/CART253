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
let currentTime= true;
let milliseconds=0;
let seconds=0;
let gameOver= false;
let gameWin=false;
let gameStarted= false;

let eye;


let string =' Welcome to the magic world of sounnd and color, you will be asked to overcome challenges, win and see what you acomplish.';
let currentCharacter= 0;

function preload(){

     eye= loadImage("assets/images/ojo.jpg");
}

function setup() {
    createCanvas(700, 650);
    
}

function draw() {

//change the color of the background depending on the game status 

if (!gameStarted){
    background(0,0,0);
    displayInstructions();
}
else if (!gameOver) {
    background(0,0,0);
    gameTimer();
   }
else { 
    background(eye);
    displayGameOver();

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
        text('Press SPACE to start the game',width/2,height/2 +24);
    }
    pop();

    currentCharacter+= 0.1;
    currentCharacter= min(currentCharacter,string.length);
}

function keyPressed(){

    if (!gameStarted && key === '' && currentCharacter >= string.length);
    gameStarted= true;
}


       
/* draw the function for the set timer on the pages*/

function  gameTimer(){

    noStroke();
    fill(255,0,0);
    textSize(30);

    milliseconds= millis();
    
    seconds= milliseconds/1000;

    currentTime= max(0, 2 -seconds);

    text(int(currentTime),600,150);

    if (currentTime == 0){
        gameOver= true;
    }
}

function displayGameOver(){
     
    push();
    textAlign(CENTER);
    fill(255,0,0);
    textSize(20);
    textFont('courier');
    text('GAME OVER, KEEP TRYING',width/2,height/2 );
    text('Press any key to try again',width/2,height/2 +40);
    Pop();
}




