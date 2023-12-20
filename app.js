const express = require('express');
const path = require('path');
const axios = require('axios');
const fs = require('fs');

const app = express();
const port = 3000;
apiUrl = 'https://<RestApiId>.execute-api.us-east-1.amazonaws.com/v1'; // Replace with your actual API endpoint

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.post('/submit', async (req, res) => {
    const inputValue = req.body.inputValue;
    const currentLength = inputValue.length;
    console.log(`Received input: ${inputValue}`);
    console.log(`Current length: ${currentLength}`);

    try {
        // Make a POST request to your API endpoint with the input value
        const response = await axios.post(apiUrl, { "input" : inputValue });

        // Log the API response
        console.log('API Response:', response.data);

        // Send a response to the client
        const indexContent = fs.readFileSync("./public/index.html", 'utf8');
        res.send(indexContent);
    } catch (error) {
        // Handle errors
        console.error('Error sending data to API:', error.message);
        res.status(500).send('Error sending data to API');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
