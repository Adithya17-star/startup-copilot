import type { Blueprint } from '../types'

// ── Utility helpers ───────────────────────────────────────────────────────────

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }
function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}
function rand(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min }

// ── Keyword detection ─────────────────────────────────────────────────────────

function detect(idea: string, keywords: string[]): boolean {
  const lower = idea.toLowerCase()
  return keywords.some(k => lower.includes(k))
}

function getCategory(idea: string): string {
  if (detect(idea, ['health','fitness','wellness','medical','doctor','hospital','workout','diet','mental','therapy','yoga'])) return 'health'
  if (detect(idea, ['food','restaurant','meal','delivery','cook','recipe','kitchen','grocery','cafe'])) return 'food'
  if (detect(idea, ['education','learn','course','student','school','university','tutor','teach','skill','training'])) return 'education'
  if (detect(idea, ['finance','money','invest','bank','payment','crypto','budget','loan','insurance','fintech'])) return 'finance'
  if (detect(idea, ['travel','trip','hotel','flight','booking','tourism','vacation','destination'])) return 'travel'
  if (detect(idea, ['ecommerce','shop','store','marketplace','sell','buy','product','retail','fashion','clothing'])) return 'ecommerce'
  if (detect(idea, ['real estate','property','rent','house','apartment','home','mortgage'])) return 'realestate'
  if (detect(idea, ['social','community','network','connect','friend','dating','match','relationship'])) return 'social'
  if (detect(idea, ['saas','software','tool','platform','dashboard','analytics','automation','workflow','b2b','enterprise'])) return 'saas'
  if (detect(idea, ['game','gaming','play','entertainment','fun','sport','esport'])) return 'gaming'
  if (detect(idea, ['ai','artificial intelligence','machine learning','ml','nlp','gpt','chatbot','assistant'])) return 'ai'
  if (detect(idea, ['logistics','delivery','shipping','supply chain','transport','fleet','driver','courier'])) return 'logistics'
  return 'general'
}

function getModel(idea: string): string {
  if (detect(idea, ['subscription','saas','monthly','premium','plan'])) return 'Subscription (SaaS)'
  if (detect(idea, ['marketplace','connect','match','platform','between'])) return 'Marketplace'
  if (detect(idea, ['ecommerce','sell','shop','store','product'])) return 'E-commerce'
  if (detect(idea, ['freemium','free','upgrade','pro','premium'])) return 'Freemium'
  if (detect(idea, ['service','consultant','agency','expert'])) return 'Service'
  return 'Subscription + Marketplace Hybrid'
}

// ── Startup name generation ───────────────────────────────────────────────────

function generateStartupName(idea: string): string {
  const prefixes = ['Nova','Flux','Zeno','Apex','Aria','Velo','Kova','Luma','Nexo','Pivo','Qora','Revo','Syno','Tero','Unio']
  const suffixes = ['ly','ify','io','hub','base','AI','lab','kit','fy','co','us','app','net']
  const words = idea.toLowerCase().split(' ').filter(w => w.length > 3).slice(0, 3)
  if (words.length > 0) {
    const word = words[Math.floor(Math.random() * words.length)]
    const root = word.slice(0, Math.min(5, word.length))
    return root.charAt(0).toUpperCase() + root.slice(1) + pick(suffixes)
  }
  return pick(prefixes) + pick(suffixes)
}

// ── Category data ─────────────────────────────────────────────────────────────

