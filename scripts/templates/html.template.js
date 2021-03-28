module.exports = function(name) {
  const cssClassName = name;

  return `<!doctype html>
<html lang="en">
    {{> head titlePage="${cssClassName}"}}
<body>
<main role="main">
    Hello, this is new page called ${name}
</main>
    {{> script}}
</body>
</html>
`;
};
