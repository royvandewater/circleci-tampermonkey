// ==UserScript==
// @name         Wait for Optimizely Updates
// @namespace    http://royvandewater.com/
// @version      1.0
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/l-goes-to-latest-workflow.user.js
// @description  Will let you know when a new version of Optimizely goes out when looking at the datafile
// @author       Roy van de Water
// @match        https://app.circleci.com/api/datafiles
// @grant        none
// ==/UserScript==

const { setTimeout } = require("globalthis/implementation");

(function () {
  "use strict";

  const getCurrentVersion = () => {
    const str = document.querySelector('pre').innerText
    return JSON.parse(str).revision
  }

  const fetchLatestVersion = async () => {
    const res = await fetch(location.toString())
    const body = await res.json()
    return body.revision
  }

  const buildNewRevisionMessage = (oldRevision, newRevision) => {
    let el = document.createElement('h1');

    el.id = "new-revision-message"
    el.innerText = `There is a new revision available. ${oldRevision} -> ${newRevision}`;
    el.style.backgroundColor = '#3595DC';
    el.style.borderBottomLeftRadius = '4px';
    el.style.borderBottomRightRadius = '4px';
    el.style.boxShadow = 'box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.17)'
    el.style.color = '#FFFFFF';
    el.style.margin = '0';
    el.style.position = 'fixed';
    el.style.padding = '16px';
    el.style.top = '-68px';
    el.style.left = '0';
    el.style.width = '100vw';
    el.style.textAlign = 'center';
    el.style.transition = 'top 0.5s ease';
    el.style.fontFamily = "'Roboto','Helvetica Neue',Helvetica,Arial,sans-serif";
    el.style.zIndex = 10;

    return el;
  }

  const cleanUpMessage = () => {
    const message = document.querySelector('#new-revision-message')
    if (message) message.remove();
  }

  let previousVersion = getCurrentVersion();
  const newRevisionCheck = async () => {
    const latestVersion = await fetchLatestVersion();

    if (previousVersion !== latestVersion) {
      cleanUpMessage()

      const message = buildNewRevisionMessage()
      document.body.prepend(message);
      document.addEventListener('click', () => message.remove());
    }

    previousVersion = latestVersion
    setTimeout(newRevisionCheck, 1000)
  }

  const getWorkflowId = () => {
    const parts = window.location.pathname.split('/')
    const index = parts.indexOf('workflows')
    return parts[index + 1]
  }

  window.hotkeys("l", async () => {
    if (!window.location.pathname.includes("/workflows/")) return;

    const workflowId = getWorkflowId();

    if (!workflowId) return;

    const waitingMessage = buildWaitingMessage();
    const a = await getBranchA();
    a.click();

    const click = el => {
      if (!el) return;
      if (el.href.includes(workflowId)) return;
      waitingMessage.remove()
      document.unbindArrive(click);
      el.click();
    };

    click(document.querySelector(workflowASelector))
    document.arrive(workflowASelector, click);
    document.body.prepend(waitingMessage);
    document.addEventListener('click', () => waitingMessage.remove());

    requestAnimationFrame(() => { waitingMessage.style.top = 0 });
  });
})();
