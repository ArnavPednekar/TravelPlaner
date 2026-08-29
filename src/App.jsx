import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TripForm from './components/TripForm';
import LoadingModal from './components/LoadingModal';
import ItineraryView from './components/ItineraryView';
import SavedTripsModal from './components/SavedTripsModal';
import { generateItinerary } from './utils/aiGenerator';
import { generateFullItineraryWithGemini } from './utils/geminiApi';

export default function App() {
  const [view, setView] = useState('form');
  const [pendingParams, setPendingParams] = useState(null);
  const [currentItinerary, setCurrentItinerary] = useState(null);
  const [savedTrips, setSavedTrips] = useState([]);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    try {
      const storedTrips = localStorage.getItem('voyageai_saved_trips');
      if (storedTrips) setSavedTrips(JSON.parse(storedTrips));
      const storedDark = localStorage.getItem('voyageai_dark_mode');
      if (storedDark === 'true') {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      }
    } catch (e) {
      console.error('Failed to load local storage', e);
    }
  }, []);

  const saveTripsToStorage = (trips) => {
    setSavedTrips(trips);
    try { localStorage.setItem('voyageai_saved_trips', JSON.stringify(trips)); }
    catch (e) { console.error('Failed to save trips', e); }
  };

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('voyageai_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('voyageai_dark_mode', 'false');
    }
  };

  const handleFormSubmit = (params) => {
    setPendingParams(params);
    setView('loading');
  };

  const handleLoadingComplete = async () => {
    if (!pendingParams) return;
    try {
      const geminiResult = await generateFullItineraryWithGemini(pendingParams);
      setCurrentItinerary(geminiResult);
      setView('itinerary');
    } catch (err) {
      console.warn('Gemini AI live generation failed, using smart fallback:', err);
      const fallbackResult = generateItinerary(pendingParams);
      setCurrentItinerary(fallbackResult);
      setView('itinerary');
    }
  };

  const handleSaveItinerary = (itinerary) => {
    if (!savedTrips.some(t => t.id === itinerary.id)) {
      saveTripsToStorage([itinerary, ...savedTrips]);
    }
  };

  const handleDeleteSavedTrip = (id) => {
    saveTripsToStorage(savedTrips.filter(t => t.id !== id));
  };

  const handleLoadTrip = (trip) => {
    setCurrentItinerary(trip);
    setView('itinerary');
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar
        onNewTrip={() => setView('form')}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        savedCount={savedTrips.length}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <main className="flex-1">
        {view === 'form' && <TripForm onSubmit={handleFormSubmit} darkMode={darkMode} />}
        {view === 'loading' && (
          <>
            <TripForm onSubmit={handleFormSubmit} darkMode={darkMode} />
            <LoadingModal destination={pendingParams?.destination || 'Destination'} onComplete={handleLoadingComplete} />
          </>
        )}
        {view === 'itinerary' && currentItinerary && (
          <ItineraryView
            itinerary={currentItinerary}
            onBack={() => setView('form')}
            onSave={handleSaveItinerary}
            isSaved={savedTrips.some(t => t.id === currentItinerary.id)}
          />
        )}
      </main>

      <SavedTripsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedTrips={savedTrips}
        onLoadTrip={handleLoadTrip}
        onDeleteTrip={handleDeleteSavedTrip}
      />

      <footer className={`border-t py-6 text-center text-xs ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'}`}>
        <p>© 2026 VoyageAI Travel Planner. Powered by Google Gemini AI.</p>
      </footer>
    </div>
  );
}