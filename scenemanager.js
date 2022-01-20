class SceneManager {
  constructor(game) {
    this.game = game;
    this.game.camera = this;
    this.spritesheet = ASSET_MANAGER.getAsset("./assets/ui.png");
    this.player = new Player(this.game, 300,180);
    this.game.entities.player = this.player;


    this.playerStats = {
      stamina: [],
      healthBar: []
    }

    this.hitCount = 0;

    this.loadUIAssets();



    //this.bullet = new Bullet(this.game, 2,2,PARAMS.SCALE, 2,2,5,1);
    //this.game.entitiesToAdd.push(new Bullet(this.game, 100 * PARAMS.SCALE, 75 * PARAMS.SCALE,PARAMS.SCALE, 5 * PARAMS.SCALE,2,2,5,1));


    //for (let i = 0; i < MAPONE.MAP.length; i++) {
    //  for (let j = 0; j < MAPONE.MAP[0].length;j++) {
  //      console.log(MAPONE.MAP[i][j]);

    //  }
  //  }

    this.loadLevel();
  }

  loadLevel() {
    let x = 0;
    let y = 0;
    for (let i = 0; i < MAPONE.MAP.length; i++) {
      for (let j = 0; j < MAPONE.MAP[0].length; j++) {
        if (MAPONE.MAP[i][j] === 1) {
          this.game.addTiles(new LightGreyBlock(this.game, x, y, this.game.blockSize * PARAMS.SCALE, this.game.blockSize * PARAMS.SCALE));
        } else if (MAPONE.MAP[i][j] === 2) {
          this.game.addTiles(new DarkGreyBlock(this.game, x, y, this.game.blockSize * PARAMS.SCALE, this.game.blockSize * PARAMS.SCALE));
        }
        console.log("(" + x + ", " + y + ")");
        x += this.game.blockSize * PARAMS.SCALE;
      }
    //  console.log("y" + y);
      x = 0;
      y += this.game.blockSize * PARAMS.SCALE;
    }
  };


  loadUIAssets() {
    let pad = 96;
    let start = 969
    for (let i = 9; i >= 0; i--) {
      this.playerStats.healthBar[i] = new Animator(this.spritesheet, start, 36, 78, 20, 1, 1, 0, false, true);
      start -= pad;
    }
    pad = 96;
    start = 300
    for (let i = 3; i >= 0; i--) {
      this.playerStats.stamina[i] = new Animator(this.spritesheet, start, 132, 68, 20, 1, 1, 0, false, true);
      start -= pad;
    }
  }

  updateAudio()  {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);
    };

  update() {

    this.updateAudio();

    if (this.player.stamina < 0) {
      this.player.stamina = 3;
    }
    if (this.player.health <= 0) {
      this.player.health = 10;
    }
  }

  draw(ctx) {
    //this.playerStats.healthBar[this.player.health - 1].drawFrame(this.game.clockTick, ctx, 0 * PARAMS.SCALE ,0 * PARAMS.SCALE, PARAMS.SCALE);
  //  this.playerStats.stamina[this.player.stamina].drawFrame(this.game.clockTick, ctx, 85 * PARAMS.SCALE ,0 * PARAMS.SCALE, PARAMS.SCALE);
    ctx.font = '100px serif';
    ctx.fillText(this.hitCount, document.documentElement.clientWidth - 200* PARAMS.SCALE, 70);

  }
}
