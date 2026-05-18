export interface GameRecommendation {
  id: string;
  title: string;
  description: string;
  categories: string[]; // e.g., ["RPG", "Online", "Real World", "time pass", "kids", "adult"]
  tier: 'AAA' | 'AA' | 'A' | 'Indie';
  status: 'most played' | 'award winning' | 'best of the year' | 'best upcoming' | 'standard';
  awards?: string[];
  buyLink?: string;
  websiteUrl?: string;
  imageUrl?: string;
  rating?: number;
}

export interface RecommendationFilter {
  category?: string;
  tier?: 'AAA' | 'AA' | 'A' | 'Indie';
  status?: 'most played' | 'award winning' | 'best of the year' | 'best upcoming';
  playtimeFilter?: 'casual' | 'regular' | 'hardcore';
  ageGroup?: 'kids' | 'adult' | 'all';
}
