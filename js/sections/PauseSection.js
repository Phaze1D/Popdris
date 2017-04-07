var PauseSection = function () {
  Container.call(this)
  this.__initBorder()
}

PauseSection.prototype = Object.create(Container.prototype);
PauseSection.prototype.constructor = PauseSection

PauseSection.prototype.__initBorder = function () {
  var border = new Graphics
  border.lineStyle(2, 0x2979FF, 1);
  border.beginFill(0x2979FF, 0.1);
  border.drawRoundedRect(GamePlay.X, GamePlay.Y, GamePlay.WIDTH, GamePlay.HEIGHT, 5);
  border.endFill();
  this.addChild(border)
};

PauseSection.WIDTH = 300
PauseSection.HEIGHT = 300
