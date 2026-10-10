import axios from 'axios';

// Base API configuration to interact with Laravel backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 5000,
});

// Mock Initial Data for smooth UX before backend is running
export const initialCaregivers = [
  {
    id: 1,
    name: 'Dr. Sarah Jenkins',
    role: 'Senior Registered Nurse',
    specialty: 'Dementia & Alzheimer Care',
    rating: 4.9,
    reviewsCount: 128,
    hourlyRate: 35,
    experienceYears: 12,
    location: 'Downtown & Metro Area',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    verified: true,
    availableNow: true,
    bio: 'Specialized in compassionate cognitive care, medication management, and mobility support for senior patients.',
  },
  {
    id: 2,
    name: 'Marcus Vance, PT',
    role: 'Physical Therapist',
    specialty: 'Post-Surgery & Mobility',
    rating: 4.8,
    reviewsCount: 94,
    hourlyRate: 40,
    experienceYears: 8,
    location: 'North Suburbs',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    verified: true,
    availableNow: true,
    bio: 'Dedicated physical rehab specialist helping elders regain strength, balance, and independence at home.',
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Certified Companion Caregiver',
    specialty: 'Daily Living & Companionship',
    rating: 4.95,
    reviewsCount: 156,
    hourlyRate: 28,
    experienceYears: 10,
    location: 'Westside Community',
    avatar: 'https://images.unsplash.com/photo-1594824813571-2153349aed06?auto=format&fit=crop&q=80&w=300',
    verified: true,
    availableNow: false,
    bio: 'Warm, patient caregiver focusing on meal preparation, companionship, light housekeeping, and errands.',
  },
  {
    id: 4,
    name: 'David Chen',
    role: 'Geriatric Care Specialist',
    specialty: '24/7 Intensive Monitoring',
    rating: 4.85,
    reviewsCount: 82,
    hourlyRate: 38,
    experienceYears: 9,
    location: 'East Metro',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300',
    verified: true,
    availableNow: true,
    bio: 'Expert in chronic illness monitoring, vital signs tracking, and coordinating emergency medical care.',
  }
];

export const initialVitals = [
  { id: 1, label: 'Heart Rate', value: '72', unit: 'bpm', status: 'normal', icon: 'Heart', trend: '+2 vs yesterday' },
  { id: 2, label: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'optimal', icon: 'Activity', trend: 'Stable' },
  { id: 3, label: 'Blood Glucose', value: '105', unit: 'mg/dL', status: 'normal', icon: 'Droplet', trend: '-5 mg/dL' },
  { id: 4, label: 'Blood Oxygen (SpO2)', value: '98', unit: '%', status: 'excellent', icon: 'Shield', trend: 'Normal' },
];

export const initialMedications = [
  { id: 1, name: 'Lisinopril (Blood Pressure)', dose: '10mg', time: '08:00 AM', taken: true },
  { id: 2, name: 'Metformin (Blood Sugar)', dose: '500mg', time: '12:30 PM', taken: true },
  { id: 3, name: 'Multivitamin & Calcium', dose: '1 Tablet', time: '06:00 PM', taken: false },
  { id: 4, name: 'Atorvastatin (Cholesterol)', dose: '20mg', time: '09:00 PM', taken: false },
];
