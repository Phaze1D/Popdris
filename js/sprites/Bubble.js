var Bubble = function (color) {
  PIXI.Sprite.call(this, resources.bubbles.textures[color]);
  this.color = color
  this.width = Bubble.DIAMETER
  this.height = Bubble.DIAMETER
  this.finaly = GAME_HEIGHT + Bubble.DIAMETER
  this.finalx = 0
  this.interactive = true;
  this.dragData = {dragging: false, x: 1, y: 2}
  this.falling = true
  this.velocity = null
  this.switchDirection = null
  this.switching = false

  this.on('pointerdown', this.onDragStart)
    .on('pointerup', this.onDragEnd)
    .on('pointerupoutside', this.onDragEnd)
}

Bubble.prototype = Object.create(PIXI.Sprite.prototype);
Bubble.prototype.constructor = Bubble

Bubble.prototype.fall = function () {
  if(this.y + this.velocity < this.finaly){
    this.y += this.velocity
    this.falling = true
  }else{
    this.velocity = 4
    this.y = this.finaly
    this.falling = false
  }
}

Bubble.prototype.switch = function () {

  switch (this.switchDirection) {
    case UP:
      this.y = (this.y > this.finaly ? this.y - this.velocity : this.finaly)
      this.switching = (this.y != this.finaly)
      break;

    case DOWN:
      this.y = (this.y < this.finaly ? this.y + this.velocity : this.finaly)
      this.switching = (this.y != this.finaly)
      break;

    case LEFT:
      this.x = (this.x > this.finalx ? this.x - this.velocity : this.finalx)
      this.switching = (this.x != this.finalx)
      break;

    case RIGHT:
      this.x = (this.x < this.finalx ? this.x + this.velocity : this.finalx)
      this.switching = (this.x != this.finalx)
      break;

  }
}

Bubble.prototype.onDragStart = function (event) {
  if(!this.switching){
    this.dragData.dragging = true
    var position = event.data.getLocalPosition(this.parent)
    this.dragData.x = position.x
    this.dragData.y = position.y
  }
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
