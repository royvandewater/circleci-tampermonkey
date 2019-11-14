// ==UserScript==
// @name         Remove _blank
// @namespace    http://royvandewater.com/
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/remove-_blank.user.js
// @version      1.0
// @description  Remove all target="_blank" statements to links act like links
// @author       Roy van de Water
// @match        https://app.circleci.com/jobs/*
// @match        http://localhost:3000/jobs/*
// @match        http://app.circlehost:3000/jobs/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/arrive/2.4.1/arrive.min.js
// @grant        none
// ==/UserScript==

(function() {
  "use strict";

  const linkMatcher = 'a[target="_blank"]';

  document.arrive(linkMatcher, a => {
    a.removeAttribute("target");
  });
})();
