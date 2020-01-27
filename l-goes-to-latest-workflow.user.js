// ==UserScript==
// @name         L goes to latest workflow
// @namespace    http://royvandewater.com/
// @version      1.2
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/l-goes-to-latest-workflow.user.js
// @description  Will navigate to the the latest workflow page of the current branch when looking at the workflow page
// @author       Roy van de Water
// @match        https://app.circleci.com/*
// @match        https://circleci.jp/*
// @match        http://localhost:3000/*
// @match        http://app.circlehost:3000/*
// @grant        none
// @require      https://unpkg.com/hotkeys-js/dist/hotkeys.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/arrive/2.4.1/arrive.min.js
// ==/UserScript==

(function() {
  "use strict";

  const branchASelector =
    "#__next > div > div > div > div > div > div > div > a";
  const workflowASelector =
    "#__next > div > main > div > div > div:nth-child(2) > div:nth-child(3) > a";

  const getBranchA = async () => (
    new Promise(resolve => {
      const a = document.querySelector(branchASelector);

      if (a) return resolve(a);

      window.arrive(branchASelector, resolve);
    }),
  );

  window.hotkeys("l", async () => {
    if (!window.location.pathname.includes("/workflows/")) return;

    const workflowId = window.location.pathname.split('/').pop();

    const a = await getBranchA();
    a.click();

    const click = el => {
      if (el.href.includes(workflowId)) return;
      document.unbindArrive(click);
      el.click();
    };

    document.arrive(workflowASelector, click);
  });
})();
