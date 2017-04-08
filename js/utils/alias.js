/** PIXI alias */
var resources = PIXI.loader.resources;
var Container = PIXI.Container;
var Sprite = PIXI.Sprite;
var Text = PIXI.Text;
var Graphics = PIXI.Graphics;


/** @const {number} - Game Width */
const GAME_WIDTH = 450;


/** @const {number} - Game Height */
const GAME_HEIGHT = 700;


/** @const {number} - Represents U Swipe */
const UP = 1;


/** @const {number} - Represents Down Swipe */
const DOWN = -1;


/** @const {number} - Represents Left Swipe */
const LEFT = -2;


/** @const {number} - Represents Right Swipe */
const RIGHT = 2;


/**
* The Google fonts to be used
* @const {object}
*/
const FONTS = {families: ['Varela+Round', 'Fredoka+One']}


/**
* The resources to be used
* @const {object}
*/
const RESOURCES =  [
  {name: 'bubbles', url: 'assets/bubbles_atlas/bubbles.json'},
  {name: 'ui', url: 'assets/ui_atlas/ui.json'}
]
