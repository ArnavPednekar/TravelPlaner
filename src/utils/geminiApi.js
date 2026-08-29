export async function generateFullItineraryWithGemini({ destination, duration, budgetType, budgetAmount, travelers, styles, currency }) {
  const key = import.meta.env.VITE_GEMINI_API_KEY || "";

  if (!key) {
    // Fallback to static generator when no API key provided
    const { generateItinerary } = await import('./aiGenerator');
    return generateItinerary({ destination, duration, budgetType, budgetAmount, travelers, styles, currency });
  }

  const prompt = `You are an expert AI travel planner with real-time internet access. Create a highly detailed, realistic, and optimized travel itinerary in JSON format for:
- Destination: ${destination}
- Duration: ${duration} days
- Budget Tier: ${budgetType} (${budgetAmount} ${currency} total)
- Travelers: ${travelers}
- Travel Styles: ${styles.join(', ')}

Return ONLY valid JSON matching this exact structure (no markdown, no extra text):
{
  "destination": "${destination}",
  "duration": ${duration},
  "budgetType": "${budgetType}",
  "budgetAmount": ${budgetAmount},
  "travelers": ${travelers},
  "styles": ${JSON.stringify(styles)},
  "currency": "${currency}",
  "overview": "Rich 2-3 sentence overview of the trip.",
  "flightInfo": {
    "airline": "Real airline name for this route",
    "class": "Economy/Business/First",
    "flightNumber": "Realistic flight number",
    "estimatedCost": 450,
    "route": "Origin hub → Destination airport"
  },
  "accommodation": {
    "name": "Real verified hotel name in this city",
    "type": "Hotel category",
    "pricePerNight": 150,
    "description": "Detailed hotel description with amenities and location highlights"
  },
  "budgetBreakdown": {
    "accommodation": 800,
    "food": 500,
    "activities": 400,
    "transport": 200,
    "buffer": 100
  },
  "days": [
    {
      "dayNumber": 1,
      "title": "Day 1: Specific title for this destination",
      "morning": {
        "time": "09:00 AM - 12:00 PM",
        "title": "Specific morning activity name",
        "description": "Detailed description with location specifics",
        "cost": 30,
        "category": "Sightseeing"
      },
      "afternoon": {
        "time": "01:00 PM - 05:00 PM",
        "title": "Specific afternoon activity name",
        "description": "Detailed description with location specifics",
        "cost": 40,
        "category": "Culture"
      },
      "evening": {
        "time": "07:00 PM - 10:00 PM",
        "title": "Specific evening dining name",
        "description": "Detailed description with restaurant specifics",
        "cost": 60,
        "category": "Dining"
      }
    }
  ],
  "tips": [
    "Specific practical tip for this destination",
    "Money-saving tip for this city",
    "Cultural etiquette tip for this location",
    "Transport navigation tip for this city"
  ],
  "packingList": [
    "Climate-specific item 1",
    "Climate-specific item 2",
    "Activity-specific item 3",
    "Essential item 4",
    "Essential item 5"
  ]
}

Requirements:
- Use REAL hotel names, restaurant names, and attraction names for the destination
- Costs must be realistic for the budget tier and currency
- All descriptions must be specific to the actual destination, not generic
- Budget breakdown must sum to approximately the total budget
- Include exactly ${duration} days in the days array`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!textResponse) throw new Error("No response from Gemini API");

  let cleanJson = textResponse.trim();
  if (cleanJson.startsWith("```json")) cleanJson = cleanJson.replace(/^```json/, "").replace(/```$/, "").trim();
  else if (cleanJson.startsWith("```")) cleanJson = cleanJson.replace(/^```/, "").replace(/```$/, "").trim();

  const parsed = JSON.parse(cleanJson);
  parsed.id = 'trip_' + Math.random().toString(36).substring(2, 9);
  parsed.createdAt = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return parsed;
}

export async function askGeminiAssistant({ message, tripContext }) {
  const key = import.meta.env.VITE_GEMINI_API_KEY || "";

  if (!key) return null;

  const prompt = `You are VoyageAI Assistant, an expert AI travel guide helping the user with their planned trip.
Trip Context:
Destination: ${tripContext.destination}
Duration: ${tripContext.duration} days
Budget: ${tripContext.budgetType}
Overview: ${tripContext.overview}

User Question: ${message}

Provide a helpful, polite, and detailed answer regarding local transport, dining, sights, weather, or tips for this specific trip.`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });

  if (!response.ok) return null;

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
}