// ==UserScript==
// @name         Format Optimizely datafile
// @namespace    http://royvandewater.com/
// @version      1.0
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/format-optimizely-datafile.user.js
// @description  Pretty prints the datafile
// @author       Roy van de Water
// @match        https://app.circleci.com/api/datafiles/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const str = document.querySelector('pre').innerText

  const obj = JSON.parse(str)

  document.querySelector('pre').innerText = JSON.stringify(obj, null, 2)
})();