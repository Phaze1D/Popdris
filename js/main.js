

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

  var b = new Button();
  b.on('pointerdown', b.onPressed)
  b.on('pointerup', b.onReleased)

  var b1 = new Button();
  b1.on('pointerdown', b1.onPressed)
  b1.on('pointerup', b1.onReleased)
  b1.x = 200
  b1.y = 200



  mainStage.addChild(b)
  mainStage.addChild(b1)

  render()
}


function render() {
  renderer.render(mainStage);
  requestAnimationFrame(render)
}
