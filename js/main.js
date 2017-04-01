

var renderOptions = {
  antialiasing: true,
  transparent: true,
  resolution: window.devicePixelRatio,
  autoResize: true,
}

const APP = new PIXI.Application(GAME_WIDTH, GAME_HEIGHT, renderOptions);

function init() {
  document.getElementById('container').appendChild(APP.view);
  resize();

  var startScene = new StartScene(function () {}, function () {})
  APP.stage.addChild(startScene)
}
