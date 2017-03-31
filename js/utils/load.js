
function setupHandler(loader, resources){
  document.getElementById('spinner').style.display = 'none'
  init()
}


loader.add(
  [
    {name: 'bubbles', url: 'assets/bubbles_atlas/bubbles.json'},
    {name: 'ui', url: 'assets/ui_atlas/ui.json'}
  ]
).load(setupHandler)
