// ==UserScript==
// @name         Toggle New/Legacy web-ui
// @namespace    http://royvandewater.com/
// @version      1.3
// @updateURL    https://github.com/royvandewater/circleci-tampermonkey/raw/master/toggle-new-legacy-web-ui.user.js
// @description  Toggle between the New & Legacy web-ui using CMD+J
// @author       Roy van de Water
// @match        https://app.circleci.com/*
// @match        https://circleci.com/*
// @grant        none
// @require      https://unpkg.com/hotkeys-js/dist/hotkeys.min.js
// ==/UserScript==

const oldToNewVcs = { gh: "github", bb: "bitbucket" };
const newToOldVcs = { github: "gh", bitbucket: "bb" };
const newWorkflowRegexp = /\/(github|bitbucket)\/[\w-]+\/[\w-]+\/pipelines\/[\w-]+\/workflows\/[\w-]+$/;

const toNewJobPath = oldPath => {
  const [_, oldVcs, org, repo, job] = oldPath.split("/");
  const vcs = oldToNewVcs[oldVcs];
  return `/jobs/${vcs}/${org}/${repo}/${job}`;
};

const toNewPath = oldPath => {
  return toNewJobPath(oldPath);
};

const toOldJobPath = newPath => {
  const [_, _jobs, newVcs, org, repo, job] = newPath.split("/");
  const vcs = newToOldVcs[newVcs];
  return `/${vcs}/${org}/${repo}/${job}`;
};

const toOldWorkflowsPath = newPath => {
  const [newVcs, org, repo] = newPath.split("/");
  const vcs = newToOldVcs[newVcs];
  return `/${vcs}/${org}/workflows/${repo}`;
};

const toOldWorkflowPath = newPath => {
  const parts = newPath.split("/");
  const workflowId = parts[parts.length - 1];
  return `/workflow-run/${workflowId}`;
};

const toOldPath = newPath => {
  if (newPath.startsWith("/jobs")) {
    return toOldJobPath(newPath);
  }

  // /github/circleci/web-ui/pipelines
  if (newPath.startsWith("/github") && newPath.endsWith("/pipelines")) {
    return toOldWorkflowsPath(newPath);
  }

  // /github/circleci/web-ui/pipelines/<uuid>/workflows/<uuid>
  if (newWorkflowRegexp.test(newPath)) {
    return toOldWorkflowPath(newPath);
  }

  console.error("Unknown path, refusing to do anything");
};

(function() {
  "use strict";

  window.hotkeys("command+j", () => {
    if (window.location.host.startsWith("circleci.com")) {
      window.location =
        "https://app.circleci.com" + toNewPath(window.location.pathname);
      return;
    }

    window.location =
      "https://circleci.com" + toOldPath(window.location.pathname);
  });
})();
