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

BubbleGenerator.prototype.start = function () {
  APP.ticker.add(function () {
    if(this.timer/1000 >= this.dropRate){
      var diff = this.difficulty(this.totalTime)
      this.dropRate = diff.dropRate

      var bub = this.generateRandomBubble()
      bub.fall(diff.speed)
      this.addChild(bub)
      this.timer = 0;

      if( this.getChildAt(0).y > this.gheight){
        this.removeChildAt(0)
      }
    }
    this.totalTime += APP.ticker.elapsedMS
    this.timer += APP.ticker.elapsedMS
  }.bind(this))
}

BubbleGenerator.prototype.stop = function () {

}

BubbleGenerator.prototype.generateRandomBubble = function () {
  var randInt = Math.floor(Math.random() * (Bubble.COLORS.length))
  var randColor = Bubble.COLORS[randInt]
  return this.generateBubble(randColor)
}

BubbleGenerator.prototype.generateBubble = function (color) {
  var bub = new Bubble(color)
  var minMargin = 2
  var totalFit = (this.gwidth - minMargin) / (bub.width + minMargin)
  var numBubbFit = Math.floor( totalFit )
  var extraMargin = ( (totalFit - numBubbFit) * bub.width ) / (numBubbFit + 1)
  var randPos = Math.floor(Math.random() * numBubbFit)

  bub.x = (minMargin + bub.width + extraMargin) * randPos + minMargin + extraMargin
  bub.y = -bub.height
  return bub
}
