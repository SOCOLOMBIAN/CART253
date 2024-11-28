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

let message =' Welcome to the magic world of sounnd and cor, you will be asked to overcome challenges, win and see what you acomplish.'


function setup() {
    createCanvas(700, 650);

     
}

function draw() {

//change the color of the background depending on the game status 
   if (gameOver) {
    background("#FF0000");
   } else{
    background("#020203");
   }

    // update game timer
    gameInstructions();
    gameTimer();
    
    if (gameOver){
        displayGameOver();

    }

}


function  gameInstructions() {


}
       
/* draw the function for the set timer on the pages*/

function  gameTimer(){

    noStroke();
    fill("#ffffff");
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

    textAlign(CENTER);
    textSize(20);
    text('GAME OVER, KEEP TRYING',width/2,height/2 );
    text('Press any key to try again',width/2,height/2 +40);
}




