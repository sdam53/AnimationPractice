class SceneManager {
  constructor(game) {
    this.game = game;
    this.game.camera = this;
    this.player = new Player(this.game, 0, 0);
    this.game.entities.player = this.player;
  }


  update() {

  }

  draw() {

  }
}
