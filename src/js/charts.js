(function () {
  var COLORS_DOCS  = ['#2d3a8c','#7c3aed','#0891b2','#b45309','#15803d'];
  var COLORS_TESTS = ['#7c3aed','#b45309','#15803d','#2d3a8c','#9f1239'];

  function drawDonut(canvasId, data, colors) {
    var canvas = document.getElementById(canvasId);
    if (!canvas || !canvas.getContext) return;

    // Read the container width ONCE. After this we set explicit px on the
    // canvas so CSS can never stretch/squish it again.
    var container = canvas.parentElement;
    var W = container ? container.offsetWidth - 32 : 400;
    W = Math.max(Math.min(W, 760), 200); // clamp 200–760px

    var dpr = window.devicePixelRatio || 1;

    var LEGEND_ROW_H = 22;
    var legendRows   = data.labels.length;
    var GAP          = 24;
    var VALUE_COL    = 28;
    var SWATCH_W     = 12;
    var SWATCH_GAP   = 6;

    var donutR    = Math.min(W * 0.30, 80);
    var donutDiam = donutR * 2;
    var innerR    = donutR * 0.54;

    var legendX = donutDiam + GAP * 2;
    var legendW = W - legendX - VALUE_COL - 4;

    var legendH = legendRows * LEGEND_ROW_H;
    var H = Math.max(donutDiam + 8, legendH + 8);

    // Set explicit pixel size — CSS must not override these
    canvas.width        = W * dpr;
    canvas.height       = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    canvas.style.maxWidth = 'none'; // prevent CSS 100% from taking over

    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    var total = data.values.reduce(function(a,b){ return a+b; }, 0);
    var cx = donutR + GAP;
    var cy = H / 2;

    var startAngle = -Math.PI / 2;
    for (var i = 0; i < data.values.length; i++) {
      if (!data.values[i]) continue;
      var slice = (data.values[i] / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, donutR, startAngle, startAngle + slice);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      startAngle += slice;
    }

    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    var fontSize = Math.max(Math.round(donutR * 0.44), 14);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#1e1b4b';
    ctx.font = 'bold ' + fontSize + 'px Manrope,system-ui,sans-serif';
    ctx.fillText(String(total), cx, cy - fontSize * 0.3);
    ctx.fillStyle = '#9ca3af';
    ctx.font = '11px Manrope,system-ui,sans-serif';
    ctx.fillText('total', cx, cy + fontSize * 0.5);

    var legTop = cy - legendH / 2;
    ctx.textBaseline = 'middle';
    for (var j = 0; j < data.labels.length; j++) {
      var ry = legTop + j * LEGEND_ROW_H + LEGEND_ROW_H / 2;

      ctx.fillStyle = colors[j % colors.length];
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(legendX, ry - 5, SWATCH_W, 10, 2);
      } else {
        ctx.rect(legendX, ry - 5, SWATCH_W, 10);
      }
      ctx.fill();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#111827';
      ctx.font = '12px Manrope,system-ui,sans-serif';
      var lbl = data.labels[j];
      while (lbl.length > 3 && ctx.measureText(lbl).width > legendW) {
        lbl = lbl.slice(0, -2) + '…';
      }
      ctx.fillText(lbl, legendX + SWATCH_W + SWATCH_GAP, ry);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#6b7280';
      ctx.font = 'bold 12px Manrope,system-ui,sans-serif';
      ctx.fillText(String(data.values[j]), W - 4, ry);
    }
  }

  function init() {
    if (typeof ATLAS_DOC_DATA  !== 'undefined') drawDonut('doc-chart',  ATLAS_DOC_DATA,  COLORS_DOCS);
    if (typeof ATLAS_TEST_DATA !== 'undefined') drawDonut('test-chart', ATLAS_TEST_DATA, COLORS_TESTS);
  }

  // Draw exactly once, when the container has its layout width.
  // Never redraw on resize — canvas has explicit px size so it won't distort.
  if (document.readyState === 'complete') {
    setTimeout(init, 0);
  } else {
    window.addEventListener('load', init);
  }
})();
