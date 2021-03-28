const cmdUtil = require("../utils/cmd.js");
const fsUtil = require("../utils/fs.js");
const templatePartialHtml = require("../templates/html.partial.template.js");
const templateScss = require("../templates/scss.template.js");

const partialHtmlPath = "./src/partials";
const partialCssPath = "./src/assets/scss/partials";

module.exports = name => {
    const partialName = name.toLowerCase();
    fsUtil.createFile(`${partialHtmlPath}/${partialName}.hbs`, templatePartialHtml(partialName));
    fsUtil.createFile(`${partialCssPath}/_${partialName}.scss`, templateScss(partialName));
    cmdUtil.handleSuccess("Partial created");
};
