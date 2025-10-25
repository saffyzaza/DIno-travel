export interface Destination {
  id: string;
  title: string;
  titlesub: string[];
  location: string;
  urllocation: string[];
  description: string;
  descriptionsub: string[];
  imageUrl: string;
  rating: number;
  category: string;
  address: string;
  phone: string;
  openingHours: string;
  ticketPrice: string;
  gallery: string[];
  activities: string[];
  bestTimeToVisit: string;
  facilities: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface DestinationsData {
  destinations: Destination[];
}