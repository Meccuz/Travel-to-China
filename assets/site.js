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


  // I file stanno in img/, ma il credito nasce dai data-attribute della figura:
  // e' lo stesso dato da cui viene il nome su Commons, quindi non puo finire
  // sulla foto sbagliata. Il link all'originale non si apre dalla Cina, dove
  // Commons e' bloccato: resta perche' la licenza CC lo chiede.
  document.querySelectorAll('.shot[data-file]').forEach(function(fig){
    var cap = fig.querySelector('figcaption');
    if(!cap) return;
    var author = fig.getAttribute('data-author') || 'autore da indicare';
    var lic = fig.getAttribute('data-license') || 'licenza da indicare';
    var page = 'https://commons.wikimedia.org/wiki/File:' +
      encodeURIComponent(fig.getAttribute('data-file').replace(/ /g,'_'));
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
