import React from 'react';
import { Compass, Bookmark, PlusCircle, Sun, Moon } from 'lucide-react';

export default function Navbar({ onNewTrip, onOpenSaved, savedCount, darkMode, onToggleDarkMode }) {
  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${darkMode ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onNewTrip}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Compass className="w-6 h-6 animate-pulse-slow" />
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">VoyageAI</span>
            <span className="text-xs block text-slate-500 dark:text-slate-400 font-medium">Smart Travel Planner</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-xl border transition ${darkMode ? 'bg-slate-800 border-slate-700 text-amber-300 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}
            title="Toggle Dark/Light Mode"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenSaved}
            className={`relative inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition ${darkMode ? 'border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300' : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'}`}
          >
            <Bookmark className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden sm:inline">Saved Trips</span>
            {savedCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{savedCount}</span>
            )}
          </button>

          <button
            onClick={onNewTrip}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow-sm shadow-indigo-500/20 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Trip</span>
          </button>
        </div>
      </div>
    </header>
  );
}