const express = require('express');
const path = require('path');
const app = express();

app.get('/test', (req, res) => {
    res.send('Server is working!');
});

app.get('/private/statistics', (req, res) => {
    res.sendFile(path.join(__dirname, 'statistics.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
