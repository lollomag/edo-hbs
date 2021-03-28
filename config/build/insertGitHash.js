const fs = require('fs');

require('child_process').exec('echo "`git rev-parse HEAD` `git describe --tags HEAD` `date +%Y%m%d-%H%M%S`"', (err, stdout) => {
  // append gitHash at the end of the main.min.js
  fs.appendFile('./dist/assets/js/main.min.js', `\r\nwindow.gitHash = '${stdout.trim()}';`, err => {
    if (err) throw err;
    console.log(`${stdout} Git hash added to main.min.js with the name "window.gitHash"!`);
  });

  // add gitHash at the beginning of main.css
  const cssFile = fs.readFileSync('./dist/assets/css/main.css')
  const cssDestFile = fs.openSync('./dist/assets/css/main.css', 'w+')
  const insert = Buffer.from(`\r\n/* ${stdout.trim()} */\n`)
  fs.writeSync(cssDestFile, insert, 0, insert.length, 0)
  fs.writeSync(cssDestFile, cssFile, 0, cssFile.length, insert.length)
  fs.close(cssDestFile, (err) => {
    if (err) throw err;
    console.log(`${stdout} prepended to main.css as comment`);
  });
});