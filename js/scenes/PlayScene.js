/**
* Creates the PlayScene that handles all gameplay
* @class
* @extends PIXI.Container
* @param {function} onRequestQuit - callback called when quit button is pressed
* @throws {TypeError} - onRequestQuit must be a function
*/
var PlayScene = function (onRequestQuit) {
  if(typeof onRequestQuit !== 'function')
    throw new TypeError('onRequestQuit is not a function');

  Container.call(this);
  this.__initGamePlay();
  this.__initScore();
  this.__initPauseSection();

  this.onRequestQuit = onRequestQuit;
  this.lost = false;
}


PlayScene.prototype = Object.create(Container.prototype);
PlayScene.prototype.constructor = PlayScene;


/**
* Initializes the gameplay section
* @private
*/
PlayScene.prototype.__initGamePlay = function () {
  this.gamePlay = new GamePlay();
  this.gamePlay.onUpdateScore = this.updateScore.bind(this);
  this.gamePlay.onRequestLost = this.onGameLost.bind(this);
  this.addChild(this.gamePlay);
}


/**
* Initializes the score label
* @private
*/
PlayScene.prototype.__initScore = function () {
  this.score = 0;
  this.scoreLabel = new Text(this.score, {
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'Varela Round',
    fill: '#2979FF'
  });
  this.addChild(this.scoreLabel);
}


/**
* Initializes the pause section
* @private
*/
PlayScene.prototype.__initPauseSection = function () {
  this.pauseSection = new PauseSection(this.onGameReset.bind(this),this.onGameQuit.bind(this));
};


/**
* Starts the game
*/
PlayScene.prototype.update = function () {
  if(!this.lost){
    this.gamePlay.update();
  }
}


/**
* Updates the score label
* @param {number} points - points to be added
*/
PlayScene.prototype.updateScore = function (points) {
  this.score += points;
  this.scoreLabel.text = this.score;
}


/**
* Adds the pause section to the scene
* Called when the user loses
* @callback
*/
PlayScene.prototype.onGameLost = function () {
  this.lost = true;
  this.addChild(this.pauseSection);
};


/**
* Called when the quit button is pressed
* @callback
*/
PlayScene.prototype.onGameQuit = function () {
  this.onRequestQuit();
};


/**
* Resets the gameplay section and score
* Called when the reset button is pressed
* @callback
*/
PlayScene.prototype.onGameReset = function () {
  this.removeChild(this.pauseSection);
  this.gamePlay.reset();
  this.lost = false;
  this.score = 0;
  this.scoreLabel.text = this.score;
};
