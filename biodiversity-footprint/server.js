// server.js

const express = require('express');
const app = express();

app.use(express.static('./dist/biodiversity-footprint2'));

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: 'dist/biodiverstity-footprint2' });
});

app.listen(process.env.PORT || 8080);