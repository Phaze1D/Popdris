var GamePlay = function () {
  Container.call(this)

  this.__initMask()
  this.__initGenerator()
  this.__initBorder()
  this.bubbleGrid = new Array(this.spawner.numOfColumns)
  this.checkingPop = false
  this.onUpdateScore = null
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
  this.spawner = new BubbleSpawner(GamePlay.difficultyEquation, GamePlay.WIDTH, GamePlay.HEIGHT)
  this.spawner.x = GamePlay.X
  this.spawner.y = GamePlay.Y
  this.addChild(this.spawner)
}


GamePlay.prototype.update = function () {
  var bub = this.spawner.update(this.checkingPop)
  if(bub){
    if(!this.bubbleGrid[bub.column]) this.bubbleGrid[bub.column] = [];
    this.bubbleGrid[bub.column].push(bub)
    bub.row = this.bubbleGrid[bub.column].length - 1
    bub.onRequestLost = this.onRequestLost
    bub.finaly = GamePlay.HEIGHT - ( GamePlay.TOTAL_BUBBLE_DIA * (bub.row) ) - GamePlay.TOTAL_BUBBLE_DIA
    bub.onRequestDragEnd = this.onBubbleDragEnd.bind(this)
    bub.onRequestClick = this.onBubbleClick.bind(this)
  }
}

GamePlay.prototype.getBubble = function (column, row) {
  return row >= 0 &&
         column >= 0 &&
         column < this.spawner.numOfColumns &&
         this.bubbleGrid[column] &&
         this.bubbleGrid[column][row]
}


GamePlay.prototype.onBubbleClick = function (column, row, color) {
  var popData = {columns: {}, toRemove: []}
  this.checkingPop = true
  this.popAlgorithm(column, row, color, popData)
  this.checkingPop = false
  if(popData.toRemove.length >= 3){
    this.removeBubbles(popData.toRemove)
    this.adjustBubbles(popData.columns)
    this.onUpdateScore(GamePlay.pointsEquation(popData.toRemove.length))
  }

}

GamePlay.prototype.popAlgorithm = function (column, row, color, popData) {
  var bub = this.getBubble(column, row)
  if(bub && bub.color === color && !bub.falling && !bub.switching && !bub.checked){
    bub.checked = true
    popData.toRemove.push(bub)

    if(!popData.columns[column]) popData.columns[column] = {startAt: row};
    if(popData.columns[column].startAt > row) popData.columns[column].startAt = row;

    this.popAlgorithm(column, row + 1, color, popData) // Check up
    this.popAlgorithm(column, row - 1, color, popData) // Check down
    this.popAlgorithm(column - 1, row, color, popData) // Check left
    this.popAlgorithm(column + 1, row, color, popData) // Check right
  }
}

GamePlay.prototype.removeBubbles = function (bubbles) {
  for (var i = 0; i < bubbles.length; i++) {
    var bub = bubbles[i]
    this.bubbleGrid[bub.column][bub.row] = undefined
    bub.destroy()
  }
}

GamePlay.prototype.adjustBubbles = function (columns) {
  for (var column in columns) {
    if (columns.hasOwnProperty(column)) {
      var lowerBy = 0;
      for (var r = columns[column].startAt; r < this.bubbleGrid[column].length; r++) {
        var bub = this.getBubble(column, r)

        if(bub){
          bub.row -= lowerBy
          this.bubbleGrid[column][bub.row] = bub
          bub.finaly = GamePlay.HEIGHT - ( GamePlay.TOTAL_BUBBLE_DIA * (bub.row) ) - GamePlay.TOTAL_BUBBLE_DIA
        }else{
          lowerBy++
        }
      }
      this.bubbleGrid[column].length -= lowerBy
    }
  }
}

GamePlay.prototype.onBubbleDragEnd = function (column, row, direction) {
  switch (direction) {
    case UP:
      this.switchBubbles({r: row, c: column}, {r: row+1, c: column}, direction, 'y')
      break;
    case DOWN:
      this.switchBubbles({r: row, c: column}, {r: row-1, c: column}, direction, 'y')
      break;
    case LEFT:
      this.switchBubbles({r: row, c: column}, {r: row, c: column-1}, direction, 'x')
      break;
    case RIGHT:
      this.switchBubbles({r: row, c: column}, {r: row, c: column+1}, direction, 'x')
      break;
  }
}

GamePlay.prototype.switchBubbles = function (ind1, ind2, direction, key) {
  var sideBub = this.getBubble(ind2.c, ind2.r)
  if(sideBub && !sideBub.falling && !sideBub.switching){
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


GamePlay.WIDTH = 380;
GamePlay.HEIGHT = 650;
GamePlay.X = 2;
GamePlay.Y = GAME_HEIGHT - GamePlay.HEIGHT - 2;
GamePlay.TOTAL_FIT = (GamePlay.HEIGHT - Bubble.MARGIN) / (Bubble.DIAMETER + Bubble.MARGIN);
GamePlay.NUM_BUBBLES = Math.floor( GamePlay.TOTAL_FIT );
GamePlay.EXTRA_MARGIN = ((GamePlay.TOTAL_FIT - GamePlay.NUM_BUBBLES) * Bubble.DIAMETER ) / (GamePlay.NUM_BUBBLES + 1);
GamePlay.TOTAL_BUBBLE_DIA = Bubble.DIAMETER + GamePlay.EXTRA_MARGIN + Bubble.MARGIN;

GamePlay.difficultyEquation = function (t) {
  return {
    dropRate: (Math.pow(t, 1/6) + Math.log2(t))/10,
    speed: Math.log2(t)/4 + t/100000
  }
}

GamePlay.pointsEquation = function (bubAmount) {
  return Math.pow(bubAmount, 2)
}
