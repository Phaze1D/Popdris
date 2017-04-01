window.WebFontConfig = {
    google: {
        families: ['Varela+Round', 'Fredoka+One']
    },

    active: function() {
      loader.add(
        [
          {name: 'bubbles', url: 'assets/bubbles_atlas/bubbles.json'},
          {name: 'ui', url: 'assets/ui_atlas/ui.json'}
        ]
      ).load(setupHandler)
    }
};

function setupHandler(loader, resources){
  document.getElementById('spinner').style.display = 'none'
  init()
}

/******** Load Google WebFontConfig async *******/
(function(d) {
  var wf = d.createElement('script'), s = d.scripts[0];
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
  wf.async = true;
  s.parentNode.insertBefore(wf, s);
})(document);
/******** Load Google WebFontConfig async *******/
