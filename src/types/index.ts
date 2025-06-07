export interface UserProfile {
  gender: string;
  name: string;
  language: string;
  height: string;
  hairType: string;
  skinTone: string;
  bodyType: string;
  ageGroup: string;
  religion: string;
  culturalPreferences: string;
  budget: string;
  eventType: string;
  weather?: string; // Added weather property
}

export interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export interface StyleRecommendation {
  outfitName: string;
  description: string;
  whySuitable: string;
  suggestedColors: string[]; // Existing general color suggestions
  fabricAndCut: string;
  imageUrls?: string[];
  // productLinks property removed
  suggestedDressName?: string; // New: Specific, searchable dress name
  suggestedColorPalette?: string; // New: Descriptive color palette
}