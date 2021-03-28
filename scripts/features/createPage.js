const cmdUtil = require("../utils/cmd.js");
const fsUtil = require("../utils/fs.js");
const templateHtml = require("../templates/html.template.js");

const pageHtmlPath = "./src/pages";

module.exports = name => {
  const pageName = name;
  fsUtil.createFile(`${pageHtmlPath}/${pageName}.html`, templateHtml(pageName));
  cmdUtil.handleSuccess("Page created");
};
