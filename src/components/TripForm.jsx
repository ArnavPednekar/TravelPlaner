import React, { useState, useEffect } from 'react';
import { POPULAR_DESTINATIONS, TRAVEL_STYLES, BUDGET_LEVELS } from '../data/presets';
import { CURRENCIES } from '../data/currencies';
import { MapPin, Calendar, DollarSign, Users, Sparkles, Sliders, Coins, Brain, Loader2, Globe, ChevronDown } from 'lucide-react';

export default function TripForm({ onSubmit, darkMode }) {
  const [destination, setDestination] = useState('Tokyo, Japan');
  const [duration, setDuration] = useState(5);
  const [budgetType, setBudgetType] = useState('moderate');
  const [budgetAmount, setBudgetAmount] = useState(2400);
  const [travelers, setTravelers] = useState(2);
  const [currency, setCurrency] = useState('USD');
  const [styles, setStyles] = useState(['Culture & History', 'Food & Dining']);
  const [locationBrief, setLocationBrief] = useState(null);
  const [loadingBrief, setLoadingBrief] = useState(false);
  const [showBrief, setShowBrief] = useState(false);

  const handlePresetClick = (dest) => {
    setDestination(dest.name);
    setBudgetAmount(dest.defaultBudget);
    fetchLocationBrief(dest.name);
  };

  const toggleStyle = (styleLabel) => {
    if (styles.includes(styleLabel)) {
      setStyles(styles.filter(s => s !== styleLabel));
    } else {
      setStyles([...styles, styleLabel]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      destination,
      duration,
      budgetType,
      budgetAmount,
      travelers,
      styles,
      currency
    });
  };

  const fetchLocationBrief = async (dest) => {
    setLoadingBrief(true);
    try {
      const response = await fetch('http://localhost:3001/api/location-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination: dest })
      });
      const data = await response.json();
      if (data.success) {
        setLocationBrief(data.brief);
        setShowBrief(true);
      }
    } catch (error) {
      console.error('Failed to fetch location brief:', error);
    } finally {
      setLoadingBrief(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (destination.trim()) fetchLocationBrief(destination);
    }, 800);
    return () => clearTimeout(timer);
  }, [destination]);

  const bg = darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100';
  const cardBg = darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const inputBg = darkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900';
  const inputBgAlt = darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200';
  const textPrimary = darkMode ? 'text-slate-100' : 'text-slate-900';
  const textSecondary = darkMode ? 'text-slate-400' : 'text-slate-600';
  const textMuted = darkMode ? 'text-slate-500' : 'text-slate-500';
  const accentBg = darkMode ? 'bg-indigo-950/60 border-indigo-900' : 'bg-indigo-50 border-indigo-100';
  const accentText = darkMode ? 'text-indigo-300' : 'text-indigo-700';
  const buttonPrimary = 'bg-indigo-600 hover:bg-indigo-700 text-white';
  const buttonSecondary = darkMode ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700';
  const selectedButton = 'bg-indigo-600 text-white border-indigo-600 shadow-sm';
  const presetButton = darkMode ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700';
  const presetSelected = 'bg-indigo-50/50 dark:bg-indigo-950/50 border-indigo-600 text-indigo-950 dark:text-indigo-200 font-semibold';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${accentBg} ${accentText} text-xs font-semibold mb-3`}>
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI-Powered Itinerary Generator</span>
        </div>
        <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 ${textPrimary}`}>
          Where would you like to explore next?
        </h1>
        <p className={`text-base max-w-2xl mx-auto ${textSecondary}`}>
          Enter your destination, budget, and duration. Our advanced Gemini AI crafts an optimized, personalized day-by-day itinerary instantly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={`${bg} rounded-2xl shadow-xl p-6 sm:p-8 space-y-8 transition-colors`}>
        {/* Destination Section */}
        <div>
          <label className={`block text-sm font-semibold mb-2 flex items-center ${textPrimary}`}>
            <MapPin className="w-4 h-4 text-indigo-600 mr-2" />
            1. Where do you want to travel?
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g. Kyoto, Japan or Amalfi Coast, Italy"
            className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base shadow-sm transition-colors ${inputBg}`}
            required
          />

          <div className="mt-3">
            <span className={`text-xs font-medium block mb-2 ${textMuted}`}>Or pick a popular destination:</span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {POPULAR_DESTINATIONS.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handlePresetClick(item)}
                  className={`p-2.5 rounded-xl border text-left transition flex items-center space-x-2 ${destination === item.name ? presetSelected : presetButton}`}
                >
                  <span className="text-xl">{item.image}</span>
                  <div className="truncate">
                    <div className="text-xs font-medium truncate">{item.name.split(',')[0]}</div>
                    <div className="text-[10px] text-slate-400 truncate">{item.tag}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Location Brief - Backend API Integration */}
        {locationBrief && (
          <div className={`p-4 rounded-xl border ${accentBg} ${accentText} animate-fade-in`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-sm">AI Location Brief: {destination}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowBrief(!showBrief)}
                className="text-xs opacity-70 hover:opacity-100"
              >
                {showBrief ? <ChevronDown className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 rotate-180" />}
              </button>
            </div>
            {showBrief && (
              <div className="space-y-3 text-xs leading-relaxed">
                <p><span className="font-semibold">📍 Overview:</span> {locationBrief.overview}</p>
                <p><span className="font-semibold">🌤️ Best Time:</span> {locationBrief.bestTimeToVisit}</p>
                <p><span className="font-semibold">💰 Daily Cost:</span> ~${locationBrief.avgDailyCost} USD</p>
                <p><span className="font-semibold">🍽️ Must-Try Foods:</span> {locationBrief.localCuisine?.join(', ')}</p>
                <p><span className="font-semibold">💡 Culture Tips:</span> {locationBrief.cultureTips?.join('; ')}</p>
                <p><span className="font-semibold">🗣️ Language:</span> {locationBrief.language} | <span className="font-semibold">Currency:</span> {locationBrief.currency}</p>
              </div>
            )}
          </div>
        )}

        {loadingBrief && !locationBrief && (
          <div className={`p-4 rounded-xl border ${accentBg} ${accentText} flex items-center space-x-2`}>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-xs">Fetching AI location insights...</span>
          </div>
        )}

        {/* Currency & Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-semibold mb-2 flex items-center ${textPrimary}`}>
              <Coins className="w-4 h-4 text-indigo-600 mr-2" />
              2. Preferred Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium ${inputBg}`}
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code} className={darkMode ? 'bg-slate-800' : 'bg-white'}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 flex items-center ${textPrimary}`}>
              <Calendar className="w-4 h-4 text-indigo-600 mr-2" />
              3. Trip Duration: <span className="text-indigo-600 dark:text-indigo-400 ml-1 font-bold">{duration} Days</span>
            </label>
            <input
              type="range"
              min="1"
              max="14"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer mt-3"
            />
          </div>
        </div>

        {/* Travelers & Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-semibold mb-2 flex items-center ${textPrimary}`}>
              <Users className="w-4 h-4 text-indigo-600 mr-2" />
              4. Number of Travelers
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setTravelers(num)}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition ${travelers === num ? selectedButton : buttonSecondary}`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 flex items-center ${textPrimary}`}>
              <DollarSign className="w-4 h-4 text-indigo-600 mr-2" />
              5. Total Budget ({currency})
            </label>
            <input
              type="number"
              min="200"
              max="50000"
              step="50"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-sm ${inputBg}`}
              required
            />
          </div>
        </div>

        {/* Budget Tiers */}
        <div>
          <span className={`block text-xs font-semibold mb-2 ${textMuted}`}>Budget Tier:</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BUDGET_LEVELS.map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setBudgetType(tier.id)}
                className={`p-3 rounded-xl border text-left transition ${budgetType === tier.id ? selectedButton : buttonSecondary}`}
              >
                <div className="text-xl mb-1">{tier.icon}</div>
                <div className="text-xs font-bold">{tier.name}</div>
                <div className="text-[11px] mt-0.5 line-clamp-1 opacity-80">{tier.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Travel Styles */}
        <div>
          <label className={`block text-sm font-semibold mb-2 flex items-center ${textPrimary}`}>
            <Sliders className="w-4 h-4 text-indigo-600 mr-2" />
            6. Travel Styles & Interests (Select multiple)
          </label>
          <div className="flex flex-wrap gap-2">
            {TRAVEL_STYLES.map((style) => {
              const isSelected = styles.includes(style.label);
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => toggleStyle(style.label)}
                  className={`px-3.5 py-2 rounded-xl border text-xs font-medium transition flex items-center space-x-2 ${isSelected ? selectedButton : buttonSecondary}`}
                >
                  <span>{style.icon}</span>
                  <span>{style.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-4 rounded-xl ${buttonPrimary} font-bold text-base shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2 transition transform active:scale-[0.99]`}
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span>Generate Optimized Itinerary with AI</span>
        </button>
      </form>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}