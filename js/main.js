

var renderOptions = {
  antialiasing: false,
  transparent: true,
  resolution: window.devicePixelRatio,
  autoResize: true,
}

var renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT, renderOptions);
var mainStage = new PIXI.Container();

function init() {
  document.getElementById('container').appendChild(renderer.view);
  resize();
  mainStage.addChild(new Button())
  renderer.render(mainStage);
}
