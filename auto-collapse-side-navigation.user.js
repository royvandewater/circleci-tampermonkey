// ==UserScript==
// @name         Auto Collapse Primary Navigation
// @namespace    http://royvandewater.com/
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/auto-collapse-side-navigation.user.js
// @version      2.2
// @description  Automatically close the primary navigation on initial page load
// @author       Roy van de Water
// @match        https://app.circleci.com/*
// @match        http://localhost:3000/*
// @match        http://app.circlehost:3000/*
// @match        https://circleci.jp/*
// @grant        none
// ==/UserScript==
//
//

(function() {
  "use strict";

  const getButton = () => document.querySelector('[aria-label="Toggle Primary Navigation Panel"]')
  const navigationExpanded = () => {
    const nav = document.querySelector("nav");
    return nav && nav.clientWidth > 100;
  }

  const autoCollapse = () => {
    const button = getButton();
    if (!button) return;
    if (!navigationExpanded()) return;

    button.click();
  }
  setInterval(autoCollapse, 1000);
})();
