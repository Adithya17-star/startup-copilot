import { StartupKit, PitchDeckSlide } from '../types';

interface MarketResult {
  score: number;
  competitors: string[];
  trends: string[];
}

// ------------------------------------------------------------------
// HELPER FUNCTIONS
// ------------------------------------------------------------------

// 1. Smart Name Generator (Your Logic)
const generateSmartName = (idea: string): string => {
  const ideaLower = idea.toLowerCase();
  
  const hasAI = ideaLower.includes('ai') || ideaLower.includes('machine') || ideaLower.includes('intelligent');
  const hasBlockchain = ideaLower.includes('blockchain') || ideaLower.includes('crypto') || ideaLower.includes('verify');
  const hasMarket = ideaLower.includes('market') || ideaLower.includes('commerce') || ideaLower.includes('sell');
  const hasHealth = ideaLower.includes('health') || ideaLower.includes('medical') || ideaLower.includes('fitness');
  const hasEducation = ideaLower.includes('education') || ideaLower.includes('learn') || ideaLower.includes('teach');
  const hasTravel = ideaLower.includes('travel') || ideaLower.includes('trip') || ideaLower.includes('tour');
  const hasFinance = ideaLower.includes('finance') || ideaLower.includes('money') || ideaLower.includes('payment');
  const hasSocial = ideaLower.includes('social') || ideaLower.includes('community') || ideaLower.includes('connect');

  if (hasBlockchain) {
    const names = ['VerifyChain', 'TrustLedger', 'ChainVault', 'LedgerHub', 'ProofChain', 'SecureVault', 'BlockVerify', 'CertifyHub'];
    return names[Math.floor(Math.random() * names.length)];
  }
  if (hasAI) {
    const names = ['Neuraler', 'MindHub', 'SmartFlow', 'IntelliSync', 'NeuralHub', 'CogniFlow', 'AIHub', 'BrainSync'];
    return names[Math.floor(Math.random() * names.length)];
  }
  if (hasMarket) {
    const names = ['TradeHub', 'MarketFlow', 'SellSync', 'CommerceHub', 'TradeFlow', 'ShopHub', 'VendorHub', 'SalesFlow'];
    return names[Math.floor(Math.random() * names.length)];
  }
  if (hasHealth) {
    const names = ['VitalHub', 'HealthFlow', 'WellnessSync', 'MediHub', 'FitFlow', 'HealthSync', 'WellHub', 'CareFlow'];
    return names[Math.floor(Math.random() * names.length)];
  }
  if (hasEducation) {
    const names = ['LearnHub', 'EduFlow', 'KnowledgeSync', 'SchoolHub', 'TeachFlow', 'AcademyHub', 'EduSync', 'ClassFlow'];
    return names[Math.floor(Math.random() * names.length)];
  }
  if (hasTravel) {
    const names = ['WanderHub', 'TravelFlow', 'JourneySync', 'TripHub', 'ExploreFlow', 'RouteHub', 'VoyageFlow', 'DestHub'];
    return names[Math.floor(Math.random() * names.length)];
  }
  if (hasFinance) {
    const names = ['WealthHub', 'FinanceFlow', 'MoneySync', 'PaymentHub', 'TransferFlow', 'BankHub', 'InvestHub', 'CashFlow'];
    return names[Math.floor(Math.random() * names.length)];
  }
  if (hasSocial) {
    const names = ['ConnectHub', 'CommunityFlow', 'SocialSync', 'NetworkHub', 'GatherFlow', 'UniteHub', 'LinkFlow', 'ShareHub'];
    return names[Math.floor(Math.random() * names.length)];
  }

  const defaultNames = ['ProHub', 'FlowSync', 'SmartHub', 'InnoHub', 'VisionFlow', 'PulseHub', 'ZenFlow', 'NexusHub'];
  return defaultNames[Math.floor(Math.random() * defaultNames.length)];
};