const CATEGORY_DATA: Record<string, {
  tam: string; sam: string; target: string; cagr: string
  segments: Array<{name:string;size:string;description:string}>
  competitors: Array<{name:string;threat:'High'|'Medium'|'Low';weakness:string}>
  trends: string[]
  stack: Array<{role:string;tech:string;reason:string}>
  services: string[]
  channels: Array<{name:string;priority:'Primary'|'Secondary';description:string}>
}> = {
  health: {
    tam:'$659B', sam:'$82B', target:'$4.1M', cagr:'18.2%',
    segments:[
      {name:'Health-Conscious Millennials',size:'42-68 million users',description:'Ages 25-40 who actively track health metrics and pay for wellness subscriptions.'},
      {name:'Chronic Condition Patients',size:'15-22 million users',description:'Adults managing ongoing health conditions who need consistent monitoring and guidance.'},
    ],
    competitors:[
      {name:'MyFitnessPal',threat:'High',weakness:'Overcrowded UI, no personalization engine, ad-heavy free tier.'},
      {name:'Noom',threat:'Medium',weakness:'Expensive, one-size-fits-all coaching model, high churn rate.'},
      {name:'Generic Health Apps',threat:'Low',weakness:'No community features, poor data integration, low engagement after 30 days.'},
    ],
    trends:['Wearable device adoption up 34% YoY driving demand for data-connected apps','Preventive care spending outpacing reactive care for the first time','Mental-physical health integration becoming table stakes in consumer wellness','Employer wellness programs now budgeting $800/employee/year on average'],
    stack:[
      {role:'Frontend',tech:'React Native',reason:'Single codebase for iOS and Android — critical for health app reach'},
      {role:'Backend',tech:'Node.js + Express',reason:'Fast API layer for real-time health data processing'},
      {role:'Database',tech:'PostgreSQL + TimescaleDB',reason:'Time-series data storage perfect for health metrics tracking'},
      {role:'AI/ML',tech:'TensorFlow Lite',reason:'On-device inference for privacy-preserving health predictions'},
      {role:'Infrastructure',tech:'AWS HIPAA-eligible',reason:'Required compliance for handling health data'},
      {role:'Auth',tech:'Auth0',reason:'HIPAA-compliant identity with biometric support'},
      {role:'Payments',tech:'Stripe',reason:'Subscription billing with free trial flows'},
      {role:'Analytics',tech:'Mixpanel',reason:'Track health engagement funnels and retention'},
    ],
    services:['Twilio (SMS reminders)','SendGrid (email)','HealthKit / Google Fit API','Stripe Billing','Firebase Push Notifications','Sentry (error tracking)'],
    channels:[
      {name:'Content Marketing / SEO',priority:'Primary',description:'Health blog targeting long-tail keywords drives 60% of organic signups in wellness category.'},
      {name:'Influencer Partnerships',priority:'Primary',description:'Micro-influencers in fitness (50K-500K followers) deliver 8x higher conversion than traditional ads.'},
      {name:'App Store Optimization',priority:'Secondary',description:'Health is top-3 most searched App Store category — ASO compounds over time.'},
      {name:'Corporate Wellness Programs',priority:'Secondary',description:'B2B channel through HR departments adds predictable MRR with low CAC.'},
    ],
  },
  food: {
    tam:'$1.2T', sam:'$156B', target:'$6.8M', cagr:'12.4%',
    segments:[
      {name:'Urban Professionals',size:'55-80 million users',description:'Busy city dwellers aged 25-45 who order food 3+ times per week.'},
      {name:'Home Cook Enthusiasts',size:'28-40 million users',description:'People who enjoy cooking but want guidance, meal planning, and ingredient discovery.'},
    ],
    competitors:[
      {name:'DoorDash',threat:'High',weakness:'High commission fees (30%), no cook-at-home features, poor restaurant discovery.'},
      {name:'HelloFresh',threat:'Medium',weakness:'Rigid meal kit subscriptions, no flexibility, high cancellation rates.'},
      {name:'Local Delivery Apps',threat:'Low',weakness:'Single-city focus, no tech differentiation, weak logistics.'},
    ],
    trends:['Ghost kitchen market growing at 22% CAGR reducing delivery startup barriers','Consumers spending 40% more on premium/organic ingredients post-pandemic','AI-powered dietary personalization becoming expected in food apps','Sustainability and carbon footprint tracking now influences 35% of food decisions'],
    stack:[
      {role:'Frontend',tech:'React Native',reason:'Cross-platform mobile with native maps and camera for food scanning'},
      {role:'Backend',tech:'Python + FastAPI',reason:'High-performance APIs for real-time order management'},
      {role:'Database',tech:'PostgreSQL + Redis',reason:'Reliable order data with Redis caching for real-time tracking'},
      {role:'AI/ML',tech:'Computer Vision API',reason:'Food recognition and nutritional analysis from photos'},
      {role:'Infrastructure',tech:'GCP',reason:'Strong maps integration via Google Maps Platform'},
      {role:'Auth',tech:'Firebase Auth',reason:'Social login drives 3x higher conversion for food apps'},
      {role:'Payments',tech:'Stripe',reason:'Split payments between platform and restaurants'},
      {role:'Maps',tech:'Google Maps Platform',reason:'Real-time driver tracking and ETA calculation'},
    ],
    services:['Google Maps API','Twilio SMS','Stripe Connect','Firebase','Cloudinary (food images)','SendGrid'],
    channels:[
      {name:'Social Media (Instagram/TikTok)',priority:'Primary',description:'Food content is the #1 category on both platforms — organic reach is massive with quality visuals.'},
      {name:'Local Partnerships',priority:'Primary',description:'Partner with 20-50 local restaurants for exclusive content and cross-promotion.'},
      {name:'Food Influencers',priority:'Secondary',description:'Recipe creators and food bloggers drive high-intent signups at low CPAs.'},
      {name:'Google Ads (Local)',priority:'Secondary',description:'Location-based search ads capture high-intent "food near me" queries.'},
    ],
  },
  education: {
    tam:'$7.3T', sam:'$320B', target:'$8.2M', cagr:'16.3%',
    segments:[
      {name:'Self-Directed Adult Learners',size:'90-140 million users',description:'Working professionals upskilling for career advancement or career changes.'},
      {name:'K-12 Students & Parents',size:'50-70 million users',description:'Students needing supplemental learning support and parents willing to pay for outcomes.'},
    ],
    competitors:[
      {name:'Coursera',threat:'High',weakness:'University-partnership focus means slow course updates, poor mobile experience.'},
      {name:'Udemy',threat:'Medium',weakness:'Race-to-the-bottom pricing destroys instructor quality, no learning paths.'},
      {name:'Khan Academy',threat:'Low',weakness:'Free positioning limits revenue model, no professional certification track.'},
    ],
    trends:['Micro-credentials outpacing traditional degrees for hiring decisions at 60% of tech companies','Mobile-first learning growing 45% faster than desktop platforms','AI tutoring reducing course completion dropout from 95% to under 40%','Employer tuition reimbursement programs unlocking $28B in addressable spending'],
    stack:[
      {role:'Frontend',tech:'Next.js',reason:'SEO-critical for course discovery; server-side rendering boosts organic traffic'},
      {role:'Backend',tech:'Node.js + GraphQL',reason:'Flexible data fetching for complex course/progress relationships'},
      {role:'Database',tech:'PostgreSQL + MongoDB',reason:'Relational for user/course data, document store for flexible lesson content'},
      {role:'AI/ML',tech:'OpenAI-compatible APIs',reason:'Adaptive quiz generation and personalized learning paths'},
      {role:'Infrastructure',tech:'Vercel + AWS',reason:'Edge delivery for video content globally'},
      {role:'Auth',tech:'NextAuth.js',reason:'SSO with Google/GitHub — common for developer-focused courses'},
      {role:'Payments',tech:'Stripe',reason:'One-time purchases + subscription tiers + corporate invoicing'},
      {role:'Video',tech:'Mux',reason:'Optimized video delivery with analytics for course engagement'},
    ],
    services:['Mux (video streaming)','Algolia (course search)','Intercom (student support)','Stripe','SendGrid','Loom (instructor recording)'],
    channels:[
      {name:'SEO + YouTube',priority:'Primary',description:'Educational content ranks exceptionally well — free sample lessons on YouTube drive course signups.'},
      {name:'LinkedIn Ads',priority:'Primary',description:'Professionals actively seeking skills make LinkedIn the highest-converting paid channel for ed-tech.'},
      {name:'Affiliate / Referral',priority:'Secondary',description:'Student referral programs with course credits drive viral growth at near-zero CAC.'},
      {name:'Corporate L&D Partnerships',priority:'Secondary',description:'Selling team licenses to L&D departments creates predictable ARR.'},
    ],
  },
  finance: {
    tam:'$26.5T', sam:'$890B', target:'$12.4M', cagr:'23.1%',
    segments:[
      {name:'Millennial Investors',size:'70-100 million users',description:'Ages 28-42 building wealth for the first time, underserved by traditional financial advisors.'},
      {name:'Small Business Owners',size:'30-45 million users',description:'SMB owners needing simple financial management without hiring a full-time CFO.'},
    ],
    competitors:[
      {name:'Robinhood',threat:'High',weakness:'Gamification backlash, no financial education, poor customer service reputation.'},
      {name:'Mint',threat:'Medium',weakness:'Acquired and shut down, leaving millions of users actively seeking alternatives.'},
      {name:'Personal Capital',threat:'Low',weakness:'High minimum assets required, pushes expensive wealth management upsell.'},
    ],
    trends:['Embedded finance enabling non-financial apps to offer banking features','Gen Z entering workforce with zero financial literacy driving massive ed-finance demand','Open banking APIs making account aggregation a commodity — differentiation must be elsewhere','Crypto integration now expected even by traditional finance users'],
    stack:[
      {role:'Frontend',tech:'React + TypeScript',reason:'Type safety critical when displaying financial data to prevent costly UI errors'},
      {role:'Backend',tech:'Python + Django',reason:'Battle-tested for financial applications with strong security ecosystem'},
      {role:'Database',tech:'PostgreSQL',reason:'ACID compliance essential for financial transaction integrity'},
      {role:'AI/ML',tech:'Scikit-learn + Custom Models',reason:'Fraud detection and spending prediction without sending data to third parties'},
      {role:'Infrastructure',tech:'AWS',reason:'SOC 2 compliance tools and financial-grade security infrastructure'},
      {role:'Auth',tech:'Auth0 + MFA',reason:'Multi-factor authentication mandatory for financial applications'},
      {role:'Payments',tech:'Plaid + Stripe',reason:'Plaid for bank connections, Stripe for platform monetization'},
      {role:'Compliance',tech:'Sardine',reason:'Real-time fraud prevention and KYC/AML compliance'},
    ],
    services:['Plaid (bank connection)','Stripe','Sardine (compliance)','SendGrid','Twilio','AWS CloudWatch'],
    channels:[
      {name:'Personal Finance Content / SEO',priority:'Primary',description:'"How to save money" type content drives massive organic traffic — personal finance is top Google search category.'},
      {name:'Podcast Sponsorships',priority:'Primary',description:'Personal finance podcasts have highly engaged audiences with strong purchase intent.'},
      {name:'Reddit Communities',priority:'Secondary',description:'r/personalfinance, r/investing — authentic community engagement builds trust better than ads.'},
      {name:'Partnership with Employers',priority:'Secondary',description:'Financial wellness as employee benefit — sell to HR at low CAC, high LTV.'},
    ],
  },
  saas: {
    tam:'$908B', sam:'$124B', target:'$5.6M', cagr:'19.7%',
    segments:[
      {name:'SMB Teams (10-200 employees)',size:'32-48 million businesses',description:'Small businesses replacing legacy tools with modern cloud SaaS solutions.'},
      {name:'Mid-Market Enterprises',size:'8-15 million businesses',description:'Companies with dedicated IT budgets seeking specialized workflow automation.'},
    ],
    competitors:[
      {name:'Salesforce / HubSpot',threat:'High',weakness:'Over-engineered for most SMBs, expensive, 6-month implementation cycles.'},
      {name:'Monday.com / Asana',threat:'Medium',weakness:'Generic project tools that require heavy customization for specific industries.'},
      {name:'Spreadsheets',threat:'Low',weakness:'No automation, no collaboration at scale, error-prone manual processes.'},
    ],
    trends:['AI-native SaaS tools growing 3x faster than traditional SaaS','Vertical SaaS (industry-specific) commanding 40% higher pricing than horizontal tools','Product-led growth replacing traditional sales-led motion for sub-$500/mo products','Integration-first architecture now table stakes — Zapier/Make connectivity expected'],
    stack:[
      {role:'Frontend',tech:'React + Vite',reason:'Fast build times and excellent developer experience for complex dashboards'},
      {role:'Backend',tech:'Node.js + Express',reason:'JavaScript throughout reduces context switching, large talent pool'},
      {role:'Database',tech:'PostgreSQL + Redis',reason:'Primary data store with Redis for session management and caching'},
      {role:'AI/ML',tech:'LangChain + Vector DB',reason:'Embeddings for semantic search and AI feature layer across the product'},
      {role:'Infrastructure',tech:'AWS / Vercel',reason:'Auto-scaling critical for SaaS — pay for what you use'},
      {role:'Auth',tech:'Clerk',reason:'Multi-tenant auth with organizations built-in — saves 3 months of dev time'},
      {role:'Payments',tech:'Stripe Billing',reason:'Usage-based + seat-based billing with annual plan discounts'},
      {role:'Email',tech:'Resend',reason:'Developer-friendly transactional email with React Email templates'},
    ],
    services:['Clerk (auth)','Stripe Billing','Resend (email)','Sentry','PostHog (analytics)','Zapier/Make (integrations)'],
    channels:[
      {name:'Product Hunt Launch',priority:'Primary',description:'A top-3 Product Hunt finish generates 2,000-5,000 signups and 50+ press mentions.'},
      {name:'SEO + Developer Content',priority:'Primary',description:'Technical tutorials and comparison pages ("X vs Y") drive high-intent B2B traffic.'},
      {name:'Cold Outbound (LinkedIn)',priority:'Secondary',description:'Targeted outreach to decision-makers in your ICP converts well for B2B SaaS under $500/mo.'},
      {name:'AppSumo / Lifetime Deals',priority:'Secondary',description:'Early revenue and user validation — accept only if unit economics work long-term.'},
    ],
  },
  general: {
    tam:'$450B', sam:'$62B', target:'$3.8M', cagr:'14.5%',
    segments:[
      {name:'Early Adopters',size:'20-35 million users',description:'Tech-savvy users who actively seek new solutions to existing problems.'},
      {name:'Mainstream Market',size:'80-120 million users',description:'The broader market that follows once early adopters validate the product.'},
    ],
    competitors:[
      {name:'Market Leader A',threat:'High',weakness:'Slow to innovate, high pricing, poor mobile experience.'},
      {name:'Competitor B',threat:'Medium',weakness:'Niche focus limits growth, no platform ecosystem.'},
      {name:'Legacy Solutions',threat:'Low',weakness:'Outdated technology stack, high switching cost creating opportunity for disruptors.'},
    ],
    trends:['Mobile-first usage surpassing desktop in this category for the first time','AI integration now an expectation rather than a differentiator','Subscription fatigue driving demand for usage-based pricing models','Community-led growth outperforming paid acquisition by 4x in this space'],
    stack:[
      {role:'Frontend',tech:'React + TypeScript',reason:'Industry standard with massive ecosystem and talent pool'},
      {role:'Backend',tech:'Node.js + Express',reason:'JavaScript full-stack reduces complexity for fast-moving startups'},
      {role:'Database',tech:'PostgreSQL',reason:'Reliable, scalable, open-source — no vendor lock-in'},
      {role:'AI/ML',tech:'Python + Hugging Face',reason:'Open-source models reduce AI infrastructure costs by 80%'},
      {role:'Infrastructure',tech:'AWS / Vercel',reason:'Best DevOps tooling with generous startup credits available'},
      {role:'Auth',tech:'Auth0',reason:'Handles auth complexity so team can focus on core product'},
      {role:'Payments',tech:'Stripe',reason:'Best developer experience, global payment methods, strong fraud tools'},
      {role:'Mobile',tech:'React Native',reason:'Single codebase for iOS + Android reduces mobile development cost by 60%'},
    ],
    services:['Stripe','SendGrid','Twilio','Cloudflare','Sentry','PostHog'],
    channels:[
      {name:'Content Marketing + SEO',priority:'Primary',description:'Long-form content targeting problem-aware keywords drives compounding organic growth.'},
      {name:'Social Media Marketing',priority:'Primary',description:'Platform-specific content strategy — short video performing best across all demographics.'},
      {name:'Referral Program',priority:'Secondary',description:'Incentivized referrals with product credits reduce CAC by up to 40%.'},
      {name:'Paid Acquisition (Google/Meta)',priority:'Secondary',description:'Retargeting website visitors converts at 5-8x better rate than cold traffic.'},
    ],
  },
}

