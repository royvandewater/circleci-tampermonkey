// ==UserScript==
// @name         W goes to workflow
// @namespace    http://royvandewater.com/
// @version      2.3
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/w-goes-to-workflow.user.js
// @description  Will navigate to the workflow page when looking at the job page
// @author       Roy van de Water
// @match        https://app.circleci.com/*
// @match        https://ui.circleci.com/*
// @match        https://circleci.jp/*
// @match        http://localhost:3000/*
// @match        http://app.circlehost:3000/*
// @match        https://app.k9s.sphereci.com/*
// @grant        none
// @require      https://unpkg.com/hotkeys-js/dist/hotkeys.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/arrive/2.4.1/arrive.min.js
// ==/UserScript==

(function () {
  "use strict";

  const workflowSelector = 'ol > li:nth-child(4) > div > a';

  window.hotkeys("w", () => {
    const a = document.querySelector(workflowSelector);
    if (a) return a.click();

    const click = el => {
      window.unbindArrive(click);
      el.click();
    };

    window.arrive(workflowSelector, click);
  });
})();
