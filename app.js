let canvas;
let canvasContext;
let wormX = 200;
let wormY = 200;
let wormHeight = 20;
let wormLength = 20;
let wormSpeed = 3;
let lastMove = "";

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
  // Test for apple DELETEME
  if (e.code === "KeyG") {
    wormBody.push({
      posX: wormX + 200,
      posY: wormY + 200,
      wormHeight,
      wormLength,
    });
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
  //worm(wormX, wormY, wormHeight, wormLength, "white");
  wormBody.forEach((wormBodyPart) => {
    worm(wormBodyPart.posX, wormBodyPart.posY, wormHeight, wormLength, "white");
  });
}

function moveEverything() {
  // REPLACE WITH FOR EACH DELETEME
  if (lastMove == "ArrowRight") {
    if (wormX < canvas.width - wormHeight) {
      wormX = wormBody[0].posX + wormSpeed;
      wormBody.unshift({ posX: wormX, posY: wormY });
      wormBody.pop();
    } else {
      console.log("right side collision");
      lastMove = "";
    }
  }

  if (lastMove == "ArrowLeft") {
    if (wormX > 0) {
      wormX = wormBody[0].posX - wormSpeed;
      wormBody.unshift({ posX: wormX, posY: wormY });
      wormBody.pop();
    } else {
      console.log("left side collision");
      lastMove = "";
    }
  }

  if (lastMove == "ArrowUp") {
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
    if (wormY < canvas.height - wormHeight) {
      wormY = wormBody[0].posY + wormSpeed;
      wormBody.unshift({ posX: wormX, posY: wormY });
      wormBody.pop();
    } else {
      console.log("bottom collision");
      lastMove = "";
    }
  }
}

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

let wormBody = [
  { posX: 200, posY: 200, height: wormHeight, length: wormLength },
  // { posX: 220, posY: 200, height: wormHeight, length: wormLength },
  // { posX: 240, posY: 200, height: wormHeight, length: wormLength },
];

function worm(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}
