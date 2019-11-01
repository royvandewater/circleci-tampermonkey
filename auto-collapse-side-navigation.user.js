// ==UserScript==
// @name         Auto Collapse Primary Navigation
// @namespace    http://royvandewater.com/
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/auto-collapse-side-navigation.user.js
// @version      2.0
// @description  Automatically close the primary navigation on initial page load
// @author       Roy van de Water
// @match        https://app.circleci.com/*
// @match        http://localhost:3000/*
// @match        http://app.circlehost:3000/*
// @match        https://circleci.jp/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/arrive/2.4.1/arrive.min.js
// @grant        none
// ==/UserScript==
//
//

(function() {
  "use strict";

  const navigationExpanded = () => document.querySelector("nav").clientWidth > 100;

  document.arrive('[aria-label="Toggle Primary Navigation Panel"]', button => {
    if (navigationExpanded()) {
      button.click();
    }
  });
})();
