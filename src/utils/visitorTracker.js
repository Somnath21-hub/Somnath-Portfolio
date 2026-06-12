// Helper to convert country code to flag emoji
export function getFlagEmoji(countryCode) {
  if (!countryCode) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  try {
    return String.fromCodePoint(...codePoints);
  } catch (e) {
    return '🌐';
  }
}

// Key for sessionStorage to prevent double tracking in a single session
const SESSION_TRACK_KEY = 'portfolio_visited_session';

// Key for localStorage fallback
const LOCAL_STORAGE_KEY = 'portfolio_mock_visitors';

// Seed mock data for development when database is not configured
const seedMockData = () => {
  const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!existing) {
    const mockData = [
      {
        id: 'mock-1',
        city: 'Mumbai',
        country: 'India',
        countryCode: 'IN',
        flag: '🇮🇳',
        timestamp: Date.now() - 1000 * 60 * 12, // 12 mins ago
      },
      {
        id: 'mock-2',
        city: 'San Francisco',
        country: 'United States',
        countryCode: 'US',
        flag: '🇺🇸',
        timestamp: Date.now() - 1000 * 60 * 45, // 45 mins ago
      },
      {
        id: 'mock-3',
        city: 'London',
        country: 'United Kingdom',
        countryCode: 'GB',
        flag: '🇬🇧',
        timestamp: Date.now() - 1000 * 60 * 60 * 3, // 3 hours ago
      },
      {
        id: 'mock-4',
        city: 'Tokyo',
        country: 'Japan',
        countryCode: 'JP',
        flag: '🇯🇵',
        timestamp: Date.now() - 1000 * 60 * 60 * 18, // 18 hours ago
      },
      {
        id: 'mock-5',
        city: 'Berlin',
        country: 'Germany',
        countryCode: 'DE',
        flag: '🇩🇪',
        timestamp: Date.now() - 1000 * 60 * 60 * 32, // 32 hours ago
      },
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockData));
  }
};

// Main function to track the current visit
export async function trackVisit() {
  // 1. Prevent tracking multiple times in the same session
  if (sessionStorage.getItem(SESSION_TRACK_KEY)) {
    return { success: true, message: 'Already tracked in this session.' };
  }

  const dbUrl = import.meta.env.VITE_FIREBASE_DB_URL;

  try {
    // 2. Fetch IP Geolocation details
    const geoResponse = await fetch('https://freeipapi.com/api/json');
    if (!geoResponse.ok) {
      throw new Error('Failed to fetch location data');
    }
    const geoData = await geoResponse.json();

    const visitData = {
      city: geoData.cityName || 'Unknown City',
      country: geoData.countryName || 'Unknown Country',
      countryCode: geoData.countryCode || '',
      flag: getFlagEmoji(geoData.countryCode),
      timestamp: Date.now(),
    };

    // Skip tracking local host loopback if returned as unknown
    if (visitData.city === 'Unknown City' && visitData.country === 'Unknown Country') {
      visitData.city = 'Local Developer';
      visitData.country = 'Workspace';
      visitData.countryCode = 'DEV';
      visitData.flag = '💻';
    }

    // 3. Write to Database or LocalStorage
    if (dbUrl && dbUrl.trim() !== '') {
      // Clean up url (remove trailing slash)
      const cleanUrl = dbUrl.replace(/\/$/, '');
      const res = await fetch(`${cleanUrl}/visitors.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitData),
      });

      if (!res.ok) {
        throw new Error('Database write failed');
      }
    } else {
      // LocalStorage Fallback
      seedMockData();
      const localVisits = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
      const newVisit = {
        id: `local-${Date.now()}`,
        ...visitData,
      };
      localVisits.push(newVisit);
      // Limit to 200 visits in local storage to prevent bloating
      if (localVisits.length > 200) {
        localVisits.shift();
      }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localVisits));
    }

    // Mark as tracked for this session
    sessionStorage.setItem(SESSION_TRACK_KEY, 'true');
    return { success: true, visit: visitData };

  } catch (error) {
    console.error('Visitor tracking error:', error);
    
    // As a secondary fallback, record a generic visitor locally so the app doesn't break
    if (!dbUrl || dbUrl.trim() === '') {
      seedMockData();
      const localVisits = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
      const newVisit = {
        id: `local-${Date.now()}`,
        city: 'Secret Visitor',
        country: 'Earth',
        countryCode: 'UN',
        flag: '🌍',
        timestamp: Date.now(),
      };
      localVisits.push(newVisit);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localVisits));
      sessionStorage.setItem(SESSION_TRACK_KEY, 'true');
    }
    return { success: false, error: error.message };
  }
}

// Function to retrieve visitor logs and statistics
export async function getVisitorStats() {
  const dbUrl = import.meta.env.VITE_FIREBASE_DB_URL;

  try {
    let visits = [];

    if (dbUrl && dbUrl.trim() !== '') {
      const cleanUrl = dbUrl.replace(/\/$/, '');
      const res = await fetch(`${cleanUrl}/visitors.json`);
      if (!res.ok) {
        throw new Error('Database fetch failed');
      }
      const data = await res.json();
      
      if (data) {
        // Firebase returns an object of key-value pairs
        visits = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
      }
    } else {
      // LocalStorage fallback
      seedMockData();
      visits = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    }

    // Sort descending by timestamp (newest first)
    visits.sort((a, b) => b.timestamp - a.timestamp);

    // Compute stats
    const totalCount = visits.length;
    
    // Count visits per country
    const countryMap = {};
    visits.forEach((v) => {
      const country = v.country || 'Unknown Country';
      if (!countryMap[country]) {
        countryMap[country] = {
          country,
          code: v.countryCode || '',
          flag: v.flag || '🌐',
          count: 0,
        };
      }
      countryMap[country].count += 1;
    });

    const countryStats = Object.values(countryMap).sort((a, b) => b.count - a.count);
    const uniqueCountriesCount = countryStats.length;

    return {
      success: true,
      visits: visits.slice(0, 10), // Limit to top 10 recent visits for the feed
      totalCount,
      uniqueCountriesCount,
      countryStats: countryStats.slice(0, 5), // Top 5 countries for charts
    };

  } catch (error) {
    console.error('Failed to retrieve visitor stats:', error);
    // Return mock empty state or default structure
    return {
      success: false,
      visits: [],
      totalCount: 0,
      uniqueCountriesCount: 0,
      countryStats: [],
      error: error.message,
    };
  }
}
