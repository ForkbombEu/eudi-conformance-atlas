// Client-side search for documents and evidence claims
// All data comes from DOM elements populated by 11ty at build time

(function () {
  const searchInput = document.getElementById("landing-search") || document.getElementById("doc-search") || document.getElementById("evidence-search");
  if (!searchInput) return;

  // Collect searchable items from the DOM
  function getItems(selector) {
    var items = [];
    document.querySelectorAll(selector).forEach(function (el) {
      items.push({
        el: el,
        text: (el.dataset.name || el.dataset.title || "") + " " +
              (el.dataset.id || el.dataset.slug || "") + " " +
              (el.dataset.summary || el.dataset.description || ""),
      });
    });
    return items;
  }

  var docItems = getItems(".doc-item");
  var evItems = getItems(".evidence-item");
  var allItems = docItems.concat(evItems);

  var resultsContainer = document.getElementById("search-results");
  var defaultContent = document.getElementById("default-content");

  function escHTML(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  searchInput.addEventListener("input", function () {
    var query = this.value.toLowerCase().trim();
    var safeQuery = escHTML(this.value);

    if (!query) {
      if (resultsContainer) resultsContainer.style.display = "none";
      if (defaultContent) defaultContent.style.display = "";
      allItems.forEach(function (item) { item.el.style.display = ""; });
      return;
    }

    // Filter DOM items
    var foundCount = 0;
    allItems.forEach(function (item) {
      if (item.text.toLowerCase().indexOf(query) !== -1) {
        item.el.style.display = "";
        foundCount++;
      } else {
        item.el.style.display = "none";
      }
    });

    // On landing page, show results count
    if (resultsContainer) {
      resultsContainer.style.display = foundCount > 0 ? "" : "none";

      // Clear previous content
      while (resultsContainer.firstChild) {
        resultsContainer.removeChild(resultsContainer.firstChild);
      }

      if (foundCount > 0) {
        var header = document.createElement("div");
        header.className = "section-header";
        var h2 = document.createElement("h2");
        h2.textContent = "Results";
        var chip = document.createElement("span");
        chip.className = "count-chip";
        chip.textContent = String(foundCount);
        h2.appendChild(chip);
        header.appendChild(h2);
        resultsContainer.appendChild(header);
      } else {
        var empty = document.createElement("div");
        empty.className = "card";
        empty.style.cssText = "text-align:center;padding:var(--space-8)";
        var p = document.createElement("p");
        p.className = "text-muted";
        p.textContent = "No results found for \"" + this.value + "\"";
        empty.appendChild(p);
        resultsContainer.appendChild(empty);
      }
    }

    if (defaultContent) defaultContent.style.display = "none";
  });

  // Filter bar logic
  var filterBars = document.querySelectorAll(".filter-bar");
  filterBars.forEach(function (bar) {
    bar.addEventListener("click", function (e) {
      var chip = e.target.closest(".filter-chip");
      if (!chip) return;

      var isActive = chip.classList.toggle("active");
      chip.setAttribute("aria-pressed", String(isActive));

      // Collect active filters
      var activeFilters = {};
      bar.querySelectorAll(".filter-chip.active").forEach(function (c) {
        var key = c.dataset.filter;
        if (!activeFilters[key]) activeFilters[key] = [];
        activeFilters[key].push(c.dataset.value);
      });

      var itemSelector = bar.id === "evidence-filter" ? ".evidence-item" : ".doc-item";
      var items = document.querySelectorAll(itemSelector);

      items.forEach(function (item) {
        var filterKeys = Object.keys(activeFilters);
        if (filterKeys.length === 0) {
          item.style.display = "";
          return;
        }
        var show = true;
        for (var i = 0; i < filterKeys.length; i++) {
          var key = filterKeys[i];
          if (activeFilters[key].indexOf(item.dataset[key]) === -1) {
            show = false;
            break;
          }
        }
        item.style.display = show ? "" : "none";
      });
    });
  });
})();
