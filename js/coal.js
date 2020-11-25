class Coal {
    constructor (x, y, strength) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.speedX = 20;
        this.speedY = -2;
        this.strength = strength;
    }

    draw() {
        context.fillStyle = "black";
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.strokeStyle = "white";
        context.stroke();
    }

    runLogic() {
        this.x += this.speedX * this.strength * 2;
        this.y += this.speedY;
        this.speedX += .08;
        this.speedY += GRAVITY;
    }
}