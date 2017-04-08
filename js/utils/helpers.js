window.addEventListener("resize", resize);


/**
* Callback for when the window is reized
* Scales the app to fit the screen
* @callback {resize}
*/
function resize() {
  var container = document.getElementById('container');
  ratio = Math.min(container.clientWidth/GAME_WIDTH,  container.clientHeight/GAME_HEIGHT);
  APP.stage.scale.x = APP.stage.scale.y = ratio;
  APP.renderer.resize(Math.ceil(GAME_WIDTH * ratio), Math.ceil(GAME_HEIGHT * ratio));
}


/**
* Finds the distance between 2 points
* @param {object} startPoint - The starting point
* @param {object} endPoint - The ending point
* @return {number}
*/
function distance(startPoint, endPoint) {
  var dx = endPoint.x - startPoint.x;
  var dy = endPoint.y - startPoint.y;
  return Math.sqrt( Math.pow(dx,2) + Math.pow(dy,2));
}


/**
* Finds the angle between 2 points
* @param {object} startPoint - The starting point
* @param {object} endPoint - The ending point
* @return {number} - The angle in degrees
*/
function angle(startPoint, endPoint) {
  var dx = endPoint.x - startPoint.x;
  var dy = endPoint.y - startPoint.y;
  var theta = Math.atan2(dy, dx);
  theta *= 180 / Math.PI;
  if (theta < 0) theta = 360 + theta;
  return theta;
}


/**
* Finds the direction of a angle
* @param {number} angle - The angle in degrees
* @return {number} - The direction of the angle
*/
function getDirection(angle) {
  if( (angle >= 315 && angle < 360) || (angle < 45 && angle >= 0) )
    return RIGHT;

  if(angle >= 45 && angle < 135)
    return DOWN;

  if(angle >= 135 && angle < 225)
    return LEFT;

  return UP;
}
