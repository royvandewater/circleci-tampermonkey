// ==UserScript==
// @name         Toggle Prod/Dev
// @namespace    http://royvandewater.com/
// @version      2.1
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/toggle-prod-dev.user.js
// @description  Toggle between production & development environments
// @author       You
// @match        https://app.circleci.com/*
// @match        https://circleci.jp/*
// @grant        none
// @require      https://unpkg.com/hotkeys-js/dist/hotkeys.min.js
// ==/UserScript==

(function() {
    'use strict';

    window.hotkeys('command+k', () => {
        if (window.location.host.startsWith("circleci.jp")) {
            window.location = "https://app.circleci.com" + window.location.pathname
            return
        }

        window.location = "https://circleci.jp" + window.location.pathname
    })
})();
