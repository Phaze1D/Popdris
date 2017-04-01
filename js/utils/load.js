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
