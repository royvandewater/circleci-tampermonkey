// ==UserScript==
// @name         Auto Collapse Primary Navigation
// @namespace    http://royvandewater.com/
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/auto-collapse-side-navigation.user.js
// @version      2.3
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

  const getElementByXpath = (path) => (
    document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  )

  const getButton = () => getEelmentdocument.querySelector('[aria-label="Toggle Primary Navigation Panel"]')
  const navigationExpanded = () => {
    const button = document.querySelector('a[title="Old Experience"]').clientWidth
    return button && button.clientWidth > 100;
  }

  const autoCollapse = () => {
    const button = getButton();
    if (!button) return;
    if (!navigationExpanded()) return;

    button.click();
  }
  setInterval(autoCollapse, 1000);
})();
