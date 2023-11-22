const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 3000;
const apiUrl = 'https://<id>.execute-api.us-east-1.amazonaws.com/v1'; // Replace with your actual API endpoint
apiUrl = apiUrl + "/?Token=<tasktoken>";

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', async (req, res) => {
    const inputValue = req.body.inputValue;
    const currentLength = inputValue.length;
    console.log(`Received input: ${inputValue}`);
    console.log(`Current length: ${currentLength}`);

    try {
        // Make a POST request to your API endpoint with the input value
        const response = await axios.post(apiUrl, { inputValue });

        // Log the API response
        console.log('API Response:', response.data);

        // Send a response to the client
        res.send('Input received and sent to the API!');
    } catch (error) {
        // Handle errors
        console.error('Error sending data to API:', error.message);
        res.status(500).send('Error sending data to API');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
