var GamePlay = function () {
  Container.call(this)

  this.__initMask()
  this.__initGenerator()
  this.__initBorder()
  this.bubbleGrid = new Array(this.bubbleGen.numOfColumns)
}

GamePlay.prototype = Object.create(Container.prototype);
GamePlay.prototype.constructor = GamePlay

GamePlay.prototype.__initBorder = function () {
  var border = new Graphics
  border.lineStyle(2, 0xff5722, 1);
  border.beginFill(0xff5722, 0.1);
  border.drawRoundedRect(GamePlay.X, GamePlay.Y, GamePlay.WIDTH, GamePlay.HEIGHT, 5);
  border.endFill();
  this.addChild(border)
}

GamePlay.prototype.__initMask = function () {
  var mask = new Graphics
  mask.beginFill(0xfff, 0.25);
  mask.drawRect(GamePlay.X - 2, GamePlay.Y - 2, GamePlay.WIDTH + 4, GamePlay.HEIGHT + 4);
  mask.endFill();
  this.mask = mask
  this.addChild(mask)
}


GamePlay.prototype.__initGenerator = function () {
  this.bubbleGen = new BubbleGenerator(GamePlay.BUBBLE_GENERATOR_FUNC, GamePlay.WIDTH, GamePlay.HEIGHT)
  this.bubbleGen.x = GamePlay.X
  this.bubbleGen.y = GamePlay.Y
  this.addChild(this.bubbleGen)
}



GamePlay.prototype.update = function () {
  var bub = this.bubbleGen.update()
  if(bub){
    this.bubbleGrid[bub.column] ? this.bubbleGrid[bub.column].push(bub) : this.bubbleGrid[bub.column] = [bub]
    bub.row = this.bubbleGrid[bub.column].length - 1
    var totalFit = (GamePlay.HEIGHT - Bubble.MARGIN) / (Bubble.DIAMETER + Bubble.MARGIN)
    var numBubbFit = Math.floor( totalFit )
    var extraMargin = ( (totalFit - numBubbFit) * Bubble.DIAMETER ) / (numBubbFit + 1)
    var totalBubbleDiameter = Bubble.DIAMETER + extraMargin + Bubble.MARGIN

    bub.finaly =  GamePlay.HEIGHT - ( totalBubbleDiameter * (bub.row) ) - totalBubbleDiameter
    bub.onRequestDragEnd = this.onRequestDragEnd.bind(this)

  }
}

GamePlay.prototype.onRequestDragEnd = function (row, column, direction) {
  if(direction == UP && row + 1 >= 0){
    this.switchBubbles({r: row, c: column}, {r: row+1, c: column}, direction, 'y')
  }

  if(direction == DOWN && row - 1 >= 0){
    this.switchBubbles({r: row, c: column}, {r: row-1, c: column}, direction, 'y')
  }

  if(direction == LEFT && column - 1 >= 0 && column - 1 < this.bubbleGen.numOfColumns){
    this.switchBubbles({r: row, c: column}, {r: row, c: column-1}, direction, 'x')
  }

  if(direction == RIGHT && column + 1 >= 0 && column + 1 < this.bubbleGen.numOfColumns){
    this.switchBubbles({r: row, c: column}, {r: row, c: column+1}, direction, 'x')
  }

}

GamePlay.prototype.switchBubbles = function (ind1, ind2, direction, key) {
  if(this.bubbleGrid[ind2.c] && this.bubbleGrid[ind2.c][ind2.r] &&
    !this.bubbleGrid[ind2.c][ind2.r].falling && !this.bubbleGrid[ind2.c][ind2.r].switching){
      
    var sideBub = this.bubbleGrid[ind2.c][ind2.r]
    var bub = this.bubbleGrid[ind1.c][ind1.r]
    this.bubbleGrid[ind2.c][ind2.r] = bub
    this.bubbleGrid[ind1.c][ind1.r] = sideBub
    bub.column = ind2.c
    bub.row = ind2.r
    sideBub.column = ind1.c
    sideBub.row = ind1.r
    bub['final' + key] = sideBub[key]
    sideBub['final' + key] = bub[key]
    bub.switching = true
    sideBub.switching = true
    bub.switchDirection = direction
    sideBub.switchDirection = direction * -1
  }
}


GamePlay.WIDTH = 380
GamePlay.HEIGHT = 650
GamePlay.X = 2
GamePlay.Y = GAME_HEIGHT - GamePlay.HEIGHT - 2

GamePlay.BUBBLE_GENERATOR_FUNC = function () {
  return {dropRate: 1/3, speed: 10}
}
