class StormHead {
  constructor(game, x, y) {
    Object.assign(this, {game, x, y})
    this.game.player = this;
    this.spriteSheet = ASSET_MANAGER.getAsset("./assets/StormHead.png");


    //this.direction = 0; // 0 = right, 1 = left
    this.state = 0; // 0 = idle, 1 = running, 2 = attacking, 3= damaged, 4 = death

    this.health = 10;

    this.attackDelay = 100;
    this.timer = this.attackDelay;

    this.attackFlag = false;//not used rn

    this.animations = [];
    this.loadAnimations();

  //  this.updateBB();
  }

  loadAnimations() {
    //idle
    this.animations[0] = new Animator(this.spriteSheet, 0, 0, 192,192,9,.2,0,false,true);
    //run
    this.animations[1] = new Animator(this.spriteSheet, 1728, 0, 192,192,10,.2,0,false,true);
    //attack
    this.animations[2] = new Animator(this.spriteSheet, 3648, 0, 192,192,21,.2,0,false,true);
    //damage
    this.animations[3] = new Animator(this.spriteSheet, 7680, 0, 192,192,7,.2,0,false,true);
    //death
    this.animations[4] = new Animator(this.spriteSheet, 9024, 0, 192,192,6,.2,0,false,true);
  }


  update() {

  }

  draw(ctx) {
    this.animations[0].drawFrame(this.game.clockTick, ctx,this.x, this.y, PARAMS.SCALE);
    this.animations[1].drawFrame(this.game.clockTick, ctx,this.x + 200, this.y, PARAMS.SCALE);
    this.animations[2].drawFrame(this.game.clockTick, ctx,this.x + 400, this.y, PARAMS.SCALE);
    this.animations[3].drawFrame(this.game.clockTick, ctx,this.x + 600, this.y, PARAMS.SCALE);
    this.animations[4].drawFrame(this.game.clockTick, ctx,this.x + 800, this.y, PARAMS.SCALE);

  }
}
