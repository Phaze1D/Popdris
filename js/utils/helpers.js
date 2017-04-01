function resize() {
  var container = document.getElementById('container');
  ratio = Math.min(container.clientWidth/GAME_WIDTH,  container.clientHeight/GAME_HEIGHT);
  APP.stage.scale.x = APP.stage.scale.y = ratio;
  APP.renderer.resize(Math.ceil(GAME_WIDTH * ratio), Math.ceil(GAME_HEIGHT * ratio));
}

window.addEventListener("resize", resize);
