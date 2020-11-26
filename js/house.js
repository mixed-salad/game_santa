class House {
    constructor (width, height) {
        this.x = canvasWidth;
        this.y =  canvasHeight - height;
        this.width = width;
        this.height = height;
        this.delivered = false;
    }

    draw () {
        context.fillStyle = "brown";
        if(this.delivered) {
            context.strokeStyle = "yellow";
        }else{
            context.strokeStyle = "darkblue";
        }
        context.fillRect(this.x, this.y, this.width, this.height);
        context.strokeRect(this.x, this.y, this.width, this.height)
    }
    runLogic () {
        this.x -= 2;
    }

}