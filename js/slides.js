/**
 * Klassikale dia's · NovaDepot · Tekstverwerking
 * presentatie.html?les=1 of ?les=2
 * →/spatie: volgende (eerst onthullingen), ←: vorige, F: volledig scherm, N: sprekersnotities
 */
(function () {
  'use strict';
  var les = new URLSearchParams(location.search).get('les') === '2' ? '2' : '1';
  document.title = 'Tekstverwerking ' + les + ' · dia\'s · NovaDepot';

  var all = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  all.forEach(function (s) { if (s.getAttribute('data-les') !== les) s.remove(); });
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var notesBox = document.getElementById('notes');
  var counter = document.getElementById('counter');
  var i = 0;

  // schaal het 1280x720-podium naar het scherm
  var stage = document.querySelector('.stage');
  function fit() {
    var s = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
    stage.style.transform = 'scale(' + s + ')';
  }
  window.addEventListener('resize', fit);
  fit();

  function show(n) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach(function (s, k) { s.classList.toggle('active', k === i); });
    var note = slides[i].querySelector('template.note');
    notesBox.innerHTML = '<h3>Dia ' + (i + 1) + ' / ' + slides.length + '</h3>' + (note ? note.innerHTML : '<p>Geen notities.</p>');
    if (counter) counter.textContent = (i + 1) + ' / ' + slides.length;
    try { sessionStorage.setItem('dia_les' + les, String(i)); } catch (e) {}
  }

  function next() {
    var s = slides[i];
    var hidden = s.querySelector('.reveal-item:not(.shown)');
    if (hidden) { hidden.classList.add('shown'); return; }
    if (s.hasAttribute('data-answer') && !s.classList.contains('revealed')) { s.classList.add('revealed'); return; }
    show(i + 1);
  }
  function prev() { show(i - 1); }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
    else if (e.key === 'f' || e.key === 'F') {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(function () {});
      else document.exitFullscreen();
    }
    else if (e.key === 'n' || e.key === 'N') { document.body.classList.toggle('show-notes'); }
  });
  document.querySelector('.deck').addEventListener('click', function (e) {
    if (e.target.closest('a')) return;
    if (e.clientX < window.innerWidth / 4) prev(); else next();
  });

  var start = 0;
  try { start = parseInt(sessionStorage.getItem('dia_les' + les) || '0', 10) || 0; } catch (e) {}
  show(start);
})();
