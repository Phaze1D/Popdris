var PlayScene = function () {
  Container.call(this)
  this.__initGamePlay()
  this.__initScore()
}


PlayScene.prototype = Object.create(Container.prototype);
PlayScene.prototype.constructor = PlayScene

PlayScene.prototype.__initGamePlay = function () {
  this.gamePlay = new GamePlay()
  this.addChild(this.gamePlay)
}

PlayScene.prototype.__initScore = function () {
  this.score = 787678
  this.scoreLabel = new Text(this.score, {
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'Varela Round',
    fill: '#2979FF'
  })
  this.addChild(this.scoreLabel)
}

PlayScene.prototype.startGame = function () {
  APP.ticker.add(this.gamePlay.update.bind(this.gamePlay))
}
