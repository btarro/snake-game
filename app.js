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
let score = 000000;
let highScore = 00000;

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
    collisionCheck();
    drawEverything();
  }, 1000 / framesPerSecond);
};

function drawEverything() {
  gameObj(0, 0, canvas.width, canvas.height, "black");

  wormBody.forEach((wormBodyPart) => {
    gameObj(
      wormBodyPart.posX,
      wormBodyPart.posY,
      wormHeight,
      wormWidth,
      "white"
    );
  });

  gameObj(
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
}

function collisionCheck() {
  selfCrash();
  consumeJunk();
}

function selfCrash() {
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

function consumeJunk() {
  let headBottom = wormBody[0].posY + wormBody[0].height;
  let headLeft = wormBody[0].posX;
  let headRight = wormBody[0].posX + wormBody[0].width;
  let headTop = wormBody[0].posY;

  if (
    headTop > spaceJunk.posY + spaceJunk.height ||
    headRight < spaceJunk.posX ||
    headBottom < spaceJunk.posY ||
    headLeft > spaceJunk.posX + spaceJunk.width
  ) {
  } else {
    newJunk();
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
}

function newJunk() {
  spaceJunk = { posX: 400, posY: 2, height: wormHeight, width: wormWidth };
}

function gameObj(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

// TODO
// ------
// Random Junk
// Grow Worm Based on Apple
// Start Screen
// Game Over Screen

// Groupings
// -----------

// Event Listener
//    Keep this small and essential as possible

// draw / render
//    This function should draw objects on screen based on movement

// movement
//    perform movement calculations for screen, worm, apple

// collision detection
//    Self
//        Game Over Screen
//    spaceJunk
//        Grow worm
//    Wall
//        Game over screen
