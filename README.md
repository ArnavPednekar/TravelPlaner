# VoyageAI Travel Planner

An AI-powered travel itinerary planner that generates optimized, personalized day-by-day itineraries using Google Gemini AI. Features real-time location briefs via a backend API, dynamic currency conversion, dark/light mode, and trip saving.

## Features

- **AI-Powered Itinerary Generation** - Uses Google Gemini 1.5 Flash to create detailed, location-specific itineraries
- **Live Location Briefs** - Backend API provides instant AI-generated destination overviews, best times to visit, top attractions, cuisine, culture tips, and hidden gems
- **Dynamic Currency Support** - USD, EUR, GBP, JPY, AUD, CAD with live conversion
- **Dark/Light Mode** - Persistent theme toggle
- **Trip Saving** - Save and reload itineraries locally
- **Interactive Day-by-Day Schedule** - Morning/Afternoon/Evening activities with Google Maps links
- **Budget Breakdown** - Visual allocation with percentages
- **Flight Recommendations** - Real airline suggestions with Google Flights integration
- **Verified Hotel Suggestions** - With Booking.com rate check links
- **Packing Checklist & Travel Tips** - Interactive and personalized

## Tech Stack

**Frontend:**
- React 19 + Vite
- Tailwind CSS v4
- Lucide React icons

**Backend:**
- Node.js + Express
- Google Gemini API (1.5 Flash)
- CORS enabled for frontend proxy

## Prerequisites

- Node.js 18+
- npm 9+

## Installation & Setup

### 1. Clone and install frontend dependencies

```bash
cd travelplaner
npm install
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure API Key

The backend uses a pre-configured Gemini API key in `backend/server.js`. To use your own key:

1. Get an API key from [Google AI Studio](https://aistudio.google.com/)
2. Edit `backend/server.js` and replace the `GEMINI_API_KEY` constant

## Running the Project

### Development Mode (Both Frontend & Backend)

```bash
# From the root travelplaner directory
npm run dev
```

This starts:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

### Production Build

```bash
# Build frontend
npm run build

# Start backend only
npm run start:backend
```

### Run Backend Only

```bash
cd backend
npm run dev
```

## Project Structure

```
travelplaner/
├── backend/
│   ├── server.js          # Express + Gemini API
│   └── package.json
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── TripForm.jsx
│   │   ├── LoadingModal.jsx
│   │   ├── ItineraryView.jsx
│   │   └── SavedTripsModal.jsx
│   ├── data/
│   │   ├── presets.js
│   │   └── currencies.js
│   ├── utils/
│   │   ├── aiGenerator.js      # Fallback smart generator
│   │   └── geminiApi.js        # Gemini API calls
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── vite.config.js          # Vite + Tailwind + Proxy config
└── package.json
```

## API Endpoints

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
    "overview": "...",
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

## Usage

1. Open http://localhost:5173
2. Enter a destination (or pick from presets)
3. Select currency, duration, travelers, budget tier, and interests
4. Click "Generate Optimized Itinerary with AI"
5. View your personalized itinerary with:
   - Flight recommendations
   - Hotel suggestions with Booking.com links
   - Day-by-day schedule with Google Maps links
   - Budget breakdown
   - Packing checklist
   - Travel tips
6. Save trips for later access via the "Saved Trips" button

## Environment Variables

Backend can be configured via `.env` file in `/backend`:

```env
PORT=3001
GEMINI_API_KEY=your_key_here
```

## License

MIT License - Feel free to use for personal or commercial projects.