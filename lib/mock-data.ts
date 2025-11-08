export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  prices: {
    small: number;
    medium: number;
    large: number;
  };
}

export const services: Service[] = [
  {
    id: 'full-grooming',
    name: 'Full Grooming Package',
    description: 'Complete grooming service including bath, haircut, nail trim, ear cleaning, and teeth brushing',
    duration: 90,
    prices: {
      small: 65,
      medium: 75,
      large: 85
    }
  },
  {
    id: 'bath-nail',
    name: 'Bath & Nail Trim',
    description: 'Refreshing bath with premium shampoo and nail trimming',
    duration: 60,
    prices: {
      small: 45,
      medium: 55,
      large: 65
    }
  },
  {
    id: 'express-groom',
    name: 'Express Groom',
    description: 'Quick touch-up grooming for well-maintained pets',
    duration: 45,
    prices: {
      small: 35,
      medium: 45,
      large: 55
    }
  },
  {
    id: 'puppy-intro',
    name: 'Puppy Introduction',
    description: 'Gentle first grooming experience for puppies (under 6 months)',
    duration: 45,
    prices: {
      small: 40,
      medium: 50,
      large: 60
    }
  }
];
