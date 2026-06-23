// De Kaaskoerier mockup — lichte interactiviteit
(function(){
  // Markeer dat JS draait (activeert reveal-animaties; zonder JS blijft alles zichtbaar)
  document.documentElement.classList.add('has-js');

  // Mobiel menu
  var t = document.querySelector('.menu-toggle');
  var m = document.querySelector('.mobile-menu');
  if(t && m){ t.addEventListener('click', function(){ m.classList.toggle('open'); }); }

  // Scroll reveal met vangnet: na 1,2s alles tonen, ook zonder scroll
  var reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('in'); });
  }
  setTimeout(function(){ document.querySelectorAll('.reveal:not(.in)').forEach(function(el){ el.classList.add('in'); }); }, 1200);

  // Kalender dag-filter
  var chips = document.querySelectorAll('[data-day-filter]');
  var rows = document.querySelectorAll('[data-day]');
  chips.forEach(function(c){
    c.addEventListener('click', function(){
      chips.forEach(function(x){x.classList.remove('active')});
      c.classList.add('active');
      var d = c.getAttribute('data-day-filter');
      rows.forEach(function(r){
        r.style.display = (d==='all' || r.getAttribute('data-day')===d) ? '' : 'none';
      });
    });
  });

  // Beeld-fallback: als een foto niet laadt, toon nette placeholder
  document.querySelectorAll('img[data-fallback]').forEach(function(img){
    img.addEventListener('error', function(){
      var p = document.createElement('div');
      p.className = 'ph';
      p.style.width='100%'; p.style.height='100%';
      p.textContent = img.getAttribute('data-fallback') || 'kaas';
      if(img.parentNode){ img.parentNode.replaceChild(p, img); }
    });
  });

  // Postcode-demo
  document.querySelectorAll('.locator-form').forEach(function(f){
    f.addEventListener('submit', function(e){ e.preventDefault(); window.location.href='vind-je-kraam.html'; });
  });
})();
