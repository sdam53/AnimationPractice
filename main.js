const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

//spritesheets
ASSET_MANAGER.queueDownload("./assets/playerleft.png");
ASSET_MANAGER.queueDownload("./assets/playerright.png");
ASSET_MANAGER.queueDownload("./assets/ui.png");


ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});
