const prerender = require('prerender-node');
const express = require('express');
const path = require('path');

const app = express();
const port = 8080;
console.log('roh asdsa');

// For local testing, point to a local Prerender server (see next step) or use dummy token
prerender.set('prerenderServiceUrl', 'http://localhost:3000'); // (See below)
prerender.set('prerenderToken', 'DUMMY_TOKEN'); // Not required for local

app.use(prerender);

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  console.log('Wildcard route hit for ', req.originalUrl);
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Local server with Prerender on http://localhost:${port}`);
});