// 2. Smart Tagline Generator (Your Logic)
const generateSmartTagline = (idea: string): string => {
  const firstWords = idea.split(' ').slice(0, 2).join(' ');
  const lastWords = idea.split(' ').slice(-2).join(' ');
  const allWords = idea;

  const taglines = [
    `Revolutionizing ${firstWords} for the modern era`,
    `The smarter way to ${idea.split(' ')[0]}`,
    `Where innovation meets ${lastWords}`,
    `Transforming ${firstWords} for everyone`,
    `The future of ${lastWords} starts here`,
    `Making ${allWords} simple and accessible`,
    `Your all-in-one ${idea.split(' ')[0]} solution`,
    `Empowering ${lastWords} globally`,
    `Next-gen approach to ${firstWords}`,
    `Unlock the power of ${lastWords}`
  ];
  return taglines[Math.floor(Math.random() * taglines.length)];
};

// 3. Market Validator Mock (CRITICAL: THIS WAS MISSING!)
export const validateMarketIdea = async (idea: string): Promise<MarketResult> => {
  await new Promise(resolve => setTimeout(resolve, 2000)); 
  return {
    score: Math.floor(Math.random() * (98 - 70) + 70),
    competitors: ["GlobalCorp", "TechGiant", "OpenSolution", "SmartFuture"],
    trends: ["AI Automation", "Remote Work", "Sustainability", "Blockchain Identity"]
  };
};

// ------------------------------------------------------------------
// MAIN GENERATOR
// ------------------------------------------------------------------

