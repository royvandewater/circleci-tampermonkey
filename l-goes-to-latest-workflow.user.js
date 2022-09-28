// ==UserScript==
// @name         L goes to latest workflow
// @namespace    http://royvandewater.com/
// @version      2.7.1
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/l-goes-to-latest-workflow.user.js
// @downloadURL  https://github.com/royvandewater/circleci-tampermonkey/raw/master/l-goes-to-latest-workflow.user.js
// @description  Will navigate to the the latest workflow page of the current branch when looking at the workflow page
// @author       Roy van de Water
// @match        https://app.circleci.com/*
// @match        https://ui.circleci.com/*
// @match        https://circleci.jp/*
// @match        http://localhost:3000/*
// @match        http://app.circlehost:3000/*
// @match        https://app.k9s.sphereci.com/*
// @grant        none
// @require      https://unpkg.com/hotkeys-js/dist/hotkeys.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/arrive/2.4.1/arrive.min.js
// ==/UserScript==

(function () {
  "use strict";

  const branchASelector =
    'ol > li:nth-child(3) > div > a';
  const workflowASelector =
    'main > div > div > div:nth-child(3) a[data-cy="workflow-status-link"]'
  const workflowBreadCrumbASelector =
    'ol > li:nth-child(4) > div > a'
  const workflowBreadCrumbSpanSelector =
    'ol > li:nth-child(4) > div > span'

  const getBranchA = () =>
    new Promise(resolve => {
      const a = document.querySelector(branchASelector);

      if (a) return resolve(a);

      window.arrive(branchASelector, resolve);
    });

  const buildWaitingMessage = () => {
    let waitingMessage = document.createElement('h1');
    waitingMessage.innerText = "Waiting for a new workflow to appear";
    waitingMessage.style.backgroundColor = '#3595DC';
    waitingMessage.style.borderBottomLeftRadius = '4px';
    waitingMessage.style.borderBottomRightRadius = '4px';
    waitingMessage.style.boxShadow = 'box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.17)'
    waitingMessage.style.color = '#FFFFFF';
    waitingMessage.style.margin = '0';
    waitingMessage.style.position = 'fixed';
    waitingMessage.style.padding = '16px';
    waitingMessage.style.top = '-68px';
    waitingMessage.style.left = '0';
    waitingMessage.style.width = '100vw';
    waitingMessage.style.textAlign = 'center';
    waitingMessage.style.transition = 'top 0.5s ease';
    waitingMessage.style.fontFamily = "'Roboto','Helvetica Neue',Helvetica,Arial,sans-serif";
    waitingMessage.style.zIndex = 10;

    return waitingMessage;
  }

  const getWorkflowId = () => {
    const parts = window.location.pathname.split('/')
    const index = parts.indexOf('workflows')
    return parts[index + 1]
  }

  const getWorkflowName = () => {
    const el = document.querySelector(workflowBreadCrumbASelector) ?? document.querySelector(workflowBreadCrumbSpanSelector);
    return el.text
  }

  window.hotkeys("l", async () => {
    if (!window.location.pathname.includes("/workflows/")) return;

    const workflowId = getWorkflowId();
    const workflowName = getWorkflowName();

    if (!workflowId) return;

    const waitingMessage = buildWaitingMessage();
    const a = await getBranchA();
    a.click();

    const click = el => {
      if (!el) return;
      if (el.text !== workflowName) return;
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

