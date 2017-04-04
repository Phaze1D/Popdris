
var StartScene = function (onPlayTap, onHelpTap) {
  if(typeof onPlayTap !== 'function') throw new TypeError('onPlayTap is not a function');
  if(typeof onHelpTap !== 'function') throw new TypeError('onHelpTap is not a function');

  Container.call(this);

  this.__initGenerator()
  this.__initPlayButton()
  this.__initHelpButton()
  this.__initTitle()

  this.playButton.onTap = onPlayTap
  this.helpButton.onTap = onHelpTap
}

StartScene.prototype = Object.create(Container.prototype);
StartScene.prototype.constructor = StartScene

StartScene.prototype.__initGenerator = function () {
  this.gen = new BubbleGenerator(StartScene.BUBBLE_GENERATOR_FUNC, GAME_WIDTH, GAME_HEIGHT)
  // this.gen.alpha = 0.5
  this.gen.start()
  this.addChild(this.gen)
}

StartScene.prototype.__initPlayButton = function () {
  this.playButton = Button.labelButtonFactory('PLAY', 'button_raised', 'button_flat', Button.RAISE_STYLE);
  this.playButton.x = GAME_WIDTH/2
  this.playButton.y = GAME_HEIGHT/2
  this.addChild(this.playButton)
}

StartScene.prototype.__initHelpButton = function () {
  this.helpButton = Button.labelButtonFactory('HELP', 'button_flatm', 'button_flatp', Button.FLAT_STYLE);
  this.helpButton.x = GAME_WIDTH/2
  this.helpButton.y = GAME_HEIGHT/2 + 80
  this.addChild(this.helpButton)
}

StartScene.prototype.__initTitle = function () {
  var title = new Text('Popdris', {
    fontWeight: 'bold',
    fontSize: 60,
    fontFamily: 'Varela Round',
    fill: '#2979FF'
  })
  title.anchor.set(0.5)
  title.x = GAME_WIDTH/2
  title.y = 100
  this.addChild(title)
}


StartScene.BUBBLE_GENERATOR_FUNC = function (totalTime) {
  return {dropRate: 1/5, speed: 4}
}
