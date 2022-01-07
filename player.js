class Player {
  constructor(game, x, y) {
    Object.assign(this, {game, x, y})
    this.game.player = this;
    this.leftSpriteSheet = ASSET_MANAGER.getAsset("./assets/playerleft.png");
    this.rightSpriteSheet = ASSET_MANAGER.getAsset("./assets/playerright.png");

    this.direction = 0; // 0 = right, 1 = left
    this.state = 0; // 0 = idle, 1 = running, 2 = attacking, 3= rolling, 4 = death
    this.rollSpeed = 5;

    this.health = 100;
    this.stamina = 100;

    this.animations = [];
    this.loadAnimations();
  }

  loadAnimations() {
    for (var i = 0; i < 1; i++) { // 1 sizes
      this.animations.push([]);
        for (var j = 0; j < 2; j++) { // 2 directions
          this.animations[i].push([]);
            for (var k = 0; k < 4; k++) { // 5 states
              this.animations[i][j].push([]);
            }
        }
    }

    //direction = 0, state = 0
    //right idle
    this.animations[0][0][0] = new Animator(this.rightSpriteSheet, 2601, 903, 51, 39, 22, .1, 333, false, true);

    //direction = 0, state = 1
    //right running
    this.animations[0][0][1] = new Animator(this.rightSpriteSheet, 29, 37, 37, 59, 1, .3, 63, false, true);

    //direction = 0, state = 2
    //right attacking
    this.animations[0][0][2] = new Animator(this.rightSpriteSheet, 29, 37, 37, 59, 1, .3, 63, false, true);

    //direction = 0, state = 3
    //right rolling
    this.animations[0][0][3] = new Animator(this.rightSpriteSheet, 29, 37, 37, 59, 1, .3, 63, false, true);


  }

  update() {

  }

  draw(ctx) {
    this.animations[0][0][0].drawFrame(this.game.clockTick, ctx,this.x,this.y, PARAMS.SCALE);
  }
}
