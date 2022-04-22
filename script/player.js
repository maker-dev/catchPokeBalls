class XPlayer {
    constructor(gamewidth,gameheight) {
        this.gamewidth = gamewidth;
        this.gameheight = gameheight;
        this.width = 64;
        this.height = 64;
        this.position = {x: this.gamewidth / 2 - 32 ,y: this.gameheight / 2 -32};
        this.animationLeft = document.querySelectorAll(".left");
        this.animationRight = document.querySelectorAll(".right");
        this.animationUp = document.querySelectorAll(".up");
        this.animationBottom = document.querySelectorAll(".bottom");
        this.lastAnimation = this.animationBottom;
        this.isMovingUp = false;
        this.isMovingBottom = false;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.speed = {x: 0,y: 0};
        this.maxSpeed = {x: 3,y: 3}
        this.moveAnimation = 0;
        this.animationTimer = 0;
    }

    draw(ctx) {
        if (this.isMovingUp) {
            this.lastAnimation = this.animationUp;
            ctx.drawImage(this.animationUp[Math.floor(this.moveAnimation / 8)],this.position.x,this.position.y);
        } else if (this.isMovingBottom) {
            this.lastAnimation = this.animationBottom;
            ctx.drawImage(this.animationBottom[Math.floor(this.moveAnimation / 8)],this.position.x,this.position.y);
        } else if (this.isMovingLeft) {
            this.lastAnimation = this.animationLeft;
            ctx.drawImage(this.animationLeft[Math.floor(this.moveAnimation / 8)],this.position.x,this.position.y);
        } else if (this.isMovingRight) {
            this.lastAnimation = this.animationRight;
            ctx.drawImage(this.animationRight[Math.floor(this.moveAnimation / 8)],this.position.x,this.position.y);
        } else {
            ctx.drawImage(this.lastAnimation[0],this.position.x,this.position.y);
        }
    }

    moveUp() {
        this.isMovingUp = true;
        this.isMovingBottom = false;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.speed.y = -this.maxSpeed.y;
        this.speed.x = 0;
    }

    moveDown() {
        this.isMovingUp = false;
        this.isMovingBottom = true;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.speed.y = this.maxSpeed.y;
        this.speed.x = 0;
    }

    moveLeft() {
        this.isMovingUp = false;
        this.isMovingBottom = false;
        this.isMovingLeft = true;
        this.isMovingRight = false;
        this.speed.x = -this.maxSpeed.x;
        this.speed.y = 0;
    }

    moveRight() {
        this.isMovingUp = false;
        this.isMovingBottom = false;
        this.isMovingLeft = false;
        this.isMovingRight = true;
        this.speed.x = this.maxSpeed.x;
        this.speed.y = 0;
    }

    stop() {
        this.isMovingUp = false;
        this.isMovingBottom = false;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.speed.x = 0;
        this.speed.y = 0;
    }

    update() {
        //movement and collision detection
        if (this.position.x + this.speed.x <= 0 || this.position.x + this.speed.x + this.width >= this.gamewidth) {
            return;
        } else {
            this.position.x += this.speed.x;
        }
        if (this.position.y + this.speed.y <= 0 || this.position.y + this.speed.y + this.height >= this.gameheight) {
            return;
        } else {
            this.position.y += this.speed.y;
        }
        //animation
        this.moveAnimation++;
        if (this.moveAnimation === 32) {
            this.moveAnimation = 0;
        }
    }
}