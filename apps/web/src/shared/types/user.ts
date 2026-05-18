export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  age: number;
  gamePreferences: string[]; // e.g., ["RPG", "Online", "Action"]
  location: string;
  playtime: 'casual' | 'regular' | 'hardcore'; // playtime preference
  createdAt?: string;
}
