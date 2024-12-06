/**
 * Variation Jam 
 * Sophie Sanchez 
 * 
 * a game that interacts with the brain capability 
 * 
 * Instructions:
 * - color ball catching, clik on the mouse to catch the balls you need 10 to go to the next level
 * - Ball eating with player movement, you need to eat the balls to win the game, movre with the arrows
 * - 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

/** game state variable*/
let currentTime= 0;
let startTime=0;
let gameOver= false;
let gameWin=false;
let gameStarted= false;
let game2Started= false;

/** asset variables */
let eye;
let backgroundMusic;
let ballSound;

/** game progession variables */
let gameStage=1;
let balls=[];
let score=0;
const ballCount=10;
const ballSize=40;

/** game state of the player */
let player={

    x:350,
    y:325,
    size:50,
    speed:5,
    color:255
};

/** text for game instructions */
let string = ` 
Welcome to the brain challenge. Train the cognitive skills trough interactive games`;
let currentCharacter= 0;


/**game assests */
function preload(){

     eye= loadImage("assets/images/ojo.jpg");
     backgroundMusic= loadSound("assets/sounds/back.mp3");
     ballSound= loadSound("assets/sounds/reward.wav");

}

function setup() {
    createCanvas(700, 650);    

}

/** conditional background and game state */
function draw() {


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
      
/* draw the function for the instruction typing page*/
function  displayInstructions() {

    let currentString= string.substring(0,currentCharacter);

    push();
    textSize(20);
    textFont('courier');
    textAlign(CENTER,CENTER);
    fill(255);
    text(currentString, width/2, height/2);


    if (currentCharacter >= string.length) { //condition to start the game
        textSize(16);
        textFont('courier');
        text('Press SPACE to start the game',width/2,height/2 +100);
    }
    pop();

    currentCharacter+= 0.3;
    currentCharacter= min(currentCharacter,string.length);
}

/** reset the game is game is over */
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
        backgroundMusic.loop();
       }

}    

/** first game stage, the catching color balls */
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

    if(balls.length <ballCount) { //update and draw balls
        createBall();
    }

    for (let i=balls.length-1; i>=0; i--){
        let ball= balls[i];

        ball.x+= ball.speedX;
        ball.y+= ball.speedY;

        fill(ball.color);
        ellipse(ball.x,ball.y,ballSize);

        if (ball.x <0 || ball.x> width || ball.y<0 || ball.y>height) { // remove the balls is out of the screen
            balls.splice(i,1);
        }
    }

}

/**create new balls with random propieties */
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
   
/** function for the game stages */
function mousePressed(){
      
     if (!gameStarted || gameOver) return; // first game stage if game is not started or is over

     if (gameStage== 1){
     for (let i = balls.length -1; i >= 0; i--){
        let ball= balls[i];
        let distance= dist(mouseX,mouseY,ball.x,ball.y);

        if (distance< ballSize/2) {
            balls.splice(i,1);
            score++;
            ballSound.play();
        }
     }

  } else if (gameStage==2){ // second game stage is not started or is over
    if(!game2Started){
        game2Started= true;
        starTime=millis();
    }

    if (balls.length===0){
        createBall();
    }
  }
}

/** second game stage, eating ballls  */
function displayGame2(){

    fill(255);
    textSize(24);
    textAlign(LEFT);
    text(`score: ${score}`,20,40);

    if (!game2Started){
    fill(204,0,0);
    textAlign(CENTER);
    text('Click to start Level 2 and begin eating balls',width/2,height/2); 
    } else {
        fill(204,0,0);
        textAlign(CENTER);
        text('Use arrow keys to eat the balls, get 17 to win',350,20); 
    }
  
if (game2Started){ // player mouvement controls 
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

        ball.x += ball.speedX *(1 + score* 0.1); // increase ball speed based on score 
        ball.y += ball.speedY *(1 + score* 0.1);

        if (ball.x <0 ||ball.x > width) ball.speedX *= -1.1;
        if (ball.y <0 ||ball.y > height) ball.speedY *= -1.1;

        fill(ball.color);
        ellipse(ball.x,ball.y,ballSize);

        // check for the ball collection
        let distance= dist(player.x,player.y,ball.x,ball.y); 
        if (distance< (player.size+ballSize) /2) {
            balls.splice(i,1);
            score++;
            player.size +=2;
            player.color= color(random(255),random(255),random(255));
            ballSound.play();
        }
    }
    // draw the player of the carching balls
    fill(player.color);
    square(player.x,player.y,player.size);
}

    // win condition
    if (score >=17){
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
    currentTime= 20 - (millis()- startTime) / 1000;

    if (currentTime<=0){
        gameOver=true;
        return;
    }
    text(int(currentTime),600,150);
  } 
  
  // timer for the second stage
  else if (gameStage==2){
    if (game2Started){
        currentTime= 25  -(millis()-startTime)/ 1000;

        if (currentTime <= 0){
            gameOver= true;
            backgroundMusic.stop();
            return;
        }
        text(int(currentTime),600,150);

    }
  }
}

/**reset the game to the inital state */
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
    game2Started=false;

    player= {
        x:350,
        y:325,
        size:50,
        speed:5
    };

}

/**game over scree */
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

/**winning screen */
function displayGameWin(){

    push();
    textAlign(CENTER);
    fill(0,255,0);
    textSize(24);
    text('CONGRATULATIONS',width/2, height/2 -50);
    text('You have completed all the challenges!',width/2, height/2);
    pop();
}



