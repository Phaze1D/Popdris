/**
* Creates a Bubble
* @class
* @extends PIXI.Sprite
* @param {string} color - the color of the bubble
*/
var Bubble = function (color) {
  PIXI.Sprite.call(this, resources.bubbles.textures[color]);

  /** @member {string} color of the bubble */
  this.color = color;

  /** @member {number} width of the bubble */
  this.width = Bubble.DIAMETER;

  /** @member {number} height of the bubble */
  this.height = Bubble.DIAMETER;

  /** @member {number} where the bubble's final vertical position is */
  this.finaly = GAME_HEIGHT + Bubble.DIAMETER;

  /** @member {number} where the bubble's final horizantol position is */
  this.finalx = 0;

  /** @member {boolean} whether the bubble can handle events */
  this.interactive = true;

  /** @member {object} the starting points of a drag event */
  this.dragData = {dragging: false, x: 1, y: 2};

  /** @member {boolean} whether the bubble is falling */
  this.falling = true;

  /** @member {number} the bubble's velocity */
  this.velocity = null;

  /** @member {number} the direction where the bubble will switch to */
  this.switchDirection = null;

  /** @member {boolean} whether the bubble is switching */
  this.switching = false;

  /** @member {function} the callback for when drag event is over */
  this.onRequestDragEnd = null;

  /** @member {function} the callback for when a bubble is click */
  this.onRequestClick = null;

  /** @member {boolean} whether the bubble is being checked for removal */
  this.checked = false;

  this.on('pointerdown', this.onDragStart)
    .on('pointerup', this.onDragEnd)
    .on('pointerupoutside', this.onDragEnd)
}

Bubble.prototype = Object.create(PIXI.Sprite.prototype);
Bubble.prototype.constructor = Bubble;


/**
* The function that animates one falling movement
* Should be run inside a tick function
*/
Bubble.prototype.fall = function () {
  if(this.y + this.velocity < this.finaly){
    this.y += this.velocity;
    this.falling = true;
  }else{
    this.velocity = 6;
    this.y = this.finaly;
    this.falling = false;

    if(this.y == GamePlay.HEIGHT - ( GamePlay.TOTAL_BUBBLE_DIA * (GamePlay.NUM_BUBBLES - 1) ) - GamePlay.TOTAL_BUBBLE_DIA){
      this.onRequestLost();
    }
  }
}


/**
* The function that animates one switching movement
* Should be run inside a tick function
*/
Bubble.prototype.switchAnimation = function () {

  switch (this.switchDirection) {
    case UP:
      this.y = (this.y > this.finaly ? this.y - this.velocity : this.finaly);
      this.switching = (this.y != this.finaly);
      break;

    case DOWN:
      this.y = (this.y < this.finaly ? this.y + this.velocity : this.finaly);
      this.switching = (this.y != this.finaly);
      break;

    case LEFT:
      this.x = (this.x > this.finalx ? this.x - this.velocity : this.finalx);
      this.switching = (this.x != this.finalx);
      break;

    case RIGHT:
      this.x = (this.x < this.finalx ? this.x + this.velocity : this.finalx);
      this.switching = (this.x != this.finalx);
      break;
  }
}


/**
* Event call back for when user presses a bubble
* Saves the starting position of the users pointer
* @param {object} event - pointerdown event
*/
Bubble.prototype.onDragStart = function (event) {
  if(!this.switching){
    this.dragData.dragging = true;
    var position = event.data.getLocalPosition(this.parent);
    this.dragData.x = position.x;
    this.dragData.y = position.y;
  }
}


/**
* Event call back for when user release a press
* Checks if the distance between the starting point and ending point is
* greater then a quater of the bubble's DIAMETER if not it handles it as
* a click else it calculates which direction the user dragged to and calls
* the dragEnded callback
* @param {object} event - pointerup event
*/
Bubble.prototype.onDragEnd = function (event) {
  if(this.dragData.dragging){
    var position = event.data.getLocalPosition(this.parent);
    this.dragData.dragging = false;

    if(distance(this.dragData, position) > Bubble.DIAMETER / 4 ){
      var direction = getDirection( angle(this.dragData, position) );
      this.onRequestDragEnd(this.column, this.row, direction);
    }else{
      this.onRequestClick(this.column, this.row, this.color);
    }
  }
}


/** @const {array} - the possible colors of a bubble */
Bubble.COLORS = ['blue', 'green', 'grey', 'yellow', 'red', 'purple'];

/** @const {number} - the DIAMETER of a bubble */
Bubble.DIAMETER = 40;

/** @const {number} - the margin of a bubble */
Bubble.MARGIN = 2;
