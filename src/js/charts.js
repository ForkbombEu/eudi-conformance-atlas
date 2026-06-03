(function () {
  var COLORS_DOCS  = ['#2d3a8c','#7c3aed','#0891b2','#b45309','#15803d'];
  var COLORS_TESTS = ['#7c3aed','#b45309','#15803d','#2d3a8c','#9f1239'];

  function drawDonut(canvasId, data, colors) {
    var canvas = document.getElementById(canvasId);
    if (!canvas || !canvas.getContext) return;

    var container = canvas.parentElement;
   var W = container ? Math.floor(Math.min(container.clientWidth, window.innerWidth) - 32) : 340;
    W = Math.max(W, 200);
    var dpr = window.devicePixelRatio || 1;

    // Decide layout: side-by-side if wide enough, stacked otherwise
    var SIDE_THRESHOLD = 380;
    var stacked = W < SIDE_THRESHOLD;

    // Legend metrics
    var LEGEND_ROW_H = 22;
    var legendRows = data.labels.length;
    var legendH = legendRows * LEGEND_ROW_H + 8;

    // Donut size
    var donutDiam = stacked ? Math.min(W * 0.55, 160) : Math.min(W * 0.38, 160);
    var donutR = donutDiam / 2;
    var innerR = donutR * 0.54;

    // Canvas height
    var H;
    if (stacked) {
      H = donutDiam + 16 + legendH + 8;
    } else {
      H = Math.max(donutDiam + 16, legendH + 24);
    }

    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';

    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    var total = data.values.reduce(function(a,b){return a+b;},0);

    // Donut position
    var cx, cy;
    if (stacked) {
      cx = W / 2;
      cy = donutR + 8;
    } else {
      cx = donutR + 8;
      cy = H / 2;
    }

    // Slices
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

    // Hole
    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Centre text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#1e1b4b';
    ctx.font = 'bold ' + Math.round(donutR * 0.44) + 'px Manrope,system-ui,sans-serif';
    ctx.fillText(String(total), cx, cy - 3);
    ctx.fillStyle = '#9ca3af';
    ctx.font = '11px Manrope,system-ui,sans-serif';
    ctx.fillText('total', cx, cy + Math.round(donutR * 0.28));

    // Legend
    var legX, legY;
    if (stacked) {
      legX = 8;
      legY = donutDiam + 20;
    } else {
      legX = cx + donutR + 18;
      legY = cy - (legendRows * LEGEND_ROW_H) / 2 + 4;
    }

    var maxLabelW = stacked ? W - 50 : W - legX - 36;

    ctx.textBaseline = 'middle';
    for (var j = 0; j < data.labels.length; j++) {
      var ry = legY + j * LEGEND_ROW_H + LEGEND_ROW_H / 2;

      // Swatch
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(legX, ry - 5, 10, 10, 2);
      } else {
        ctx.rect(legX, ry - 5, 10, 10);
      }
      ctx.fillStyle = colors[j % colors.length];
      ctx.fill();

      // Label — truncate if needed
      ctx.textAlign = 'left';
      ctx.fillStyle = '#111827';
      ctx.font = '12px Manrope,system-ui,sans-serif';
      var label = data.labels[j];
      while (ctx.measureText(label).width > maxLabelW && label.length > 4) {
        label = label.slice(0, -2) + '…';
      }
      ctx.fillText(label, legX + 15, ry);

      // Count
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

  if (document.readyState === 'complete') {
    setTimeout(init, 50);
  } else {
    window.addEventListener('load', function(){ setTimeout(init, 50); });
  }

  var resizeTimer;
  window.addEventListener('resize', function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 120);
  });
})();
