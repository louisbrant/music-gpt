// server.js
const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));

app.get('/blvd-loader', (req, res) => {
  res.sendFile(path.join(publicPath, 'blvd-loader.js'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});