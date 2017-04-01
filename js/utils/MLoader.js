var MLoader = function (onLoaded) {
  if(typeof onLoaded !== 'function') throw new TypeError('onHelpTap is not a function');

  this.onLoadHandler = onLoaded
  this.__initResourceArray()
  this.__initWebFonts()
}

MLoader.prototype.loadAssets = function () {
  window.WebFontConfig = {
      google: {
          families: this.fonts
      },

      active: function() {
        PIXI.loader.add(this.resourceArray).load(this.onLoadHandler)
      }.bind(this)
  };
}

MLoader.prototype.__initResourceArray = function () {
  this.resourceArray = [
    {name: 'bubbles', url: 'assets/bubbles_atlas/bubbles.json'},
    {name: 'ui', url: 'assets/ui_atlas/ui.json'}
  ]
}

MLoader.prototype.__initWebFonts = function () {
  this.fonts = ['Varela+Round', 'Fredoka+One']
}
