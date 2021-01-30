const wormHeight = 20;
const wormWidth = 20;
const wormSpeed = 4;
const wormGrow = 10;
const canvas = document.getElementById("game-canvas");
const canvasContext = canvas.getContext("2d");

let gameEngine;
let wormX = 200;
let wormY = 200;
let lastMove = "";
let isX = false;
let isY = false;
let score = 0;
let highScore = 750;
let gameStarted = false;
let spaceJunk = {};
let wormBody = [
  { posX: 200, posY: 200, height: wormHeight, length: wormWidth },
];

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
  if (e.code === "Space" && !gameStarted) {
    runGame();
  }
});

window.onload = function () {
  start();
};

function runGame() {
  gameStarted = true;
  newJunk();

  let framesPerSecond = 60;
  gameEngine = setInterval(function () {
    moveEverything();
    collisionCheck();
    drawEverything();
  }, 1000 / framesPerSecond);
}

function drawEverything() {
  gameObj(0, 0, canvas.width, canvas.height, "black");

  wormBody.forEach((wormBodyPart) => {
    gameObj(
      wormBodyPart.posX,
      wormBodyPart.posY,
      wormHeight,
      wormWidth,
      "whitesmoke"
    );
  });

  gameObj(
    spaceJunk.posX,
    spaceJunk.posY,
    spaceJunk.height,
    spaceJunk.width,
    "coral"
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

    if (!gameStarted) {
      return;
    }

    if (
      headTop > segBottom ||
      headRight < segLeft ||
      headBottom < segTop ||
      headLeft > segRight
    ) {
    } else {
      gameOver();
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
    scoring();
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
  let newX = Math.floor(Math.random() * 475 + 1);
  let newY = Math.floor(Math.random() * 475 + 1);

  if (!selfCrash()) {
    spaceJunk = {
      posX: newX,
      posY: newY,
      height: wormHeight,
      width: wormWidth,
    };
  } else {
    newJunk();
  }
}

function scoring() {
  score += 25;
  if (score > highScore) {
    highScore = score;
    let pad = "00000";
    let result = (pad + score).slice(-pad.length);
    document.getElementById("game-score").textContent = result;
    document.getElementById("high-score").textContent = result;
  } else {
    let pad = "00000";
    let result = (pad + score).slice(-pad.length);
    document.getElementById("game-score").textContent = result;
  }
}

function start() {
  gameObj(0, 0, canvas.width, canvas.height, "black");
  canvasContext.font = "18px Arcade Interlaced";
  canvasContext.textAlign = "center";
  canvasContext.fillStyle = "yellowgreen";
  canvasContext.fillText("* Greetings Nope-Rope *", canvas.width / 2, 100);
  canvasContext.fillStyle = "white";
  canvasContext.font = "14px Arcade Interlaced";
  canvasContext.fillText("You are a Danger Noodle.", canvas.width / 2, 175);
  canvasContext.fillText(
    "Danger Noodles do dangerous things.",
    canvas.width / 2,
    225
  );
  canvasContext.fillText(
    "Like eating dangerous space junk.",
    canvas.width / 2,
    250
  );
  canvasContext.fillText("Go be dangerous.", canvas.width / 2, 300);
  canvasContext.fillStyle = "yellowgreen";

  canvasContext.fillText(
    "USE ↑ ↓ ← → TO CONTROL NOPE-ROPE",
    canvas.width / 2,
    350
  );
  canvasContext.font = "18px Arcade Interlaced";
  canvasContext.fillStyle = "yellow";
  canvasContext.fillText("* PRESS SPACE TO START *", canvas.width / 2, 450);
}

function gameOver() {
  clearInterval(gameEngine);
  wormX = 200;
  wormY = 200;
  lastMove = "";
  isX = false;
  isY = false;
  score = 0;
  //highScore = 750;
  gameStarted = false;
  spaceJunk = {};
  wormBody = [{ posX: 200, posY: 200, height: wormHeight, length: wormWidth }];

  gameObj(0, 0, canvas.width, canvas.height, "black");
  canvasContext.font = "24px Arcade Interlaced";
  canvasContext.textAlign = "center";
  canvasContext.fillStyle = "red";
  canvasContext.fillText("GAME OVER", canvas.width / 2, 100);
  canvasContext.font = "18px Arcade Interlaced";
  canvasContext.fillStyle = "yellow";
  canvasContext.fillText("* PRESS SPACE TO TRY AGAIN *", canvas.width / 2, 450);
}

function gameObj(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

// Tset high score
