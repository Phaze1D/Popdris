var BubbleGenerator = function (difficultyVsTimeFunc, width, height) {
  Container.call(this);
  this.dropRate = 1/2
  this.totalTime = 0
  this.timer = 0
  this.gwidth = width
  this.gheight = height
  this.difficulty = difficultyVsTimeFunc
}

BubbleGenerator.prototype = Object.create(Container.prototype);
BubbleGenerator.prototype.constructor = BubbleGenerator

BubbleGenerator.prototype.update = function () {
  var bub = null
  if(this.timer/1000 >= this.dropRate){
    bub = this.dropBubble()
  }

  this.updateBubbles()
  this.totalTime += APP.ticker.elapsedMS
  this.timer += APP.ticker.elapsedMS
  return bub
}

BubbleGenerator.prototype.updateBubbles = function () {
  for (var i = 0; i < this.children.length; i++) {
    this.children[i].fall()
  }
}

BubbleGenerator.prototype.dropBubble = function () {
  var diff = this.difficulty(this.totalTime)
  this.dropRate = diff.dropRate

  var bub = this.generateRandomBubble()
  bub.velocity = diff.speed
  this.addChild(bub)
  this.timer = 0;


  if( this.getChildAt(0).y > this.gheight){
    var rb = this.removeChildAt(0)
    rb.destroy({children: true})
  }

  return bub
}

BubbleGenerator.prototype.generateRandomBubble = function () {
  var randInt = Math.floor(Math.random() * (Bubble.COLORS.length))
  var randColor = Bubble.COLORS[randInt]
  return this.generateBubble(randColor)
}

BubbleGenerator.prototype.generateBubble = function (color) {
  var bub = new Bubble(color)
  var totalFit = (this.gwidth - Bubble.MARGIN) / (Bubble.DIAMETER + Bubble.MARGIN)
  var numBubbFit = Math.floor( totalFit )
  this.numOfColumns = numBubbFit
  var extraMargin = ( (totalFit - numBubbFit) * Bubble.DIAMETER ) / (numBubbFit + 1)
  var randColumn = Math.floor(Math.random() * numBubbFit)
  bub.column = randColumn

  bub.x = (Bubble.MARGIN + Bubble.DIAMETER + extraMargin) * randColumn + Bubble.MARGIN + extraMargin
  bub.y = -bub.height
  return bub
}