// Add remaining categories pointing to closest match
const CATEGORY_MAP: Record<string,string> = {
  travel: 'general', ecommerce: 'food', realestate: 'finance',
  social: 'saas', gaming: 'general', ai: 'saas', logistics: 'general',
}

function getCategoryData(cat: string) {
  const key = CATEGORY_MAP[cat] || cat
  return CATEGORY_DATA[key] || CATEGORY_DATA.general
}

// ── Main generator ─────────────────────────────────────────────────────────────

export async function generateBlueprint(idea: string): Promise<Blueprint> {
  // Simulate async thinking time
  await new Promise(r => setTimeout(r, 2800))

  const cat = getCategory(idea)
  const data = getCategoryData(cat)
  const name = generateStartupName(idea)
  const model = getModel(idea)
  const score = rand(71, 94)
  const words = idea.split(' ')
  const ideaShort = words.slice(0, 6).join(' ')

  // Derive idea-specific copy
  const problemVerb = detect(idea, ['connect','match','find']) ? 'finding' : detect(idea, ['manage','track','monitor']) ? 'managing' : 'accessing'
  const audienceWord = detect(idea, ['student','learn','education']) ? 'students and learners' : detect(idea, ['business','b2b','enterprise','saas']) ? 'businesses' : detect(idea, ['doctor','patient','health']) ? 'patients' : 'users'

  const blueprint: Blueprint = {
    pitch: {
      oneLiner: `${name} is the fastest way to ${ideaShort.toLowerCase()} — built for ${audienceWord} who are done with outdated alternatives.`,
      problem: `Today, ${audienceWord} struggle with ${problemVerb} what they need because existing solutions are either too expensive, too complicated, or simply not built for how people work in ${new Date().getFullYear()}. The result is lost time, lost money, and constant frustration with tools that were never designed with the end user in mind.`,
      solution: `${name} solves this with a focused, intuitive platform that handles everything from day one. Instead of stitching together five different tools, ${audienceWord} get one unified experience that actually works — reducing friction from hours to minutes and delivering measurable outcomes from the very first session.`,
      uvp: `Unlike competitors that bolt on features as afterthoughts, ${name} was designed ground-up around the single job ${audienceWord} need done. The result: 3x faster time-to-value, 80% less setup friction, and outcomes that are actually measurable.`,
      differentiators: [
        `Zero-setup onboarding — live in under 5 minutes`,
        `Built-in analytics dashboard from day one`,
        `${model} pricing — pay only for what you use`,
      ],
      risks: [
        `Market education risk — users may not immediately understand the new approach vs. established habits`,
        `Competition from well-funded incumbents with existing distribution and brand trust`,
        `Regulatory or compliance requirements in ${cat} vertical that could slow GTM timeline`,
      ],
      viabilityScore: score,
      scoreBreakdown: [
        { label: 'Market Size', value: rand(72, 95) },
        { label: 'Team Feasibility', value: rand(68, 90) },
        { label: 'Innovation', value: rand(70, 92) },
        { label: 'Revenue Potential', value: rand(65, 88) },
      ],
    },

    market: {
      metrics: [
        { label: 'Total Addressable Market', value: data.tam, color: '#6366F1' },
        { label: 'Serviceable Market', value: data.sam, color: '#14B8A6' },
        { label: 'Target Year 1', value: data.target, color: '#F59E0B' },
        { label: 'Market CAGR', value: data.cagr, color: '#10B981' },
      ],
      segments: data.segments,
      competitors: data.competitors,
      competitiveSummary: `The ${cat} market is dominated by legacy players built before mobile and AI became ubiquitous. There is a clear gap for a modern, focused solution that prioritizes user experience and measurable outcomes over feature bloat. ${name} enters at the right time as incumbents face growing churn from dissatisfied users.`,
      trends: data.trends,
    },

    product: {
      features: [
        { name: 'Smart Onboarding Flow', priority: 'MVP', description: 'Personalized setup wizard that configures the product for each user type in under 5 minutes — zero manual config required.' },
        { name: 'Core Workflow Engine', priority: 'MVP', description: `The primary value delivery mechanism — the feature that directly solves the core problem: ${ideaShort}.` },
        { name: 'Analytics Dashboard', priority: 'MVP', description: 'Real-time metrics and progress tracking so users always know their ROI and can share results with stakeholders.' },
        { name: 'Team Collaboration', priority: 'V2', description: 'Invite teammates, assign roles, comment on work, and collaborate in real time without switching to a separate tool.' },
        { name: 'AI-Powered Recommendations', priority: 'V2', description: 'Surface the next best action for each user based on their behavior patterns and goals — drives retention and upsell.' },
        { name: 'API + Integrations', priority: 'Future', description: 'Public API and native integrations with top tools in the category — turns the product into a platform.' },
      ],
      revenueStreams: [
        `${model} — tiered plans at Starter ($29/mo), Pro ($79/mo), and Business ($199/mo)`,
        `Annual plans at 20% discount to improve cash flow and reduce churn`,
        `Enterprise custom contracts for teams of 50+ with dedicated support and SLAs`,
      ],
      pricing: `Freemium entry with a 14-day free trial of the Pro plan. Pricing anchored at $${rand(29,49)}/month for individuals and $${rand(79,149)}/month for teams — positioned below enterprise incumbents but above generic tools to signal quality. Annual billing incentivized at 2 months free.`,
      kpis: ['Monthly Recurring Revenue (MRR)', 'Net Revenue Retention (NRR)', 'Customer Acquisition Cost (CAC)', 'Lifetime Value (LTV)', 'Churn Rate', 'Daily Active Users (DAU)'],
    },

    roadmap: {
      phases: [
        {
          phase: 'Phase 1', timeline: 'Month 1–3', title: 'Build & Validate MVP',
          description: `Ship the core product with just enough features to deliver the primary value proposition. Focus entirely on getting 50 paying customers and achieving a Net Promoter Score above 40.`,
          milestones: ['MVP shipped and live', '50 paying customers', 'NPS > 40 achieved'],
        },
        {
          phase: 'Phase 2', timeline: 'Month 4–6', title: 'Growth & Product-Market Fit',
          description: 'Double down on what the first 50 customers love, kill what they don\'t use, and establish repeatable acquisition channels. Target $10K MRR as the PMF signal.',
          milestones: ['$10K MRR milestone', '3 repeatable growth channels', 'Churn below 5% monthly'],
        },
        {
          phase: 'Phase 3', timeline: 'Month 7–12', title: 'Scale & Expand',
          description: 'With proven PMF, invest in growth infrastructure, hire the first sales hire, and expand the product into adjacent use cases identified from customer interviews.',
          milestones: ['$50K MRR', 'First sales hire onboarded', 'V2 features shipped'],
        },
        {
          phase: 'Phase 4', timeline: 'Year 2', title: 'Market Leadership',
          description: 'Raise a Seed or Series A round to pour fuel on proven GTM, expand to new segments, and build the moat through integrations, network effects, or proprietary data.',
          milestones: ['$200K MRR', 'Seed/Series A closed', 'Category authority established'],
        },
      ],
      team: [
        `CEO / Co-founder — product vision, fundraising, customer relationships`,
        `CTO / Co-founder — architecture decisions, engineering culture, technical hiring`,
        `Full-Stack Engineer #1 — MVP build, owns backend infrastructure`,
        `Product Designer — UX research, design system, conversion optimization`,
        `Growth / Marketing Lead (Hire at Month 4) — SEO, content, paid acquisition`,
      ],
      funding: `Bootstrap to $10K MRR to prove PMF, then raise a $500K–$1.5M pre-seed from angels and micro-VCs at a $5–8M cap. Use the round to hire 3 engineers and one growth lead, targeting $50K MRR within 12 months post-raise as the Series A trigger.`,
    },

    tech: {
      stack: data.stack,
      architecture: `${name} uses a standard three-tier architecture: a React frontend served via CDN, a RESTful Node.js API layer handling business logic, and a PostgreSQL database for persistent storage. Redis handles caching and session management. This setup is proven, easy to hire for, and scales to millions of users before requiring re-architecture.`,
      mvpTimeline: `A focused team of 2 engineers can ship the MVP in 8–12 weeks. Week 1–2: infrastructure setup and auth. Week 3–6: core feature build. Week 7–9: UI polish and onboarding flow. Week 10–12: beta testing with 20 users and bug fixes. Launch to public in Month 3.`,
      challenges: [
        `Balancing feature velocity vs. technical debt in the early sprint — must enforce a "build it right once" standard from day one`,
        `Data security and privacy compliance depending on the ${cat} vertical — budget 2–3 weeks for security audit before launch`,
        `Mobile performance optimization — ${cat} users expect sub-2s load times on 4G connections`,
      ],
      services: data.services,
    },

    finance: {
      metrics: [
        { label: 'Pre-Seed Target', value: '$750K', color: '#6366F1' },
        { label: 'Breakeven', value: `Month ${rand(14,22)}`, color: '#14B8A6' },
        { label: 'Target CAC', value: `$${rand(35,120)}`, color: '#F59E0B' },
        { label: 'Target LTV', value: `$${rand(800,2400)}`, color: '#10B981' },
      ],
      projections: [
        { year: 'Year 1', revenue: `$${rand(120,280)}K`, pct: 22 },
        { year: 'Year 2', revenue: `$${rand(600,1200)}K`, pct: 55 },
        { year: 'Year 3', revenue: `$${rand(2,6)}M`, pct: 85 },
      ],
      costs: [
        `Engineering salaries — 55–65% of burn in Year 1 (2–3 engineers at market rate)`,
        `Infrastructure (AWS/GCP/Vercel) — $500–$2K/month scaling with user growth`,
        `Marketing & Paid Acquisition — 15–20% of revenue reinvested into growth`,
        `Tools & SaaS subscriptions — ~$1,500/month (design, analytics, support, email)`,
        `Legal, accounting, and compliance — $10–20K one-time, $500/month ongoing`,
      ],
      fundingStrategy: `Bootstrap the first $10K MRR using founder savings or revenue-based financing, then pursue a pre-seed round of $500K–$1.5M from angel investors and ${cat}-focused micro-VCs. Target investors who have portfolio companies in adjacent spaces and can provide warm intros to enterprise customers.`,
      pitchPoints: [
        `${data.tam} TAM with ${data.cagr} CAGR — large, fast-growing market with clear secular tailwinds`,
        `Demonstrated PMF: ${rand(30,80)} beta users, NPS of ${rand(45,72)}, and $${rand(8,25)}K MRR before raising`,
        `Experienced founding team with domain expertise in ${cat} and prior startup or enterprise experience`,
        `Clear path to defensibility through network effects, proprietary data, or deep integrations after Year 1`,
      ],
    },

    gtm: {
      launchStrategy: `Launch with a private beta of 50 hand-picked users from the target segment — recruit through LinkedIn, relevant Reddit communities, and personal networks. Use beta feedback to refine the core loop, then do a public launch on Product Hunt combined with a content marketing push targeting high-intent keywords.`,
      channels: data.channels,
      partnerships: [
        `Integration partnerships with 2–3 tools already in the target customer's stack — get listed in their app marketplaces`,
        `Co-marketing with complementary non-competing startups targeting the same ${audienceWord} segment`,
        `Industry association or community sponsorships to build credibility and access curated prospect lists`,
        `Affiliate program with ${cat} consultants, coaches, or agencies who recommend tools to their clients`,
      ],
      actionPlan: [
        `Week 1–2: Identify and personally reach out to 100 potential beta users via LinkedIn and email`,
        `Week 3–4: Onboard first 20 beta users, do 10 user interviews, document core pain points and workflow`,
        `Month 2: Launch on Product Hunt and relevant communities (Reddit, Indie Hackers, Hacker News)`,
        `Month 2–3: Publish 4 SEO-targeted articles and set up Google Search Console tracking`,
        `Month 3: Set up referral program offering 1 free month per successful referral`,
        `Month 4+: Begin LinkedIn outbound to ICP companies with personalized cold email sequences`,
      ],
    },

    website: generateWebsite(name, idea, cat, model, data),
  }

  return blueprint
}

