export interface DanceForm {
  id: string;
  name: string;
  origin: string;
  description: string;
  image: string;
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
  experience: string;
  awards: string[];
  education: string;
}

export const DANCE_FORMS: DanceForm[] = [
  {
    id: 'kuchipudi',
    name: 'Kuchipudi',
    origin: 'Andhra Pradesh',
    description: 'A classical dance form known for its graceful movements and narrative storytelling, often performed on a brass plate.',
    image: 'https://images.unsplash.com/photo-1583000201356-07790938569c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bharatanatyam',
    name: 'Bharatanatyam',
    origin: 'Tamil Nadu',
    description: 'One of the oldest classical dance forms, characterized by fixed upper torso, bent legs, and spectacular footwork.',
    image: 'https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'kathak',
    name: 'Kathak',
    origin: 'Northern India',
    description: 'Focuses on rhythmic footwork, spins, and subtle facial expressions, tracing its roots to nomadic bards.',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'odissi',
    name: 'Odissi',
    origin: 'Odisha',
    description: 'Known for its lyrical grace and the Tribhangi posture, representing the three-part break of the body.',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800'
  }
];

export const INSTRUCTORS: Instructor[] = [
  {
    id: '1',
    name: 'Guru Sridevi Rao',
    role: 'Senior Kuchipudi Instructor',
    bio: 'With over 30 years of experience, Guru Sridevi has performed on international stages and trained hundreds of students. Her teaching style emphasizes the spiritual and narrative depth of Kuchipudi.',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=400',
    specialties: ['Kuchipudi', 'Abhinaya', 'Nattuvangam'],
    experience: '30+ Years',
    awards: ['Kala Ratna Award', 'Natya Mayuri Title', 'State Cultural Excellence Award'],
    education: 'M.A. in Kuchipudi Performance'
  },
  {
    id: '2',
    name: 'Anjali Menon',
    role: 'Bharatanatyam Expert',
    bio: 'Anjali brings a contemporary touch to traditional Bharatanatyam, focusing on emotional depth and precision. She is known for her innovative choreography that respects classical roots.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    specialties: ['Bharatanatyam', 'Choreography', 'Yoga for Dancers'],
    experience: '15+ Years',
    awards: ['Yuva Kala Bharathi', 'Best Choreographer 2023'],
    education: 'Diploma in Bharatanatyam from Kalakshetra'
  }
];

export const BRANCHES = [
  "Mothinagar",
  "AnjaneyaNagar - Moosapet",
  "Silpa Park",
  "Jagruthi Colony - Kondapur",
  "New Cyber Valley - Kondapur",
  "Auro Realty - Madhapur"
];

export interface Event {
  id: string;
  title: string;
  date: string;
  type: 'Workshop' | 'Performance' | 'Holiday';
  description: string;
}

export const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Summer Intensive Workshop',
    date: '2026-05-15',
    type: 'Workshop',
    description: 'A 10-day intensive training focusing on Kuchipudi footwork and expressions.'
  },
  {
    id: '2',
    title: 'Annual Day Performance',
    date: '2026-06-20',
    type: 'Performance',
    description: 'Grand annual showcase featuring all students at Ravindra Bharathi.'
  },
  {
    id: '3',
    title: 'Independence Day Holiday',
    date: '2026-08-15',
    type: 'Holiday',
    description: 'The academy will remain closed in observance of Independence Day.'
  },
  {
    id: '4',
    title: 'Navratri Special Workshop',
    date: '2026-10-12',
    type: 'Workshop',
    description: 'Learning traditional folk elements integrated with classical styles.'
  }
];
