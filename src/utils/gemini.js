import { portfolioData } from '../data';

const GEMINI_MODEL = 'gemini-1.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

/**
 * Builds a strict system prompt using all portfolio facts.
 * The model is instructed to ONLY answer from this context — no hallucination.
 */
function buildSystemPrompt() {
  const d = portfolioData;
  const p = d.personalInfo;

  const skills = d.skills
    .map((s) => `  - ${s.category}: ${s.items.join(', ')}`)
    .join('\n');

  const experiences = d.experiences
    .map(
      (e) =>
        `  - ${e.role} at ${e.company} (${e.duration}, ${e.location})\n    Points: ${e.points.join(' | ')}\n    Skills used: ${e.skills.join(', ')}`
    )
    .join('\n');

  const projects = d.projects
    .map(
      (proj) =>
        `  - ${proj.title}: ${proj.description}\n    Tags: ${proj.tags.join(', ')}\n    GitHub: ${proj.github}${proj.demo && proj.demo !== '#' ? ` | Demo: ${proj.demo}` : ''}`
    )
    .join('\n');

  const achievements = d.achievements
    .map((a) => `  - ${a.title}: ${a.description}`)
    .join('\n');

  const communities = d.communities
    .map(
      (c) =>
        `  - ${c.role} at ${c.organization}: ${c.points.join(' | ')}`
    )
    .join('\n');

  return `You are Angela, a friendly and professional AI assistant embedded in ${p.fullName}'s personal portfolio website.

Your ONLY job is to answer questions about ${p.firstName} based on the verified facts below. 
NEVER invent, guess, or assume any information not listed here. If asked something not covered, honestly say "I don't have that information — feel free to contact ${p.firstName} directly at ${p.email}."

Keep answers concise, warm, and conversational. Use emojis occasionally to feel approachable. Do not use markdown headers — use bullet points or short paragraphs.

========== VERIFIED FACTS ABOUT ${p.fullName.toUpperCase()} ==========

## Personal Info
- Full Name: ${p.fullName}
- Roles: ${p.roles.join(', ')}
- Location: ${p.baseLocation}
- Email: ${p.email}
- GitHub: ${p.github}
- LinkedIn: ${p.linkedin}
- LeetCode: ${p.leetcode}
- Work Experience: ${p.workExpYears} years
- Hackathons Competed: ${p.hackathonsCount}
- LeetCode Problems Solved: ${p.leetcodeCount}
- Bio: ${p.bioLine1} ${p.bioLine2}

## Skills
${skills}

## Work Experience
${experiences}

## Projects
${projects}

## Achievements / Hackathons
${achievements}

## Community & Leadership
${communities}

## LeetCode Stats
- Easy: ${d.leetcodeStats.easySolved}/${d.leetcodeStats.easyTotal}
- Medium: ${d.leetcodeStats.mediumSolved}/${d.leetcodeStats.mediumTotal}
- Hard: ${d.leetcodeStats.hardSolved}/${d.leetcodeStats.hardTotal}

## Publication
- Title: ${d.publication.title}
- Publisher: ${d.publication.publisher}
- Description: ${d.publication.description}
- Link: ${d.publication.link}

========== END OF VERIFIED FACTS ==========

Remember: You are Angela. You speak on behalf of ${p.firstName}. Be helpful, accurate, and never fabricate.`;
}

/**
 * Sends a message to Gemini with full chat history for multi-turn memory.
 *
 * @param {string} userMessage - The latest user message
 * @param {Array<{role: string, text: string}>} history - Previous turns [{role:'user'|'model', text:'...'}]
 * @returns {Promise<string>} - The AI reply text
 */
export async function callGemini(userMessage, history = []) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return "⚠️ Angela is not configured yet. Please add your VITE_GEMINI_API_KEY to the .env file.";
  }

  // Build conversation turns for Gemini's multi-turn format
  const contents = [];

  // Inject history (past turns)
  for (const turn of history) {
    contents.push({
      role: turn.role, // 'user' or 'model'
      parts: [{ text: turn.text }],
    });
  }

  // Add the new user message
  contents.push({
    role: 'user',
    parts: [{ text: userMessage }],
  });

  const body = {
    system_instruction: {
      parts: [{ text: buildSystemPrompt() }],
    },
    contents,
    generationConfig: {
      temperature: 0.4,       // Low temperature = less creative, less hallucination
      topP: 0.9,
      maxOutputTokens: 512,   // Keep replies concise
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ],
  };

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error(`Gemini API error [${response.status}]:`, errText);
    throw new Error(`Gemini API returned ${response.status}: ${errText.slice(0, 120)}`);
  }

  const data = await response.json();

  // Extract reply text
  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!reply) throw new Error('Empty response from Gemini');

  return reply.trim();
}
