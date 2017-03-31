function resize() {
  var container = document.getElementById('container');
  ratio = Math.min(container.clientWidth/GAME_WIDTH,  container.clientHeight/GAME_HEIGHT);
  mainStage.scale.x = mainStage.scale.y = ratio;
  renderer.resize(Math.ceil(GAME_WIDTH * ratio), Math.ceil(GAME_HEIGHT * ratio));
}

window.addEventListener("resize", resize);
