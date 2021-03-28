const shell = require("shelljs");

module.exports = {
  handleError: message => {
    shell.echo(`${message} \n`);
    shell.echo(`--- ❌  Failed with error  ❌  ---\n`);
    shell.exit(1);
  },
  handleSuccess: (message = "") => {
    shell.echo(`${message} \n`);
    shell.echo(`--- ✅  Successfully completed  ✅  ---\n`);
    shell.exit(0);
  },
  exec: command => {
    return shell.exec(command);
  }
};
