var Bubble = function (color) {
  PIXI.Sprite.call(this, resources.bubbles.textures[color]);
  this.width = 32
  this.height = 32
}

Bubble.prototype = Object.create(PIXI.Sprite.prototype);
Bubble.prototype.constructor = Bubble

Bubble.prototype.fall = function () {
  this.y += this.velocity
}


Bubble.COLORS = ['blue', 'green', 'grey', 'yellow', 'red', 'purple']


// DONT NEED COLLISION DECTION JUST CHECK IF IT HAS REACHED ITS FINAL POSITION
