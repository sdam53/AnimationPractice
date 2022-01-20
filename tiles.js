class LightGreyBlock {
  constructor(game, x, y, w, h) {
    Object.assign(this, {game, x, y, w, h});
    this.spritesheet = ASSET_MANAGER.getAsset("./assets/tileset 1.png");
    this.BB = new BoundingBox(this.x - 31 * PARAMS.SCALE, this.y, this.w, this.h)//doesnt match each other? it goes to the left a bit
  }//40 * PARAMS.SCALE

  update() {
  }
  draw(ctx) {
    ctx.drawImage(this.spritesheet, 0, 0, 16, 16, this.x, this.y, this.w, this.h);
    if (PARAMS.DEBUG) {
      ctx.strokeStyle = 'Orange';
      ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
  }

}

class DarkGreyBlock {
  constructor(game, x, y, w, h) {
    Object.assign(this, {game, x, y, w, h});
    this.spritesheet = ASSET_MANAGER.getAsset("./assets/tileset 1.png");
    this.BB = new BoundingBox(this.x - 31 * PARAMS.SCALE, this.y, this.w, this.h)
  }

  update() {
  }
  draw(ctx) {
    ctx.drawImage(this.spritesheet, 16, 0, 16, 16, this.x, this.y, this.w, this.h);
    if (PARAMS.DEBUG) {
      ctx.strokeStyle = 'Orange';
      ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
  }

}
