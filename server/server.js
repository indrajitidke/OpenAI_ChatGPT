import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from "openai";
//this simplifies the use of open api

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});


//create instance for openai 

const openai = new OpenAIApi(configuration);


const app = express();

app.use(cors());
app.use(express.json());
//this will allow us to send json from frontend to backend


app.get('/', async(req, res) => {
        res.status(200).send({
            message: "Hello from CodeX",
        })
    })
    //get receives the lot of content from the frontend


app.post('/', async(req, res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(error);

    }

})

//post allow us to have a body



app.listen(5000, () => console.log("Server is running on port http://localhost:5000"))