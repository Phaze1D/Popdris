
var Button = function (label, normalSprite, pressedSprite, labelStyle ) {
  Sprite.call(this, resources.ui.textures[normalSprite]);
  this.interactive = true;
  this.buttonMode = true;
  this.normalSprite = normalSprite;
  this.pressedSprite = pressedSprite;
  this.anchor.set(0.5);

  var basicText = new Text(label, labelStyle);
  basicText.anchor.set(0.5);
  this.addChild(basicText);
}

Button.prototype = Object.create(Sprite.prototype);
Button.prototype.constructor = Button

Button.labelButtonFactory = function (label, normalSprite, pressedSprite, labelStyle) {
  var button = new Button(label, normalSprite, pressedSprite, labelStyle);
  button.height = 64;
  button.width = 256;

  button.on('pointerdown', function () {
    this.texture = resources.ui.textures[this.pressedSprite];
  })

  button.on('pointerup', function () {
    this.texture = resources.ui.textures[this.normalSprite];
    this.onTap()
  })

  button.on('pointerupoutside', function () {
    this.texture = resources.ui.textures[this.normalSprite];
  })
  return button
}

Button.RAISE_STYLE = {
  fontWeight: 'bold',
  fontSize: 60,
  fontFamily: 'Varela Round',
  fill: '#fafafa'
}

Button.FLAT_STYLE = {
  fontWeight: 'bold',
  fontSize: 60,
  fontFamily: 'Varela Round',
  fill: '#ff5722'
}
