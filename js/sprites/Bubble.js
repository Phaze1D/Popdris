var Bubble = function (color) {
  PIXI.Sprite.call(this, resources.bubbles.textures[color]);
  this.width = 32
  this.height = 32
}

Bubble.prototype = Object.create(PIXI.Sprite.prototype);
Bubble.prototype.constructor = Bubble
