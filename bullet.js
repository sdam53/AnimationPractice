class Bullet {
  constructor(game, x, y, scale, radius, xTarget, yTarget, bulletSpeed, bulletType) {
    Object.assign(this, {game, x, y, scale, radius, xTarget, yTarget, bulletSpeed, bulletType});
    this.updateBB();
    this.distance = Math.floor(getDistance(this.xTarget, this.yTarget, this.x, this.y));
    //console.log(this.xTarget + " " + this.yTarget + " " + this.x + " " + this.y + " " + this.distance);
    this.xBulletDir = this.xTarget - this.x;
    this.yBulletDir = this.yTarget - this.y;

  }

  updateBB() {
    this.BB = new BoundingBox(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius);
  }

  draw(ctx) {
  //  ctx.fillRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    //ctx.strokeStyle = 'Blue';
    //ctx.strokeRect(this.x, this.y, this.width, this.height);
    //ctx.fillStyle  = '#73eff7'; //cyan from the sprite maybe add as a param
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    ctx.fillStyle = randomColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius , 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    if (PARAMS.DEBUG) {
      ctx.strokeStyle = 'Blue';
      ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
  }

  update() {
    this.radius += .01 * PARAMS.SCALE;
    //this.x += this.bulletSpeed * (this.xBulletDir / this.distance);
    //this.y += this.bulletSpeed * (this.yBulletDir / this.distance);
    this.updateBB();

  }

  destroy() {
      this.removeFromWorld = true;
  }
}
