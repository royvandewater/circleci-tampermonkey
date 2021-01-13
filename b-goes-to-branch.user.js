// ==UserScript==
// @name         B goes to branch
// @namespace    http://royvandewater.com/
// @version      1.0
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/b-goes-to-branch.user.js
// @description  Will navigate to the pipelines page for the current project & branch
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

  const branchASelector =
    'ol > li:nth-child(3) > div > a';

  const getBranchA = () =>
    new Promise(resolve => {
      const a = document.querySelector(branchASelector);

      if (a) return resolve(a);

      window.arrive(branchASelector, resolve);
    });

  window.hotkeys("b", async () => {
    const a = await getBranchA();
    a.click();
  });
})();
