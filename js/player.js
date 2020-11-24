class Player {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.height = 35;
        this.width = 35;
    }

    draw() {
        context.fillStyle = "red";
        context.fillRect(this.x, this.y, this.width, this.height);
        context.strokeStyle = "white";
        context.lineWidth = 3;
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
}