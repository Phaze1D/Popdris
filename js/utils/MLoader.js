
/**
* Creates MLoader
* @class
* @param {function} onLoaded - callback called when load finished
* @throws {TypeError} - onLoaded must be a function
*/
var MLoader = function (onLoaded) {
  if(typeof onLoaded !== 'function') throw new TypeError('onHelpTap is not a function');
  this.onRequestLoad = onLoaded
}

/** Loads the game assets starting with the google FONTS */
MLoader.prototype.loadAssets = function () {
  window.WebFontConfig = {
      google: FONTS,
      active: function() {
        PIXI.loader.add(RESOURCES).load(this.onRequestLoad)
      }.bind(this)
  };
}
