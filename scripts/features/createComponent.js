const cmdUtil = require("../utils/cmd.js");
const fsUtil = require("../utils/fs.js");
const templateHtml = require("../templates/html.component.template.js");
const templateScss = require("../templates/scss.template.js");
const templateJs = require("../templates/js.template.js");

const componentPath = "./src/components";

module.exports = name => {
  const componentName = name.toLowerCase();
  fsUtil.createFolder(`${componentPath}/${componentName}`);
  fsUtil.createFile(
    `${componentPath}/${componentName}/${componentName}.hbs`,
    templateHtml(componentName)
  );
  fsUtil.createFile(
    `${componentPath}/${componentName}/_${componentName}.scss`,
    templateScss(componentName)
  );
  fsUtil.createFile(
      `${componentPath}/${componentName}/${componentName}.js`,
      templateJs(componentName)
  );
  cmdUtil.handleSuccess("Component created");
};
