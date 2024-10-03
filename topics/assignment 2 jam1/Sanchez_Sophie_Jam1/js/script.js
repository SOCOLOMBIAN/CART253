/**
 * Sophie Sanchez 
 
 */

"use strict";

let moon= { // giving the moon the different variables to move around 
    x:100,
    y:120,
    size: 85,
velocity: {
    x: 0.5,
    y: 0,
    isMoving: true, 
},
    stopPosition: { // setting the moon position where it should stop 
        x:560,
        y:150
    }

};

let movingCircle= { // creating the variables for the black circle that will be on top of the moon

    x: 110,
    y: 115,
    size:70,

 velocity: { // setting the same values for the circle moving as it can follow the moon mouvement 
    x: 0.5,
    y:0
 }

};

let img; // image of my cat Xena growing because she is waking up
let img2; // image of my cat Xena is she still alive 
let img3; // image of my cat Xena is she didn't survive 
let imgSize= 20; // size of the img1
let maxImgSize=70; // maximun size for the img1 
let imgRate= 0.3;   // the growth in wich the image will increase the size 
let imageVisible= true; // indicates where it will be displayed 
let moonStop = true; // control when it will stop moving 
let gameOver= false; // indicates when the game will end 
let catAlive= false; // indicates if Xena survived  
let gameStart= false;


    function preload() {
        img = loadImage("assets/images/XenaSleep.png");
        img2 = loadImage("assets/images/xenaAfter.png");
        img3= loadImage("assets/images/survived.png");
      }

function setup() {
   createCanvas (700,600);
     
}

function draw() { // i create a background with the color of the dark sky 
    background(0);

// draw the mountains for decoration of the canvas
    fill(108,47,47);
    strokeWeight(0);
    triangle(600,195,1000,600,-100,400);

    fill(70,8,14);
    strokeWeight(0);
    triangle(320,210,520,500,-300,500);

// ground of my canvas 
  fill(60,145,57);
  ellipse(60,640,1000,400);

  fill(69,168,66);
  ellipse(540,690,1000,400);

   if (!gameStart) {
    drawInstructions(); // instructions set at the beggining of the game 
   } else { 
   drawMoon(); // draw the moving moon 
   drawCircle(); // draw the moving circle 
   
   if (!gameOver){ // conditional to dont losse the game and ensure that the image size is not less than 20 
    imgSize= max(20, imgSize - imgRate);
    drawGrowingImage(); //  showing the image on the screen 
   }

  if (moon.x>= moon.stopPosition.x && moon.velocity.x > 0.7) { // mouvent of the moon and conditional where it should stoop moving 
     gameOver= true;
     catAlive= (imgSize >= maxImgSize);
     gameResults(); // show the results of winning or lossing 
  }

}

  }

  function drawInstructions(){ // instrsutions to start playing the game 
    fill('palegreen');
    textFont('courier New');
    textSize(20);
    text('Xena need to wake up before the full moon.', 20,50,760,200);
    text('click on the image of Xena to make her wake up and remember dont stop,', 20,100,660,100);
    text('Press "c" to start the game.',20,150,660,100);
    
  }
     function gameResults(){ // the results of the game depending on winning or lossing 
     textSize(38);
     textAlign(CENTER);
     fill(255);

     if (catAlive) { // image of Xena alive because she survived 
         image(img3, width/2,height/2,200,300);
         textSize(30);
         text( "Xena survived from the full moon", width/2, height/2);
     }else {  // image of Xena because she doesn't survived 
             image(img2, width/2,height/2,300,300);
             textSize(30);
             text("Xena got into an eternal dream",width/2, height/2);
         }

        }
  
    function drawMoon() {

    //draw the moon 
    fill(255);
    ellipse(moon.x, moon.y, moon.size);

    if (!gameOver) { // make the moon move 
        moon.x+= moon.velocity.x;
    }

    if (moon.x> width + moon.size) {
        moon.x = -moon.size; // reset the position of the moon
        moon.velocity.x += 0.5; // increment velocity of the moon, when reset
    }
   
} 
    function drawCircle() { // funciton of the black circle moving on top the moon to make it look as a semi-moon
    fill(0); // color of the circle 
    ellipse(movingCircle.x,movingCircle.y,movingCircle.size); // 
    movingCircle.x += 0.5;
   
}
   function drawGrowingImage(){
       image(img, 400, 400, imgSize,imgSize); // image of my cat Xena 
   }

   function keyPressed(){
     if (key === 'c') {
       gameStart = true; // this condition allows to play the game when the letter c is pressed 
}

   }
     
   function mousePressed() { // position of the image of Xena for the cliking mouse 
    let catX= 400 +imgSize/2;
    let catY= 400 +imgSize/2;

     let clickOncat= dist( mouseX,mouseY,catX,catY) < imgSize/2; // mouse click with the bound of the image
    
     if (!gameOver && clickOncat) { // game is not over and the click is on xena image 
        imgSize+=5; // the increase of the image 
     }

     if (imgSize >= maxImgSize){ // if the image is the same size of has the maximum size
        image(img3,0,0, 200,200); // the image of xena that survived 
   
     }

   }
