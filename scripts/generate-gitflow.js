const cmdUtil = require("./utils/cmd.js");
const nodeUtil = require("./utils/node.js");

const createBranchAndChangelogFeature = require("./features/createBranchAndChangelog.js");

const args = process.argv.slice(2);

const type = args[0];
let release;
let name;
if (args.length === 2) {
  name = args[1];
} else if (args.length === 3) {
  release = args[1];
  name = args[2];
} else {
  cmdUtil.handleError(
    "Wrong number of arguments, should be 2 (type, name) or 3 (type, release, name)"
  );
}

// Check node
nodeUtil.checkNodeVersion();

// Generate branch with changelog
createBranchAndChangelogFeature.release = release;
switch (type) {
  case "feature": {
    createBranchAndChangelogFeature.createFeature(name);
    break;
  }
  case "bugfix": {
    createBranchAndChangelogFeature.createBugfix(name);
    break;
  }
  case "hotfix": {
    createBranchAndChangelogFeature.createHotfix(name);
    break;
  }
  default: {
    cmdUtil.handleError("Unknown type");
  }
}
