import { StartupKit, PitchDeckSlide } from '../types';

// This simulates AI generation with predefined responses
export const generateStartupKit = async (
  idea: string,
  sectionToRegenerate?: keyof StartupKit
): Promise<StartupKit> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate a more deterministic name based on the idea
  const words = idea.split(' ').filter(word => word.length > 3);
  const getRandomWord = () => words[Math.floor(Math.random() * words.length)] || 'Nova';
  
  const baseKit: StartupKit = {
    name: {
      name: `${getRandomWord().charAt(0).toUpperCase() + getRandomWord().slice(1)}fy`,
      tagline: `Revolutionizing ${idea.split(' ').slice(0, 3).join(' ')} for the digital age`
    },
    elevatorPitch: `Our startup addresses a critical gap in the ${idea} market. By leveraging cutting-edge technology and user-centric design, we've created a solution that transforms how people interact with ${idea.split(' ').slice(-3).join(' ')}.

With our innovative approach, users can save time, reduce costs, and achieve better outcomes. Our platform simplifies complex processes while delivering powerful insights that weren't previously accessible.

We're targeting the rapidly growing segment of professionals and businesses that need efficient, reliable solutions in this space. Our early traction shows strong product-market fit, and we're positioned to scale quickly in this $10B+ market.`,
    
    businessModel: `Revenue Streams:
- Subscription Model: Monthly/annual plans with tiered pricing based on features and usage
- Enterprise Solutions: Custom packages for larger organizations with dedicated support
- Marketplace Commission: 5-10% fee on transactions facilitated through our platform

Customer Acquisition:
- Content marketing and SEO targeting key pain points
- Strategic partnerships with complementary services
- Referral program with incentives for existing customers

Projected Margins:
- 70-80% gross margin after direct costs
- 15-20% net profit margin at scale`,
    
    pitchDeck: [
      {
        title: "Problem",
        content: `The ${idea} industry faces three critical challenges:
1. Inefficient processes wasting time and resources
2. Limited access to actionable insights
3. High costs and technical barriers to entry`
      },
      {
        title: "Solution",
        content: `Our platform provides:
- Streamlined workflow automation
- Advanced analytics with actionable recommendations
- User-friendly interface requiring no technical expertise`
      },
      {
        title: "Market Opportunity",
        content: `- $10B+ total addressable market growing at 14% annually
- Initial target segment: small to mid-sized businesses ($2.5B)
- Clear expansion path to enterprise and international markets`
      },
      {
        title: "Product",
        content: `Key features:
- Intuitive dashboard with customizable workflows
- Real-time collaboration tools
- AI-powered insights and recommendations
- Seamless integration with existing tools`
      },
      {
        title: "Traction",
        content: `- 250+ beta users with 92% retention rate
- 15% month-over-month growth
- Strategic partnerships with 3 industry leaders
- Featured in TechCrunch and Product Hunt`
      },
      {
        title: "Business Model",
        content: `- Tiered subscription model ($29-$299/month)
- Enterprise solutions with annual contracts
- 75% gross margin with improving unit economics
- CAC payback period: 6 months`
      },
      {
        title: "Competition",
        content: `Competitive advantages:
- Proprietary algorithm providing 3x faster results
- Seamless integrations ecosystem
- User-centric design with industry-leading NPS of 72
- Data-driven insights unavailable from competitors`
      },
      {
        title: "Team",
        content: `Our experienced team combines:
- Industry expertise (ex-Google, Amazon)
- Technical excellence (ML, engineering)
- Successful startup experience (2 previous exits)
- Complementary skill sets across product, technology, and business`
      },
      {
        title: "Financial Projections",
        content: `- Year 1: $1.2M ARR with 500+ customers
- Year 2: $4.5M ARR with 2,000+ customers
- Year 3: $12M ARR with 5,000+ customers
- Projected profitability in Q3 Year 3`
      },
      {
        title: "Funding Ask",
        content: `Seeking $2.5M to:
- Expand engineering team to accelerate product roadmap
- Scale customer acquisition efforts
- Establish key strategic partnerships
- Reach $5M ARR and position for Series A`
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
      logoIdea: `A modern, minimalist logo combining abstract elements that represent ${idea.split(' ').slice(0, 2).join(' ')}. Use the primary blue with accent orange highlights to create a distinctive and memorable mark.`
    },
    
    landingPage: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${getRandomWord().charAt(0).toUpperCase() + getRandomWord().slice(1)}fy - ${idea}</title>
  <style>
    :root {
      --primary: #3B82F6;
      --secondary: #10B981;
      --accent: #F97316;
      --dark: #1F2937;
      --light: #F9FAFB;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Roboto', sans-serif;
      color: var(--dark);
      line-height: 1.5;
    }
    
    h1, h2, h3, h4 {
      font-family: 'Inter', sans-serif;
      font-weight: 700;
    }
    
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    
    header {
      background-color: var(--primary);
      color: white;
      padding: 1.5rem 0;
    }
    
    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      font-size: 1.5rem;
      font-weight: 700;
    }
    
    .nav-links {
      display: flex;
      gap: 2rem;
    }
    
    .nav-links a {
      color: white;
      text-decoration: none;
      font-weight: 500;
    }
    
    .hero {
      padding: 6rem 0;
      background-color: var(--light);
      text-align: center;
    }
    
    .hero h1 {
      font-size: 3rem;
      margin-bottom: 1.5rem;
    }
    
    .hero p {
      font-size: 1.25rem;
      max-width: 800px;
      margin: 0 auto 2rem;
      color: #4B5563;
    }
    
    .btn {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background-color: var(--accent);
      color: white;
      text-decoration: none;
      border-radius: 0.375rem;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .btn-secondary {
      background-color: white;
      color: var(--primary);
      border: 1px solid var(--primary);
      margin-left: 1rem;
    }
    
    .features {
      padding: 6rem 0;
    }
    
    .section-title {
      text-align: center;
      margin-bottom: 4rem;
      font-size: 2.25rem;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .feature-card {
      padding: 2rem;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    }
    
    .feature-card h3 {
      margin-bottom: 1rem;
      color: var(--primary);
    }
    
    .testimonials {
      padding: 6rem 0;
      background-color: var(--light);
      text-align: center;
    }
    
    .testimonial-card {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .testimonial-text {
      font-size: 1.25rem;
      font-style: italic;
      margin-bottom: 1.5rem;
    }
    
    .testimonial-author {
      font-weight: 700;
    }
    
    .cta {
      padding: 6rem 0;
      text-align: center;
      background-color: var(--primary);
      color: white;
    }
    
    .cta h2 {
      margin-bottom: 1.5rem;
      font-size: 2.25rem;
    }
    
    .cta p {
      margin-bottom: 2rem;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }
    
    footer {
      padding: 3rem 0;
      background-color: var(--dark);
      color: white;
    }
    
    .footer-content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 2rem;
    }
    
    .footer-logo {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    
    .footer-links h3 {
      margin-bottom: 1rem;
    }
    
    .footer-links ul {
      list-style: none;
    }
    
    .footer-links li {
      margin-bottom: 0.5rem;
    }
    
    .footer-links a {
      color: #D1D5DB;
      text-decoration: none;
    }
    
    .footer-links a:hover {
      color: white;
    }
    
    .copyright {
      margin-top: 3rem;
      text-align: center;
      padding-top: 1.5rem;
      border-top: 1px solid #374151;
      color: #9CA3AF;
    }
    
    @media (max-width: 768px) {
      .hero h1 {
        font-size: 2.25rem;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
      }
      
      .footer-content {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <nav class="nav">
        <div class="logo">${getRandomWord().charAt(0).toUpperCase() + getRandomWord().slice(1)}fy</div>
        <div class="nav-links">
          <a href="#features">Features</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
    </div>
  </header>
  
  <section class="hero">
    <div class="container">
      <h1>${getRandomWord().charAt(0).toUpperCase() + getRandomWord().slice(1)}fy</h1>
      <p>Revolutionizing ${idea.split(' ').slice(0, 3).join(' ')} for the digital age</p>
      <a href="#" class="btn">Get Started</a>
      <a href="#" class="btn btn-secondary">Learn More</a>
    </div>
  </section>
  
  <section class="features" id="features">
    <div class="container">
      <h2 class="section-title">Our Features</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3>Streamlined Workflow</h3>
          <p>Automate repetitive tasks and focus on what matters most to your business.</p>
        </div>
        <div class="feature-card">
          <h3>Advanced Analytics</h3>
          <p>Gain valuable insights with our powerful analytics dashboard and reporting tools.</p>
        </div>
        <div class="feature-card">
          <h3>Seamless Integration</h3>
          <p>Connect with your favorite tools and services for a unified workflow experience.</p>
        </div>
      </div>
    </div>
  </section>
  
  <section class="testimonials" id="testimonials">
    <div class="container">
      <h2 class="section-title">What Our Customers Say</h2>
      <div class="testimonial-card">
        <p class="testimonial-text">"${getRandomWord().charAt(0).toUpperCase() + getRandomWord().slice(1)}fy has transformed how we approach our business operations. The platform is intuitive, powerful, and has saved us countless hours."</p>
        <p class="testimonial-author">Sarah Johnson, CEO of TechInnovate</p>
      </div>
    </div>
  </section>
  
  <section class="cta" id="contact">
    <div class="container">
      <h2>Ready to Transform Your Business?</h2>
      <p>Join thousands of satisfied customers who have revolutionized their approach with our platform.</p>
      <a href="#" class="btn">Start Your Free Trial</a>
    </div>
  </section>
  
  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-info">
          <div class="footer-logo">${getRandomWord().charAt(0).toUpperCase() + getRandomWord().slice(1)}fy</div>
          <p>Revolutionizing the way businesses approach ${idea.split(' ').slice(0, 2).join(' ')}.</p>
        </div>
        <div class="footer-links">
          <h3>Product</h3>
          <ul>
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Testimonials</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h3>Legal</h3>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      <div class="copyright">
        <p>&copy; 2025 ${getRandomWord().charAt(0).toUpperCase() + getRandomWord().slice(1)}fy. All rights reserved.</p>
      </div>
    </div>
  </footer>
</body>
</html>`
  };
  
  // If regenerating a specific section, simulate that
  if (sectionToRegenerate) {
    const regeneratedKit = { ...baseKit };
    
    // Add some variation to regenerated content
    if (sectionToRegenerate === 'name') {
      regeneratedKit.name = {
        name: `${getRandomWord().charAt(0).toUpperCase() + getRandomWord().slice(1)}Hub`,
        tagline: `The future of ${idea.split(' ').slice(0, 3).join(' ')} is here`
      };
    } else if (sectionToRegenerate === 'elevatorPitch') {
      regeneratedKit.elevatorPitch = regeneratedKit.elevatorPitch.replace('innovative', 'groundbreaking').replace('$10B+', '$15B+');
    }
    
    return regeneratedKit;
  }
  
  return baseKit;
};

// Utility function to export to different formats
export const exportStartupKit = (kit: StartupKit, format: 'pdf' | 'text' | 'html') => {
  if (format === 'pdf') {
    alert('PDF download would start here in a real implementation');
    // In a real implementation, this would generate a PDF using a library like jsPDF
  } else if (format === 'text') {
    // Create a text version of the startup kit
    const text = `
STARTUP NAME: ${kit.name.name}
TAGLINE: ${kit.name.tagline}

ELEVATOR PITCH:
${kit.elevatorPitch}

BUSINESS MODEL:
${kit.businessModel}

PITCH DECK:
${kit.pitchDeck.map(slide => `[${slide.title}]\n${slide.content}\n`).join('\n')}

BRANDING KIT:
Colors: 
- Primary: ${kit.brandingKit.colors.primary}
- Secondary: ${kit.brandingKit.colors.secondary}
- Accent: ${kit.brandingKit.colors.accent}

Fonts:
- Heading: ${kit.brandingKit.fonts.heading}
- Body: ${kit.brandingKit.fonts.body}

Logo Idea:
${kit.brandingKit.logoIdea}
`;

    // Create a download link
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${kit.name.name}-startup-kit.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else if (format === 'html') {
    // Create a download link for the landing page HTML
    const blob = new Blob([kit.landingPage], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${kit.name.name}-landing-page.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
