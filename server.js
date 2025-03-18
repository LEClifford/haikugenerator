require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json()); 
app.use(cors()); 

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);


app.post("/generate-haiku", async (req, res) => {
    try {
        const theme = req.body.theme;
        if (!theme) {
            return res.status(400).json({ error: "Theme is required" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Write a haiku about ${theme}. The haiku should follow a 5-7-5 syllable structure.`;
        
        const result = await model.generateContent(prompt);
        const haiku = result.response.text(); 
        
        res.json({ haiku });
    } catch (error) {
        res.status(500).json({ error: "Error generating haiku", details: error });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
