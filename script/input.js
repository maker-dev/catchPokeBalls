class input {
  constructor(player) {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          player.moveUp();
          break;
        case "ArrowDown":
          player.moveDown();
          break;
        case "ArrowLeft":
          player.moveLeft();
          break;
        case "ArrowRight":
          player.moveRight();
          break;
        case " ":
          if (gamestate === GAMESTATES.MENU) {
            gamestate = GAMESTATES.RUNNING;
            timeCounter = 0;
            lastTime = new Date().getSeconds();
          }
          break;
        case "Enter":
          if (gamestate === GAMESTATES.GAMEOVER) {
            gamestate = GAMESTATES.RUNNING;
            scorePoint = 0;
            timeCounter = 0;
            lastTime = new Date().getSeconds();
          }
          break;
      }
    });

   
    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (player.speed.y < 0) player.stop();
          break;
        case "ArrowDown":
          if (player.speed.y > 0) player.stop();
          break;
        case "ArrowLeft":
          if (player.speed.x < 0) player.stop();
          break;
        case "ArrowRight":
          if (player.speed.x > 0) player.stop();
          break;
      }
    });
  }
}
