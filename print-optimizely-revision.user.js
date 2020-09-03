// ==UserScript==
// @name         Print the optimizely revision
// @namespace    http://royvandewater.com/
// @version      1.0
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/print-optimizely-revision.user.js
// @description  Print the optimizely revision in the datafile
// @author       Roy van de Water
// @match        https://cdn.optimizely.com/datafiles/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const str = document.querySelector('pre').innerText
  const { revision } = JSON.parse(str)
  return { revision }
})();
