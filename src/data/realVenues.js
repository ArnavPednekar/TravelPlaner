export const REAL_VENUES = {
  "Tokyo, Japan": {
    hotels: [
      { 
        name: "Hotel Musse Ginza Meitetsu", 
        type: "4-Star Modern Hotel", 
        pricePerNight: 190, 
        description: "Located in upscale Ginza district with modern minimalist design and close subway access.",
        imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
      },
      { 
        name: "Park Hyatt Tokyo", 
        type: "5-Star Luxury Icon", 
        pricePerNight: 650, 
        description: "Legendary luxury hotel in Shinjuku offering panoramic skyline views and world-class dining.",
        imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
      },
      { 
        name: "Sequence Miyashita Park", 
        type: "Trendy Lifestyle Hotel", 
        pricePerNight: 160, 
        description: "Located directly above Miyashita Park in Shibuya, perfect for exploring youth culture and nightlife.",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
      }
    ],
    restaurants: [
      { 
        name: "Ichiran Shibuya", 
        type: "Famous Tonkotsu Ramen", 
        avgCost: 15, 
        description: "Iconic individual booth ramen dining experience open late.",
        imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80"
      },
      { 
        name: "Sukiyabashi Jiro", 
        type: "World-Class Sushi", 
        avgCost: 200, 
        description: "Exquisite Edomae sushi crafted by master chefs.",
        imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80"
      },
      { 
        name: "Monja Street Tsukishima", 
        type: "Local Specialty Teppanyaki", 
        avgCost: 25, 
        description: "Vibrant street renowned for savory Tokyo-style pan-fried batter dishes.",
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
      }
    ],
    attractions: [
      { name: "Meiji Shrine & Harajuku", desc: "Tranquil forest shrine adjacent to vibrant youth fashion street Takeshita." },
      { name: "Sensō-ji Temple, Asakusa", desc: "Tokyo's oldest and most spiritually vibrant Buddhist temple." },
      { name: "Shinjuku Gyoen National Garden", desc: "Expansive traditional Japanese and English landscape gardens." },
      { name: "Shibuya Crossing & Scramble Square", desc: "The world's busiest pedestrian intersection with breathtaking rooftop observation." }
    ]
  },
  "Paris, France": {
    hotels: [
      { 
        name: "Hotel Le Burgundy Paris", 
        type: "5-Star Luxury Boutique", 
        pricePerNight: 480, 
        description: "Steps from Place Vendôme featuring Michelin-starred dining and an indoor pool.",
        imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
      },
      { 
        name: "Hôtel Caron de Beaumarchais", 
        type: "Charming 3-Star Historic", 
        pricePerNight: 210, 
        description: "Immersed in 18th-century Parisian decor in the heart of Le Marais.",
        imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
      },
      { 
        name: "CitizenM Paris Gare de Lyon", 
        type: "Contemporary Design Hotel", 
        pricePerNight: 175, 
        description: "Smart tech-enabled rooms with stunning views and 24/7 canteen.",
        imageUrl: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80"
      }
    ],
    restaurants: [
      { 
        name: "Le Bouillon Chartier", 
        type: "Historic French Brasserie", 
        avgCost: 25, 
        description: "Belle Epoque institution serving classic French cuisine at affordable prices.",
        imageUrl: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80"
      },
      { 
        name: "L'As du Fallafel", 
        type: "Legendary Marais Eatery", 
        avgCost: 12, 
        description: "World-famous falafel rolls in the vibrant historic Jewish quarter.",
        imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80"
      },
      { 
        name: "Le Gabriel (La Réserve)", 
        type: "Two Michelin-Star Dining", 
        avgCost: 280, 
        description: "Exquisite gastronomic French cuisine by chef Jérôme Banctel.",
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
      }
    ],
    attractions: [
      { name: "Louvre Museum & Tuileries Garden", desc: "Home to the Mona Lisa and centuries of artistic masterworks." },
      { name: "Eiffel Tower & Trocadéro", desc: "The iconic iron lattice tower offering breathtaking views of Paris." },
      { name: "Montmartre & Sacré-Cœur Basilica", desc: "Bohemian hilltop artists' village with panoramic city overlooks." },
      { name: "Musée d'Orsay", desc: "The premier global showcase of Impressionist and Post-Impressionist masterpieces." }
    ]
  },
  "New York, USA": {
    hotels: [
      { 
        name: "The Standard, High Line", 
        type: "Trendy Meatpacking Hotel", 
        pricePerNight: 390, 
        description: "Floor-to-ceiling glass windows overlooking the Hudson River and High Line park.",
        imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80"
      },
      { 
        name: "Arlo Nomad", 
        type: "Smart Compact Hotel", 
        pricePerNight: 220, 
        description: "Cleverly engineered rooms in Midtown with sky-high terrace views.",
        imageUrl: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=800&q=80"
      },
      { 
        name: "The Plaza", 
        type: "Historic 5-Star Luxury", 
        pricePerNight: 850, 
        description: "Legendary French Renaissance-inspired castle hotel overlooking Central Park.",
        imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
      }
    ],
    restaurants: [
      { 
        name: "Joe's Pizza Greenwich Village", 
        type: "Classic NYC Slice", 
        avgCost: 6, 
        description: "The definitive quintessential New York thin-crust pizza institution.",
        imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
      },
      { 
        name: "Katz's Delicatessen", 
        type: "Historic Jewish Deli", 
        avgCost: 30, 
        description: "Legendary pastrami on rye serving Lower East Side since 1888.",
        imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
      },
      { 
        name: "Le Bernardin", 
        type: "Three Michelin-Star Seafood", 
        avgCost: 320, 
        description: "World-renowned temple of refined seafood gastronomy by Eric Ripert.",
        imageUrl: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80"
      }
    ],
    attractions: [
      { name: "Central Park & Bethesda Terrace", desc: "843 acres of lush urban oasis in the heart of Manhattan." },
      { name: "Metropolitan Museum of Art (The Met)", desc: "One of the world's largest and most comprehensive art museums." },
      { name: "Broadway Theater District", desc: "World capital of theatrical entertainment and dazzling neon marquees." },
      { name: "Empire State Building & Summit One Vanderbilt", desc: "Soaring observation decks offering iconic city skyline vistas." }
    ]
  },
  "Rome, Italy": {
    hotels: [
      { 
        name: "Hotel Artemide", 
        type: "4-Star Elegant Hotel", 
        pricePerNight: 240, 
        description: "Centrally located near Via Nazionale featuring rooftop spa and classic Italian hospitality.",
        imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80"
      },
      { 
        name: "J.K. Place Roma", 
        type: "Luxury Design Boutique", 
        pricePerNight: 550, 
        description: "Chic boutique hideaway near the Spanish Steps with bespoke interior design.",
        imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
      }
    ],
    restaurants: [
      { 
        name: "Roscioli Salumeria con Cucina", 
        type: "Gourmet Roman Trattoria", 
        avgCost: 45, 
        description: "Legendary delicatessen and kitchen serving quintessential Carbonara and cacio e pepe.",
        imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"
      },
      { 
        name: "Pizzarium Bonci", 
        type: "Artisanal Pizza al Taglio", 
        avgCost: 15, 
        description: "Globally acclaimed bakery known for revolutionary gourmet pizza slices.",
        imageUrl: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80"
      }
    ],
    attractions: [
      { name: "Colosseum & Roman Forum", desc: "The magnificent ancient imperial amphitheater and historical ruins." },
      { name: "Vatican Museums & Sistine Chapel", desc: "Papal art collections featuring Michelangelo's legendary ceiling frescoes." },
      { name: "Trevi Fountain & Pantheon", desc: "Baroque monumental fountain and best-preserved ancient Roman temple." }
    ]
  },
  "Bali, Indonesia": {
    hotels: [
      { 
        name: "Capella Ubud", 
        type: "Luxury Jungle Camp", 
        pricePerNight: 750, 
        description: "Tented luxury villas nestled in lush rainforests with private saltwater pools.",
        imageUrl: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80"
      },
      { 
        name: "The Kampung Ubud", 
        type: "Boutique Resort", 
        pricePerNight: 130, 
        description: "Serene traditional bamboo villas surrounded by emerald-green rice terraces.",
        imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80"
      }
    ],
    restaurants: [
      { 
        name: "Locavore To Go", 
        type: "Sustainable Farm-to-Table", 
        avgCost: 20, 
        description: "Celebrated local eatery highlighting ethical, locally-sourced Indonesian ingredients.",
        imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
      },
      { 
        name: "Merah Putih", 
        type: "Indonesian Fine Dining", 
        avgCost: 40, 
        description: "Stunning architectural dining space serving elevated regional Indonesian dishes.",
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
      }
    ],
    attractions: [
      { name: "Ubud Monkey Forest & Art Market", desc: "Sacred nature reserve and vibrant traditional artisan market." },
      { name: "Uluwatu Temple & Kecak Sunset Dance", desc: "Cliffside ocean temple famous for breathtaking sunset performances." },
      { name: "Tegallalang Rice Terraces", desc: "Iconic cascading emerald rice paddies with scenic jungle swings." }
    ]
  }
};

export function getImageUrl(venueName, category = 'default') {
  // Curated high-res Unsplash photography map for common activities & destinations
  const lower = venueName.toLowerCase();
  if (lower.includes('hotel') || lower.includes('stay') || lower.includes('resort') || lower.includes('lodge')) {
    return "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes('dinner') || lower.includes('lunch') || lower.includes('bistro') || lower.includes('cafe') || lower.includes('ramen') || lower.includes('sushi') || lower.includes('restaurant') || lower.includes('deli') || lower.includes('pizza') || lower.includes('eat')) {
    return "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes('museum') || lower.includes('temple') || lower.includes('shrine') || lower.includes('church') || lower.includes('palace') || lower.includes('history')) {
    return "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes('park') || lower.includes('garden') || lower.includes('nature') || lower.includes('hike') || lower.includes('forest') || lower.includes('beach')) {
    return "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes('shopping') || lower.includes('market') || lower.includes('street')) {
    return "https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes('flight') || lower.includes('airport') || lower.includes('arrival') || lower.includes('departure') || lower.includes('transfer')) {
    return "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80";
  }
  return "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";
}
