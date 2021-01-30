const wormHeight = 20;
const wormWidth = 20;
const wormSpeed = 4;
const wormGrow = 10;
const canvas = document.getElementById("game-canvas");
const canvasContext = canvas.getContext("2d");

let getScore = document.getElementById("game-score");
let getHighScore = document.getElementById("high-score");
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

window.onload = function () {
  start();
};

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

function runGame() {
  gameStarted = true;
  getScore.textContent = "00000";
  newJunk();

  let framesPerSecond = 60;
  gameEngine = setInterval(function () {
    moveEverything();
    drawEverything();
    collisionCheck();
  }, 1000 / framesPerSecond);
}

function moveEverything() {
  if (gameStarted) {
    if (lastMove == "ArrowUp") {
      isX = false;
      isY = true;
      wormY = wormBody[0].posY - wormSpeed;
      growWormBody();
    }

    if (lastMove == "ArrowDown") {
      isX = false;
      isY = true;
      wormY = wormBody[0].posY + wormSpeed;
      growWormBody();
    }

    if (lastMove == "ArrowLeft") {
      isX = true;
      isY = false;
      wormX = wormBody[0].posX - wormSpeed;
      growWormBody();
    }

    if (lastMove == "ArrowRight") {
      isX = true;
      isY = false;
      wormX = wormBody[0].posX + wormSpeed;
      growWormBody();
    }
  }
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
    "orange"
  );
}

function collisionCheck() {
  if (gameStarted) {
    selfCrash();
  }
  if (gameStarted) {
    consumeJunk();
  }
  if (gameStarted) {
    wallCrash();
  }
}

function growWormBody() {
  wormBody.unshift({
    posX: wormX,
    posY: wormY,
    height: wormHeight,
    width: wormWidth,
  });
  wormBody.pop();
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
      gameOver("* trying to eat yourself *");
      return;
    }
  }
}

function wallCrash() {
  if (
    wormX > canvas.width - wormWidth - 1 ||
    wormX <= 0 ||
    wormY > canvas.height - wormHeight - 1 ||
    wormY <= 0
  ) {
    lastMove = "";
    gameOver("* hitting walls *");
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
    score += 25;
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

  for (i = 0; i < wormBody.length; i++) {
    let segBottom = wormBody[i].posY;
    let segLeft = wormBody[i].posX;
    let segRight = wormBody[i].posX;
    let segTop = wormBody[i].posY;

    if (
      newX < segLeft + 20 &&
      newX + 20 > segLeft &&
      newY < segTop + 20 &&
      newY + 20 > segTop
    ) {
      newJunk();
    } else {
      spaceJunk = {
        posX: newX,
        posY: newY,
        height: wormHeight,
        width: wormWidth,
      };
    }
  }
}

function scoring() {
  if (score > highScore) {
    highScore = score;
    let pad = "00000";
    let result = (pad + score).slice(-pad.length);
    getScore.textContent = result;
    getHighScore.textContent = result;
  } else {
    let pad = "00000";
    let result = (pad + score).slice(-pad.length);
    getScore.textContent = result;
  }
}

function start() {
  gameObj(0, 0, canvas.width, canvas.height, "black");
  canvasContext.font = "18px Arcade Interlaced";
  canvasContext.textAlign = "center";
  canvasContext.fillStyle = "yellowgreen";
  canvasContext.fillText("* Greetings, Nope-Rope *", canvas.width / 2, 100);
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

function gameOver(type) {
  clearInterval(gameEngine);
  wormX = 200;
  wormY = 200;
  lastMove = "";
  isX = false;
  isY = false;
  score = 0;
  gameStarted = false;
  spaceJunk = {};
  wormBody = [{ posX: 200, posY: 200, height: wormHeight, length: wormWidth }];

  gameObj(0, 0, canvas.width, canvas.height, "black");
  canvasContext.font = "36px Arcade Interlaced";
  canvasContext.textAlign = "center";
  canvasContext.fillStyle = "red";
  canvasContext.fillText("GAME OVER", canvas.width / 2, 100);

  canvasContext.font = "18px Arcade Interlaced";
  canvasContext.fillStyle = "lightgrey";
  canvasContext.fillText(
    `SCORE ${getScore.textContent}`,
    canvas.width / 2,
    150
  );

  canvasContext.font = "14px Arcade Interlaced";
  canvasContext.fillText(`It turns out..`, canvas.width / 2, 250);
  canvasContext.fillStyle = "coral";
  canvasContext.fillText(`${type}`, canvas.width / 2, 290);
  canvasContext.fillStyle = "lightgrey";
  canvasContext.fillText("..is dangerous.", canvas.width / 2, 330);

  canvasContext.font = "18px Arcade Interlaced";
  canvasContext.fillStyle = "yellow";
  canvasContext.fillText("* PRESS SPACE TO TRY AGAIN *", canvas.width / 2, 450);
}

function gameObj(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}
