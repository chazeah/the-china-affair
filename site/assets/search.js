/* Full-text search over the book.

   The index is fetched on the first keystroke rather than on page load, so the
   contents page stays light for readers who only want to click a chapter. If
   the fetch fails — most often because the page was opened from disk rather
   than served — the field removes itself and says why. */
(function () {
  'use strict';

  var input = document.getElementById('q');
  var list = document.getElementById('results');
  var note = document.getElementById('searchnote');
  if (!input || !list) return;

  var index = null;
  var loading = false;
  var pending = null;

  function load() {
    if (index || loading) return;
    loading = true;
    fetch('../assets/search-index.json')
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then(function (data) {
        index = data;
        loading = false;
        if (pending !== null) { run(pending); pending = null; }
      })
      .catch(function () {
        loading = false;
        input.hidden = true;
        if (note) note.hidden = false;
      });
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* Show the match in context, with a little of the sentence either side. */
  function snippet(text, q) {
    var at = text.toLowerCase().indexOf(q);
    if (at < 0) return escapeHtml(text.slice(0, 160)) + '…';
    var from = Math.max(0, at - 70);
    var to = Math.min(text.length, at + q.length + 110);
    var head = (from > 0 ? '…' : '') + escapeHtml(text.slice(from, at));
    var hit = '<mark>' + escapeHtml(text.slice(at, at + q.length)) + '</mark>';
    var tail = escapeHtml(text.slice(at + q.length, to)) + (to < text.length ? '…' : '');
    return head + hit + tail;
  }

  function run(raw) {
    var q = raw.trim().toLowerCase();
    list.innerHTML = '';
    if (q.length < 3) return;
    if (!index) { pending = raw; load(); return; }

    var hits = [];
    for (var i = 0; i < index.length && hits.length < 60; i++) {
      if (index[i].t.toLowerCase().indexOf(q) !== -1) hits.push(index[i]);
    }

    if (!hits.length) {
      list.innerHTML = '<li><p>Nothing found for “' + escapeHtml(raw.trim())
        + '”.</p></li>';
      return;
    }

    var frag = document.createDocumentFragment();
    hits.forEach(function (h) {
      var li = document.createElement('li');
      li.innerHTML = '<a href="' + h.s + '.html">' + escapeHtml(h.l) + '</a>'
        + '<p>' + snippet(h.t, q) + '</p>';
      frag.appendChild(li);
    });
    list.appendChild(frag);

    var count = document.createElement('li');
    count.innerHTML = '<p class="search__note">' + hits.length
      + (hits.length === 60 ? '+ passages' : ' passage' + (hits.length === 1 ? '' : 's'))
      + ' matching “' + escapeHtml(raw.trim()) + '”.</p>';
    list.insertBefore(count, list.firstChild);
  }

  var timer;
  input.addEventListener('input', function () {
    clearTimeout(timer);
    var v = input.value;
    timer = setTimeout(function () { run(v); }, 140);
  });
  input.addEventListener('focus', load, { once: true });
}());
