// Polyfill
import 'whatwg-fetch';

// Import Highway
import Highway from 'highway';

// Renderers
import Examples from 'renderers/examples';
import GetStarted from 'renderers/get-started';
import Installation from 'renderers/installation';

// Transitions
import Fade from 'transitions/fade';
import Overlap from 'transitions/overlap';
import Basic from 'transitions/basic';

(() => {
  const $menuToggler = document.querySelector('.js-toggle-menu');
  const $siteHeader = document.querySelector('.js-site-header');

  if ('scrollRestoration' in history) {
    // Back off, browser, I got this...
    history.scrollRestoration = 'manual';
  }

  $menuToggler.addEventListener('click', () => {
    // Update Body
    document.body.classList.toggle('menu-open');

    // Update DOM
    $siteHeader.classList.toggle('is-open');
  });

  // Highway
  const H = new Highway.Core({
    renderers: {
      'examples': Examples,
      'get-started': GetStarted,
      'installation': Installation
    },
    transitions: {
      default: Fade,
      contextual: {
        basic: Basic,
        overlap: Overlap
      }
    }
  });

  // Events
  const links = document.querySelectorAll('.site-menu a');

  H.on('NAVIGATE_IN', ({ location }) => {
    // Check Active Link
    for (let i = 0; i < links.length; i++) {
      const link = links[i];

      // Clean class
      link.classList.remove('is-active');

      // Active link
      if (link.href === location.href) {
        link.classList.add('is-active');
      }
    }
  });

  H.on('NAVIGATE_END', ({ to, location }) => {
    // Check Anchor
    if (location.anchor) {
      const el = document.querySelector(location.anchor);

      if (el) {
        window.scrollTo(el.offsetLeft, el.offsetTop);
      }
    }

    // Page View
    if (typeof gtag !== 'undefined') {
      // eslint-disable-next-line
      gtag('config', 'UA-125659111-1', {
        'page_path': location.pathname,
        'page_title': to.page.title,
        'page_location': location.href
      });
    }
  });

  H.on('NAVIGATE_OUT', () => {
    // Close menu
    $siteHeader.classList.remove('is-open');
  });
})();
