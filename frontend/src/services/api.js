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

// Mock Initial Data for Retired Industry Experts & Advisors
export const initialExperts = [
  {
    id: 1,
    name: 'Dr. Arthur Pendelton',
    title: 'Former VP of Semiconductor Architecture',
    formerCompany: 'Intel & AMD (Retired)',
    experienceYears: 42,
    domain: 'Engineering & Hardware',
    skills: ['VLSI Chip Design', 'System Architecture', 'R&D Leadership', 'Patent Defense'],
    hourlyRate: 180,
    rating: 4.98,
    reviewsCount: 86,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    verified: true,
    availableFor: ['Technical Review', '1-on-1 Mentorship', 'Board Advisory'],
    bio: 'Spent 42 years designing microprocessors. Now helping deep-tech startups validate silicon hardware & navigate manufacturing scalability.',
    aiMatchScore: 98,
    location: 'Silicon Valley, CA'
  },
  {
    id: 2,
    name: 'Margaret Vance, CFA',
    title: 'Former Senior Managing Director',
    formerCompany: 'JPMorgan Chase (Retired)',
    experienceYears: 36,
    domain: 'Finance & M&A',
    skills: ['Series A-C Valuation', 'M&A Strategy', 'Financial Modeling', 'Banking Regulation'],
    hourlyRate: 210,
    rating: 4.95,
    reviewsCount: 114,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    verified: true,
    availableFor: ['M&A Due Diligence', 'Pitch Deck Review', 'Strategic Advisory'],
    bio: 'Guided over $4B in cross-border acquisitions and capital raises. Advising founders on financial governance, investor pitch, and exit strategies.',
    aiMatchScore: 95,
    location: 'New York, NY'
  },
  {
    id: 3,
    name: 'Robert Chen',
    title: 'Former Chief Supply Chain Officer',
    formerCompany: 'General Electric & Boeing (Retired)',
    experienceYears: 39,
    domain: 'Operations & Logistics',
    skills: ['Global Supply Chain', 'Lean Manufacturing', 'Vendor Procurement', 'Crisis Logistics'],
    hourlyRate: 165,
    rating: 4.90,
    reviewsCount: 72,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    verified: true,
    availableFor: ['Supply Audit', 'Supplier Negotiation', 'Operational Mentorship'],
    bio: '39 years streamlining complex international logistics and manufacturing plants. Helping hardware and logistics startups optimize unit economics.',
    aiMatchScore: 92,
    location: 'Chicago, IL'
  },
  {
    id: 4,
    name: 'Dr. Evelyn Sterling',
    title: 'Former Head of Clinical Regulatory Affairs',
    formerCompany: 'Pfizer & Novartis (Retired)',
    experienceYears: 34,
    domain: 'Healthcare & Biotech',
    skills: ['FDA Approval Pathways', 'Clinical Trial Design', 'Biotech Compliance', 'IP Strategy'],
    hourlyRate: 225,
    rating: 4.99,
    reviewsCount: 103,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    verified: true,
    availableFor: ['FDA Pathway Review', 'Clinical Protocol Design', 'Regulatory Advisory'],
    bio: 'Led 18 successful FDA drug approvals. Providing biotech startups and researchers with regulatory roadmap design and trial optimization.',
    aiMatchScore: 97,
    location: 'Boston, MA'
  }
];

export const initialCategories = [
  { id: 'all', name: 'All Domains', count: 1240 },
  { id: 'tech', name: 'Engineering & Hardware', count: 380 },
  { id: 'finance', name: 'Finance & M&A', count: 290 },
  { id: 'ops', name: 'Operations & Supply Chain', count: 210 },
  { id: 'biotech', name: 'Healthcare & Biotech', count: 185 },
  { id: 'exec', name: 'Executive Strategy & Governance', count: 175 }
];

export const initialServices = [
  {
    id: 1,
    title: '1-on-1 Strategic Mentorship Call',
    duration: '60 Minutes',
    desc: 'Direct consultation with a veteran executive to refine strategy, clear bottlenecks, and receive candid guidance.',
    icon: 'PhoneCall',
    price: '$150 - $250'
  },
  {
    id: 2,
    title: 'Technical & Architecture Review',
    duration: 'Short-Term Project',
    desc: 'Deep-dive review of system architecture, engineering specs, or financial models with detailed feedback report.',
    icon: 'FileCode',
    price: '$500 - $1,500'
  },
  {
    id: 3,
    title: 'Fractional Advisory Board Seat',
    duration: 'Monthly Retainer',
    desc: 'Ongoing monthly strategic oversight, quarterly board participation, and high-level industry introductions.',
    icon: 'Award',
    price: '$1,200 / mo'
  },
  {
    id: 4,
    title: 'Team Workshop & Masterclass',
    duration: 'Half-Day Session',
    desc: 'Tailored training workshop for young professionals and engineering teams led by a retired industry authority.',
    icon: 'Users',
    price: '$800 - $2,000'
  }
];
