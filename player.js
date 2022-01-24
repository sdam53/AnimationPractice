class Player {
  constructor(game, x, y) {
    Object.assign(this, {game, x, y})
    this.game.player = this;
    this.leftSpriteSheet = ASSET_MANAGER.getAsset("./assets/playerleft.png");
    this.rightSpriteSheet = ASSET_MANAGER.getAsset("./assets/playerright.png");
    this.rightTeleportSpriteSheet = ASSET_MANAGER.getAsset("./assets/rightteleport.png");
    this.leftTeleportSpriteSheet = ASSET_MANAGER.getAsset("./assets/leftteleport.png");

    this.frontDeathSheet = ASSET_MANAGER.getAsset("./assets/test/player_front_death.png");
    this.frontRunSheet = ASSET_MANAGER.getAsset("./assets/test/player_front_run.png");
    this.frontIdleSheet = ASSET_MANAGER.getAsset("./assets/test/player_front_idle.png");
    this.leftIdleSheet = ASSET_MANAGER.getAsset("./assets/test/player_left_idle.png");
    this.leftRunSheet = ASSET_MANAGER.getAsset("./assets/test/player_left_run.png");
    this.rightIdleSheet = ASSET_MANAGER.getAsset("./assets/test/player_right_idle.png");
    this.rightRunSheet = ASSET_MANAGER.getAsset("./assets/test/player_right_run.png");






    this.size = 0; // in case i want another size
    this.direction = 0; // 0 = right, 1 = left
    this.state = 0; // 0 = idle, 1 = running, 2 = attacking, 3= rolling, 4 = death
    this.rollSpeed = 5;

    this.health = 10;
    this.stamina = 3;
    this.speed = 2; //bigger is faster
    this.attackSpeed = .05 // smaller is faster
    this.attackDmg = 10; // how much damage player does

    this.attackDelay = 100;
    this.timer = this.attackDelay;

    this.attackFlag = false;//not used rn

    this.rollSpeed = 1;

    this.jumpSpeed = this.game.blockSize;
    this.jump = false;
    this.fall = true;

    this.canGetHurt = true;


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
    //if i add the begining part to the end it would look cool
    this.animations[0][0][2] = new Animator(this.rightSpriteSheet, 14119, 889, 121, 56, 8, this.attackSpeed, 261 , false, true);

    //direction = 0, state = 3
    //right rolling
    this.animations[0][0][3] = new Animator(this.rightTeleportSpriteSheet, 0, 70, 336, 88, 24, .04, 0, false, true);

    //LEFT-----------------------------------------------------------------------------------------------------------------------------------
    //direction = 1, state = 0
    //left idle
    this.animations[0][1][0] = new Animator(this.leftSpriteSheet, 5785, 903, 53, 39, 22, .3, 331, false, true);

    //direction = 1, state = 1
    //left running
    this.animations[0][1][1] = new Animator(this.leftSpriteSheet, 2710, 895, 51, 50, 8, .1, 333, false, true);

    //direction = 1, state = 2
    //left attacking
    this.animations[0][1][2] = new Animator(this.leftSpriteSheet, 1, 889, 121, 56, 8, this.attackSpeed, 261 , true, true);

    //direction = 1, state = 3
    //left rolling
    this.animations[0][1][3] = new Animator(this.leftTeleportSpriteSheet, 0, 70, 336, 88, 24, .04, 0, false, true);
  }

  updateBB() {
    //there are multiple ifs because of how animations feet arent sync
    this.lastBB = this.BB; //player BB
    if (this.game.shift && this.animations[this.size][0][2].flag) { //right attack
      this.BB = new BoundingBox(this.x + 39 * PARAMS.SCALE, this.y, 16 * PARAMS.SCALE, 39 * PARAMS.SCALE);
    } else if (this.game.shift && this.animations[this.size][1][2].flag) { //left attack
      this.BB = new BoundingBox(this.x + 25 * PARAMS.SCALE, this.y, 16 * PARAMS.SCALE, 39 * PARAMS.SCALE);
    } else { //when idle/right/left. i like to think the chatacter is in  a cloak so the BB doesnt covere the whole sprite
      this.BB = new BoundingBox(this.x + 32 * PARAMS.SCALE, this.y, 16 * PARAMS.SCALE, 39 * PARAMS.SCALE);
    }

    this.lastSwordBB = this.swordBB;
    //attack BB frame 7 has slightly more reach. part of the overhead attack is not in BB maybe make it wider.
    //right now if you press left or right when in animation, it will the BB will stay. maybe prevent them from being pressed
    // this and the bottom right attacking
    if (this.animations[this.size][0][2].flag) {
      if (this.animations[this.size][0][2].frame >= 3) {
        this.swordBB = new BoundingBox(this.x + 55 * PARAMS.SCALE, this.y - 12 * PARAMS.SCALE, 28 * PARAMS.SCALE, 51 * PARAMS.SCALE);
      }
      if (this.animations[this.size][0][2].frame == 7) {
        this.swordBB = new BoundingBox(this.x + 55 * PARAMS.SCALE, this.y - 12 * PARAMS.SCALE, 37 * PARAMS.SCALE, 51 * PARAMS.SCALE);
      }
    }
    // this and the bottom is for left attacking
    if (this.animations[this.size][1][2].flag) {
      if (this.animations[this.size][1][2].frame <= 4) {
        this.swordBB = new BoundingBox(this.x - 3 * PARAMS.SCALE, this.y - 12 * PARAMS.SCALE, 28 * PARAMS.SCALE, 51 * PARAMS.SCALE);
      }
      if (this.animations[this.size][1][2].frame == 0) {
        this.swordBB = new BoundingBox(this.x - 10 * PARAMS.SCALE, this.y - 12 * PARAMS.SCALE, 35 * PARAMS.SCALE, 51 * PARAMS.SCALE);
      }
    }
    // removes the attackBB when not attacking
    if (!this.animations[this.size][this.direction][2].flag) {
      this.swordBB = null;
    }

  }

  update() {
    const TICK = this.game.timer.tick();
    let collideCount = 0;
    var that = this;
    this.canGetHurt = false; //I-Frames when rolling
    if (this.animations[this.size][0][3].frame >= 6 && this.animations[this.size][0][3].frame <= 19) {
      this.x += this.rollSpeed * PARAMS.SCALE; // need to do checks BB collision
    } else if (this.animations[this.size][1][3].frame >= 6 && this.animations[this.size][1][3].frame <= 19) {
      this.x -= this.rollSpeed * PARAMS.SCALE;
    } else { //makes sure that whn you roll you can only roll
      this.canGetHurt = true; //No I-frames when not rolling


      //should figure out how to check a collision with the one im touching first then decide whether im allowed to move
      //maybe calculate the bb for the move then check it if theres at least one collide then dont move
      if (this.game.right) {
        this.direction = 0;
        this.state = 1;
        if (this.checkMapCollision(this.x + this.speed * PARAMS.SCALE, this.y, 16 * PARAMS.SCALE, 39 * PARAMS.SCALE)) {
        //  if (this.x <=  * PARAMS.SCALE) { //need to get the map then row size * scale + some offset
            this.x += this.speed * PARAMS.SCALE;
        //  }
        }
      } else if (this.game.left) {
        this.direction = 1;
        this.state = 1;
        if (this.checkMapCollision(this.x - this.speed * PARAMS.SCALE, this.y, 16 * PARAMS.SCALE, 39 * PARAMS.SCALE)) {
          if (this.x >= -30 * PARAMS.SCALE) { //dont let him go to the left off map
            this.x -= this.speed * PARAMS.SCALE;
          }
        }
      }
      if (this.game.down) {
        this.state = 1;
        if (this.checkMapCollision(this.x, this.y + this.speed * PARAMS.SCALE, 16 * PARAMS.SCALE, 39 * PARAMS.SCALE)) {
          this.y += this.speed * PARAMS.SCALE;
        }
      }

      //jumping
      //needs alot of work
      //can just hold space and fly up in the air
      //velocity and acceleration stuff need to be added too.
      if (this.game.space) {
        if (!this.jump) {
          this.jump = true;
          this.fall = false;
        }
      }
      if (this.jump) {
        if (this.checkMapCollision(this.x, this.y - 7, 16 * PARAMS.SCALE, 39 * PARAMS.SCALE)) {
          this.y -= 7;
        }
        this.jump = false;
        this.fall = true;
      } else if (this.fall) {
        if (this.checkMapCollision(this.x, this.y + 7, 16 * PARAMS.SCALE, 39 * PARAMS.SCALE)) {
          this.y += 7;
        } else {
        }
      }
    //  console.log(this.jump , this.fall);
      //prevent jump mid air maybe by doing the flag variable stuff





    //  if (this.game.up) {
      //  this.state = 1;
      //  if (this.checkMapCollision(this.x, this.y - this.speed * PARAMS.SCALE, 16 * PARAMS.SCALE, 39 * PARAMS.SCALE)) {
        //  this.y -= this.speed * PARAMS.SCALE;
        //}
    //  }
      if (this.game.click) {
          this.animations[this.size][this.direction][this.state].flag = true; //used to make sure animation completes
          this.state = 2;
          ASSET_MANAGER.playAsset("./assets/alex-productions-epic-cinematic-gaming-cyberpunk-reset.mp3");

      }
      if (this.game.shift) {
          this.animations[this.size][this.direction][this.state].flag = true;
          this.state = 3;
      }
      if (!(this.game.right || this.game.left || this.game.up || this.game.down || this.game.space || this.game.shift || this.game.click)) {
        this.state = 0;
      }
    }

    //actually since update gets called all the time, cant i just do this.animation.isDone();
    //console.log(this.animations[this.size][this.direction][this.state].isDone());
    //prob can


    // enemey collision
     that = this;
      this.game.entities.enemies.forEach((enemy, i) => {
        if (that.canGetHurt) {
          if (enemy.BB && that.BB.collide(enemy.BB)) {
            this.health--;
            enemy.destroy();
            this.game.entitiesToAdd.push(new Bullet(this.game, getRandomInteger(0, 1850), getRandomInteger(300, 800),PARAMS.SCALE, 5 * PARAMS.SCALE,2,2,5,1));
            if (getRandomInteger(0, 1850) % 2 == 0 && getRandomInteger(0, 1850) < 1100) {
              this.game.entitiesToAdd.push(new Bullet(this.game, getRandomInteger(0, 1850), getRandomInteger(300, 800),PARAMS.SCALE, 5 * PARAMS.SCALE,2,2,5,1));
            }
          }
        } else { //rolling give I-frames

        }
        //sword collision
        if (that.swordBB) {
          if (enemy.BB && that.swordBB.collide(enemy.BB)) {
            enemy.destroy();
            this.game.entitiesToAdd.push(new Bullet(this.game, getRandomInteger(0, 1850), getRandomInteger(300, 800 - 120),PARAMS.SCALE, 5 * PARAMS.SCALE,2,2,5,1));
            if (getRandomInteger(0, 1850) % 2 == 0 && getRandomInteger(0, 1850) < 500) {
              this.game.entitiesToAdd.push(new Bullet(this.game, getRandomInteger(0, 1850), getRandomInteger(300, 800 - 120),PARAMS.SCALE, 5 * PARAMS.SCALE,2,2,5,1));
            }
            this.game.camera.hitCount++;
            //  this.health--;
            this.stamina--;
          }
        }
    });
    //tile collision



    this.updateBB();
  }

  checkMapCollision(x, y, w, h) {
    let collisionCount = 0;
    let tempBB = new BoundingBox(x, y, w, h);
    this.game.entities.tiles.forEach((tiles, i) => {
      if (tiles.BB.collide(tempBB)) {
        collisionCount++;
      }
    });
    //console.log(collisionCount === 0);
    return (collisionCount === 0); //false = collide true = no collide
  }


  draw(ctx) {

    //feet arent synced so they are if statements. right idle is base. Checks for roll go first since when you roll you can only roll
    if (this.animations[this.size][0][3].flag) { //right roll
      this.animations[this.size][0][3].drawFrame(this.game.clockTick, ctx,this.x + (-71 * PARAMS.SCALE), this.y + (-49 * PARAMS.SCALE), PARAMS.SCALE);
    } else if (this.animations[this.size][1][3].flag) { //left roll
        this.animations[this.size][1][3].drawFrame(this.game.clockTick, ctx,this.x + (-185 * PARAMS.SCALE), this.y + (-49 * PARAMS.SCALE), PARAMS.SCALE);
    } else if (this.game.right) { //right run
      this.animations[this.size][this.direction][this.state].drawFrame(this.game.clockTick, ctx,this.x + (6 * PARAMS.SCALE),this.y + (-9 * PARAMS.SCALE), PARAMS.SCALE);
    } else if (this.game.left) { //left run
      this.animations[this.size][this.direction][this.state].drawFrame(this.game.clockTick, ctx,this.x + (23 * PARAMS.SCALE),this.y + (-9 * PARAMS.SCALE), PARAMS.SCALE); //left run
    } else if ((this.animations[this.size][0][2].flag)) { //right attack. this actually lets the animation finish
      this.animations[this.size][0][2].drawFrame(this.game.clockTick, ctx,this.x + (-1 * PARAMS.SCALE),this.y + (-15 * PARAMS.SCALE), PARAMS.SCALE);
    } else if ((this.animations[this.size][1][2].flag)) { //left attack
      this.animations[this.size][1][2].drawFrame(this.game.clockTick, ctx,this.x + (-13 * PARAMS.SCALE),this.y + (-15 * PARAMS.SCALE), PARAMS.SCALE);
    } else if (this.animations[this.size][0][3].flag) { //right roll
      this.animations[this.size][0][3].drawFrame(this.game.clockTick, ctx,this.x + (-71 * PARAMS.SCALE), this.y + (-49 * PARAMS.SCALE), PARAMS.SCALE);
    } else if (this.direction === 1) {//left idle
      this.animations[this.size][this.direction][this.state].drawFrame(this.game.clockTick, ctx,this.x + (26 * PARAMS.SCALE),this.y, PARAMS.SCALE);
    } else {//right idle
      this.animations[this.size][this.direction][this.state].drawFrame(this.game.clockTick, ctx,this.x, this.y, PARAMS.SCALE);
    }









    if (PARAMS.DEBUG) { //params.debug
      ctx.strokeStyle = 'Blue'; //play BB
      ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
      if (this.swordBB != null) { //sword BB
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.swordBB.x, this.swordBB.y, this.swordBB.width, this.swordBB.height);
      }
      console.log("Player State: [" + this.size + "][" + this.direction + "][" + this.state + "]"); // player state
    }
  }
}
