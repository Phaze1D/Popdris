/**
* Creates the Start Scene
* @class
* @extends PIXI.Container
* @param {function} onPlayTap - callback that is called when the play button is click
* @throws {TypeError} -  - onPlayTap must be a function
*/
var StartScene = function (onPlayTap) {
  if(typeof onPlayTap !== 'function')
    throw new TypeError('onPlayTap is not a function');

  Container.call(this);
  this.__initSpawner();
  this.__initPlayButton();
  this.__initTitle();
  this.playButton.onTap = onPlayTap;
}

StartScene.prototype = Object.create(Container.prototype);
StartScene.prototype.constructor = StartScene;


/**
* Initializes the Bubble Spawner
* @private
*/
StartScene.prototype.__initSpawner = function () {
  this.bubbleGen = new BubbleSpawner(StartScene.difficultyEquation, GAME_WIDTH, GAME_HEIGHT);
  this.addChild(this.bubbleGen);
}


/**
* Initializes the play button
* @private
*/
StartScene.prototype.__initPlayButton = function () {
  this.playButton = Button.labelButtonFactory(
    'PLAY',
    'button_raised',
    'button_flat',
    Button.RAISE_STYLE
  );

  this.playButton.x = GAME_WIDTH/2;
  this.playButton.y = GAME_HEIGHT/2;
  this.addChild(this.playButton);
}


/**
* Initializes the title
* @private
*/
StartScene.prototype.__initTitle = function () {
  var title = new Text('Popdris', {
    fontWeight: 'bold',
    fontSize: 60,
    fontFamily: 'Varela Round',
    fill: '#2979FF'
  });
  title.anchor.set(0.5);
  title.x = GAME_WIDTH/2;
  title.y = 100;
  this.addChild(title);
}


/**
* Starts the background animation
*/
StartScene.prototype.update = function () {
  this.bubbleGen.update()
}


/**
* Static function that returns the background animation speed and dropRate
* @static
* @return {object} - An object with the dropRate and bubble speed
*/
StartScene.difficultyEquation = function (totalTime) {
  return {dropRate: 8, speed: 4};
}
