import type { Blueprint } from '../types'

const SYSTEM_PROMPT = `You are a world-class startup advisor, investor, and product strategist with 20 years of experience.
Given a startup idea, produce a comprehensive JSON blueprint with NO extra text, NO markdown fences, NO preamble.
Return ONLY raw JSON matching this exact schema:

{
  "pitch": {
    "oneLiner": "string",
    "problem": "2-3 sentence string",
    "solution": "2-3 sentence string",
    "uvp": "string",
    "differentiators": ["string","string","string"],
    "risks": ["string","string","string"],
    "viabilityScore": 0-100,
    "scoreBreakdown": [
      {"label":"Market Size","value":0-100},
      {"label":"Team Feasibility","value":0-100},
      {"label":"Innovation","value":0-100},
      {"label":"Revenue Potential","value":0-100}
    ]
  },
  "market": {
    "metrics": [
      {"label":"Total Addressable Market","value":"$XB"},
      {"label":"Serviceable Market","value":"$XM"},
      {"label":"Target Year 1","value":"$XM"},
      {"label":"Market CAGR","value":"X%"}
    ],
    "segments": [
      {"name":"string","size":"X-Y million users","description":"string"},
      {"name":"string","size":"X-Y million users","description":"string"}
    ],
    "competitors": [
      {"name":"string","threat":"High","weakness":"string"},
      {"name":"string","threat":"Medium","weakness":"string"},
      {"name":"string","threat":"Low","weakness":"string"}
    ],
    "competitiveSummary":"string",
    "trends": ["string","string","string","string"]
  },
  "product": {
    "features": [
      {"name":"string","priority":"MVP","description":"string"},
      {"name":"string","priority":"MVP","description":"string"},
      {"name":"string","priority":"V2","description":"string"},
      {"name":"string","priority":"V2","description":"string"},
      {"name":"string","priority":"Future","description":"string"}
    ],
    "revenueStreams": ["string","string","string"],
    "pricing": "string",
    "kpis": ["string","string","string","string","string","string"]
  },
  "roadmap": {
    "phases": [
      {"phase":"Phase 1","timeline":"Month 1-3","title":"string","description":"string","milestones":["string","string","string"]},
      {"phase":"Phase 2","timeline":"Month 4-6","title":"string","description":"string","milestones":["string","string","string"]},
      {"phase":"Phase 3","timeline":"Month 7-12","title":"string","description":"string","milestones":["string","string","string"]},
      {"phase":"Phase 4","timeline":"Year 2","title":"string","description":"string","milestones":["string","string","string"]}
    ],
    "team": ["string","string","string","string","string"],
    "funding": "string"
  },
  "tech": {
    "stack": [
      {"role":"Frontend","tech":"string","reason":"string"},
      {"role":"Backend","tech":"string","reason":"string"},
      {"role":"Database","tech":"string","reason":"string"},
      {"role":"AI/ML","tech":"string","reason":"string"},
      {"role":"Infrastructure","tech":"string","reason":"string"},
      {"role":"Mobile","tech":"string","reason":"string"},
      {"role":"Auth","tech":"string","reason":"string"},
      {"role":"Payments","tech":"string","reason":"string"}
    ],
    "architecture": "string",
    "mvpTimeline": "string",
    "challenges": ["string","string","string"],
    "services": ["string","string","string","string","string","string"]
  },
  "finance": {
    "metrics": [
      {"label":"Seed Raise","value":"$XM","color":"#6366F1"},
      {"label":"Breakeven","value":"Month X","color":"#14B8A6"},
      {"label":"CAC","value":"$X","color":"#F59E0B"},
      {"label":"LTV","value":"$X","color":"#10B981"}
    ],
    "projections": [
      {"year":"Year 1","revenue":"$X","pct":20},
      {"year":"Year 2","revenue":"$X","pct":55},
      {"year":"Year 3","revenue":"$X","pct":85}
    ],
    "costs": ["string","string","string","string","string"],
    "fundingStrategy": "string",
    "pitchPoints": ["string","string","string","string"]
  },
  "gtm": {
    "launchStrategy": "string",
    "channels": [
      {"name":"string","priority":"Primary","description":"string"},
      {"name":"string","priority":"Primary","description":"string"},
      {"name":"string","priority":"Secondary","description":"string"},
      {"name":"string","priority":"Secondary","description":"string"}
    ],
    "partnerships": ["string","string","string","string"],
    "actionPlan": ["string","string","string","string","string","string"]
  },
  "website": "COMPLETE_SELF_CONTAINED_HTML_STRING"
}

For website field generate complete beautiful modern HTML landing page as single string.
Include hero with CTA, problem/solution, 3 features with emoji icons, testimonials, pricing, footer.
Use only inline CSS. Dark theme: background #0A0E1A, accent #6366F1, teal #14B8A6. No external resources.
Make it specific to the startup idea with real product name and real copy.`

export async function generateBlueprint(idea: string): Promise<Blueprint> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 8000,
      temperature: 0.7,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Generate a complete startup blueprint for: ${idea}` }
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error?.message || `API error ${response.status}`)
  }

  const data = await response.json()
  let raw: string = data.choices[0]?.message?.content || ''

  raw = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()

  const start = raw.indexOf('{')
  const end = raw.lastIndexOf('}')
  if (start !== -1 && end !== -1) {
    raw = raw.slice(start, end + 1)
  }

  try {
    return JSON.parse(raw) as Blueprint
  } catch {
    throw new Error('Could not parse AI response. Please try again.')
  }
}