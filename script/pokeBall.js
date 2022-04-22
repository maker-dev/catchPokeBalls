class pokeBall {
    constructor(gameWidth,gameHeight,player) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById("pokeBall");
        this.size = 22;
        this.randomX = Math.random() * 620;
        this.randomY = Math.random() * 430;
        this.position = {x: this.randomX,y: this.randomY};
        this.player = player;
        this.collectSound = new Audio("sounds/pokemonSound.mp3");
        this.resetTimer = false;
    }

    draw(ctx) {
        ctx.drawImage(this.image,this.position.x,this.position.y,this.size,this.size);
    }

    update() {
        //check in x
        if (this.position.x >= this.player.position.x && this.position.x <= this.player.position.x + this.player.width) {
        //check in y
            if (this.position.y >= this.player.position.y && this.position.y <= this.player.position.y + this.player.height) {
                this.collectSound.load();
                this.collectSound.play();
                this.randomX = Math.random() * 620;
                this.randomY = Math.random() * 430;
                this.position = {x: this.randomX,y: this.randomY};
                scorePoint++;
                this.resetTimer = true;
            }
        }
    }
}