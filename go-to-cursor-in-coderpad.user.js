// ==UserScript==
// @name         go-to-cursor-in-coderpad
// @namespace    http://royvandewater.com/
// @version      1.2
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/go-to-cursor-in-coderpad.user.js
// @description  Will scroll to bring someone's cursor in view when you click their name
// @author       Roy van de Water
// @match        https://app.coderpad.io/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/arrive/2.4.1/arrive.min.js
// ==/UserScript==

(function () {
  "use strict";

  const $ = window.$

  const findCursor = (color) => {
    for (const el of $('.other-client')) {
      if (el.style['border-left'].includes(color)) {
        return el;
      }
    }
  }

  window.arrive('.UserList-user', (userEl) => {
    $(userEl).on('click', (event) => {
      const color = $(event.currentTarget).find('.UserList-colorIndicator')[0].style['background-color']
      const cursor = findCursor(color)
      if (!cursor) {
        console.warn('no cursor found for user')
        return;
      }

      const $pre = $($(cursor).closest('pre'))
      const $row = $($pre.parent())

      $row.css(`background-color`, color)

      requestAnimationFrame(() => {
        $row.css(`transition`, `background-color ease-out 1s`)
        $row.css(`background-color`, 'rgba(0, 0, 0, 0)')
        setTimeout(() => {
          $row.css(`transition`, '')
        }, 500)
      })
    })
  })
})();
