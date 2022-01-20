const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

//spritesheets
ASSET_MANAGER.queueDownload("./assets/playerleft.png");
ASSET_MANAGER.queueDownload("./assets/playerright.png");
ASSET_MANAGER.queueDownload("./assets/leftteleport.png");
ASSET_MANAGER.queueDownload("./assets/rightteleport.png");
ASSET_MANAGER.queueDownload("./assets/ui.png");
ASSET_MANAGER.queueDownload("./assets/Background_1.png");
ASSET_MANAGER.queueDownload("./assets/Background_0.png");
ASSET_MANAGER.queueDownload("./assets/tileset 1.png");

ASSET_MANAGER.queueDownload("./assets/test/player_front_death.png");
ASSET_MANAGER.queueDownload("./assets/test/player_front_idle.png");
ASSET_MANAGER.queueDownload("./assets/test/player_front_run.png");
ASSET_MANAGER.queueDownload("./assets/test/player_left_idle.png");
ASSET_MANAGER.queueDownload("./assets/test/player_left_run.png");
ASSET_MANAGER.queueDownload("./assets/test/player_right_idle.png");
ASSET_MANAGER.queueDownload("./assets/test/player_right_run.png");

//music
ASSET_MANAGER.queueDownload("./assets/alex-productions-epic-cinematic-gaming-cyberpunk-reset.mp3");

ASSET_MANAGER.downloadAll(() => {
	ASSET_MANAGER.autoRepeat("./assets/alex-productions-epic-cinematic-gaming-cyberpunk-reset.mp3");

	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});
