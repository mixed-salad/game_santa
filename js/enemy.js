class Enemy {
    constructor (x, y, speed) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.speed = speed;
        this.hit = false;
        this.dead = false;
    }

    draw() {
        context.fillStyle = "grey"
        context.fillRect(this.x, this.y, this.width, this.height);
        context.strokeStyle = "black";
        context.strokeRect(this.x, this.y, this.width, this.height);
    }

    runLogic() {
        if(!this.hit && !this.dead){
            this.x -= this.speed;
        } else if (this.hit) {
            this.x -= 40;
            this.y -= 20;
        } else if (this.dead) {
            this.x -= 2;
            this.y += 20 + GRAVITY;
        }
    }
}