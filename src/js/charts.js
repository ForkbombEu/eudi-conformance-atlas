(function () {
  var COLORS_DOCS = [
    '#2d3a8c',  // EU legal — deep indigo
    '#7c3aed',  // ETSI — purple
    '#0891b2',  // OpenID — teal
    '#b45309',  // ISO — amber
    '#15803d',  // ARF — green
  ];
  var COLORS_TESTS = [
    '#7c3aed',  // wallet — purple
    '#b45309',  // issuer — amber
    '#15803d',  // verifier — green
    '#2d3a8c',  // trust — indigo
    '#9f1239',  // external — rose
  ];

  function drawDonut(canvasId, data, colors) {
    var canvas = document.getElementById(canvasId);
    if (!canvas || !canvas.getContext) return;

    // Size canvas to its CSS container width
    var container = canvas.parentElement;
    var W = container ? container.clientWidth - 48 : 400; // subtract padding
    var H = Math.round(W * 0.55);
    H = Math.max(H, 180);
    var dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';

    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    var total = data.values.reduce(function(a, b) { return a + b; }, 0);

    // Layout: donut on left third, legend on right two-thirds
    var donutR = Math.min(W * 0.22, H * 0.42);
    var cx = donutR + 16;
    var cy = H / 2;

    // Draw slices
    var startAngle = -Math.PI / 2;
    for (var i = 0; i < data.values.length; i++) {
      if (data.values[i] === 0) continue;
      var slice = (data.values[i] / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, donutR, startAngle, startAngle + slice);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      startAngle += slice;
    }

    // Donut hole
    ctx.beginPath();
    ctx.arc(cx, cy, donutR * 0.54, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Centre total
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#1e1b4b';
    ctx.font = 'bold ' + Math.round(donutR * 0.46) + 'px Manrope, system-ui, sans-serif';
    ctx.fillText(String(total), cx, cy - 4);
    ctx.fillStyle = '#9ca3af';
    ctx.font = '11px Manrope, system-ui, sans-serif';
    ctx.fillText('total', cx, cy + Math.round(donutR * 0.3));

    // Legend — right of donut
    var legendX = cx + donutR + 20;
    var rowH = Math.min(22, (H - 16) / data.labels.length);
    var legendTop = cy - (data.labels.length * rowH) / 2;

    ctx.textBaseline = 'middle';
    for (var j = 0; j < data.labels.length; j++) {
      var y = legendTop + j * rowH + rowH / 2;

      // Colour swatch
      ctx.beginPath();
      ctx.roundRect(legendX, y - 5, 10, 10, 2);
      ctx.fillStyle = colors[j % colors.length];
      ctx.fill();

      // Label
      ctx.textAlign = 'left';
      ctx.fillStyle = '#111827';
      ctx.font = '12px Manrope, system-ui, sans-serif';
      ctx.fillText(data.labels[j], legendX + 15, y);

      // Value — right-aligned
      ctx.textAlign = 'right';
      ctx.fillStyle = '#6b7280';
      ctx.font = 'bold 12px Manrope, system-ui, sans-serif';
      ctx.fillText(String(data.values[j]), W - 4, y);
    }
  }

  function init() {
    if (typeof ATLAS_DOC_DATA !== 'undefined') drawDonut('doc-chart', ATLAS_DOC_DATA, COLORS_DOCS);
    if (typeof ATLAS_TEST_DATA !== 'undefined') drawDonut('test-chart', ATLAS_TEST_DATA, COLORS_TESTS);
  }

  // Run after fonts and layout settle
  if (document.readyState === 'complete') {
    setTimeout(init, 50);
  } else {
    window.addEventListener('load', function() { setTimeout(init, 50); });
  }

  // Also redraw on resize
  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 100);
  });
})();
