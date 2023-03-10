var c = document.getElementById('canv'),
  $ = c.getContext('2d'),
  w = c.width = window.innerWidth,
  h = c.height = window.innerHeight,
  t = 0,
  num = 750,
  u = 0,
  s, a, b,
  x, y, _x, _y,
  _t = 1 / 60;

var anim = function() {
  $.globalCompositeOperation = 'source-over';
  $.fillStyle = 'hsla(0, 0%, 0%, .45)';
  $.fillRect(0, 0, w, h);
  $.globalCompositeOperation = 'lighter';
  for (var i = 0; i < 2; i++) {
    x = 0;
    _u = (u / 4) + i, col = u + (_u / 8);
    $.beginPath();
    for (var j = 0; j < num; j++) {
      x += .55 * Math.sin(18);
      y = x * Math.sin(i + 1.4 * t + x / 50) / 10.5;
      _x = x * Math.cos(b) - y * Math.sin(i);
      _y = x * Math.sin(b) + y * Math.cos(i);
      b = (j * 11.46) * Math.PI / 3.9;
      $.lineWidth = .1;
      $.arc(w / 2 - _x, h / 2 - _y, 1, 0, Math.PI * 2);
    }
    var g = $.createLinearGradient(w / 2 + _x, h / 2 + _y, 1, w / 2 + _x, h / 2 + _y);
    g.addColorStop(0.1, 'hsla(' + col * i + ',90%,50%,.7)');
    g.addColorStop(1, 'hsla(' + _u * i + ',95%,50%,.09)');
    $.strokeStyle = g;
    $.stroke();
  }
  t += _t;
  u -= .2;
  window.requestAnimationFrame(anim);
};
anim();

window.addEventListener('resize', function() {
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
}, false);