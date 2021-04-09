// ==UserScript==
// @name         Wait for Optimizely Updates
// @namespace    http://royvandewater.com/
// @version      1.11
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/wait-for-optimizely-updates.user.js
// @description  Will let you know when a new version of Optimizely goes out when looking at the datafile
// @author       Roy van de Water
// @match        https://app.circleci.com/api/datafiles/*
// @grant        GM_xmlhttpRequest
// @connect      app.circleci.com
// ==/UserScript==

(async () => {
  "use strict";

  const fetchLatestVersion = async () => {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: 'GET',
        url: location.toString(),
        responseType: 'json',
        nocache: true,
        onload: (res) => resolve(res.response.revision),
        onerror: (error) => reject(error),
      })
    });
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

  let previousVersion = await getCurrentVersion();
  const newRevisionCheck = async () => {
    const latestVersion = await fetchLatestVersion();

    console.log('newRevisionCheck', {previousVersion, latestVersion})
    if (previousVersion !== latestVersion) {
      cleanUpMessage()

      const message = buildNewRevisionMessage(previousVersion, latestVersion)
      document.body.prepend(message);
      document.addEventListener('click', () => message.remove());
      requestAnimationFrame(() => { message.style.top = 0 });
    }

    previousVersion = latestVersion
    setTimeout(newRevisionCheck, 5000)
  }
  newRevisionCheck();
})();
