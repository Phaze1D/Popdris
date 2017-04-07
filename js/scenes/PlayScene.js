var PlayScene = function (onRequestQuit) {
  Container.call(this)
  this.__initGamePlay()
  this.__initScore()
  this.__initPauseSection()

  this.onRequestQuit = onRequestQuit
  this.lost = false
}


PlayScene.prototype = Object.create(Container.prototype);
PlayScene.prototype.constructor = PlayScene

PlayScene.prototype.__initGamePlay = function () {
  this.gamePlay = new GamePlay()
  this.gamePlay.onUpdateScore = this.updateScorce.bind(this)
  this.gamePlay.onRequestLost = this.onGameLost.bind(this)
  this.addChild(this.gamePlay)
}

PlayScene.prototype.__initScore = function () {
  this.score = 0
  this.scoreLabel = new Text(this.score, {
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'Varela Round',
    fill: '#2979FF'
  })
  this.addChild(this.scoreLabel)
}

PlayScene.prototype.__initPauseSection = function () {
  this.pauseSection = new PauseSection(this.onGameReset.bind(this),this.onGameQuit.bind(this))
};

PlayScene.prototype.startGame = function () {
  APP.ticker.add(function () {
    if(!this.lost){
      this.gamePlay.update()
    }
  }.bind(this))
}

PlayScene.prototype.updateScorce = function (points) {
  this.score += points
  this.scoreLabel.text = this.score
}

PlayScene.prototype.onGameLost = function () {
  this.lost = true
  this.addChild(this.pauseSection)
};

PlayScene.prototype.onGameQuit = function () {
  this.onRequestQuit()
};

PlayScene.prototype.onGameReset = function () {
  this.removeChild(this.pauseSection)
  this.gamePlay.reset()
  this.lost = false
};
