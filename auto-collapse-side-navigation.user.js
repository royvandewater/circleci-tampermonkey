// ==UserScript==
// @name         Auto Collapse Side Navigation
// @namespace    http://royvandewater.com/
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/auto-collapse-side-navigation.user.js
// @version      1.0
// @description  Automatically close the side navigation on initial page load
// @author       Roy van de Water
// @match        https://app.circleci.com/*
// @match        http://localhost:3000/*
// @match        http://app.circlehost:3000/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/arrive/2.4.1/arrive.min.js
// @grant        none
// ==/UserScript==
//
//

(function() {
    'use strict';

    const navigationExpanded = () => $('nav > div').clientWidth > 100

    let active = true;

    document.arrive('[data-testid="NavBarCollapseIconBottom"]', button => {
      if (!active) return ();

      if (navigationExpanded) {
        active = false;
        button.click();
      }
    });
})();