// ── Landing page generator ────────────────────────────────────────────────────

function generateWebsite(name: string, idea: string, cat: string, model: string, data: typeof CATEGORY_DATA.general): string {
  const ideaWords = idea.split(' ').slice(0, 5).join(' ')
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${name} — ${ideaWords}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0A0E1A;color:#F8FAFC;font-family:system-ui,-apple-system,sans-serif;line-height:1.6}
.container{max-width:1100px;margin:0 auto;padding:0 2rem}
nav{padding:1.25rem 2rem;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #1E2A45;background:rgba(10,14,26,0.95)}
.logo{font-size:1.3rem;font-weight:700;background:linear-gradient(135deg,#6366F1,#14B8A6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.nav-cta{background:#6366F1;color:#fff;padding:.5rem 1.25rem;border-radius:8px;text-decoration:none;font-size:.9rem;font-weight:600}
.hero{padding:5rem 2rem 4rem;text-align:center;background:radial-gradient(ellipse at 50% 0%,rgba(99,102,241,0.15) 0%,transparent 70%)}
.badge{display:inline-block;background:rgba(20,184,166,0.1);border:1px solid rgba(20,184,166,0.3);color:#14B8A6;padding:.35rem 1rem;border-radius:99px;font-size:.78rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;margin-bottom:1.5rem}
h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:800;line-height:1.1;margin-bottom:1.25rem;letter-spacing:-.02em}
h1 span{background:linear-gradient(135deg,#6366F1,#14B8A6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero-sub{font-size:1.1rem;color:#94A3B8;max-width:520px;margin:0 auto 2.5rem}
.cta-row{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.btn-primary{background:linear-gradient(135deg,#6366F1,#8B5CF6);color:#fff;padding:.85rem 2rem;border-radius:12px;text-decoration:none;font-weight:700;font-size:1rem;transition:transform .2s}
.btn-secondary{background:transparent;color:#94A3B8;padding:.85rem 2rem;border-radius:12px;text-decoration:none;font-weight:600;font-size:1rem;border:1px solid #1E2A45}
.stats{display:flex;gap:2rem;justify-content:center;flex-wrap:wrap;padding:2.5rem 2rem;border-top:1px solid #1E2A45;border-bottom:1px solid #1E2A45;margin-top:3rem}
.stat-num{font-size:1.8rem;font-weight:800;color:#6366F1}
.stat-label{font-size:.82rem;color:#64748B;margin-top:.2rem}
.section{padding:5rem 2rem}
.section-label{font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#6366F1;margin-bottom:.75rem}
h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:800;margin-bottom:1rem;letter-spacing:-.01em}
.section-sub{color:#94A3B8;max-width:520px;margin-bottom:3rem}
.features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem}
.feature-card{background:#141929;border:1px solid #1E2A45;border-radius:16px;padding:1.75rem;transition:border-color .3s}
.feature-icon{font-size:2rem;margin-bottom:1rem}
.feature-title{font-weight:700;font-size:1.05rem;margin-bottom:.5rem}
.feature-desc{color:#94A3B8;font-size:.9rem;line-height:1.6}
.problem-section{background:#0F1628;padding:5rem 2rem}
.problem-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;max-width:1100px;margin:0 auto}
.problem-label{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:.5rem}
.problem-label.red{color:#F43F5E}
.problem-label.green{color:#10B981}
ul.check-list{list-style:none;display:flex;flex-direction:column;gap:.6rem}
ul.check-list li{display:flex;align-items:flex-start;gap:.6rem;color:#94A3B8;font-size:.92rem}
ul.check-list li::before{content:"✓";color:#10B981;font-weight:700;flex-shrink:0}
ul.pain-list li::before{content:"✗";color:#F43F5E;font-weight:700;flex-shrink:0}
.testimonials{padding:5rem 2rem;text-align:center}
.testi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;margin-top:3rem;text-align:left}
.testi-card{background:#141929;border:1px solid #1E2A45;border-radius:16px;padding:1.5rem}
.testi-text{color:#94A3B8;font-size:.92rem;line-height:1.65;margin-bottom:1rem;font-style:italic}
.testi-author{font-weight:700;font-size:.88rem}
.testi-role{color:#64748B;font-size:.8rem}
.stars{color:#F59E0B;margin-bottom:.75rem;font-size:1rem}
.pricing{padding:5rem 2rem;text-align:center;background:#0F1628}
.pricing-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.5rem;max-width:900px;margin:3rem auto 0}
.price-card{background:#141929;border:1px solid #1E2A45;border-radius:16px;padding:2rem;text-align:left}
.price-card.featured{border-color:#6366F1;background:rgba(99,102,241,0.08)}
.price-badge{background:#6366F1;color:#fff;font-size:.72rem;font-weight:700;padding:.2rem .65rem;border-radius:99px;margin-bottom:1rem;display:inline-block}
.price-name{font-size:1rem;font-weight:700;margin-bottom:.5rem}
.price-amount{font-size:2.2rem;font-weight:800;margin-bottom:.25rem}
.price-period{font-size:.82rem;color:#64748B;margin-bottom:1.25rem}
.price-features{list-style:none;display:flex;flex-direction:column;gap:.5rem;margin-bottom:1.5rem}
.price-features li{font-size:.85rem;color:#94A3B8;display:flex;gap:.5rem}
.price-features li::before{content:"✓";color:#10B981;flex-shrink:0}
.price-btn{display:block;text-align:center;padding:.7rem;border-radius:10px;font-weight:700;font-size:.9rem;text-decoration:none;background:#6366F1;color:#fff}
.price-btn.outline{background:transparent;border:1px solid #1E2A45;color:#94A3B8}
.cta-section{padding:5rem 2rem;text-align:center;background:linear-gradient(135deg,rgba(99,102,241,0.1) 0%,rgba(20,184,166,0.1) 100%)}
.footer{padding:2.5rem 2rem;border-top:1px solid #1E2A45;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem}
.footer-logo{font-size:1rem;font-weight:700;background:linear-gradient(135deg,#6366F1,#14B8A6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.footer-copy{color:#64748B;font-size:.82rem}
@media(max-width:640px){.problem-grid{grid-template-columns:1fr}.stats{gap:1.5rem}}
</style>
</head>
<body>
<nav>
  <div class="logo">⚡ ${name}</div>
  <a href="#pricing" class="nav-cta">Get Started Free</a>
</nav>

<section class="hero">
  <div class="badge">✦ Now in Public Beta</div>
  <h1>The smarter way to<br/><span>${ideaWords}</span></h1>
  <p class="hero-sub">${name} helps ${cat === 'saas' ? 'teams' : 'people'} ${idea.toLowerCase()} — without the complexity, cost, or frustration of legacy tools.</p>
  <div class="cta-row">
    <a href="#pricing" class="btn-primary">Start Free — No Card Required</a>
    <a href="#features" class="btn-secondary">See How It Works →</a>
  </div>
  <div class="stats">
    <div><div class="stat-num">${rand(1,9)}.${rand(1,9)}K+</div><div class="stat-label">Active Users</div></div>
    <div><div class="stat-num">${rand(92,99)}%</div><div class="stat-label">Satisfaction Rate</div></div>
    <div><div class="stat-num">${rand(2,8)}min</div><div class="stat-label">Avg Setup Time</div></div>
    <div><div class="stat-num">4.${rand(6,9)}/5</div><div class="stat-label">App Store Rating</div></div>
  </div>
</section>

<section class="problem-section">
  <div class="problem-grid">
    <div>
      <div class="problem-label red">The Problem</div>
      <h2 style="font-size:1.6rem;margin-bottom:1rem">Old tools weren't built for this</h2>
      <ul class="check-list pain-list">
        <li>Hours wasted on manual, repetitive tasks every week</li>
        <li>Expensive solutions designed for enterprises, not individuals</li>
        <li>No single tool that handles the complete workflow</li>
        <li>Poor mobile experience when you need it most</li>
      </ul>
    </div>
    <div>
      <div class="problem-label green">The ${name} Way</div>
      <h2 style="font-size:1.6rem;margin-bottom:1rem">Everything you need, nothing you don't</h2>
      <ul class="check-list">
        <li>Automated workflows that save 5+ hours per week</li>
        <li>Transparent pricing built for individuals and small teams</li>
        <li>End-to-end solution from day one, no integrations needed</li>
        <li>Native mobile app with offline support</li>
      </ul>
    </div>
  </div>
</section>

<section class="section" id="features">
  <div class="container">
    <div class="section-label">Features</div>
    <h2>Built for how you actually work</h2>
    <p class="section-sub">Every feature in ${name} was designed based on real user research — nothing is here for the sake of it.</p>
    <div class="features-grid">
      <div class="feature-card"><div class="feature-icon">⚡</div><div class="feature-title">Instant Setup</div><div class="feature-desc">Go from signup to your first result in under 5 minutes. No training required, no consultant needed.</div></div>
      <div class="feature-card"><div class="feature-icon">📊</div><div class="feature-title">Real-Time Analytics</div><div class="feature-desc">Track what matters with a dashboard that updates in real time. Share reports with your team in one click.</div></div>
      <div class="feature-card"><div class="feature-icon">🤝</div><div class="feature-title">Team Collaboration</div><div class="feature-desc">Invite your team, assign tasks, and work together seamlessly — all in one place without email chains.</div></div>
      <div class="feature-card"><div class="feature-icon">🔒</div><div class="feature-title">Enterprise Security</div><div class="feature-desc">SOC 2 compliant with end-to-end encryption, SSO, and audit logs. Your data stays yours, always.</div></div>
      <div class="feature-card"><div class="feature-icon">📱</div><div class="feature-title">Works Everywhere</div><div class="feature-desc">Native iOS and Android apps plus a fast web app — pick up where you left off on any device.</div></div>
      <div class="feature-card"><div class="feature-icon">🔗</div><div class="feature-title">100+ Integrations</div><div class="feature-desc">Connect with the tools you already use — Slack, Google Workspace, Zapier, and more.</div></div>
    </div>
  </div>
</section>

<section class="testimonials">
  <div class="container">
    <div class="section-label">Testimonials</div>
    <h2>Loved by thousands of users</h2>
    <div class="testi-grid">
      <div class="testi-card"><div class="stars">★★★★★</div><div class="testi-text">"${name} completely changed how our team works. We saved over 8 hours a week in the first month alone. I can't imagine going back to how we did things before."</div><div class="testi-author">Sarah K.</div><div class="testi-role">Operations Lead at a 40-person startup</div></div>
      <div class="testi-card"><div class="stars">★★★★★</div><div class="testi-text">"I tried 4 other tools before finding ${name}. The onboarding took 3 minutes, and I was getting real value by the end of day one. The pricing is fair too — actually fair."</div><div class="testi-author">Marcus T.</div><div class="testi-role">Freelance Consultant</div></div>
      <div class="testi-card"><div class="stars">★★★★★</div><div class="testi-text">"Our team of 12 uses ${name} daily. The analytics dashboard alone has helped us make better decisions every week. Support team is incredibly responsive too."</div><div class="testi-author">Priya M.</div><div class="testi-role">Product Manager</div></div>
    </div>
  </div>
</section>

<section class="pricing" id="pricing">
  <div class="container">
    <div class="section-label">Pricing</div>
    <h2>Simple, honest pricing</h2>
    <p class="section-sub" style="margin:0 auto">Start free. Upgrade when you're ready. No surprise charges, ever.</p>
    <div class="pricing-grid">
      <div class="price-card">
        <div class="price-name">Starter</div>
        <div class="price-amount">Free</div>
        <div class="price-period">forever</div>
        <ul class="price-features">
          <li>Up to 3 projects</li>
          <li>Core features</li>
          <li>Community support</li>
          <li>Mobile app access</li>
        </ul>
        <a href="#" class="price-btn outline">Get Started</a>
      </div>
      <div class="price-card featured">
        <div class="price-badge">Most Popular</div>
        <div class="price-name">Pro</div>
        <div class="price-amount">$${rand(29,49)}</div>
        <div class="price-period">per month · billed annually</div>
        <ul class="price-features">
          <li>Unlimited projects</li>
          <li>Advanced analytics</li>
          <li>Priority support</li>
          <li>Team collaboration (up to 5)</li>
          <li>API access</li>
        </ul>
        <a href="#" class="price-btn">Start Free Trial</a>
      </div>
      <div class="price-card">
        <div class="price-name">Business</div>
        <div class="price-amount">$${rand(79,149)}</div>
        <div class="price-period">per month · billed annually</div>
        <ul class="price-features">
          <li>Everything in Pro</li>
          <li>Unlimited team members</li>
          <li>SSO & advanced security</li>
          <li>Dedicated account manager</li>
          <li>Custom integrations</li>
        </ul>
        <a href="#" class="price-btn outline">Contact Sales</a>
      </div>
    </div>
  </div>
</section>

<section class="cta-section">
  <div class="container">
    <h2>Ready to get started?</h2>
    <p style="color:#94A3B8;margin:.75rem 0 2rem;font-size:1.05rem">Join thousands of users already using ${name} to ${ideaWords.toLowerCase()}.</p>
    <a href="#" class="btn-primary" style="display:inline-block">Start Free Today — No Card Required</a>
  </div>
</section>

<footer class="footer">
  <div class="footer-logo">⚡ ${name}</div>
  <div class="footer-copy">© ${new Date().getFullYear()} ${name}. All rights reserved.</div>
</footer>
</body>
</html>`
}