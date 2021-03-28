const fs = require("fs");
const cmdUtils = require("./cmd.js");

const fsUtils = {
  checkIfExists: path => {
    return fs.existsSync(path);
  },
  createFolder: path => {
    if (fsUtils.checkIfExists(path)) {
      cmdUtils.handleError(`${path} already exists`);
    }

    fs.mkdirSync(path, { recursive: true });
  },
  createFile: (path, data) => {
    if (fsUtils.checkIfExists(path)) {
      cmdUtils.handleError(`${path} already exists`);
    }

    return fs.writeFileSync(path, data);
  }
};

module.exports = fsUtils;
