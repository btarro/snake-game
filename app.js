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
  worm(250, 250, 20, 20, "white");
}
function moveEverything() {
  canvas.addEventListener("keyup", test);
}

function worm(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function test(e) {
  console.log("IS this working?");
}
