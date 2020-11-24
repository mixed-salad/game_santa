class Present {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.speedX = 5;
        this.speedY = -6;
    }

    draw() {
        context.fillStyle = "yellow";
        context.fillRect(this.x, this.y, this.width, this.height);
        context.strokeStyle = "green";
        context.strokeRect(this.x, this.y, this.width, this.height);
    }

    runLogic() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedX += .08;
        this.speedY += GRAVITY;
    }
}