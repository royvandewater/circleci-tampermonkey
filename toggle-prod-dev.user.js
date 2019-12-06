// ==UserScript==
// @name         Toggle Prod/Dev
// @namespace    http://royvandewater.com/
// @version      3.0
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/toggle-prod-dev.user.js
// @description  Toggle between production & development environments
// @author       You
// @match        https://app.circleci.com/*
// @match        https://circleci.jp/*
// @match        http://localhost:3000/*
// @match        http://app.circlehost:3000/*
// @grant        none
// @require      https://unpkg.com/hotkeys-js/dist/hotkeys.min.js
// ==/UserScript==

(function() {
    'use strict';

    window.hotkeys('command+k', () => {
        if (window.location.host.startsWith("app.circleci.com")) {
            window.location = "http://app.circlehost:3000" + window.location.pathname
            return
        }

        window.location = "https://app.circleci.com" + window.location.pathname
    })
})();
