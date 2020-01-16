// ==UserScript==
// @name         L goes to latest workflow
// @namespace    http://royvandewater.com/
// @version      1.1
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/l-goes-to-latest-workflow.user.js
// @description  Will navigate to the the latest workflow page of the current branch when looking at the workflow page
// @author       Roy van de Water
// @match        https://app.circleci.com/*
// @match        https://circleci.jp/*
// @match        http://localhost:3000/*
// @match        http://app.circlehost:3000/*
// @grant        none
// @require      https://unpkg.com/hotkeys-js/dist/hotkeys.min.js
// @require      https://code.jquery.com/jquery-3.4.1.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/arrive/2.4.1/arrive.min.js
// ==/UserScript==

(function() {
  "use strict";
  const $ = window.jQuery;
  $.noConflict(true);

  const branchASelector =
    "#__next > div > div > div > div > div > div > div > a";
  const workflowASelector =
    "#__next > div > main > div > div > div:nth-child(2) > div:nth-child(4) > a";

  const getBranchA = () => {
    return $(branchASelector)[0];
  };

  window.hotkeys("l", () => {
    if (!window.location.pathname.includes("/workflows/")) return;

    const a = getBranchA();
    if (!a) {
      console.warn("Could not find branch link");
      return;
    }
    a.click();

    const click = el => {
      document.unbindArrive(click);
      el.click();
    };

    document.arrive(workflowASelector, click);
  });
})();