export const generateStartupKit = async (
  idea: string,
  sectionToRegenerate?: keyof StartupKit
): Promise<StartupKit> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // FIX: Generate Name & Tagline ONCE so they are consistent everywhere
  const appName = generateSmartName(idea);
  const appTagline = generateSmartTagline(idea);

  const baseKit: StartupKit = {
    name: {
      name: appName,
      tagline: appTagline
    },
    elevatorPitch: `Our startup, ${appName}, addresses a critical gap in the ${idea} market. By leveraging cutting-edge technology and user-centric design, we've created a solution that transforms how people interact with this space.

With our innovative approach, users can save time, reduce costs, and achieve better outcomes. ${appName} simplifies complex processes while delivering powerful insights that weren't previously accessible.

We're targeting the rapidly growing segment of professionals and businesses that need efficient, reliable solutions. Our early traction shows strong product-market fit, and we're positioned to scale quickly in this market.`,
    
    businessModel: `Revenue Streams:
- Subscription Model: Monthly/annual plans with tiered pricing based on features and usage
- Enterprise Solutions: Custom packages for larger organizations with dedicated support
- Marketplace Commission: 5-10% fee on transactions facilitated through our platform

Customer Acquisition:
- Content marketing and SEO targeting key pain points
- Strategic partnerships with complementary services
- Referral program with incentives for existing customers`,
    
    pitchDeck: [
      {
        title: "Problem",
        content: `The ${idea} industry faces critical challenges: inefficient processes wasting time, limited access to insights, and high barriers to entry.`
      },
      {
        title: "Solution",
        content: `${appName} provides streamlined workflow automation, advanced analytics, and a user-friendly interface requiring no technical expertise.`
      },
      {
        title: "Market Opportunity",
        content: `- $10B+ total addressable market growing at 14% annually
- Initial target segment: small to mid-sized businesses
- Clear expansion path to enterprise and international markets`
      },
      {
        title: "Product",
        content: `Key features:
- Intuitive dashboard with customizable workflows
- Real-time collaboration tools
- AI-powered insights and recommendations`
      },
      {
        title: "Traction",
        content: `- 250+ beta users with 92% retention rate
- 15% month-over-month growth
- Strategic partnerships with 3 industry leaders`
      },
      {
        title: "Business Model",
        content: `- Tiered subscription model
- Enterprise solutions with annual contracts
- 75% gross margin with improving unit economics`
      },
      {
        title: "Competition",
        content: `Competitive advantages:
- Proprietary algorithm providing 3x faster results
- Seamless integrations ecosystem
- User-centric design with industry-leading NPS`
      },
      {
        title: "Team",
        content: `Our experienced team combines industry expertise (ex-Google), technical excellence, and successful startup experience.`
      },
      {
        title: "Financial Projections",
        content: `- Year 1: $1.2M ARR
- Year 2: $4.5M ARR
- Year 3: $12M ARR
- Projected profitability in Q3 Year 3`
      },
      {
        title: "Funding Ask",
        content: `Seeking $2.5M to expand engineering team, scale customer acquisition, and reach $5M ARR.`
      }
    ],
    
    brandingKit: {
      colors: {
        primary: "#3B82F6",
        secondary: "#10B981",
        accent: "#F97316"
      },
      fonts: {
        heading: "Inter, sans-serif",
        body: "Roboto, sans-serif"
      },
      logoIdea: `A modern, minimalist logo representing ${idea.split(' ')[0]}. Use the primary blue with accent orange highlights.`
    },
    
    // FIX: Use the 'appName' variable we created at the top. 
    // This ensures the logo, title, and footer all have the SAME name.
    landingPage: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${appName} - ${idea}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Roboto', sans-serif; color: #1F2937; line-height: 1.5; }
    h1, h2, h3 { font-family: 'Inter', sans-serif; font-weight: 700; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
    header { background: #3B82F6; color: white; padding: 1.5rem 0; }
    .nav { display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.5rem; font-weight: 700; }
    .nav-links { display: flex; gap: 2rem; }
    .nav-links a { color: white; text-decoration: none; font-weight: 500; }
    .hero { padding: 6rem 0; background: #F9FAFB; text-align: center; }
    .hero h1 { font-size: 3rem; margin-bottom: 1.5rem; }
    .hero p { font-size: 1.25rem; max-width: 800px; margin: 0 auto 2rem; color: #4B5563; }
    .btn { display: inline-block; padding: 0.75rem 1.5rem; background: #F97316; color: white; text-decoration: none; border-radius: 0.375rem; font-weight: 500; transition: all 0.3s; border: none; cursor: pointer; }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .features { padding: 6rem 0; }
    .section-title { text-align: center; margin-bottom: 4rem; font-size: 2.25rem; }
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
    .feature-card { padding: 2rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: all 0.3s; }
    .feature-card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px rgba(0,0,0,0.1); }
    .feature-card h3 { margin-bottom: 1rem; color: #3B82F6; }
    .cta { padding: 6rem 0; text-align: center; background: #3B82F6; color: white; }
    .cta h2 { margin-bottom: 1.5rem; font-size: 2.25rem; }
    .cta p { margin-bottom: 2rem; max-width: 800px; margin-left: auto; margin-right: auto; }
    footer { padding: 3rem 0; background: #1F2937; color: white; }
    .copyright { margin-top: 3rem; text-align: center; padding-top: 1.5rem; border-top: 1px solid #374151; color: #9CA3AF; }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <nav class="nav">
        <div class="logo">${appName}</div>
        <div class="nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
    </div>
  </header>
  
  <section class="hero">
    <div class="container">
      <h1>${appName}</h1>
      <p>${appTagline}</p>
      <button class="btn">Get Started</button>
    </div>
  </section>
  
  <section class="features" id="features">
    <div class="container">
      <h2 class="section-title">Our Features</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3>Streamlined Workflow</h3>
          <p>Automate repetitive tasks and focus on what matters most.</p>
        </div>
        <div class="feature-card">
          <h3>Advanced Analytics</h3>
          <p>Gain valuable insights with our powerful analytics dashboard.</p>
        </div>
        <div class="feature-card">
          <h3>Seamless Integration</h3>
          <p>Connect with your favorite tools for a unified experience.</p>
        </div>
      </div>
    </div>
  </section>
  
  <section class="cta" id="contact">
    <div class="container">
      <h2>Ready to Transform Your Business?</h2>
      <p>Join thousands of satisfied customers who have revolutionized their approach.</p>
      <button class="btn">Start Your Free Trial</button>
    </div>
  </section>
  
  <footer>
    <div class="container">
      <div class="copyright">
        <p>&copy; 2025 ${appName}. All rights reserved.</p>
      </div>
    </div>
  </footer>
</body>
</html>`
  };
  
  if (sectionToRegenerate) {
    const regeneratedKit = { ...baseKit };
    if (sectionToRegenerate === 'name') {
      // Logic to create a NEW name if they asked for it
      regeneratedKit.name = {
        name: generateSmartName(idea),
        tagline: generateSmartTagline(idea)
      };
    }
    return regeneratedKit;
  }
  
  return baseKit;
};

export const exportStartupKit = (kit: StartupKit, format: 'pdf' | 'text' | 'html') => {
  console.log(`Exporting as ${format}...`);
};
