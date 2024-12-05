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
let game2Started= false;
let eye;

let gameStage=1;
let balls=[];
let score=0;
const ballCount=10;
const ballSize=40;

let player={

    x:350,
    y:325,
    size:50,
    speed:5,
    color:255
};

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
   
    if(gameStage==1) {
        displayGame1();
    } else if (gameStage==2){
        displayGame2();
    } else if (gameStage==3){
        displayGameWin();
    }
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

    if (gameOver){
        gameOver=false;
        resetGame();
        gameStarted=true;
        return;
    }

    if (!gameStarted && key === ' ' && currentCharacter >= string.length){
        gameStarted= true;
        startTime= millis();
       }
    
    if (gameStage==2){
        startTime= millis();
    }
}    


function displayGame1(){

    fill(255);
    textSize(24);
    textAlign(LEFT);
    text(`score: ${score}`,20,40);
    text('Catch 10 colorballs to go on the next level',150,20);

    if (score>=10){
        gameStage++;
        score=0;
        game2Started=false;
        startTime= millis();
    }

    if(balls.length <ballCount) {
        createBall();
    }

    for (let i=balls.length-1; i>=0; i--){
        let ball= balls[i];

        ball.x+= ball.speedX;
        ball.y+= ball.speedY;

        fill(ball.color);
        ellipse(ball.x,ball.y,ballSize);

        if (ball.x <0 || ball.x> width || ball.y<0 || ball.y>height) {
            balls.splice(i,1);
        }
    }

}

function createBall(){
    let ball={
        x: random(width),
        y: random(height),
        speedX:random(-4,4),
        speedY:random(-4,4),
        color: color(random(255), random(255), random(255)),  
        size:random(20,60)  
    };
    balls.push(ball);
}
   
function mousePressed(){
      
     if (!gameStarted || gameOver) return;

     if (gameStage== 1){
     for (let i = balls.length -1; i >= 0; i--){
        let ball= balls[i];
        let distance= dist(mouseX,mouseY,ball.x,ball.y);

        if (distance< ballSize/2) {
            balls.splice(i,1);
            score++;
        }
     }

  } else if (gameStage==2){

    if(!game2Started){
        game2Started= false;
        starTime=millis();
    }

    if (balls.length===0){
        createBall();
    }
  }
}


function displayGame2(){

    fill(255);
    textSize(24);
    textAlign(LEFT);
    text(`score: ${score}`,20,40);
    text('Use arrow keys to eat the balls',150,20); 

    if (keyIsDown(LEFT_ARROW)) {
       player.x -= player.speed;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        player.x += player.speed;
     }

     if (keyIsDown(UP_ARROW)) {
        player.y-= player.speed;
     }
     
     if (keyIsDown(DOWN_ARROW)) {
        player.y+= player.speed;
     }

    player.x= constrain(player.x,0,width);
    player.y= constrain(player.y,0,height);

    if (balls.length < ballCount){
        createBall();
    }

    for (let i= balls.length -1; i>= 0; i--) {
        let ball=balls[i];

        ball.x += ball.speedX;
        ball.y += ball.speedY;

        if (ball.x <0 ||ball.x > width) ball.speedX *= -1;
        if (ball.y <0 ||ball.y > height) ball.speedY *= -1;

        fill(ball.color);
        ellipse(ball.x,ball.y,ballSize);

        let distance= dist(player.x,player.y,ball.x,ball.y);
        if (distance< (player.size+ballSize) /2) {
            balls.splice(i,1);
            score++;

            player.size +=2;

        }
    }

    fill(204,204,255);
    square(player.x,player.y,player.size);

    // win condition
    if (score >=10){
        gameStage++;
        score=0;
    }
 }

/* draw the function for the set timer on the pages*/
function  gameTimer(){

    noStroke();
    fill(255,0,0);
    textSize(30);

    if (gameStage==1){
    currentTime= 15 - (millis()- startTime) / 1000;

    if (currentTime<=0){
        gameOver=true;
        return;
    }
    text(int(currentTime),600,150);
  } else if (gameStage==2){
        currentTime=30 -(millis()-startTime)/ 1000;

        if (currentTime <= 0){
            gameOver= true;
            return;
        }
        text(int(currentTime),600,150);

    }
 }


function resetGame(){ 

    gameOver= false;
    gameStarted=true;
    currentCharacter=0;

    gameStage=1;
    score=0;
    balls= [];
    currentTime=0;
    startTime= millis();
    gameWin=false;

    player= {
        x:350,
        y:325,
        size:50,
        speed:5
    };

}

function displayGameOver(){
     
    push();
    textAlign(CENTER);
    fill(255,0,0);
    textSize(20);
    textFont('courier');
    text('GAME OVER, KEEP TRYING',width/2, height/2);
    text('Press any key to try again',width/2, height/2 +80);
    pop();
}

function displayGameWin(){

    push();
    textAlign(CENTER);
    fill(0,255,0);
    textSize(24);
    text('CONGRATULATIONS',width/2, height/2 -50);
    text('You have completed all the challenges!',width/2, height/2);
    pop();
}



