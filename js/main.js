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

  var startScene = new StartScene(function () {}, function () {})
  APP.stage.addChild(startScene)
}
