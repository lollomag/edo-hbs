const gitUtil = require("../utils/git.js");
const changelogUtil = require("../utils/changelog.js");
const cmdUtil = require("../utils/cmd.js");

const exported = {
  release: null,
  createChangelog: name => {
    if (exported.release) {
      changelogUtil.createChangelog(`./changelog/${exported.release}/`, name);
    } else {
      changelogUtil.createChangelog("./changelog", name);
    }
  },
  createBranchAndChangelog: (name, release) => {
    try {
      gitUtil.createBranch(name);
      exported.createChangelog(name, release);
      cmdUtil.handleSuccess();
    } catch (e) {
      cmdUtil.handleError(e);
    }
  },

  createFeature: name => {
    exported.createBranchAndChangelog(`feature_${name}`);
  },
  createBugfix: name => {
    exported.createBranchAndChangelog(`bugfix_${name}`);
  },
  createHotfix: name => {
    exported.createBranchAndChangelog(`hotfix_${name}`);
  }
};

module.exports = exported;
