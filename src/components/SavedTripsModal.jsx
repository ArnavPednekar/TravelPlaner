import React from 'react';
import { X, Calendar, MapPin, DollarSign, Trash2, ArrowRight } from 'lucide-react';

export default function SavedTripsModal({ isOpen, onClose, savedTrips, onLoadTrip, onDeleteTrip }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 border border-slate-100 dark:border-slate-800 max-h-[85vh] flex flex-col transition-colors">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Saved Itineraries</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Access your previously planned dream trips.</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {savedTrips.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">No saved trips yet</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                Generate an itinerary and click "Save Itinerary" to store it here for quick access.
              </p>
            </div>
          ) : (
            savedTrips.map((trip) => (
              <div
                key={trip.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      {trip.duration} Days
                    </span>
                    <span className="text-xs text-slate-400">Created {trip.createdAt}</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">{trip.destination}</h4>
                  <div className="flex items-center space-x-4 text-xs text-slate-600 dark:text-slate-300 font-medium">
                    <span className="flex items-center">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mr-0.5" />
                      ${trip.budgetAmount?.toLocaleString()}
                    </span>
                    <span>•</span>
                    <span>{trip.travelers} Travelers</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => {
                      onDeleteTrip(trip.id);
                    }}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:border-rose-200 dark:hover:border-rose-900 text-slate-400 hover:text-rose-600 transition"
                    title="Delete Trip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onLoadTrip(trip);
                      onClose();
                    }}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm flex items-center space-x-1.5 transition"
                  >
                    <span>View Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
