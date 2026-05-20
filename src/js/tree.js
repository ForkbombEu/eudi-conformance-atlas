// Interactive tree map for EUDI document landscape
// All data comes from the embedded JSON populated by 11ty at build time

(function () {
  var container = document.getElementById("tree-container");
  var searchInput = document.getElementById("tree-search");
  var detailCard = document.getElementById("tree-detail-card");
  var sidePanel = document.getElementById("tree-side-panel");

  if (!container) return;

  // Parse embedded data and path prefix
  var dataScript = document.getElementById("tree-data");
  if (!dataScript) return;
  var data = JSON.parse(dataScript.textContent);
  var pathPrefix = container.dataset.pathPrefix || "/eudi-conformance-atlas/";

  var documents = data.documents;
  var groups = data.groups;
  var byId = data.byId;

  function esc(str) {
    if (!str) return "";
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function getSourceClass(type) {
    var map = {
      regulation: "badge-legal", implementing_regulation: "badge-legal",
      implementing_decision: "badge-legal", directive: "badge-legal",
      consolidated_regulation: "badge-legal", recommendation: "badge-legal",
      architecture_reference_framework: "badge-technical",
      project_working_documentation: "badge-technical",
    };
    return map[type] || "badge-neutral";
  }

  function getSourceLabel(type) {
    var map = {
      regulation: "Regulation", implementing_regulation: "Implementing Regulation",
      implementing_decision: "Implementing Decision", directive: "Directive",
      consolidated_regulation: "Consolidated Regulation", recommendation: "Recommendation",
      architecture_reference_framework: "ARF", project_working_documentation: "WE BUILD",
    };
    return map[type] || type;
  }

  // Build tree structure from logical groups
  function buildTree() {
    var tree = [];
    for (var i = 0; i < groups.length; i++) {
      var group = groups[i];
      var groupNode = {
        type: "group",
        id: group.group_slug,
        title: group.title,
        explanation: group.explanation,
        children: [],
      };

      for (var j = 0; j < (group.steps || []).length; j++) {
        var step = group.steps[j];
        var stepNode = {
          type: "step",
          id: group.group_slug + "-" + step.step.replace(/\s+/g, "-").toLowerCase(),
          title: step.step,
          subSteps: step.sub_steps || [],
          children: [],
        };

        for (var k = 0; k < (step.documents || []).length; k++) {
          var docId = step.documents[k];
          var doc = byId[docId];
          if (doc) {
            stepNode.children.push({
              type: "document",
              id: doc.id,
              title: doc.name,
              docType: doc.type,
              summary: doc.summary,
              url: pathPrefix + "documents/" + doc.id + "/",
              officialUrl: doc.url,
            });
          }
        }

        groupNode.children.push(stepNode);
      }

      tree.push(groupNode);
    }
    return tree;
  }

  var treeData = buildTree();

  function createToggleIcon() {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "toggle-icon");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M9 18l6-6-6-6");
    svg.appendChild(path);
    return svg;
  }

  function renderNode(node) {
    var div = document.createElement("div");
    div.className = "tree-node";
    div.dataset.searchText = (node.title + " " + (node.id || "")).toLowerCase();

    if (node.type === "document") {
      var leaf = document.createElement("div");
      leaf.className = "tree-leaf";

      var link = document.createElement("a");
      link.href = node.url;
      link.textContent = node.title;
      leaf.appendChild(link);

      var badge = document.createElement("span");
      badge.className = "badge " + getSourceClass(node.docType);
      badge.style.cssText = "margin-left:8px";
      badge.textContent = getSourceLabel(node.docType);
      leaf.appendChild(badge);

      if (node.officialUrl) {
        var extLink = document.createElement("a");
        extLink.href = node.officialUrl;
        extLink.target = "_blank";
        extLink.rel = "noopener";
        extLink.className = "text-xs text-muted";
        extLink.style.cssText = "margin-left:4px";
        extLink.textContent = "↗";
        leaf.appendChild(extLink);
      }

      link.addEventListener("click", function (e) {
        e.preventDefault();
        showDetail(node);
      });

      div.appendChild(leaf);

    } else {
      var toggle = document.createElement("div");
      toggle.className = "tree-node-toggle";

      toggle.appendChild(createToggleIcon());

      var label = document.createElement("span");
      label.textContent = node.title;
      toggle.appendChild(label);

      var countBadge = document.createElement("span");
      countBadge.className = "badge badge-neutral";
      countBadge.style.cssText = "margin-left:4px";
      countBadge.textContent = String(node.children ? node.children.length : 0);
      toggle.appendChild(countBadge);

      div.appendChild(toggle);

      var childrenContainer = document.createElement("div");
      childrenContainer.className = "tree-children";

      for (var i = 0; i < (node.children || []).length; i++) {
        childrenContainer.appendChild(renderNode(node.children[i]));
      }
      div.appendChild(childrenContainer);

      toggle.addEventListener("click", function () {
        if (div.classList.contains("expanded")) {
          div.classList.remove("expanded");
        } else {
          div.classList.add("expanded");
        }
      });
    }

    return div;
  }

  function showDetail(node) {
    if (!detailCard || !sidePanel) return;
    sidePanel.style.display = "block";

    // Clear card
    while (detailCard.firstChild) {
      detailCard.removeChild(detailCard.firstChild);
    }

    // Header
    var header = document.createElement("div");
    header.style.cssText = "margin-bottom:var(--space-4)";

    var h4 = document.createElement("h4");
    h4.style.cssText = "font-size:var(--fs-md);font-weight:700";
    h4.textContent = node.title;
    header.appendChild(h4);

    var typeBadge = document.createElement("span");
    typeBadge.className = "badge " + getSourceClass(node.docType);
    typeBadge.textContent = getSourceLabel(node.docType);
    header.appendChild(typeBadge);

    var idSpan = document.createElement("span");
    idSpan.className = "font-mono text-xs text-muted";
    idSpan.style.cssText = "margin-left:var(--space-2)";
    idSpan.textContent = node.id;
    header.appendChild(idSpan);

    detailCard.appendChild(header);

    // Summary
    if (node.summary) {
      var summary = document.createElement("p");
      summary.className = "text-sm";
      summary.style.cssText = "line-height:1.6;margin-bottom:var(--space-4)";
      summary.textContent = node.summary;
      detailCard.appendChild(summary);
    }

    // Actions
    var actions = document.createElement("div");
    actions.style.cssText = "display:flex;flex-direction:column;gap:var(--space-2)";

    var detailLink = document.createElement("a");
    detailLink.href = node.url;
    detailLink.className = "btn btn-outline btn-sm";
    detailLink.textContent = "View full details ↗";
    actions.appendChild(detailLink);

    if (node.officialUrl) {
      var officialLink = document.createElement("a");
      officialLink.href = node.officialUrl;
      officialLink.target = "_blank";
      officialLink.rel = "noopener";
      officialLink.className = "btn btn-ghost btn-sm";
      officialLink.textContent = "Official source ↗";
      actions.appendChild(officialLink);
    }

    detailCard.appendChild(actions);
  }

  // Render tree
  for (var n = 0; n < treeData.length; n++) {
    container.appendChild(renderNode(treeData[n]));
  }

  // Expand first level by default
  var topNodes = container.children;
  for (var t = 0; t < topNodes.length; t++) {
    topNodes[t].classList.add("expanded");
  }

  // Search
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      var query = this.value.toLowerCase().trim();
      var allNodes = container.querySelectorAll(".tree-node");

      for (var a = 0; a < allNodes.length; a++) {
        var node = allNodes[a];

        if (!query) {
          node.style.display = "";
          continue;
        }

        var text = node.dataset.searchText || "";
        if (text.indexOf(query) !== -1) {
          node.style.display = "";
          // Expand parents
          var parent = node.parentElement;
          while (parent && parent !== container) {
            if (parent.classList.contains("tree-node")) {
              parent.classList.add("expanded");
            }
            parent = parent.parentElement;
          }
        } else if (node.querySelector(".tree-leaf")) {
          node.style.display = "none";
        }
      }
    });
  }
})();
