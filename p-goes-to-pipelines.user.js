// ==UserScript==
// @name         p goes to pipelines
// @namespace    http://royvandewater.com/
// @version      3.0
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/w-goes-to-workflow.user.js
// @description  Will navigate to the pipelines page when looking at the workflow or job page
// @author       Roy van de Water
// @match        https://app.circleci.com/*
// @match        https://circleci.jp/*
// @match        http://localhost:3000/*
// @match        http://app.circlehost:3000/*
// @grant        none
// @require      https://unpkg.com/hotkeys-js/dist/hotkeys.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/arrive/2.4.1/arrive.min.js
// ==/UserScript==

(function () {
  "use strict";

  const pipelinesSelector = 'ol > li:nth-child(2) > div > a';

  window.hotkeys("p", () => {
    const a = document.querySelector(pipelinesSelector);
    if (a) return a.click();

    const click = el => {
      window.unbindArrive(click);
      el.click();
    };

    window.arrive(pipelinesSelector, click);
    setTimeout(() => window.unbindArrive(click), 2000);
  });
})();
