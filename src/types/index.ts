export interface StartupKit {
    name: {
      name: string;
      tagline: string;
    };
    elevatorPitch: string;
    businessModel: string;
    pitchDeck: PitchDeckSlide[];
    brandingKit: {
      colors: {
        primary: string;
        secondary: string;
        accent: string;
      };
      fonts: {
        heading: string;
        body: string;
      };
      logoIdea: string;
    };
    landingPage: string;
  }
  
  export interface PitchDeckSlide {
    title: string;
    content: string;
  }
  
  export interface InspirationIdea {
    title: string;
    description: string;
  }
