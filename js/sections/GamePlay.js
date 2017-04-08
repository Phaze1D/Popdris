
/**
* Creates the gamplay section
* @class
* @extends PIXI.Container
*/
var GamePlay = function () {
  Container.call(this);

  this.__initMask();
  this.__initSpawner();
  this.__initBorder();

  /** @member {array} - The 2D array that represents the bubble grid */
  this.bubbleGrid = new Array(this.spawner.numOfColumns);

  /** @member {boolean} - whether the popping algorithm is being processed */
  this.checkingPop = false;

  /** @member {function} - callback function for updated the label score */
  this.onUpdateScore = null;
}

GamePlay.prototype = Object.create(Container.prototype);
GamePlay.prototype.constructor = GamePlay;


/**
* Initializes the border
* @private
*/
GamePlay.prototype.__initBorder = function () {
  var border = new Graphics;
  border.lineStyle(2, 0xff5722, 1);
  border.beginFill(0xff5722, 0.1);
  border.drawRoundedRect(GamePlay.X, GamePlay.Y, GamePlay.WIDTH, GamePlay.HEIGHT, 5);
  border.endFill();
  this.addChild(border);
}


/**
* Initializes the mask for overflowing bubbles
* @private
*/
GamePlay.prototype.__initMask = function () {
  var mask = new Graphics;
  mask.beginFill(0xFFFFFF, 0.25);
  mask.drawRect(GamePlay.X - 2, GamePlay.Y - 2, GamePlay.WIDTH + 4, GamePlay.HEIGHT + 4);
  mask.endFill();
  this.mask = mask
}


/**
* Initializes the spawner
* @private
*/
GamePlay.prototype.__initSpawner = function () {
  this.spawner = new BubbleSpawner(GamePlay.difficultyEquation, GamePlay.WIDTH, GamePlay.HEIGHT);
  this.spawner.x = GamePlay.X;
  this.spawner.y = GamePlay.Y;
  this.addChild(this.spawner);
}


/**
* Runs the update function on the spawer and if it
* returns a bubble adds it to the grid
*/
GamePlay.prototype.update = function () {
  var bub = this.spawner.update(this.checkingPop);
  if(bub){
    this.addBubble(bub)
  }
}


/**
* Adds a bubble to the bubble grid with the correct properties
* @param {Bubble} bub - the bubble to be added
*/
GamePlay.prototype.addBubble = function (bub) {
  if(!this.bubbleGrid[bub.column]) this.bubbleGrid[bub.column] = [];
  this.bubbleGrid[bub.column].push(bub);
  bub.row = this.bubbleGrid[bub.column].length - 1;
  bub.onRequestLost = this.onRequestLost;
  bub.finaly = GamePlay.HEIGHT - ( GamePlay.TOTAL_BUBBLE_DIA * (bub.row) ) - GamePlay.TOTAL_BUBBLE_DIA;
  bub.onRequestDragEnd = this.onBubbleDragEnd.bind(this);
  bub.onRequestClick = this.onBubbleClick.bind(this);
};


/**
* Check if a bubble exists and returns it
* @param {number} column - the column of the bubble to get
* @param {number} row - the row of the bubble
* @return {Bubble} if it exists
*/
GamePlay.prototype.getBubble = function (column, row) {
  return row >= 0 &&
         column >= 0 &&
         column < this.spawner.numOfColumns &&
         this.bubbleGrid[column] &&
         this.bubbleGrid[column][row];
}


/**
* Callback for when a bubble is click
* This runs the popAlgorithm and removes the bubbles that have been poped
* @callback
* @param {number} column - the bubble's column
* @param {number} row - the bubble's row
* @param {string} color - the bubble's color
*/
GamePlay.prototype.onBubbleClick = function (column, row, color) {
  var popData = {columns: {}, toRemove: []};
  this.checkingPop = true;
  this.popAlgorithm(column, row, color, popData);
  this.checkingPop = false;
  if(popData.toRemove.length >= 3){
    this.removeBubbles(popData.toRemove);
    this.adjustBubbles(popData.columns);
    this.onUpdateScore(GamePlay.pointsEquation(popData.toRemove.length));
  }
}


/**
* A recursive algorithm that checks if the neighbors of a bubble have the same
* color and if so adds it to a list to be removed
* @param {number} column - the bubble's column
* @param {number} row - the bubble's row
* @param {string} color - the color to check for
* @param {object} popData - the data about wheter a bubble is the correct color
*/
GamePlay.prototype.popAlgorithm = function (column, row, color, popData) {
  var bub = this.getBubble(column, row);
  if(bub && bub.color === color && !bub.falling && !bub.switching && !bub.checked){
    bub.checked = true;
    popData.toRemove.push(bub);

    if(!popData.columns[column]) popData.columns[column] = {startAt: row};
    if(popData.columns[column].startAt > row) popData.columns[column].startAt = row;

    this.popAlgorithm(column, row + 1, color, popData); // Check up
    this.popAlgorithm(column, row - 1, color, popData); // Check down
    this.popAlgorithm(column - 1, row, color, popData); // Check left
    this.popAlgorithm(column + 1, row, color, popData); // Check right
  }
}


