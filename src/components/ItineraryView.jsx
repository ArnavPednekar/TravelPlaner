import React, { useState } from 'react';
import { 
  MapPin, Calendar, DollarSign, Users, Sparkles, Hotel, 
  Sun, Sunset, Moon, BookmarkCheck, Printer, ArrowLeft, 
  CheckSquare, Lightbulb, Compass, Plane, ExternalLink, Navigation, Coins 
} from 'lucide-react';
import { CURRENCIES, formatCurrency } from '../data/currencies';

export default function ItineraryView({ itinerary, onBack, onSave, isSaved }) {
  const [activeDay, setActiveDay] = useState(1);
  const [checkedItems, setCheckedItems] = useState({});
  const [savedStatus, setSavedStatus] = useState(isSaved);
  const [currentCurrency, setCurrentCurrency] = useState(itinerary.currency || 'USD');

  const toggleCheck = (itemKey) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  const handleSaveClick = () => {
    onSave(itinerary);
    setSavedStatus(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentDayData = itinerary.days.find(d => d.dayNumber === activeDay) || itinerary.days[0];

  const googleMapsUrl = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const googleFlightsUrl = (dest) => `https://www.google.com/travel/flights?q=flights+to+${encodeURIComponent(dest)}`;
  const bookingHotelUrl = (hotelName, dest) => `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotelName + ' ' + dest)}`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Navigation & Currency Switcher & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Plan Another Trip</span>
        </button>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
          {/* Currency Switcher */}
          <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <Coins className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <select
              value={currentCurrency}
              onChange={(e) => setCurrentCurrency(e.target.value)}
              className="bg-transparent text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code} className="dark:bg-slate-800">{c.code} ({c.symbol})</option>
              ))}
            </select>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium shadow-sm transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print / PDF</span>
          </button>

          <button
            onClick={handleSaveClick}
            disabled={savedStatus}
            className={`inline-flex items-center space-x-2 px-5 py-2 rounded-xl text-sm font-medium shadow-sm transition ${
              savedStatus
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>{savedStatus ? 'Saved to Trips' : 'Save Itinerary'}</span>
          </button>
        </div>
      </div>

      {/* Hero Overview Card */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-semibold flex items-center space-x-1">
              <Compass className="w-3.5 h-3.5 mr-1" />
              <span>{itinerary.budgetType.toUpperCase()} TIER</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-semibold">
              Created {itinerary.createdAt}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            {itinerary.destination}
          </h1>
          <p className="text-indigo-200 text-sm sm:text-base max-w-3xl leading-relaxed mb-8">
            {itinerary.overview}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-indigo-300" />
              </div>
              <div>
                <div className="text-xs text-indigo-300 font-medium">Duration</div>
                <div className="text-base font-bold">{itinerary.duration} Days</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-xs text-indigo-300 font-medium">Total Budget</div>
                <div className="text-base font-bold">{formatCurrency(itinerary.budgetAmount, currentCurrency)}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-indigo-300" />
              </div>
              <div>
                <div className="text-xs text-indigo-300 font-medium">Travelers</div>
                <div className="text-base font-bold">{itinerary.travelers} {itinerary.travelers === 1 ? 'Person' : 'People'}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="text-xs text-indigo-300 font-medium">Interests</div>
                <div className="text-base font-bold truncate max-w-[140px]">{itinerary.styles.length ? itinerary.styles[0] : 'General'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flight Recommendation & Live Search */}
      {itinerary.flightInfo && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0">
              <Plane className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Recommended Flight Route</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                  {itinerary.flightInfo.class}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{itinerary.flightInfo.airline} ({itinerary.flightInfo.flightNumber})</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{itinerary.flightInfo.route} • Est. ~{formatCurrency(itinerary.flightInfo.estimatedCost, currentCurrency)}</p>
            </div>
          </div>

          <a
            href={googleFlightsUrl(itinerary.destination)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-sm transition shrink-0"
          >
            <span>Search Live Flights</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Grid: Budget Breakdown & Accommodation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Budget Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
            <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-2" />
            Budget Allocation
          </h3>
          <div className="space-y-3">
            {Object.entries(itinerary.budgetBreakdown).map(([key, val]) => {
              const percentage = Math.round((val / itinerary.budgetAmount) * 100);
              return (
                <div key={key}>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 capitalize">
                    <span>{key}</span>
                    <span>{formatCurrency(val, currentCurrency)} ({percentage}%)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full"
                      style={{ width: `${Math.min(100, percentage)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Accommodation Recommendation */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center">
                <Hotel className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                Verified Stay: {itinerary.accommodation.name}
              </h3>
              <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                ~{formatCurrency(itinerary.accommodation.pricePerNight, currentCurrency)} / night
              </span>
            </div>
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium mb-3">
              {itinerary.accommodation.type}
            </span>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
              {itinerary.accommodation.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
            <a
              href={googleMapsUrl(itinerary.accommodation.name + ', ' + itinerary.destination)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>View on Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={bookingHotelUrl(itinerary.accommodation.name, itinerary.destination)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold transition"
            >
              <span>Check Live Rates on Booking.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Day-by-Day Itinerary Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Day-by-Day Schedule</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Optimized pacing with direct map links for every stop.</p>
          </div>

          {/* Day Selector Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {itinerary.days.map((d) => (
              <button
                key={d.dayNumber}
                onClick={() => setActiveDay(d.dayNumber)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeDay === d.dayNumber
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                Day {d.dayNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Active Day Content */}
        <div>
          <div className="mb-6">
            <h4 className="text-lg font-bold text-indigo-950 dark:text-indigo-300 flex items-center">
              <span className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm font-black mr-3">
                {activeDay}
              </span>
              {currentDayData.title}
            </h4>
          </div>

          <div className="space-y-6">
            {/* Morning / Afternoon / Evening Activity Cards */}
            {[
              { type: 'Morning', icon: Sun, bg: 'bg-amber-100 dark:bg-amber-950', text: 'text-amber-700 dark:text-amber-300', data: currentDayData.morning },
              { type: 'Afternoon', icon: Sunset, bg: 'bg-orange-100 dark:bg-orange-950', text: 'text-orange-700 dark:text-orange-300', data: currentDayData.afternoon },
              { type: 'Evening', icon: Moon, bg: 'bg-indigo-100 dark:bg-indigo-950', text: 'text-indigo-700 dark:text-indigo-300', data: currentDayData.evening }
            ].map((slot, idx) => {
              const Icon = slot.icon;
              return (
                <div key={idx} className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 gap-6">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`w-12 h-12 rounded-xl ${slot.bg} ${slot.text} flex items-center justify-center shrink-0 mt-1`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {slot.type}
                        </span>
                        <h5 className="font-bold text-slate-900 dark:text-slate-100 text-base">{slot.data.title}</h5>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/50 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {slot.data.time}
                        </span>
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">~{formatCurrency(slot.data.cost, currentCurrency)}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-3">{slot.data.description}</p>
                      <a
                        href={googleMapsUrl(slot.data.title + ', ' + itinerary.destination)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>Open in Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid: Tips & Packing Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Travel Tips */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
            <Lightbulb className="w-5 h-5 text-amber-500 mr-2" />
            Smart Travel Tips
          </h3>
          <ul className="space-y-3">
            {itinerary.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-sm text-slate-700 dark:text-slate-300">
                <span className="w-5 h-5 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Packing Checklist */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
            <CheckSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
            Packing Checklist
          </h3>
          <ul className="space-y-3">
            {itinerary.packingList.map((item, idx) => {
              const itemKey = `pack_${idx}`;
              const isChecked = !!checkedItems[itemKey];
              return (
                <li
                  key={idx}
                  onClick={() => toggleCheck(itemKey)}
                  className="flex items-center space-x-3 text-sm text-slate-700 dark:text-slate-300 cursor-pointer select-none hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded-lg transition"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="w-4 h-4 text-indigo-600 rounded border-slate-300 dark:border-slate-700 focus:ring-indigo-500 cursor-pointer"
                  />
                  <span className={isChecked ? 'line-through text-slate-400 dark:text-slate-500' : ''}>{item}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}