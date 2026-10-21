// Reference catalogue filtering: free text, stack tab and filter chips combine
// (AND across groups, OR within a group). Initial state comes from ?q=, ?stack=
// and ?role= so links from the home page land pre-filtered.
(function () {
  var list = document.getElementById("doc-list");
  if (!list) return;

  var items = Array.prototype.slice.call(list.querySelectorAll(".doc-item"));
  var searchInput = document.getElementById("doc-search");
  var tabs = Array.prototype.slice.call(
    document.querySelectorAll("#stack-tabs .ref-source-tab"),
  );
  var chips = Array.prototype.slice.call(
    document.querySelectorAll(".filter-chip"),
  );
  var results = document.getElementById("ref-results");
  var empty = document.getElementById("doc-empty");

  var state = { query: "", stack: "all" };

  function activeChipFilters() {
    var filters = {};
    chips.forEach(function (chip) {
      if (!chip.classList.contains("active")) return;
      var key = chip.dataset.filter;
      (filters[key] = filters[key] || []).push(chip.dataset.value);
    });
    return filters;
  }

  function apply() {
    var filters = activeChipFilters();
    var keys = Object.keys(filters);
    var shown = 0;
    items.forEach(function (item) {
      var visible =
        (state.stack === "all" || item.dataset.stack === state.stack) &&
        (!state.query ||
          item.dataset.search.toLowerCase().indexOf(state.query) !== -1) &&
        keys.every(function (key) {
          return filters[key].indexOf(item.dataset[key]) !== -1;
        });
      item.hidden = !visible;
      if (visible) shown++;
    });
    results.textContent =
      "Showing " + shown + " of " + items.length + " documents";
    empty.hidden = shown !== 0;
  }

  function selectStack(key) {
    state.stack = key;
    tabs.forEach(function (tab) {
      var selected = tab.dataset.stack === key;
      tab.classList.toggle("active", selected);
      tab.setAttribute("aria-selected", String(selected));
    });
    apply();
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      selectStack(tab.dataset.stack);
    });
  });

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var active = chip.classList.toggle("active");
      chip.setAttribute("aria-pressed", String(active));
      apply();
    });
  });

  searchInput.addEventListener("input", function () {
    state.query = searchInput.value.toLowerCase().trim();
    apply();
  });

  var params = new URLSearchParams(window.location.search);
  if (params.get("q")) {
    searchInput.value = params.get("q");
    state.query = searchInput.value.toLowerCase().trim();
  }
  var stackParam = params.get("stack");
  var knownStack = tabs.some(function (tab) {
    return tab.dataset.stack === stackParam;
  });
  selectStack(knownStack ? stackParam : "all");

  var role = params.get("role");
  if (role) {
    var roleBtn = document.querySelector(
      '.role-btn[data-role="' + CSS.escape(role) + '"]',
    );
    if (roleBtn) roleBtn.click();
  }
})();
