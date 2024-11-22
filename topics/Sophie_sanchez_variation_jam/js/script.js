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
let seconds= 0;
let gameOver= false;
let gameWin=false;

function setup() {
    createCanvas(700, 650);
   
   

}

function draw() {

//change the color of the background depending on the game status 
    if (gameOver){
        background("#FF0000");
    } else { 
        background("#020203")
    }
    
    // instructions of the game
    gameInstructions();

    if (gameOver){
        displayGameOver();
    }


}

/* draw the funvtion for the set timer on the pages*/

function  gameInstructions(){

    noStroke();
    fill("#ffffff");
    textSize(30);
 
    milliseconds= millis();
    seconds= milliseconds/1000;
    
    currentTime = max(0, 5 - seconds);
    text(int(currentTime),600,150);

    if (currentTime==0){
        gameOver=true;
    }

}

function displayGameOver(){
    push();
    textAlign(CENTER,CENTER);
    textSize(24);
    text("GAME OVER", width/2,height/2 -24);
    text("Press R to play again", width/2, height/2 +30);
    pop();
}




