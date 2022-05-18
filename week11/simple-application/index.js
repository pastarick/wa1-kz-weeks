const express = require('express');

const app = express();
const port = 3000;

// MIDDLEWARE for providing static files
// the static file is app.js because it needs to be provided to the browser
app.use(express.static(__dirname));

/* * * * * * * * * * * * * * * API * * * * * * * * * * * * * * * * * */
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname});
});

app.listen(port, () => console.log('Server ready.'))