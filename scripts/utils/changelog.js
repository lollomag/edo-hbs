const fsUtils = require("./fs.js");
const changelogTemplate = require("../templates/changelog.template.js");

module.exports = {
  createChangelog: (path, fileName) => {
    if (!fsUtils.checkIfExists(path)) {
      fsUtils.createFolder(path);
    }

    const data = changelogTemplate(fileName);
    fsUtils.createFile(`${path}/${fileName}.md`, data);
    console.log("Changelog created");
  }
};
