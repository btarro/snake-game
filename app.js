// How will the user interact with our application?

// Test Case 1
// App loads with an instruction canvas overlay
// Pressing any button starts the game

// Test Case 2
//  A user can control the 'worm' with arrow keys

// Test Case 3
// The worm will grow in length for each astreoid it eats

// Test Case 4
// The game is over if the worm collides with any wall
// The game is over if the worm collides with itself

// Test Case 5
// The 'score' is increased by 10 for each asteroid eaten

// Test Case 6
// When an asteroid is eaten, a new one is randomly generated on the canvas

// Test Case 7
// When the game is over the hi-score is updated if the user beats the previous score

// Test Case 8
// When the game is over load a 'game over' canvas

let canvas;
let canvasContext;
let wormX = 250;
let wormY = 250;
let wormHeight = 20;
let wormLength = 20;
let wormGrow = 20;
let wormSpeed = 1;
let lastMove = "ArrowRight";

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp") {
    moveUp();
    lastMove = e.code;
  }
  if (e.code === "ArrowDown") {
    moveDown();
    lastMove = e.code;
  }
  if (e.code === "ArrowLeft") {
    moveLeft();
    lastMove = e.code;
  }
  if (e.code === "ArrowRight") {
    moveRight();
    lastMove = e.code;
  }
  // Test for apple
  if (e.code === "KeyG") {
    wormLength = wormLength + wormGrow;
  }
});

window.onload = function () {
  canvas = document.getElementById("game-canvas");
  canvasContext = canvas.getContext("2d");

  var framesPerSecond = 30;
  setInterval(function () {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);
};

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, "black");
  worm(wormX, wormY, wormHeight, wormLength, "white");
}
function moveEverything() {
  //console.log(lastMove);
  if (lastMove == "ArrowRight") {
    wormX = wormX + wormSpeed;
  }
  if (lastMove == "ArrowLeft") {
    wormX = wormX - wormSpeed;
  }
  if (lastMove == "ArrowUp") {
    wormY = wormY - wormSpeed;
  }
  if (lastMove == "ArrowDown") {
    wormY = wormY + wormSpeed;
  }
}

function worm(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

// MOVEMENT ARROWS
function moveUp() {
  if (wormY > 0) {
    wormY = wormY - wormLength;
  }
}
function moveDown() {
  if (wormY < canvas.height - wormHeight) {
    wormY = wormY + wormLength;
  }
}
function moveLeft() {
  if (wormX > 0) {
    wormX = wormX - wormLength;
  }
}
function moveRight() {
  if (wormX < canvas.width - wormHeight) {
    wormX = wormX + wormLength;
  }
}

// CARRY OVER - Drawing the Canvas

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
} // X,Y
