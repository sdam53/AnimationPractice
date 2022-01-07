// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Context dimensions
        this.surfaceWidth = null;
        this.surfaceHeight = null;

        // Everything that will be updated and drawn each frame
        this.entities = {
          player: null,
          enemies: []
        }
        // Entities to be added at the end of each update
        this.entitiesToAdd = [];

        // Information on the input
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.space = false;
        this.click = false;

        // THE KILL SWITCH
        this.running = false;

        // Options and the Details
        this.options = options || {
            prevent: {
                contextMenu: true,
                scrolling: true,
            },
            debugging: false,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            if (this.running) {
                requestAnimFrame(gameLoop, this.ctx.canvas);
            }
        };
        gameLoop();
    };

    startInput() {
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });

        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
        });


        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            if (this.options.prevent.contextMenu) {
                e.preventDefault(); // Prevent Context Menu
            }
            this.rightclick = getXandY(e);
        });

        this.ctx.canvas.addEventListener("keydown", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            switch (e.code) {
              case "ArrowLeft":
              case "KeyA":
                that.left = true;
                break;
              case "ArrowRight":
              case "KeyD":
                that.right = true;
                break;
              case "ArrowUp":
              case "KeyW":
                that.up = true;
                break;
              case "ArrowDown":
              case "KeyS":
                that.down = true;
                break;
              case "Space":
                that.space = true;
                break;
              }
        }, false);
        this.ctx.canvas.addEventListener("keyup", function (e) {
              console.log(e);
              switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                  that.left = false;
                  break;
                case "ArrowRight":
                case "KeyD":
                  that.right = false;
                  break;
                case "ArrowUp":
                case "KeyW":
                  that.up = false;
                  break;
                case "ArrowDown":
                case "KeyS":
                  that.down = false;
                  break;
                case "Space":
                  that.space = false;
                  break;
              }
          }, false);
    };

    addEntity(entity) {
        this.entitiesToAdd.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Draw latest things first
        for (let i = this.entities.enemies.length - 1; i >= 0; i--) { //draws enemies
            this.entities.enemies[i].draw(this.ctx, this);
        }
        this.entities.player.draw(this.ctx, this); //draw player
        this.camera.draw(this.ctx); //draws scene manager
    };

    update() {
        // Update Entities
        this.entities.enemies.forEach(entity => entity.enemies.update(this)); //update ememies

        // Remove dead things
        this.entities.enemies = this.entities.enemies.filter(entity => !entity.removeFromWorld);

        // Add new things
        this.entities.enemies = this.entities.enemies.concat(this.entitiesToAdd); //prob change to add different stuff
        this.entitiesToAdd = [];


        this.entities.player.update(); //updates player
        this.camera.update(); //updates scene manager
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

    get["deltaTime"]() { return this.clockTick; }
};

// KV Le was here :)
