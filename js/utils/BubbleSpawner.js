
/**
* Creates BubbleSpawner that spawns bubbles
* @class
* @extends PIXI.Container
* @param {function} difficultyVsTimeFunc - callback called on every update tick
* @param {number} width - the width of the spawner
* @param {number} height - the height of the spawner
* @throws {TypeError} - difficultyVsTimeFunc must be a function
*/
var BubbleSpawner = function (difficultyVsTimeFunc, width, height) {
  if(typeof difficultyVsTimeFunc !== 'function')
    throw new TypeError('difficultyVsTimeFunc is not a function');

  Container.call(this);
  this.dropRate = 1/2;
  this.totalTime = 0;
  this.timer = 0;
  this.gwidth = width;
  this.gheight = height;
  this.difficulty = difficultyVsTimeFunc;
}


BubbleSpawner.prototype = Object.create(Container.prototype);
BubbleSpawner.prototype.constructor = BubbleSpawner;


/**
* The render function that updates the bubbles and drops a bubbles
* @param {boolean} removing - is the removing process running
* @return {Bubble} The newly created bubble if on was created
*/
BubbleSpawner.prototype.update = function (removing) {
  var bub = undefined;
  if(this.timer/1000 >= 1/this.dropRate){
    bub = this.spawnBubble();
  }
  this.updateBubbles(removing);
  this.totalTime += APP.ticker.elapsedMS;
  this.timer += APP.ticker.elapsedMS;
  return bub;
}


/**
* Updates each bubble's position and resets its checked property
* if the removing process is not running
* @param {boolean} removing - is the removing process running
*/
BubbleSpawner.prototype.updateBubbles = function (removing) {
  for (var i = 0; i < this.children.length; i++) {
    if(!removing){
      this.children[i].checked = false;
    }

    if(this.children[i].switching){
      this.children[i].switchAnimation();
    }else{
      this.children[i].fall();
    }
  }
}


/**
* Spawns a bubble with a certain velocity based on the difficulty function
* and updates the dropRate
* @return {Bubble} the newly created Bubble
*/
BubbleSpawner.prototype.spawnBubble = function () {
  var diff = this.difficulty(this.totalTime);
  this.dropRate = diff.dropRate;

  var bub = this.createRandomBubble();
  bub.velocity = diff.speed;
  this.addChild(bub);
  this.timer = 0;

  // Removes the last bubble if its position is greater the the spawners height
  if( this.getChildAt(0).y > this.gheight){
    var rb = this.removeChildAt(0);
    rb.destroy({children: true});
  }
  return bub;
}


/**
* Creates a Bubble with the a random color
* @returns {Bubble}
*/
BubbleSpawner.prototype.createRandomBubble = function () {
  var randInt = Math.floor(Math.random() * (Bubble.COLORS.length));
  var randColor = Bubble.COLORS[randInt];
  return this.createBubble(randColor);
}


/**
* Creates a Bubble with the correct position
* @param {string} color - the color to use
* @returns {Bubble}
*/
BubbleSpawner.prototype.createBubble = function (color) {
  var bub = new Bubble(color);
  var totalFit = (this.gwidth - Bubble.MARGIN) / (Bubble.DIAMETER + Bubble.MARGIN);
  var numBubbFit = Math.floor( totalFit );
  this.numOfColumns = numBubbFit;
  var extraMargin = ( (totalFit - numBubbFit) * Bubble.DIAMETER ) / (numBubbFit + 1);
  var randColumn = Math.floor(Math.random() * numBubbFit);
  bub.column = randColumn;

  bub.x = (Bubble.MARGIN + Bubble.DIAMETER + extraMargin) * randColumn + Bubble.MARGIN + extraMargin;
  bub.y = -bub.height;
  return bub;
}
