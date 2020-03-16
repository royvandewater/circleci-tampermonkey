// ==UserScript==
// @name         Toggle New/Legacy web-ui
// @namespace    http://royvandewater.com/
// @version      2.0
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/toggle-new-legacy-web-ui.user.js
// @description  Toggle between the New & Legacy web-ui using CMD+J
// @author       Roy van de Water
// @match        https://app.circleci.com/*
// @match        https://circleci.com/*
// @grant        none
// @require      https://unpkg.com/hotkeys-js/dist/hotkeys.min.js
// ==/UserScript==


(function() {
  "use strict";

  const oldToNewVcs = { gh: "github", bb: "bitbucket" };
  const newToOldVcs = { github: "gh", bitbucket: "bb" };

  const newToOldMappings = [{
    name: 'Pipelines',
    match: new RegExp('^/pipelines/([\\w-]+)/([\\w-]+)/([\\w-]+)$'),
    convert: ([_, vcsType, orgName, projectName]) => `/${newToOldVcs[vcsType]}/${orgName}/workflows/${projectName}`,
  }, {
    name: 'Workflows',
    match: new RegExp('^/pipelines/[\\w-]+/[\\w-]+/[\\w-]+/\\d+/workflows/([\\w-]+)$'),
    convert: ([_, workflowId]) => `/workflow-run/${workflowId}`,
  }, {
    name: 'Job',
    match: new RegExp('^/pipelines/([\\w-]+)/([\\w-]+)/([\\w-]+)/\\d+/workflows/[\\w-]+/jobs/(\\d+)$'),
    convert: ([_, vcsType, orgName, projectName, jobNumber]) => `/${newToOldVcs[vcsType]}/${orgName}/${projectName}/${jobNumber}`,
  }]

  const oldToNewMappings = [{
    name: 'Job',
    match: new RegExp('^/([\\w-]+)/([\\w-]+)/([\\w-]+)/(\\d+)'),
    convert: ([_, vcsType, orgName, projectName, jobNumber]) => `/jobs/${oldToNewVcs[vcsType]}/${orgName}/${projectName}/${jobNumber}`,
  }, {
    name: 'Pipelines',
    match: new RegExp('^/([\\w-]+)/([\\w-]+)/workflows/([\\w-]+)$'),
    convert: ([_, vcsType, orgName, projectName]) => `/pipelines/${oldToNewVcs[vcsType]}/${orgName}/${projectName}`,
  }]

  const toOldPath = newPath => {
    const mapping = newToOldMappings.find(({match}) => match.test(newPath))
    if (!mapping) return

    return mapping.convert(mapping.match.exec(newPath))
  };

  const toNewPath = oldPath => {
    const mapping = oldToNewMappings.find(({match}) => match.test(oldPath))
    if (!mapping) return

    return mapping.convert(mapping.match.exec(oldPath))
  }

  const getNewLocation = () => {
    const newPathname = toNewPath(window.location.pathname)
    if (!newPathname) return null ;

    return new URL(newPathname, 'https://app.circleci.com').toString()
  }

  const getOldLocation = () => {
    const oldPathname = toOldPath(window.location.pathname)
    if (!oldPathname) return;

    return new URL(oldPathname, "https://circleci.com").toString();
  }

  const getLocation = () => {
    if (window.location.host.startsWith("circleci.com")) {
      return getNewLocation();
    }

    return getOldLocation();
  }

  window.hotkeys("command+j", () => {
    const otherLocation = getLocation();
    if (!otherLocation) {
      console.warn("Could not find matching other location.")
      return;
    }
    window.location = getLocation();
  });
})();
