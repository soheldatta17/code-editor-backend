const express = require("express");
const cors = require("cors");
const request = require("request");  // Ensure you have the request module installed
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Backend Server</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .container {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }
                h1 {
                    color: #333;
                }
                p {
                    color: #666;
                    margin: 10px 0;
                }
                .code {
                    background-color: #f4f4f4;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 10px;
                    font-family: 'Courier New', Courier, monospace;
                    color: #333;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Hi</h1>
            </div>
        </body>
        </html>
    `);
});

app.post("/compile", (req, res) => {
    // Getting the required data from the request
    let code = req.body.code;
    let language = req.body.language;
    let input = req.body.input;

    if (language === "python") {
        language = "python3";
    }

    let execution_data = {
        clientId: '69d6d34709dc8f5327796f28d9d81a21',
        clientSecret: 'b67f9898e5c789486b356dd635c6ca63ffe96318e11d586aa0e35cbf93c3f388',
        script: code,
        language: language,
        versionIndex: '0',
        stdin: input
    };

    request.post({
        url: 'https://api.jdoodle.com/v1/execute',
        json: execution_data
    }, function(error, response, body) {
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('Execution response:', body);
            res.json(body);  // Send the response to the client
        }
    });
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
