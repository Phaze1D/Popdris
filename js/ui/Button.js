var Button = function (label) {
  PIXI.Sprite.call(this, resources.ui.textures['button_raised']);
  this.height = 64
  this.width= 256
  this.interactive = true;
  this.buttonMode = true;
}

Button.prototype = Object.create(PIXI.Sprite.prototype);
Button.prototype.constructor = Button

Button.prototype.onPressed = function () {
  this.texture = resources.ui.textures['button_flat']
}

Button.prototype.onReleased = function () {
  this.texture = resources.ui.textures['button_raised']
}
