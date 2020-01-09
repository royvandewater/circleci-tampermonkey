// ==UserScript==
// @name         W goes to workflow
// @namespace    http://royvandewater.com/
// @version      1.0
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/w-goes-to-workflow.user.js
// @description  Will navigate to the workflow page when looking at the job page
// @author       Roy van de Water
// @match        https://app.circleci.com/jobs/*
// @match        https://circleci.jp/jobs/*
// @match        http://localhost:3000/jobs/*
// @match        http://app.circlehost:3000/jobs/*
// @grant        none
// @require      https://unpkg.com/hotkeys-js/dist/hotkeys.min.js
// @require      https://code.jquery.com/jquery-3.4.1.js
// ==/UserScript==

(function() {
  "use strict";
  const $ = window.jQuery;
  $.noConflict(true);

  const getWorkflowA = () => {
    const pipelinesA = $("ol > li > a:contains(Pipelines)")[0];
    const breadCrumbs = pipelinesA.parentNode.parentNode;
    return $(breadCrumbs).find("a")[1];
  };

  window.hotkeys("w", () => {
    const a = getWorkflowA();
    if (!a) {
      console.warn("Could not find workflow link");
      return;
    }
    a.click();
  });
})();
