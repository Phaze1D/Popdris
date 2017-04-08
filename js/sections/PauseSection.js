/**
* Creates a pause section
* @class
* @extends PIXI.Container
* @param {function} onResetTap - callback that is called when the reset button is click
* @param {function} onQuitTap - callback that is called when the quit button is click
*/
var PauseSection = function (onResetTap, onQuitTap) {
  Container.call(this);
  this.__initOverlay();
  this.__initBorder();
  this.__initResetButton();
  this.__initQuitButton();

  this.resetButton.onTap = onResetTap;
  this.quitButton.onTap = onQuitTap;
  this.interactive = true;

  // Stops event from propagating
  this.on('click', function (event) {
    event.stopPropagation();
  })
}

PauseSection.prototype = Object.create(Container.prototype);
PauseSection.prototype.constructor = PauseSection;


/**
* Initializes the overlay
* @private
*/
PauseSection.prototype.__initOverlay = function () {
  var overlay = new Graphics();
  overlay.lineStyle(2, 0x000000, 0.3);
  overlay.beginFill(0x000000, 0.3);
  overlay.drawRoundedRect(GamePlay.X, GamePlay.Y, GamePlay.WIDTH, GamePlay.HEIGHT, 5);
  overlay.endFill();
  this.addChild(overlay);
};


/**
* Initializes the border box
* @private
*/
PauseSection.prototype.__initBorder = function () {
  var border = new Graphics();
  border.lineStyle(2, 0x2979FF, 1);
  border.beginFill(0xFFFFFF, 1);
  border.drawRoundedRect(GamePlay.X + GamePlay.WIDTH/2, GamePlay.Y + GamePlay.HEIGHT/2, PauseSection.WIDTH, PauseSection.HEIGHT, 5);
  border.pivot.x = PauseSection.WIDTH/2;
  border.pivot.y = PauseSection.HEIGHT/2;
  border.endFill();
  this.addChild(border);
};


/**
* Initializes the reset button
* @private
*/
PauseSection.prototype.__initResetButton = function () {
  this.resetButton = Button.labelButtonFactory('RESET', 'button_raised', 'button_flat', Button.RAISE_STYLE);
  this.resetButton.x = GamePlay.X + GamePlay.WIDTH/2;
  this.resetButton.y = GamePlay.Y + GamePlay.HEIGHT/2 - 60;
  this.addChild(this.resetButton);
};


/**
* Initializes the quit button
* @private
*/
PauseSection.prototype.__initQuitButton = function () {
  this.quitButton = Button.labelButtonFactory('QUIT', 'button_flatm', 'button_flatp', Button.FLAT_STYLE);
  this.quitButton.x = GamePlay.X + GamePlay.WIDTH/2;
  this.quitButton.y = GamePlay.Y + GamePlay.HEIGHT/2 + 60;
  this.addChild(this.quitButton);
};


/** @const {number} the width of the pause box */
PauseSection.WIDTH = 300;

/** @const {number} the height of the pause box */
PauseSection.HEIGHT = 250;
