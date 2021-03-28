const cmdUtil = require("./cmd.js");

const gitUtil = {
  checkIfWorkingDirectoryIsClean: () => {
    const output = cmdUtil.exec("git status");
    const data = output.stdout;

    if (!data.includes("working tree clean") || output.code !== 0) {
      cmdUtil.handleError("Error, your working directory is not clean");
    }
  },
  createBranch: branchName => {
    gitUtil.checkIfWorkingDirectoryIsClean();

    const output = cmdUtil.exec(`git checkout -b ${branchName}`);
    const data = output.stdout;

    if (data.includes("error:") || output.code !== 0) {
      cmdUtil.handleError(`Branch ${branchName} cannot be created`);
    } else {
      console.log(data);
      console.log("Branch created");
    }
  }
};

module.exports = gitUtil;
