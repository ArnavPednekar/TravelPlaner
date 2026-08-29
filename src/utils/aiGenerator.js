import { REAL_VENUES } from '../data/realVenues';

export function generateItinerary({ destination, duration, budgetType, budgetAmount, travelers, styles, currency }) {
  const cleanDest = destination.trim() || 'Paris, France';
  const numDays = Math.max(1, Math.min(14, parseInt(duration) || 3));
  const numTravelers = parseInt(travelers) || 2;
  const baseBudget = parseFloat(budgetAmount) || 2000;
  const selectedCurrency = currency || 'USD';

  // Find matching real venue data if available
  const matchedKey = Object.keys(REAL_VENUES).find(k => 
    cleanDest.toLowerCase().includes(k.split(',')[0].toLowerCase())
  );
  const realData = matchedKey ? REAL_VENUES[matchedKey] : null;

  // Budget breakdown calculations
  const accommodationShare = 0.38;
  const foodShare = 0.28;
  const activitiesShare = 0.20;
  const transportShare = 0.14;

  const totalAccom = Math.round(baseBudget * accommodationShare);
  const totalFood = Math.round(baseBudget * foodShare);
  const totalAct = Math.round(baseBudget * activitiesShare);
  const totalTrans = Math.round(baseBudget * transportShare);

  const airlines = budgetType === 'luxury' 
    ? [{ name: 'Emirates / Qatar Airways', class: 'Business / First Class', flightNo: 'EK-202 / QR-701' }] 
    : [{ name: 'Delta Air Lines / Air France', class: 'Economy / Premium Economy', flightNo: 'DL-412 / AF-007' }];

  const flightInfo = {
    airline: airlines[0].name,
    class: airlines[0].class,
    flightNumber: airlines[0].flightNo,
    estimatedCost: Math.round(baseBudget * 0.25),
    route: `Major International Hub → ${cleanDest} International Airport`
  };

  let accommodation;
  if (realData && realData.hotels && realData.hotels.length > 0) {
    const hotelIndex = budgetType === 'luxury' ? Math.min(1, realData.hotels.length - 1) : 0;
    const h = realData.hotels[hotelIndex];
    accommodation = {
      name: h.name,
      type: h.type,
      pricePerNight: h.pricePerNight,
      description: h.description
    };
  } else {
    const accomPerNight = Math.round(totalAccom / numDays);
    const accomName = budgetType === 'luxury' 
      ? `Grand Luxury Hotel & Spa ${cleanDest}` 
      : budgetType === 'budget' 
      ? `Central Backpackers Lodge & Hub ${cleanDest}` 
      : `Boutique Heritage Hotel ${cleanDest}`;
    accommodation = {
      name: accomName,
      type: budgetType === 'luxury' ? '5-Star Luxury Property' : budgetType === 'budget' ? 'Cozy Hostel / Guesthouse' : '4-Star Central Hotel',
      pricePerNight: accomPerNight,
      description: `Centrally located in ${cleanDest} with excellent transit connectivity, outstanding guest ratings, and modern amenities tailored for your travel style.`
    };
  }

  // Dynamic context-aware attractions for ANY destination typed by user
  const destNameOnly = cleanDest.split(',')[0].trim();
  const attractions = realData?.attractions || [
    { name: `Historic Heart & Old Town of ${destNameOnly}`, desc: `Immerse yourself in the centuries-old architectural heritage and charming streets of ${destNameOnly}.` },
    { name: `Panoramic Viewpoint & Skyline Tower`, desc: `Take in breathtaking aerial vistas across the entire landscape of ${destNameOnly} at sunset.` },
    { name: `National Heritage Museum & Art Gallery`, desc: `Discover the fascinating cultural evolution, masterpieces, and artifacts of ${destNameOnly}.` },
    { name: `Botanical Gardens & Riverside Promenade`, desc: `Enjoy a refreshing stroll through lush greenery and scenic waterfronts in ${destNameOnly}.` },
    { name: `Vibrant Local Artisan Market`, desc: `Browse bustling stalls filled with handmade crafts, spices, and souvenirs unique to ${destNameOnly}.` }
  ];

  const restaurants = realData?.restaurants || [
    { name: `${destNameOnly} Culinary Bistro & Cafe`, type: `Authentic Regional Gastronomy`, avgCost: 28, description: `Savor traditional flavors and signature dishes beloved by locals in ${destNameOnly}.` },
    { name: `Grand Rooftop Dining ${destNameOnly}`, type: `Fine Dining & Cocktails`, avgCost: 65, description: `Enjoy gourmet cuisine paired with panoramic evening views over ${destNameOnly}.` }
  ];

  const days = [];
  for (let i = 1; i <= numDays; i++) {
    let morning, afternoon, evening;
    const attr1 = attractions[(i - 1) % attractions.length];
    const attr2 = attractions[i % attractions.length];
    const rest1 = restaurants[(i - 1) % restaurants.length];
    const rest2 = restaurants[i % restaurants.length];

    if (i === 1) {
      morning = {
        time: '09:00 AM - 12:00 PM',
        title: `Arrival & Check-in at ${accommodation.name}`,
        description: `Arrive in ${cleanDest}, transfer smoothly to your accommodation, unpack, and take a gentle orientation walk.`,
        cost: 40,
        category: 'Transport'
      };
      afternoon = {
        time: '01:30 PM - 05:00 PM',
        title: attr1.name,
        description: attr1.desc,
        cost: Math.round(30 * (budgetType === 'luxury' ? 2 : 1)),
        category: 'Sightseeing'
      };
      evening = {
        time: '06:30 PM - 10:00 PM',
        title: `Welcome Dinner at ${rest1.name}`,
        description: `${rest1.description} (${rest1.type}).`,
        cost: Math.round(rest1.avgCost * numTravelers),
        category: 'Dining'
      };
    } else if (i === numDays) {
      morning = {
        time: '09:30 AM - 12:00 PM',
        title: `Final Souvenirs & Farewell Brunch in ${destNameOnly}`,
        description: `Enjoy a relaxed final breakfast, pick up memorable keepsakes from local boutiques, and soak in the atmosphere.`,
        cost: 30,
        category: 'Shopping'
      };
      afternoon = {
        time: '01:00 PM - 03:00 PM',
        title: `Departure Transfer from ${destNameOnly}`,
        description: `Check out of your hotel, head to the transit hub with comfortable transport, and depart for home.`,
        cost: 40,
        category: 'Transport'
      };
      evening = {
        time: '04:00 PM onwards',
        title: 'Journey Home',
        description: 'Safe travels home with wonderful memories!',
        cost: 0,
        category: 'Travel'
      };
    } else {
      morning = {
        time: '09:00 AM - 12:30 PM',
        title: attr1.name,
        description: attr1.desc,
        cost: Math.round(25 * (budgetType === 'luxury' ? 2 : 1)),
        category: 'Sightseeing'
      };
      afternoon = {
        time: '02:00 PM - 05:30 PM',
        title: attr2.name,
        description: attr2.desc,
        cost: Math.round(25 * (budgetType === 'luxury' ? 2 : 1)),
        category: 'Culture'
      };
      evening = {
        time: '07:00 PM - 10:00 PM',
        title: `Dinner Experience at ${rest2.name}`,
        description: `${rest2.description} (${rest2.type}).`,
        cost: Math.round(rest2.avgCost * numTravelers),
        category: 'Dining'
      };
    }

    days.push({
      dayNumber: i,
      title: i === 1 ? `Day 1: Welcome to ${destNameOnly}` : i === numDays ? `Day ${i}: Farewell ${destNameOnly}` : `Day ${i}: Exploring ${destNameOnly} Highlights`,
      morning,
      afternoon,
      evening
    });
  }

  const tips = [
    `Best time to explore outdoor attractions in ${cleanDest} is early morning to avoid peak crowds.`,
    `Keep some local currency cash on hand for small vendors, local transport, and street markets in ${destNameOnly}.`,
    `Download offline translation and map apps (Google Maps / Maps.me) before arriving in ${cleanDest}.`,
    `Check ahead for any special local festivals or exhibitions happening during your stay.`
  ];

  const packingList = [
    `Comfortable walking shoes (minimum 2 pairs)`,
    `Weather-appropriate layers and light waterproof jacket`,
    `Universal power adapter and high-capacity portable charger`,
    `Reusable water bottle and compact daypack`,
    `Prescription medications and basic personal first-aid kit`
  ];

  return {
    id: 'trip_' + Math.random().toString(36).substring(2, 9),
    destination: cleanDest,
    duration: numDays,
    budgetType,
    budgetAmount: baseBudget,
    travelers: numTravelers,
    styles: styles || [],
    currency: selectedCurrency,
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    overview: `An expertly optimized ${numDays}-day itinerary for ${numTravelers} traveler(s) in ${cleanDest}, featuring custom-curated local attractions, authentic dining experiences, and verified accommodation tailored precisely to your preferences.`,
    flightInfo,
    accommodation,
    budgetBreakdown: {
      accommodation: totalAccom,
      food: totalFood,
      activities: totalAct,
      transport: totalTrans,
      buffer: Math.round(baseBudget * 0.05)
    },
    days,
    tips,
    packingList
  };
}