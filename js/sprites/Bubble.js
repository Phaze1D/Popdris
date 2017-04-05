var Bubble = function (color) {
  PIXI.Sprite.call(this, resources.bubbles.textures[color]);
  this.width = Bubble.DIAMETER
  this.height = Bubble.DIAMETER
  this.finalY = GAME_HEIGHT + Bubble.DIAMETER
  this.interactive = true;
  this.dragData = {dragging: false, x: 1, y: 2}
  this.moving = true

  this.on('pointerdown', this.onDragStart)
    .on('pointerup', this.onDragEnd)
    .on('pointerupoutside', this.onDragEnd)
}

Bubble.prototype = Object.create(PIXI.Sprite.prototype);
Bubble.prototype.constructor = Bubble

Bubble.prototype.fall = function () {
  if(this.y + this.velocity < this.finalY){
    this.y += this.velocity
    this.moving = true
  }else{
    this.y = this.finalY
    this.moving = false
  }
}

Bubble.prototype.onDragStart = function (event) {
  this.dragData.dragging = true
  var position = event.data.getLocalPosition(this.parent)
  this.dragData.x = position.x
  this.dragData.y = position.y
}


Bubble.prototype.onDragEnd = function (event) {
  if(this.dragData.dragging){
    var position = event.data.getLocalPosition(this.parent)
    this.dragData.dragging = false
    var direction = getDirection( angle(this.dragData, position) )
    this.onRequestDragEnd(this.row, this.column, direction);
  }
}


Bubble.switchAnimation = function (bub1, bub2, key) {

}



Bubble.COLORS = ['blue', 'green', 'grey', 'yellow', 'red', 'purple']
Bubble.DIAMETER = 32
Bubble.MARGIN = 2
