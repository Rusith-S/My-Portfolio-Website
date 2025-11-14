document.addEventListener('DOMContentLoaded', () => {
    const side_menu = document.getElementById('sidemenu');

    // Configuration: whether clicking a menu item auto-closes the menu
    const AUTO_CLOSE_ON_ITEM_CLICK = false; // keep menu open until user closes it

    // Overlay element id
    const OVERLAY_ID = 'sidemenu-overlay';

    // State for detached behavior (to avoid stacking-context issues)
    let _originalParent = null;
    let _originalNext = null;
    let _detached = false;

    let lastFocused = null;
    let escHandler = null;
    let trapHandler = null;

    function createOverlay() {
        let o = document.getElementById(OVERLAY_ID);
        if (!o) {
            o = document.createElement('div');
            o.id = OVERLAY_ID;
            o.className = 'sidemenu-overlay';
            document.body.appendChild(o);
        }
        return o;
    }

    function detachIfNeeded() {
        if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) {
            if (!_detached && side_menu && side_menu.parentNode !== document.body) {
                _originalParent = side_menu.parentNode;
                _originalNext = side_menu.nextSibling;
                document.body.appendChild(side_menu);
                _detached = true;
            }
        }
    }

    function restoreIfNeeded() {
        if (_detached && _originalParent) {
            if (_originalNext && _originalNext.parentNode === _originalParent) {
                _originalParent.insertBefore(side_menu, _originalNext);
            } else {
                _originalParent.appendChild(side_menu);
            }
            _detached = false;
            _originalParent = null;
            _originalNext = null;
        }
    }

    function openmenu() {
        if (!side_menu) return;

        // detach to body on small screens to escape ancestor stacking contexts
        detachIfNeeded();

        side_menu.style.transition = side_menu.style.transition || 'right 0.35s ease';
        side_menu.classList.add('is-open');
        side_menu.setAttribute('aria-hidden', 'false');

        const overlay = createOverlay();
        overlay.classList.add('visible');
        document.body.classList.add('no-scroll');

        lastFocused = document.activeElement;
        const firstFocusable = side_menu.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) firstFocusable.focus();

        if (!escHandler) {
            escHandler = (e) => { if (e.key === 'Escape') closemenu(); };
            document.addEventListener('keydown', escHandler);
        }

        if (!trapHandler) {
            trapHandler = function (e) {
                if (e.key !== 'Tab') return;
                const focusables = Array.from(side_menu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')).filter(Boolean);
                if (focusables.length === 0) return;
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === first) { e.preventDefault(); last.focus(); }
                } else {
                    if (document.activeElement === last) { e.preventDefault(); first.focus(); }
                }
            };
            side_menu.addEventListener('keydown', trapHandler);
        }

        overlay.onclick = () => closemenu();
    }

    function closemenu() {
        if (!side_menu) return;

        side_menu.classList.remove('is-open');
        side_menu.setAttribute('aria-hidden', 'true');

        const overlay = document.getElementById(OVERLAY_ID);
        if (overlay) overlay.classList.remove('visible');
        document.body.classList.remove('no-scroll');

        if (escHandler) { document.removeEventListener('keydown', escHandler); escHandler = null; }
        if (trapHandler) { side_menu.removeEventListener('keydown', trapHandler); trapHandler = null; }

        try { if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus(); } catch (e) {}

        // restore back into header/nav if we detached it
        restoreIfNeeded();
    }

    // expose for inline handlers
    window.openmenu = openmenu;
    window.closemenu = closemenu;
    // also expose protected names
    window.__sidemenu_open = openmenu;
    window.__sidemenu_close = closemenu;

    // item click behavior (optional auto-close)
    if (side_menu) {
        side_menu.addEventListener('click', function (e) {
            if (!AUTO_CLOSE_ON_ITEM_CLICK) return;
            const a = e.target.closest('a');
            if (!a) return;
            const href = a.getAttribute('href') || '';
            if (href.startsWith('#') || href.startsWith(window.location.origin) || a.classList.contains('sidenav-link')) {
                setTimeout(closemenu, 40);
            }
        });
    }
});
