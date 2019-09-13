// ==UserScript==
// @name         Auto Close Side Panel
// @namespace    http://royvandewater.com/
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/auto-hide-sidebar.user.js
// @version      1.4
// @description  Automatically close the side panel on initial page load
// @author       Roy van de Water
// @match        https://app.circleci.com/jobs/*
// @match        http://localhost:3000/jobs/*
// @match        http://app.circlehost:3000/jobs/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/arrive/2.4.1/arrive.min.js
// @grant        none
// ==/UserScript==

(function() {
  "use strict";

  const closeButtonMatcher = '[aria-label="Close Details Pane"]';
  const openButtonMatcher = '[aria-label="Open Details Pane"]';

  let active = true;

  const click = element => {
    if (!active) return;
    element.click();
  };

  document.arrive(closeButtonMatcher, click);
  document.arrive(openButtonMatcher, () => {
    active = false;
  });
})();
