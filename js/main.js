const APP = new PIXI.Application(GAME_WIDTH, GAME_HEIGHT, {
  antialiasing: true,
  transparent: true,
  resolution: window.devicePixelRatio,
  autoResize: true,
});

const M_LOADER = new MLoader(init)
M_LOADER.loadAssets()

function init() {
  document.getElementById('spinner').style.display = 'none'
  document.getElementById('container').appendChild(APP.view);
  resize();
  createStartScene();
}

function createPlayScene() {
  var startScene = APP.stage.removeChildAt(0)
  startScene.destroy({children: true})
}

function createStartScene() {
  var startScene = new StartScene(createPlayScene, createHelpScene)
  APP.stage.addChild(startScene)
}


function createHelpScene() {

}
