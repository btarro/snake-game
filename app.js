const wormHeight = 20;
const wormWidth = 20;
const wormSpeed = 5;
const wormGrow = 10;

let canvas;
let canvasContext;
let wormX = 200;
let wormY = 200;
let lastMove = "";
let isX = false;
let isY = false;
let isJunk = true;

let wormBody = [
  { posX: 200, posY: 200, height: wormHeight, length: wormWidth },
];

let spaceJunk = { posX: 100, posY: 100, height: wormHeight, width: wormWidth };

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp" && !isY) {
    lastMove = e.code;
  }
  if (e.code === "ArrowDown" && !isY) {
    lastMove = e.code;
  }
  if (e.code === "ArrowLeft" && !isX) {
    lastMove = e.code;
  }
  if (e.code === "ArrowRight" && !isX) {
    lastMove = e.code;
  }
  // Test for asteroid DELETEME
  if (e.code === "KeyG") {
    let segments = 1;
    while (segments < wormGrow) {
      wormBody.push({
        posX: wormX,
        posY: wormY,
        height: wormHeight,
        length: wormWidth,
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
  }, 1000 / framesPerSecond);
};

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, "black");
  if (!crashCheck()) {
    wormBody.forEach((wormBodyPart) => {
      worm(
        wormBodyPart.posX,
        wormBodyPart.posY,
        wormHeight,
        wormWidth,
        "white"
      );
    });
  } else {
    console.log("GAME OVER FUNCTION");
  }
  junk(
    spaceJunk.posX,
    spaceJunk.posY,
    spaceJunk.height,
    spaceJunk.width,
    "green"
  );
}

function moveEverything() {
  if (lastMove == "ArrowUp") {
    isX = false;
    isY = true;
    if (wormY > 0) {
      wormY = wormBody[0].posY - wormSpeed;
      wormBody.unshift({
        posX: wormX,
        posY: wormY,
        height: wormHeight,
        width: wormWidth,
      });
      wormBody.pop();
    } else {
      console.log("top collision");
      lastMove = "";
    }
  }

  if (lastMove == "ArrowDown") {
    isX = false;
    isY = true;
    if (wormY < canvas.height - wormHeight) {
      wormY = wormBody[0].posY + wormSpeed;
      wormBody.unshift({
        posX: wormX,
        posY: wormY,
        height: wormHeight,
        width: wormWidth,
      });
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
      wormBody.unshift({
        posX: wormX,
        posY: wormY,
        height: wormHeight,
        width: wormWidth,
      });
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
      wormBody.unshift({
        posX: wormX,
        posY: wormY,
        height: wormHeight,
        width: wormWidth,
      });
      wormBody.pop();
    } else {
      console.log("right side collision");
      lastMove = "";
    }
  }

  // if (lastMove != "ArrowRight" || "ArrowLeft" || "ArrowUp" || "ArrowDown") {
  //   //console.log(lastMove);
  //   //lastMove = "";
  // }
}

function worm(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function junk(leftX, topY, height, width, drawColor) {
  if (isJunk) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
    isJunk = true;
    //console.log("how many junks");
  }
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function crashCheck() {
  for (i = 1; i < wormBody.length; i++) {
    let headBottom = wormBody[0].posY;
    let headLeft = wormBody[0].posX;
    let headRight = wormBody[0].posX;
    let headTop = wormBody[0].posY;
    let segBottom = wormBody[i].posY;
    let segLeft = wormBody[i].posX;
    let segRight = wormBody[i].posX;
    let segTop = wormBody[i].posY;

    if (
      headTop > segBottom ||
      headRight < segLeft ||
      headBottom < segTop ||
      headLeft > segRight
    ) {
    } else {
      console.log("SELF CRASH!");
      return true;
    }
  }
}

// TODO
//------
// Random Junk
// Grow Worm Based on Apple
// Start Screen
// Game Over Screen

// Groupings
//-----------

// Event Listener
//    Keep this small and essential as possible

// draw / render
//    This function should draw everything on screen based on movement

// movement
//    perform movement calculations for screen, worm, apple

//  collision detection
//    Self
//        Game Over Screen
//    spaceJunk
//        Grow worm
//    Wall
//        Game over screen
