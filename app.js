const wormHeight = 20;
const wormWidth = 20;
const wormSpeed = 3;
const wormGrow = 6;

let canvas;
let canvasContext;
let wormX = 200;
let wormY = 200;
let lastMove = "";
let wormBody = [
  { posX: 200, posY: 200, height: wormHeight, length: wormWidth },
];

// NYI
let isX = false;
let isY = false;

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp" && !isY) {
    moveUp();
    lastMove = e.code;
  }
  if (e.code === "ArrowDown" && !isY) {
    moveDown();
    lastMove = e.code;
  }
  if (e.code === "ArrowLeft" && !isX) {
    moveLeft();
    lastMove = e.code;
  }
  if (e.code === "ArrowRight" && !isX) {
    moveRight();
    lastMove = e.code;
  }
  // Test for apple DELETEME
  if (e.code === "KeyG") {
    let segments = 1;
    while (segments < wormGrow) {
      wormBody.push({
        posX: wormX,
        posY: wormY,
      });
      segments++;
    }
  }
});

window.onload = function () {
  canvas = document.getElementById("game-canvas");
  canvasContext = canvas.getContext("2d");

  var framesPerSecond = 60;
  setInterval(function () {
    moveEverything();
    drawEverything();
    detectCollision();
  }, 1000 / framesPerSecond);
};

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, "black");
  wormBody.forEach((wormBodyPart) => {
    worm(wormBodyPart.posX, wormBodyPart.posY, wormHeight, wormWidth, "white");
  });
}

function moveEverything() {
  // REPLACE WITH FOR EACH DELETEME
  if (lastMove == "ArrowUp") {
    isX = false;
    isY = true;
    if (wormY > 0) {
      wormY = wormBody[0].posY - wormSpeed;
      wormBody.unshift({ posX: wormX, posY: wormY });
      wormBody.pop();
    } else {
      console.log("top collision");
      lastMove = "";
    }
  }

  if (lastMove == "ArrowDown") {
    isX = false;
    isy = true;
    if (wormY < canvas.height - wormHeight) {
      wormY = wormBody[0].posY + wormSpeed;
      wormBody.unshift({ posX: wormX, posY: wormY });
      wormBody.pop();
    } else {
      console.log("bottom collision");
      lastMove = "";
    }
  }

  if (lastMove == "ArrowLeft") {
    isX = true;
    isY = false;
    if (wormX > 0) {
      wormX = wormBody[0].posX - wormSpeed;
      wormBody.unshift({ posX: wormX, posY: wormY });
      wormBody.pop();
    } else {
      console.log("left side collision");
      lastMove = "";
    }
  }

  if (lastMove == "ArrowRight") {
    isX = true;
    isY = false;
    if (wormX < canvas.width - wormWidth) {
      wormX = wormBody[0].posX + wormSpeed;
      wormBody.unshift({ posX: wormX, posY: wormY });
      wormBody.pop();
    } else {
      console.log("right side collision");
      lastMove = "";
    }
  }
}

function moveUp() {
  if (wormY > 0) {
    wormY = wormY - wormHeight;
  }
}

function moveDown() {
  if (wormY < canvas.height - wormHeight) {
    wormY = wormY + wormHeight;
  }
}

function moveLeft() {
  if (wormX > 0) {
    wormX = wormX - wormWidth;
  }
}

function moveRight() {
  if (wormX < canvas.width - wormWidth) {
    wormX = wormX + wormWidth;
  }
}

function worm(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function detectCollision() {
  for (i = 1; i < wormBody.length; i++) {
    if (wormBody[i] === wormBody[0]) {
      console.log("Collision");
    }
  }
}
// TODO

// Add Random Asteroid
// Add Asteroid Collision
// Add "Grow" upon eating asteroid

// add self collision
// Add Start Screen
// High Score
// Add Game Over screen
// High Score
// restructure

// Is wormX <
