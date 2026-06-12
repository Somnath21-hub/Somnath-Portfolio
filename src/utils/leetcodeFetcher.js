// Utility to fetch real-time LeetCode stats for the user
const LEETCODE_API_URL = 'https://leetcode-api-faisalshohag.vercel.app';
const LEETCODE_FALLBACK_URL = 'https://leetcode-stats-api.herokuapp.com';

export async function fetchLeetCodeStats(username) {
  if (!username) return null;

  // Cache stats in sessionStorage to prevent spamming the API on page reloads
  const cacheKey = `leetcode_stats_${username}`;
  const cachedData = sessionStorage.getItem(cacheKey);
  
  if (cachedData) {
    try {
      return JSON.parse(cachedData);
    } catch (e) {
      console.warn('Error parsing cached LeetCode stats:', e);
    }
  }

  try {
    // Attempt to fetch from primary API
    const response = await fetch(`${LEETCODE_API_URL}/${username}`);
    if (!response.ok) {
      throw new Error(`Primary LeetCode API returned status ${response.status}`);
    }
    const data = await response.json();
    
    if (data && typeof data.totalSolved === 'number') {
      const result = {
        totalSolved: data.totalSolved,
        easySolved: data.easySolved || 0,
        easyTotal: data.totalEasy || 150,
        mediumSolved: data.mediumSolved || 0,
        mediumTotal: data.totalMedium || 150,
        hardSolved: data.hardSolved || 0,
        hardTotal: data.totalHard || 100,
      };
      
      sessionStorage.setItem(cacheKey, JSON.stringify(result));
      return result;
    }
  } catch (error) {
    console.warn('Primary LeetCode API failed, trying fallback...', error);
  }

  try {
    // Attempt fallback API
    const response = await fetch(`${LEETCODE_FALLBACK_URL}/${username}`);
    if (!response.ok) {
      throw new Error(`Fallback LeetCode API returned status ${response.status}`);
    }
    const data = await response.json();
    
    if (data && data.status === 'success' && typeof data.totalSolved === 'number') {
      const result = {
        totalSolved: data.totalSolved,
        easySolved: data.easySolved || 0,
        easyTotal: data.totalEasy || 150,
        mediumSolved: data.mediumSolved || 0,
        mediumTotal: data.totalMedium || 150,
        hardSolved: data.hardSolved || 0,
        hardTotal: data.totalHard || 100,
      };
      
      sessionStorage.setItem(cacheKey, JSON.stringify(result));
      return result;
    }
  } catch (error) {
    console.error('All LeetCode APIs failed:', error);
  }

  return null;
}