/**
* Removes a list of bubbles from the grid and the scene
* @param {array} bubbles - list of bubbles to be removed
*/
GamePlay.prototype.removeBubbles = function (bubbles) {
  for (var i = 0; i < bubbles.length; i++) {
    var bub = bubbles[i];
    this.bubbleGrid[bub.column][bub.row] = undefined;
    bub.destroy();
  }
}


/**
* Once the bubbles have been remove this function will adjust the final position
* of the rest of the bubbles
* @param {object} columns - object with keys as the columns and startRow as the
*                           values
*/
GamePlay.prototype.adjustBubbles = function (columns) {
  for (var column in columns) {
    if (columns.hasOwnProperty(column)) {
      var lowerBy = 0; // How many position to lower by
      for (var r = columns[column].startAt; r < this.bubbleGrid[column].length; r++) {
        var bub = this.getBubble(column, r);

        if(bub){
          bub.row -= lowerBy;
          this.bubbleGrid[column][bub.row] = bub;
          bub.finaly = GamePlay.HEIGHT - ( GamePlay.TOTAL_BUBBLE_DIA * (bub.row) ) - GamePlay.TOTAL_BUBBLE_DIA;
        }else{
          lowerBy++;
        }
      }
      this.bubbleGrid[column].length -= lowerBy;
    }
  }
}


/**
* Callback function call when a bubble is dragged
* @callback
* @param {number} column - the column of the bubble being dragged
* @param {number} row - the row of the bubble being dragged
* @param {number} direction - the drag direction
*/
GamePlay.prototype.onBubbleDragEnd = function (column, row, direction) {
  switch (direction) {
    case UP:
      this.switchBubbles({r: row, c: column}, {r: row+1, c: column}, direction, 'y');
      break;
    case DOWN:
      this.switchBubbles({r: row, c: column}, {r: row-1, c: column}, direction, 'y');
      break;
    case LEFT:
      this.switchBubbles({r: row, c: column}, {r: row, c: column-1}, direction, 'x');
      break;
    case RIGHT:
      this.switchBubbles({r: row, c: column}, {r: row, c: column+1}, direction, 'x');
      break;
  }
}


/**
* Switchs to bubbles with a given direction and start the switch animation
* for those to bubbles
* @param {object} ind1 - first bubble's grid indexes
* @param {object} ind2 - secounds bubble's grid indexes
* @param {number} direction - the direction to switch
* @param {string} key - x, or y represents the bubbles key to animate
*/
GamePlay.prototype.switchBubbles = function (ind1, ind2, direction, key) {
  var sideBub = this.getBubble(ind2.c, ind2.r);
  if(sideBub && !sideBub.falling && !sideBub.switching){
    var bub = this.bubbleGrid[ind1.c][ind1.r];
    this.bubbleGrid[ind2.c][ind2.r] = bub;
    this.bubbleGrid[ind1.c][ind1.r] = sideBub;
    bub.column = ind2.c;
    bub.row = ind2.r;
    sideBub.column = ind1.c;
    sideBub.row = ind1.r;
    bub['final' + key] = sideBub[key];
    sideBub['final' + key] = bub[key];
    bub.switching = true;
    sideBub.switching = true;
    bub.switchDirection = direction;
    sideBub.switchDirection = direction * -1;
  }
}


/**
* Reset the game by destroying all bubbles and resets the timers
*/
GamePlay.prototype.reset = function () {
  this.spawner.removeChildren();
  for (var i = 0; i < this.bubbleGrid.length; i++) {
    for (var j = 0; j < this.bubbleGrid[i].length; j++) {
      this.bubbleGrid[i][j].destroy();
    }
  }
  this.bubbleGrid = new Array(this.spawner.numOfColumns);
  this.spawner.totalTime = 0;
  this.spawner.timer = 0;
};


/**
* Difficulty vs Time function that returns the dropRate and speed at a given
* time. The longer the user plays the harder it gets
* @static
* @param {number} t - time
* @return {object} dropRate and speed object
*/
GamePlay.difficultyEquation = function (t) {
  return {
    dropRate: (Math.log2(t) + t/1000 + 10)/50,
    speed: Math.log2(t)/4 + t/100000
  };
}


/**
* Calculates the amount of points pre bubbles pop continuously
* The more pop the more points
* @return {number} the number of points
*/
GamePlay.pointsEquation = function (bubAmount) {
  return Math.pow(bubAmount, 2);
}


GamePlay.WIDTH = 380;
GamePlay.HEIGHT = 650;
GamePlay.X = 2;
GamePlay.Y = GAME_HEIGHT - GamePlay.HEIGHT - 2;
GamePlay.TOTAL_FIT = (GamePlay.HEIGHT - Bubble.MARGIN) / (Bubble.DIAMETER + Bubble.MARGIN);
GamePlay.NUM_BUBBLES = Math.floor( GamePlay.TOTAL_FIT );
GamePlay.EXTRA_MARGIN = ((GamePlay.TOTAL_FIT - GamePlay.NUM_BUBBLES) * Bubble.DIAMETER ) / (GamePlay.NUM_BUBBLES + 1);
GamePlay.TOTAL_BUBBLE_DIA = Bubble.DIAMETER + GamePlay.EXTRA_MARGIN + Bubble.MARGIN;
