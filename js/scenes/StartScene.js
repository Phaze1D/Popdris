
var StartScene = function (onPlayTap, onHelpTap) {

  if(typeof onPlayTap !== 'function'){
    throw new TypeError('onPlayTap is not a function')
  }

  if(typeof onHelpTap !== 'function'){
    throw new TypeError('onHelpTap is not a function')
  }

  Container.call(this);

  this.initBorder()
  this.initPlayButton()
  this.initHelpButton()
  this.initTitle()

  this.playButton.onTap = onPlayTap
  this.helpButton.onTap = onHelpTap
}

StartScene.prototype = Object.create(Container.prototype);
StartScene.prototype.constructor = StartScene

StartScene.prototype.initPlayButton = function () {
  this.playButton = Button.labelButtonFactory('PLAY', 'button_raised', 'button_flat', Button.raiseLabelStyle);
  this.playButton.x = GAME_WIDTH/2
  this.playButton.y = GAME_HEIGHT/2
  this.addChild(this.playButton)
}

StartScene.prototype.initHelpButton = function () {
  this.helpButton = Button.labelButtonFactory('HELP', 'button_flatm', 'button_flatp', Button.flatLabelStyle);
  this.helpButton.x = GAME_WIDTH/2
  this.helpButton.y = GAME_HEIGHT/2 + 80
  this.addChild(this.helpButton)
}

StartScene.prototype.initBorder = function () {
  this.border = new Graphics();
  var borderWidth = 4
  this.border.lineStyle(borderWidth, 0x2979FF, 1);
  this.border.drawRoundedRect(borderWidth, borderWidth, GAME_WIDTH-borderWidth*2, GAME_HEIGHT-borderWidth*2, 5);
  this.border.endFill();
  this.addChild(this.border)
}

StartScene.prototype.initTitle = function () {
  this.title = new Text('Popdris', {
    fontWeight: 'bold',
    fontSize: 60,
    fontFamily: 'Varela Round',
    fill: '#2979FF'
  })
  this.title.anchor.set(0.5)
  this.title.x = GAME_WIDTH/2
  this.title.y = 100
  this.addChild(this.title)
}
