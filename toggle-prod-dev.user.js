// ==UserScript==
// @name         Toggle Prod/Dev
// @namespace    http://royvandewater.com/
// @version      1.0
// @updateURL    https://gist.github.com/royvandewater/04d024bf19c88cb1e3a77d067269d86f/raw/toggle-prod.user.js
// @description  Toggle between production & development environments
// @author       You
// @match        https://app.circleci.com/*
// @match        http://localhost:3000/*
// @grant        none
// @require      https://unpkg.com/hotkeys-js/dist/hotkeys.min.js
// ==/UserScript==

(function() {
    'use strict';

    window.hotkeys('command+k', () => {
        if (window.location.host.startsWith("localhost")) {
            window.location = "https://app.circleci.com" + window.location.pathname
            return
        }

        window.location = "http://localhost:3000" + window.location.pathname
    })
})();