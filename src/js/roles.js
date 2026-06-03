(function () {
  var toggleBtn = document.getElementById('role-toggle-btn');
  var sidebar = document.getElementById('role-sidebar');
  var closeBtn = document.getElementById('role-sidebar-close');
  var clearBtn = document.getElementById('role-clear-btn');
  var shell = document.getElementById('page-shell');
  var toggleLabel = document.getElementById('role-toggle-label');
  var toggleIcon = document.getElementById('role-toggle-icon');

  if (!toggleBtn || !sidebar) return;

  var activeRole = null;
  var activeHighlightDocs = [];
  var activeHighlightLayers = [];

  function openSidebar() {
    sidebar.classList.add('open');
    if (shell) shell.classList.add('role-sidebar-open');
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    if (shell) shell.classList.remove('role-sidebar-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    if (!activeRole) toggleBtn.classList.remove('active');
  }

  function setRole(key, highlightDocs, highlightLayers, label, icon) {
    activeRole = key;
    activeHighlightDocs = highlightDocs ? highlightDocs.split(',') : [];
    activeHighlightLayers = highlightLayers ? highlightLayers.split(',') : [];

    // Update toggle button
    toggleLabel.textContent = label;
    toggleIcon.textContent = icon;
    toggleBtn.classList.add('active');

    // Mark active role button
    document.querySelectorAll('.role-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.role === key);
    });

    // Apply highlight to doc items
    document.body.classList.add('role-active');

    document.querySelectorAll('.highlightable').forEach(function(el) {
      var highlighted = key === 'all' ||
        activeHighlightDocs.indexOf(el.dataset.docId || '') !== -1 ||
        activeHighlightLayers.indexOf(el.dataset.layer || '') !== -1;
      el.classList.toggle('role-highlight', highlighted);
    });

    // Apply to tree leaves
    document.querySelectorAll('.tree-leaf').forEach(function(el) {
      el.classList.toggle('role-highlight', key === 'all' || activeHighlightDocs.indexOf(el.dataset.docId || '') !== -1);
    });

    // Apply to layer doc chips
    document.querySelectorAll('.layer-doc-chip').forEach(function(el) {
      el.classList.toggle('role-highlight', key === 'all' || activeHighlightDocs.indexOf(el.dataset.docId || '') !== -1);
    });

    // Apply to test table rows
    document.querySelectorAll('.test-row').forEach(function(el) {
      var actor = el.dataset.actorKey || '';
      var relevant = key === 'all' ||
                     (activeRole === 'wallet-builder' && actor === 'wallet') ||
                     (activeRole === 'issuer' && actor === 'issuer') ||
                     (activeRole === 'verifier' && (actor === 'verifier' || actor === 'other')) ||
                     (activeRole === 'member-state' && actor === 'trust') ||
                     (activeRole === 'cab-nab' && (actor === 'trust' || actor === 'external'));
      el.classList.toggle('role-highlight', relevant);
    });

    // Store in sessionStorage
    try {
      sessionStorage.setItem('eudi-active-role', JSON.stringify({ key: key, docs: activeHighlightDocs, layers: activeHighlightLayers, label: label, icon: icon }));
    } catch(e) {}
  }

  function clearRole() {
    activeRole = null;
    activeHighlightDocs = [];
    activeHighlightLayers = [];
    document.body.classList.remove('role-active');
    document.querySelectorAll('.role-btn').forEach(function(btn) { btn.classList.remove('active'); });
    document.querySelectorAll('.highlightable, .tree-leaf, .layer-doc-chip, .test-row').forEach(function(el) {
      el.classList.remove('role-highlight');
    });
    toggleLabel.textContent = 'Role';
    toggleIcon.textContent = '👤';
    toggleBtn.classList.remove('active');
    try { sessionStorage.removeItem('eudi-active-role'); } catch(e) {}
  }

  // Toggle sidebar
  toggleBtn.addEventListener('click', function() {
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  closeBtn && closeBtn.addEventListener('click', closeSidebar);
  clearBtn && clearBtn.addEventListener('click', function() { clearRole(); closeSidebar(); });

  // Role button clicks
  sidebar.addEventListener('click', function(e) {
    var btn = e.target.closest('.role-btn');
    if (!btn) return;
    if (btn.dataset.role === activeRole) {
      clearRole();
    } else {
      var label = btn.querySelector('.role-btn-label').textContent;
      var icon = btn.querySelector('.role-btn-icon').textContent;
		setRole(btn.dataset.role, btn.dataset.highlightDocs, btn.dataset.highlightLayers, label, icon);
		closeSidebar();
    }
  });

  // Restore from sessionStorage
  try {
    var stored = sessionStorage.getItem('eudi-active-role');
    if (stored) {
      var r = JSON.parse(stored);
      // Re-apply after a short delay to let the DOM settle
      setTimeout(function() {
        setRole(r.key, r.docs.join(','), r.layers.join(','), r.label, r.icon);
      }, 50);
    }
  } catch(e) {}
})();
