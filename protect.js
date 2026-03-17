/**
 * WSET L3 Wine Atlas — Runtime Protection
 * Drop this into index.html as an inline <script> BEFORE the app module.
 * These are deterrents — not unbreakable walls — but they raise the
 * effort required to casually copy the application.
 */

(function () {
  'use strict';

  // ───────────────────────────────────────
  // 1. Console warning
  // ───────────────────────────────────────
  const _warn = function () {
    console.log(
      '%c⚠ WSET L3 Wine Atlas',
      'color:#8b0000;font-size:20px;font-weight:bold;font-family:serif'
    );
    console.log(
      '%cThis application is protected by copyright.\nUnauthorised copying, redistribution, or reverse-engineering is prohibited.',
      'color:#555;font-size:13px;font-family:serif'
    );
    console.log(
      '%cIf you are a WSET student looking for help, visit the app at its official URL.',
      'color:#888;font-size:11px;font-family:serif'
    );
  };
  _warn();

  // ───────────────────────────────────────
  // 2. Disable right-click context menu
  // ───────────────────────────────────────
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
  });

  // ───────────────────────────────────────
  // 3. Block common keyboard shortcuts
  //    Ctrl+U (view source), Ctrl+S (save),
  //    Ctrl+Shift+I/J/C (dev tools), F12
  // ───────────────────────────────────────
  document.addEventListener('keydown', function (e) {
    // F12
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }
    // Ctrl/Cmd + U (view source)
    if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
      e.preventDefault();
      return false;
    }
    // Ctrl/Cmd + S (save page)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      return false;
    }
    // Ctrl/Cmd + Shift + I, J, or C (dev tools panels)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['I','i','J','j','C','c'].includes(e.key)) {
      e.preventDefault();
      return false;
    }
  });

  // ───────────────────────────────────────
  // 4. Dev tools open detection
  //    Fires a debugger statement in a loop
  //    when dev tools are detected open.
  // ───────────────────────────────────────
  (function _dtCheck() {
    var el = new Image();
    Object.defineProperty(el, 'id', {
      get: function () {
        // If this getter fires, dev tools are inspecting the console
        document.title = '🔒';
        _warn();
      }
    });
    // Periodically log the trap object (only triggers getter when console is open)
    setInterval(function () {
      console.log('%c', el);
    }, 4000);
  })();

  // ───────────────────────────────────────
  // 5. Anti-iframe / clickjacking
  //    Prevent others from embedding your
  //    app in an iframe on their site.
  // ───────────────────────────────────────
  if (window.top !== window.self) {
    try {
      window.top.location = window.self.location;
    } catch (_) {
      // Cross-origin — blank it out
      document.body.innerHTML =
        '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:serif;color:#8b0000;font-size:18px">' +
        'This app cannot be embedded in an iframe.</div>';
    }
  }

  // ───────────────────────────────────────
  // 6. Disable text selection on body
  //    (CSS approach — applied via JS so it
  //    doesn't affect input fields)
  // ───────────────────────────────────────
  var style = document.createElement('style');
  style.textContent =
    'body{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}' +
    'input,textarea,pre,code{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}';
  document.head.appendChild(style);

  // ───────────────────────────────────────
  // 7. Disable drag (prevents dragging
  //    images / content out of the page)
  // ───────────────────────────────────────
  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
  });

  // ───────────────────────────────────────
  // 8. Disable copy/cut from the page
  // ───────────────────────────────────────
  document.addEventListener('copy', function (e) {
    e.preventDefault();
  });
  document.addEventListener('cut', function (e) {
    e.preventDefault();
  });

})();
