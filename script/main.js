/**@type {HTMLCanvasElement} */

const canvas = document.getElementById("gameScreen"),
  theContext = canvas.getContext("2d"),
  width = canvas.width,
  height = canvas.height;
//game objects
let Player = new XPlayer(width, height);
new input(Player);
let PokeBall = new pokeBall(width, height, Player);
//game backgroundSong
let backgroundSound = new Audio("sounds/pokemonSoundTrack.mp3");
//game functions
function drawBackground(ctx) {
  let image = document.getElementById("forest");
  ctx.drawImage(image, 0, 0, 700, 500);
}

//game variables
//time variables
let timeCounter;
let lastTime;
//game States
const GAMESTATES = {
  RUNNING: 1,
  MENU: 3,
  GAMEOVER: 4,
};
let gamestate = GAMESTATES.MENU;
//game states function
function gameMenu(ctx) {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 30px Arial";
  ctx.fillText("press SPACEBAR to start the game", width / 2, height / 2);
  ctx.textAlign = "center";
}

function gameOver(ctx) {
  if ( parseInt(window.localStorage.getItem("score")) > scorePoint ) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
    ctx.font = "50px sans serif";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(`YOUR HIGH SCORE IS ${window.localStorage.getItem("score")}`,width / 2,height / 2 - 100);
    ctx.fillStyle = "#f00";
    ctx.font = "bold 40px Arial";
    ctx.fillText(`current score ${scorePoint} 😔`, width / 2, height / 2);
    ctx.font = "25px Arial";
    ctx.fillStyle = "#3E497A"
    ctx.fillText("press Enter to start over", width / 2, height / 2 + 50);
  } else {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
    ctx.font = "60px sans serif";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(`YOUR HIGH SCORE IS ${window.localStorage.getItem("score")}`,width / 2,height / 2 - 100);
    ctx.fillStyle = "#0f0";
    window.localStorage.setItem("score",scorePoint.toString());
    ctx.font = "bold 40px Arial";
    ctx.fillText(`current score ${scorePoint} 😀`, width / 2, height / 2);
    ctx.font = "25px Arial";
    ctx.fillStyle = "#3E497A"
    ctx.fillText("press Enter to start over", width / 2, height / 2 + 50);
  }
  Player.lastAnimation = Player.animationBottom;
  Player.position = {
    x: width / 2 - Player.width / 2,
    y: height / 2 - Player.height / 2,
  };
  PokeBall.position = { x: Math.random() * 679, y: Math.random() * 479 };
}

//gameLoop
function gameLoop() {
  if (gamestate === GAMESTATES.RUNNING) {
    //backgroundSong
    if (backgroundSound.paused) {
      backgroundSound.play();
    }
    //time
    if (PokeBall.resetTimer === true) {
      lastTime = new Date().getSeconds();
      timeCounter = 0;
      PokeBall.resetTimer = false;
    }
    if (lastTime !== new Date().getSeconds()) {
      timeCounter++;
      lastTime = new Date().getSeconds();
      if (timeCounter === 5) {
        gamestate = GAMESTATES.GAMEOVER;
        gameOver(theContext);
        timeCounter = 0;
      }
    }
    //drawing
    drawBackground(theContext);
    Player.draw(theContext);
    PokeBall.draw(theContext);
    score(theContext);
    deadTimer(theContext);
    //update
    Player.update();
    PokeBall.update();
  } else if (gamestate === GAMESTATES.GAMEOVER) {
    gameOver(theContext);
    backgroundSound.pause();
  } else {
    gameMenu(theContext);
  }
  window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
