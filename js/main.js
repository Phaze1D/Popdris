/**
* @const
* @type {PIXI.Application}
*/
const APP = new PIXI.Application(GAME_WIDTH, GAME_HEIGHT, {
  antialiasing: true,
  transparent: true,
  resolution: window.devicePixelRatio,
  autoResize: true,
});


/**
* @const
* @type {MLoader}
*/
const M_LOADER = new MLoader(init);

M_LOADER.loadAssets(); // Load all the assets


/**
* Initializes the game
* Called when all assets are finished loading
* @callback
*/
function init() {
  document.getElementById('spinner').style.display = 'none';
  document.getElementById('container').appendChild(APP.view);
  resize();
  createStartScene();
}


/**
* Creates the start scene
* @callback
*/
function createStartScene() {
  if(APP.stage.children.length > 0){
    var playScene = APP.stage.removeChildAt(0);
    playScene.destroy({children: true});
  }
  var startScene = new StartScene(createPlayScene);
  startScene.startBackground();
  APP.stage.addChild(startScene);
}


/**
* Creates the Play Scene
* @callback
*/
function createPlayScene() {
  var startScene = APP.stage.removeChildAt(0);
  startScene.destroy({children: true});
  var playScene = new PlayScene(createStartScene);
  playScene.startGame();
  APP.stage.addChild(playScene);
}
