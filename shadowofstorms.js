class ShadowOfStorms {
  constructor(game, x, y) {
    Object.assign(this, {game, x, y})
    this.game.player = this;
    this.spriteSheet = ASSET_MANAGER.getAsset("./assets/shadow_of_storms.png");


    //this.direction = 0; // 0 = right, 1 = left
    this.state = 0; // 0=shoot gun, 1=walk with gun, 2=attack1, 3=attack2, 4=heal, 5=damage, 6=dath

    this.health = 10;

    this.attackDelay = 100;
    this.timer = this.attackDelay;

    this.attackFlag = false;//not used rn

    this.animations = [];
    this.loadAnimations();

  //  this.updateBB();
  }

  loadAnimations() {
    //shootgun
    this.animations[0] = new Animator(this.spriteSheet, 0, 0, 136,90,12,.2,0,false,true);
    //wwalk with gun
    this.animations[1] = new Animator(this.spriteSheet, 1632, 0, 136,90,6,.2,0,false,true);
    //attack1
    this.animations[2] = new Animator(this.spriteSheet, 2448, 0, 136,90,22,.2,0,false,true);
    //attack2
    this.animations[3] = new Animator(this.spriteSheet, 5440, 0, 136,90,10,.2,0,false,true);
    //heal
    this.animations[4] = new Animator(this.spriteSheet, 6800, 0, 136,90,8,.2,0,false,true);
    //damage
    this.animations[5] = new Animator(this.spriteSheet, 7888, 0, 136,90,2,.2,0,false,true);
    //death
    this.animations[6] = new Animator(this.spriteSheet, 8160, 0, 136,90,7,.2,0,false,true);
  }


  update() {

  }

  draw(ctx) {
    this.animations[0].drawFrame(this.game.clockTick, ctx,this.x, this.y, PARAMS.SCALE);
    this.animations[1].drawFrame(this.game.clockTick, ctx,this.x + 200, this.y, PARAMS.SCALE);
    this.animations[2].drawFrame(this.game.clockTick, ctx,this.x + 400, this.y, PARAMS.SCALE);
    this.animations[3].drawFrame(this.game.clockTick, ctx,this.x + 600, this.y, PARAMS.SCALE);
    this.animations[4].drawFrame(this.game.clockTick, ctx,this.x + 800, this.y, PARAMS.SCALE);
    this.animations[5].drawFrame(this.game.clockTick, ctx,this.x + 1000, this.y, PARAMS.SCALE);
    this.animations[6].drawFrame(this.game.clockTick, ctx,this.x + 1200, this.y, PARAMS.SCALE);


  }
}
