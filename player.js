class Player {
  constructor(game, x, y) {
    Object.assign(this, {game, x, y})
    this.game.player = this;
    this.leftSpriteSheet = ASSET_MANAGER.getAsset("./assets/playerleft.png");
    this.rightSpriteSheet = ASSET_MANAGER.getAsset("./assets/playerright.png");

    this.size = 0; // in case i want another size
    this.direction = 0; // 0 = right, 1 = left
    this.state = 0; // 0 = idle, 1 = running, 2 = attacking, 3= rolling, 4 = death
    this.rollSpeed = 5;

    this.health = 100;
    this.stamina = 100;
    this.speed = 1; //bigger is faster
    this.attackSpeed = .2 // smaller is faster

    this.attackFlag = false;//not used rn


    //for animations offsets should i create variables instead then update then or would it be better to use ifs like i am?
    this.animations = [];
    this.loadAnimations();

    this.updateBB();
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

    //RIGHT--------------------------------------------------------------------------------------------------------------------------------
    //direction = 0, state = 0
    //right idle
    this.animations[0][0][0] = new Animator(this.rightSpriteSheet, 2601, 903, 51, 39, 22, .3, 333, false, true);

    //direction = 0, state = 1
    //right running
    this.animations[0][0][1] = new Animator(this.rightSpriteSheet, 11055, 895, 51, 50, 8, .1, 333, false, true);

    //direction = 0, state = 2
    //right attacking
    //right now the final frame is short so maybe edit image and add more of that final frame
    this.animations[0][0][2] = new Animator(this.rightSpriteSheet, 14119, 889, 121, 58, 8, this.attackSpeed, 261 , false, true);

    //direction = 0, state = 3
    //right rolling
    this.animations[0][0][3] = new Animator(this.rightSpriteSheet, 29, 37, 37, 59, 1, .3, 63, false, true); //havent done yet

    //LEFT-----------------------------------------------------------------------------------------------------------------------------------
    //direction = 1, state = 0
    //left idle
    this.animations[0][1][0] = new Animator(this.rightSpriteSheet, 5785, 903, 51, 39, 22, .3, 333, true, true);

    //direction = 1, state = 1
    //left running
    this.animations[0][1][1] = new Animator(this.rightSpriteSheet, 11055, 895, 51, 50, 8, .2, 333, false, true);

    //direction = 1, state = 2
    //left attacking
    this.animations[0][1][2] = new Animator(this.rightSpriteSheet, 29, 37, 37, 59, 1, .3, 63, false, true);

    //direction = 1, state = 3
    //left rolling
    this.animations[0][1][3] = new Animator(this.rightSpriteSheet, 29, 37, 37, 59, 1, .3, 63, false, true); // havent done yet
  }

  updateBB() {
    //there are multiple ifs because of how animations feet arent sync
    this.lastBB = this.BB; //player BB
    if (this.game.right) { // doesnt cover head atm
      this.BB = new BoundingBox(this.x + 26 * PARAMS.SCALE, this.y , 16 * PARAMS.SCALE, 39 * PARAMS.SCALE);
    } else if (this.game.down || this.animations[this.size][this.direction][2].flag) { //placeholder for attack. right now the BB doesnt get the whole character duing certain frames
      this.BB = new BoundingBox(this.x + 39 * PARAMS.SCALE, this.y, 16 * PARAMS.SCALE, 39 * PARAMS.SCALE);
    } else { //when idle. i like to think the chatacter is in  a cloak so the BB doesnt covere the whole sprite
      this.BB = new BoundingBox(this.x + 32 * PARAMS.SCALE, this.y, 16 * PARAMS.SCALE, 39 * PARAMS.SCALE);
    }

    this.lastSwordBB = this.swordBB; //attack BB frame 8 has slightly more reach. part of the overhead attack is not in BB maybe make it wider.
                                     //right now if you press left or right when in animation, it will the BB will stay. maybe prevent them from being pressed
    if (this.animations[this.size][this.direction][2].frame >= 4) { // this and the bottom two is for right attacking
      this.swordBB = new BoundingBox(this.x + 55 * PARAMS.SCALE, this.y - 12 * PARAMS.SCALE, 28 * PARAMS.SCALE, 51 * PARAMS.SCALE);
    }
    if (this.animations[this.size][this.direction][2].frame == 7) {
      this.swordBB = new BoundingBox(this.x + 55 * PARAMS.SCALE, this.y - 12 * PARAMS.SCALE, 35 * PARAMS.SCALE, 51 * PARAMS.SCALE);
    }
    if (this.animations[this.size][this.direction][2].flag === false) {
      this.swordBB = null;
    }

  }

  update() {
    if (this.game.right) {
      this.direction = 0;
      this.state = 1;
      this.x += this.speed * PARAMS.SCALE;
    } else if (this.game.left) {
      this.direction = 1;
      this.state = 1;
      this.x -= this.speed * PARAMS.SCALE;
    } else if (this.game.down) { //attack rn
      this.animations[this.size][this.direction][this.state].flag = true;
      this.state = 2;
    //  this.y += this.speed * PARAMS.SCALE;;
    } else if (this.game.up) {
      this.state = 1;
      this.y -= this.speed * PARAMS.SCALE;;
    } else if (this.game.space) {
      this.state = 2;
    } else {
      this.state = 0;
    }
    this.updateBB();

  }


    //  this.animations[this.size][this.direction][this.state].drawFrame(this.game.clockTick, ctx,this.x + (-2 * PARAMS.SCALE),this.y + (-15 * PARAMS.SCALE), PARAMS.SCALE);


  draw(ctx) {
/*
    if (this.game.right || this.game.left) {
      this.animations[this.size][this.direction][this.state].drawFrame(this.game.clockTick, ctx,this.x,this.y + (-9 * PARAMS.SCALE), PARAMS.SCALE); // makes sure feet are sync with other animations. idle is base.
    } else if (this.game.down ) { //placeholder for space
          //for (let i = 1000; i > 0; i--) {
            //console.log("hi");
            //this.animations[this.size][this.direction][this.state].drawFrame(this.game.clockTick, ctx,this.x + (-2 * PARAMS.SCALE),this.y + (-15 * PARAMS.SCALE), PARAMS.SCALE);
            //var that = this;
          //  while (!this.animations[this.size][this.direction][this.state].doneAni()) {
              //console.log(this.animations[this.size][this.direction][this.state].doneAni());
              //this.animations[this.size][this.direction][this.state].reset();
          //  }
            //console.log(this.animations[this.size][this.direction][this.state].doneAni());
          //}
        //while (!this.animations[this.size][this.direction][this.state].isDone()) {
        //  this.animations[this.size][this.direction][this.state].drawFrame(this.game.clockTick, ctx,this.x + (-2 * PARAMS.SCALE),this.y + (-15 * PARAMS.SCALE), PARAMS.SCALE);
        //}

    } else {
      this.animations[this.size][this.direction][this.state].drawFrame(this.game.clockTick, ctx,this.x,this.y, PARAMS.SCALE);
    }
*/
    if (this.game.right || this.game.left) {
      this.animations[this.size][this.direction][this.state].drawFrame(this.game.clockTick, ctx,this.x,this.y + (-9 * PARAMS.SCALE), PARAMS.SCALE); // makes sure feet are sync with other animations. idle is base.
    } else if ((this.animations[this.size][this.direction][2].flag)) { //this actually lets the animation finish
      this.animations[this.size][this.direction][2].drawFrame(this.game.clockTick, ctx,this.x + (-2 * PARAMS.SCALE),this.y + (-15 * PARAMS.SCALE), PARAMS.SCALE, this);
      //console.log(this.animations[this.size][this.direction][2].flag);
    } else {
      this.animations[this.size][this.direction][this.state].drawFrame(this.game.clockTick, ctx,this.x,this.y, PARAMS.SCALE);

    }
    //ctx.strokeStyle = 'Blue';
  //  ctx.strokeRect(0, 89, 500, this.BB.height);
    //this.animations[0][0][1].drawFrame(this.game.clockTick, ctx,this.x +60,this.y - 90, PARAMS.SCALE);
    if (true) { //params.debug
      ctx.strokeStyle = 'Blue'; //play BB
      ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);

      if (this.swordBB != null) {
        console.log("hi");
        ctx.strokeStyle = 'Red'; //sword BB
        ctx.strokeRect(this.swordBB.x, this.swordBB.y, this.swordBB.width, this.swordBB.height);
      }
    }
  }
}
