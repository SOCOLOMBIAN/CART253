let circles = [];
const numCircles = 12;
const matchPairs = 2;
let selectedCircles = [];
let gameWon = false;

function setup() {
  createCanvas(800, 600);
  
  // Create color pairs
  let colors = [];
  for (let i = 0; i < numCircles / matchPairs; i++) {
    let randomColor = color(random(255), random(255), random(255));
    for (let j = 0; j < matchPairs; j++) {
      colors.push(randomColor);
    }
  }
  
  // Shuffle colors
  colors = shuffle(colors);
  
  // Create circles
  for (let i = 0; i < numCircles; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      color: colors[i],
      radius: 40,
      speedX: random(-2, 2),
      speedY: random(-2, 2),
      selected: false
    });
  }
}

function draw() {
  background(220);
  
  // Update and draw circles
  for (let circle of circles) {
    // Move circles
    circle.x += circle.speedX;
    circle.y += circle.speedY;
    
    // Bounce off walls
    if (circle.x < 0 || circle.x > width) circle.speedX *= -1;
    if (circle.y < 0 || circle.y > height) circle.speedY *= -1;
    
    // Draw circle
    if (circle.selected) {
      stroke(0);
      strokeWeight(3);
    } else {
      noStroke();
    }
    fill(circle.color);
    ellipse(circle.x, circle.y, circle.radius * 2);
  }
  
  // Check for game win
  if (gameWon) {
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);
    text("Congratulations! You found the matching pairs!", width/2, height/2);
  }
  
  // Game instructions
  textSize(16);
  fill(0);
  text("Find 2 pairs of circles with the same color", 10, 20);
}

function mousePressed() {
  if (gameWon) return;
  
  // Check if a circle is clicked
  for (let circle of circles) {
    let d = dist(mouseX, mouseY, circle.x, circle.y);
    if (d < circle.radius) {
      // Toggle selection
      circle.selected = !circle.selected;
      
      // Add or remove from selected circles
      if (circle.selected) {
        selectedCircles.push(circle);
      } else {
        selectedCircles = selectedCircles.filter(c => c !== circle);
      }
      
      // Check for matching pairs
      if (selectedCircles.length === 4) {
        let matchFound = checkMatchingPairs(selectedCircles);
        
        if (matchFound) {
          gameWon = true;
        } else {
          // Deselect all if no match
          for (let c of selectedCircles) {
            c.selected = false;
          }
          selectedCircles = [];
        }
      }
      
      break;
    }
  }
}

function checkMatchingPairs(selected) {
  // Check if exactly 2 unique colors
  let colors = selected.map(c => c.color);
  let uniqueColors = [...new Set(colors)];
  
  return uniqueColors.length === 2;
}