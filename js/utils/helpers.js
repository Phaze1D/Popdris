function resize() {
  var container = document.getElementById('container');
  ratio = Math.min(container.clientWidth/GAME_WIDTH,  container.clientHeight/GAME_HEIGHT);
  APP.stage.scale.x = APP.stage.scale.y = ratio;
  APP.renderer.resize(Math.ceil(GAME_WIDTH * ratio), Math.ceil(GAME_HEIGHT * ratio));
}

window.addEventListener("resize", resize);


function distance(startPoint, endPoint) {
  var dx = endPoint.x - startPoint.x
  var dy = endPoint.y - startPoint.y
  return Math.sqrt( Math.pow(dx,2) + Math.pow(dy,2))
}

function angle(startPoint, endPoint) {
  var dx = endPoint.x - startPoint.x
  var dy = endPoint.y - startPoint.y
  var theta = Math.atan2(dy, dx)
  theta *= 180 / Math.PI
  if (theta < 0) theta = 360 + theta
  return theta;
}

function getDirection(angle) {
  if( (angle >= 315 && angle < 360) || (angle < 45 && angle >= 0) )
    return RIGHT

  if(angle >= 45 && angle < 135)
    return DOWN

  if(angle >= 135 && angle < 225)
    return LEFT
  return UP
}
