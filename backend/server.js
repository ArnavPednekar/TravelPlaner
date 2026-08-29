import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = GEMINI_KEY ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}` : '';

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'VoyageAI Backend' });
});

app.post('/api/location-brief', async (req, res) => {
  try {
    const { destination } = req.body;
    
    if (!destination || !destination.trim()) {
      return res.status(400).json({ error: 'Destination is required' });
    }

    if (!GEMINI_API_KEY) {
      return res.status(503).json({ error: 'Gemini API key not configured. Please set GEMINI_API_KEY environment variable.' });
    }

    const prompt = `Provide a concise, engaging travel brief for "${destination}" in JSON format. Include:
- overview: 2-3 sentences capturing the essence of this destination
- bestTimeToVisit: specific months/seasons
- topAttractions: array of 5 must-see places with brief descriptions
- localCuisine: 3-4 signature dishes/foods to try
- cultureTips: 3 practical cultural etiquette tips
- hiddenGems: 2-3 off-the-beaten-path spots
- avgDailyCost: estimated daily cost in USD for moderate traveler
- language: primary language(s) spoken
- currency: local currency code and symbol

Return ONLY valid JSON.`;

    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errText}`);
    }

    const data = await response.json();
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textResponse) {
      throw new Error('No response from Gemini API');
    }

    let cleanJson = textResponse.trim();
    if (cleanJson.startsWith("```json")) cleanJson = cleanJson.replace(/^```json/, "").replace(/```$/, "").trim();
    else if (cleanJson.startsWith("```")) cleanJson = cleanJson.replace(/^```/, "").replace(/```$/, "").trim();

    const brief = JSON.parse(cleanJson);
    res.json({ success: true, destination, brief });

  } catch (error) {
    console.error('Location brief error:', error);
    res.status(500).json({ error: 'Failed to generate location brief', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`VoyageAI Backend running on http://localhost:${PORT}`);
});