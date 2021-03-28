const cmdUtil = require("./utils/cmd.js");
const nodeUtil = require("./utils/node.js");
const createComponentFeature = require("./features/createComponent.js");
const createPartialFeature = require("./features/createPartial.js");
const createPageFeature = require("./features/createPage.js");

const args = process.argv.slice(2);
const type = args[0];
const name = args[1];

// Check node
nodeUtil.checkNodeVersion();

// Generate gizmo
switch (type) {
  case "component": {
    createComponentFeature(name);
    break;
  }
  case "partial": {
    createPartialFeature(name);
    break;
  }
  case "page": {
    createPageFeature(name);
    break;
  }
  default: {
    cmdUtil.handleError("Unknown type");
  }
}
