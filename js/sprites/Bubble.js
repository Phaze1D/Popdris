var Bubble = function (color) {
  PIXI.Sprite.call(this, resources.bubbles.textures[color]);
  this.width = 36
  this.height = 36
}

Bubble.prototype = Object.create(PIXI.Sprite.prototype);
Bubble.prototype.constructor = Bubble

Bubble.prototype.fall = function (velocity) {
  APP.ticker.add(function () {
    this.y += velocity
  }.bind(this))

}


Bubble.COLORS = ['blue', 'green', 'grey', 'yellow', 'red', 'purple']
