class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop, player) {
        Object.assign(this, { spritesheet, xStart, yStart, height, width, frameCount, frameDuration, framePadding, reverse, loop, player });

        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;
        this.frame = 1; //gives the frame of the current animations //will use this to update BB for attack animation
        this.flag = false;

    };

    drawFrame(tick, ctx, x, y, scale) {
        this.elapsedTime += tick;

        if (this.isDone()) {
            if (this.loop) {
                this.frame = 1; //means animation finished
                this.flag = false;
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        }
        //console.log(this.flag);

        this.frame = this.currentFrame();
        if (this.reverse) this.frame = this.frameCount - frame - 1;

        ctx.drawImage(this.spritesheet,
            this.xStart + this.frame * (this.width + this.framePadding), this.yStart, //source from sheet
            this.width, this.height,
            x, y,
            this.width * scale,
            this.height * scale);
            
        this.frame++;
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};
