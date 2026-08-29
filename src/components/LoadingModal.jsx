import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, CheckCircle2 } from 'lucide-react';

const STEPS = [
  "Analyzing destination geography and top attractions...",
  "Curating local hidden gems and authentic dining spots...",
  "Optimizing daily pacing and logistical travel routes...",
  "Fetching real-time hotel rates and flight routes...",
  "Generating your personalized AI travel itinerary..."
];

export default function LoadingModal({ destination, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < STEPS.length - 1) return prev + 1;
        clearInterval(interval);
        setTimeout(() => onComplete(), 600);
        return prev;
      });
    }, 700);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center border border-slate-100 dark:border-slate-800">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-indigo-500/30">
          <Compass className="w-8 h-8 animate-spin" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Crafting Your Trip to {destination}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Our AI travel engine is building your custom dream itinerary with live data.</p>
        <div className="space-y-3 text-left">
          {STEPS.map((stepText, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;
            return (
              <div key={idx} className={`flex items-start space-x-3 transition-all ${isDone || isCurrent ? 'opacity-100' : 'opacity-40'}`}>
                {isDone ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" /> : isCurrent ? <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5 animate-bounce" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700 shrink-0 mt-0.5" />}
                <span className={`text-xs sm:text-sm font-medium ${isCurrent ? 'text-indigo-950 dark:text-indigo-300 font-bold' : isDone ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'}`}>{stepText}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-8 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 h-full transition-all duration-500" style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}