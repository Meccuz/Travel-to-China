(function(){
  var partenza = new Date(2026,9,30,10,55);
  var el = document.getElementById('counter');
  function tick(){
    var giorni = Math.ceil((partenza - new Date())/86400000);
    if(giorni > 1){ el.innerHTML = 'Partenza tra <b>' + giorni + '</b> giorni'; }
    else if(giorni === 1){ el.innerHTML = 'Si parte <b>domani</b>'; }
    else if(giorni === 0){ el.innerHTML = 'Si parte <b>oggi</b>'; }
    else { el.innerHTML = 'Viaggio in corso, o già finito'; }
  }
  tick(); setInterval(tick, 60000);


  // Foto da Wikimedia Commons: src e credito generati dai data-attribute,
  // cosi il credito non puo mai finire su una foto sbagliata.
  document.querySelectorAll('.shot[data-file]').forEach(function(fig){
    var file = fig.getAttribute('data-file');
    var img = fig.querySelector('img');
    var cap = fig.querySelector('figcaption');
    if(!img || !cap) return;
    var enc = encodeURIComponent(file.replace(/ /g,'_'));
    img.src = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + enc + '?width=1200';
    var author = fig.getAttribute('data-author') || 'autore da indicare';
    var lic = fig.getAttribute('data-license') || 'licenza da indicare';
    var page = 'https://commons.wikimedia.org/wiki/File:' + enc;
    cap.innerHTML = cap.firstChild.textContent.trim() +
      ' <span>· ' + author + ', ' + lic +
      ', <a href="' + page + '" rel="noopener" target="_blank">Wikimedia Commons</a></span>';
  });

  var items = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    items.forEach(function(i){ i.classList.add('in'); });
    return;
  }
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  },{rootMargin:'0px 0px -8% 0px'});
  items.forEach(function(i){ obs.observe(i); });
})();
