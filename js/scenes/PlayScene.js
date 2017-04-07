var PlayScene = function (onRequestLost) {
  Container.call(this)
  this.__initGamePlay()
  this.__initScore()
  this.onRequestLost = onRequestLost
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
  this.onRequestLost()
};
