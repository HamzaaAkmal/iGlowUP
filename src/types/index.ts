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
  suggestedColors: string[];
  fabricAndCut: string;
  imageUrls?: string[];
  productLinks?: Array<{
    brand: string;
    url: string;
    price: string;
    itemName: string;
  }>;
}