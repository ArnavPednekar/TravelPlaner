# VoyageAI Travel Planner

An AI-powered travel itinerary planner that generates optimized, personalized day-by-day travel plans instantly. Whether you want to use Google Gemini AI for dynamic generation or the built-in static generator, VoyageAI helps you plan trips with budget breakdowns, hotel recommendations, activity schedules, and more.

## 🤖 What Does It Do?

**AI-Powered Itinerary Generation:**
- Uses Google Gemini 1.5 Flash to create detailed, location-specific itineraries
- Generates route information, hotel suggestions, and dining recommendations
- Provides budget breakdowns in your chosen currency
- Falls back to a smart static generator if no API key is provided

**Live Location Briefs:**
- Get AI-generated destination overviews at the click of a button
- Includes: best time to visit, top attractions, local cuisine, culture tips, hidden gems, daily costs, language, and currency
- Powered by your Gemini API key (optional) or static data

**Interactive Day-by-Day Schedule:**
- Morning/Afternoon/Evenning activities with optimized pacing
- Google Maps links for every stop
- Budget-aware cost estimates for each activity
- Packing checklists and travel tips

**Dynamic Currency Support:**
- USD, EUR, GBP, JPY, AUD, CAD
- Real-time conversion display throughout the itinerary
- Budget breakdown percentages that add up to 100%

**Dark/Light Mode:**
- Persistent theme preference saved in localStorage
- Toggle in the header navigation
- Consistent styling across all components

**Trip Saving & Reloading:**
- Save itineraries to local storage
- View previously planned trips
- Delete trips you no longer need
- Export/import functionality

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| **AI Generation** | Gemini AI for dynamic, real-time itineraries |
| **Static Fallback** | Works without any API key |
| **Currency Converter** | 6 currencies with dynamic formatting |
| **Dark Mode** | Persistent preference, works on all platforms |
| **Location Briefs** | AI-generated destination summaries |
| **Day-by-Day Schedule** | Morning/Afternoon/Evening activities |
| **Google Maps Integration** | Links for every stop |
| **Budget Breakdown** | Visual allocation with percentages |
| **Hotel & Flight Links** | Booking.com & Google Flights |
| **Packing Checklist** | Interactive, tick-off items |
| **Travel Tips** | Context-aware advice |
| **Trip Saving** | Save and reload your plans |

## 🚀 Quick Setup

### Option A: Automated (Recommended)
```bash
# 1. Clone the repository
git clone https://github.com/ArnavPednekar/TravelPlaner.git
cd VoyageAI

# 2. Run the install script (all platforms)
chmod +x install.sh
./install.sh     # Enter your Gemini API key when prompted

# 3. Start the project
npm run dev
```

### Option B: Manual Setup
```bash
git clone https://github.com/ArnavPednekar/TravelPlaner.git
cd VoyageAI

# 1. Copy environment examples
cp backend\.env.example backend\.env
cp .env.example .env

# 2. Add your Gemini API key
# - Get your key from: https://aistudio.google.com/
# - Edit backend/.env: GEMINI_API_KEY=your_key_here
# - Edit .env: VITE_GEMINI_API_KEY=your_key_here

# 3. Start the project
npm run dev
```

### Option C: No API Key (Static Mode)
```bash
git clone https://github.com/ArnavPednekar/TravelPlaner.git
cd VoyageAI
npm run dev
# Project works without any key using static generator
```

## 🛠️ Tech Stack

**Frontend:**
- React 19 + Vite
- Tailwind CSS v4
- Lucide React icons

**Backend:**
- Node.js + Express
- Google Gemini API (optional)
- CORS enabled for frontend proxy

**Utilities:**
- dotenv for environment variable management
- concurrent.js for parallel operations

## 📦 Project Structure

```
VoyageAI/
├── install.sh              ← Automated setup script
├── backend/
│   ├── server.js          ← Express + Gemini API
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
├── src/
│   ├── App.jsx            ← Main app component
│   ├── main.jsx           ← Entry point
│   ├── index.css          ← Global styles
│   ├── App.css
│   ├── components/        ← UI components
│   │   ├── Navbar.jsx
│   │   ├── TripForm.jsx
│   │   ├── ItineraryView.jsx
│   │   ├── LoadingModal.jsx
│   │   └── SavedTripsModal.jsx
│   ├── data/            ← Presets and currencies
│   │   ├── presets.js
│   │   ├── currencies.js
│   │   └── realVenues.js
│   ├── utils/           ← Core logic
│   │   ├── aiGenerator.js ← Static fallback generator
│   │   └── geminiApi.js   ← Gemini AI integration
│   └── main.css
├── vite.config.js         ← Vite + Tailwind + Proxy config
├── package.json
├── README.md
└── .gitignore
```

## 📚 API Endpoints

### POST /api/location-brief
Get AI-generated destination brief.

**Request:**
```json
{ "destination": "Tokyo, Japan" }
```

**Response:**
```json
{
  "success": true,
  "destination": "Tokyo, Japan",
  "brief": {
    "overview": "..."",
    "bestTimeToVisit": "March-May, Sept-Nov",
    "topAttractions": [...],
    "localCuisine": [...],
    "cultureTips": [...],
    "hiddenGems": [...],
    "avgDailyCost": 150,
    "language": "Japanese",
    "currency": "JPY (¥)"
  }
}
```

### GET /api/health
Health check endpoint.

## 📦 Usage Flow

1. **Open** http://localhost:5173
2. **Enter** a destination (or pick from presets like Tokyo, Paris, New York, Rome, Bali)
3. **Select** currency, duration, travelers, budget tier, and interests
4. **Click** "Generate Optimized Itinerary with AI"
5. **View** your personalized itinerary with:
   - Flight recommendations + Google Flights links
   - Hotel suggestions + Booking.com rate checks
   - Day-by-day schedule with Google Maps links
   - Budget breakdown with visual percentages
   - Packing checklist (tick-off items)
   - Context-aware travel tips
6. **Save** trips for later access via "Saved Trips" button

## 📦 Environment Variables

Backend (`backend/.env`):
```env
PORT=3001
GEMINI_API_KEY=your_key_here
```

Frontend (`.env`):
```env
VITE_GEMINI_API_KEY=your_key_here
```

Leave the API key empty to use the static fallback generator.

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

---

*Built with ❤️ by Arnav Pednekar*