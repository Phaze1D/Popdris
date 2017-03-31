var Button = function () {
  PIXI.Sprite.call(this, resources.ui.textures['button_raised']);
  this.height = 64
  this.width= 256
}
Button.prototype = Object.create(PIXI.Sprite.prototype);
Button.prototype.constructor = Button
