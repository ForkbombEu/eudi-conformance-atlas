// Momentum chart interaction: a vertical crosshair that follows the pointer
// and a styled tooltip listing the count per stack band for that half-year.
(function () {
  var fig = document.querySelector(".momentum-figure");
  if (!fig) return;
  var svg = fig.querySelector(".momentum-svg");
  var tip = fig.querySelector(".momentum-tooltip");
  var points = Array.prototype.slice.call(
    fig.querySelectorAll(".momentum-point"),
  );
  if (!svg || !points.length) return;

  var vb = svg.viewBox.baseVal;
  var line = svg.querySelector(".momentum-crosshair");
  if (!line) {
    line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("class", "momentum-crosshair");
    svg.appendChild(line);
  }

  // band order + colour, read from the rendered area labels so the legend and
  // the tooltip always agree
  var bands = Array.prototype.slice
    .call(svg.querySelectorAll(".momentum-area-label"))
    .map(function (t) {
      return {
        key: t.classList[1].replace("momentum-area-label-", ""),
        name: t.textContent.trim(),
      };
    });

  function nearest(viewX) {
    var best = points[0];
    var bd = Infinity;
    for (var i = 0; i < points.length; i++) {
      var cx = +points[i].getAttribute("cx");
      var d = Math.abs(cx - viewX);
      if (d < bd) {
        bd = d;
        best = points[i];
      }
    }
    return best;
  }

  function render(p) {
    var x = +p.getAttribute("cx");
    line.setAttribute("x1", x);
    line.setAttribute("y1", 14);
    line.setAttribute("x2", x);
    line.setAttribute("y2", vb.height - 14);

    var tipText = p.getAttribute("data-tip") || "";
    var parts = tipText.split(" · ");
    var head = parts[0];
    var segs = parts.slice(1);

    var html = '<div class="m-tip-head">' + head + "</div>";
    for (var b = 0; b < bands.length; b++) {
      var band = bands[b];
      var seg = null;
      for (var s = 0; s < segs.length; s++) {
        if (segs[s].indexOf(band.name) === 0) {
          seg = segs[s];
          break;
        }
      }
      var count = seg ? seg.split(": ")[1] : "0";
      html +=
        '<div class="m-tip-row">' +
        '<span class="m-dot m-dot-' +
        band.key +
        '"></span>' +
        '<span class="m-name">' +
        band.name +
        "</span>" +
        '<span class="m-count">' +
        count +
        "</span>" +
        "</div>";
    }
    tip.innerHTML = html;
  }

  function position(e) {
    var r = svg.getBoundingClientRect();
    var sx = (e.clientX - r.left) / r.width;
    var sy = (e.clientY - r.top) / r.height;
    var vx = sx * vb.width;

    var p = nearest(vx);
    render(p);

    var tw = 200;
    var tx = e.clientX - r.left + 14;
    var ty = e.clientY - r.top - 10;
    if (tx + tw > r.width) tx = r.width - tw - 8;
    if (tx < 8) tx = 8;
    if (sy < 0.5) {
      ty = e.clientY - r.top + 14;
      tip.classList.add("below");
      tip.classList.remove("above");
    } else {
      tip.classList.add("above");
      tip.classList.remove("below");
    }
    tip.style.left = tx + "px";
    tip.style.top = ty + "px";
    tip.classList.add("visible");
    line.style.opacity = "1";
  }

  function hide() {
    tip.classList.remove("visible", "above", "below");
    line.style.opacity = "0";
  }

  svg.addEventListener("mousemove", position);
  svg.addEventListener("mouseleave", hide);
})();
