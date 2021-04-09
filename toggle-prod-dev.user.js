// ==UserScript==
// @name         Toggle Prod/Dev
// @namespace    http://royvandewater.com/
// @version      5.0
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/toggle-prod-dev.user.js
// @description  Toggle between production & development environments
// @author       You
// @match        https://app.circleci.com/*
// @match        https://ui.circleci.com/*
// @match        http://app.circlehost:3000/*
// @grant        none
// @require      https://unpkg.com/hotkeys-js/dist/hotkeys.min.js
// ==/UserScript==

(function() {
  "use strict";

  const { host, pathname, search } = window.location;
  const getNewHost = () => host.startsWith("app.circleci.com") ? 'https://ui.circleci.com' : 'https://app.circleci.com';

  window.hotkeys("command+k", () => {
    window.location = getNewHost() + pathname + search;
  });
})();
