export const POPULAR_DESTINATIONS = [
  { name: 'Tokyo, Japan', image: '🗼', tag: 'Culture & Modernity', defaultBudget: 2400 },
  { name: 'Paris, France', image: '🥐', tag: 'Romance & Art', defaultBudget: 2200 },
  { name: 'Bali, Indonesia', image: '🌴', tag: 'Nature & Relaxation', defaultBudget: 1200 },
  { name: 'New York, USA', image: '🗽', tag: 'City & Entertainment', defaultBudget: 3000 },
  { name: 'Rome, Italy', image: '🏛️', tag: 'History & Gastronomy', defaultBudget: 2000 },
  { name: 'Barcelona, Spain', image: '🏖️', tag: 'Architecture & Beach', defaultBudget: 1800 },
  { name: 'Kyoto, Japan', image: '⛩️', tag: 'Temples & Gardens', defaultBudget: 2100 },
  { name: 'Santorini, Greece', image: '🌅', tag: 'Views & Romance', defaultBudget: 2500 },
  { name: 'London, UK', image: '💂', tag: 'Museums & Royalty', defaultBudget: 2600 },
  { name: 'Reykjavik, Iceland', image: '🌋', tag: 'Adventure & Aurora', defaultBudget: 2800 },
];

export const TRAVEL_STYLES = [
  { id: 'culture', label: 'Culture & History', icon: '🏛️' },
  { id: 'food', label: 'Food & Dining', icon: '🍜' },
  { id: 'adventure', label: 'Adventure & Nature', icon: '🏔️' },
  { id: 'relaxation', label: 'Relaxation & Spa', icon: '💆' },
  { id: 'nightlife', label: 'Nightlife & Bars', icon: '🍸' },
  { id: 'shopping', label: 'Shopping & Markets', icon: '🛍️' },
  { id: 'hidden', label: 'Hidden Gems', icon: '🧭' },
];

export const BUDGET_LEVELS = [
  { id: 'budget', name: 'Backpacker / Budget', multiplier: 0.8, icon: '🎒', desc: 'Hostels, street food, public transport' },
  { id: 'moderate', name: 'Moderate / Standard', multiplier: 1.0, icon: '🏨', desc: '3-star hotels, nice dining, mix of transit' },
  { id: 'luxury', name: 'Luxury / Premium', multiplier: 1.8, icon: '✨', desc: '4/5-star hotels, fine dining, private tours' },
  { id: 'ultra', name: 'Ultra Luxury', multiplier: 3.0, icon: '👑', desc: 'Top resorts, Michelin star, VIP experiences' },
];
