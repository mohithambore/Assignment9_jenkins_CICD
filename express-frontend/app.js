const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <h2>Submit Data</h2>
        <form action="/submit" method="post">
            <input type="text" name="name" placeholder="Enter Name" required/>
            <input type="text" name="message" placeholder="Enter Message" required/>
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/submit', async (req, res) => {
    try {
        await axios.post('http://52.66.198.162:5000/api', req.body);
        res.send('<h3>Data submitted successfully</h3>');
    } catch (error) {
        res.send('<h3>Error submitting data</h3>');
    }
});

app.listen(3000, () => console.log("Frontend running on port 3000"));