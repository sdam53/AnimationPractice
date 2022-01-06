class Player {
  constructor(game, x, y) {
    Object.assign(this, {game, x, y})
    this.game.player = this;
    this.leftSpriteSheet = ASSET_MANAGER.getAsset("./assets/playerleft.png");
    this.rightSpriteSheet = ASSET_MANAGER.getAsset("./assets/playerright.png");



  }

  update() {

  }

  draw(ctx) {
    
  }
}
