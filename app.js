const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', (req, res) => {
    const inputValue = req.body.inputValue;
    const currentLength = inputValue.length;
    console.log(`Received input: ${inputValue}`);
    console.log(`Current length: ${currentLength}`);
    res.send('Input received!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
