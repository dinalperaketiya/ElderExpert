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

// Verified Retired Experts Directory
export const initialExperts = [
  {
    id: 1,
    name: 'Dr. Arthur Pendelton',
    initials: 'AP',
    title: 'Former VP of Microprocessor Architecture',
    formerCompany: 'Intel Corporation & AMD (Retired)',
    experienceYears: 42,
    domain: 'Technology & Hardware',
    skills: ['VLSI Chip Design', 'System Architecture', 'Semiconductor R&D', 'Patent Defense'],
    hourlyRate: 180,
    rating: 4.98,
    reviewsCount: 86,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    verified: true,
    availability: 'Available 8–12 hrs/week',
    bio: 'Spent over four decades designing high-performance computing hardware. Now guiding hardware startups through silicon validation, tape-out readiness, and manufacturing scalability.',
    fullHistory: 'Led core architecture teams behind 6 generations of desktop and server CPUs. Registered inventor on 18 US patents. Recipient of the IEEE Fellow Award.',
    aiMatchScore: 98,
    matchReason: 'Recommended because of 42 years of semiconductor leadership and deep expertise in tape-out validation matching your hardware project specs.',
    location: 'San Jose, CA'
  },
  {
    id: 2,
    name: 'Margaret Vance, CFA',
    initials: 'MV',
    title: 'Former Senior Managing Director of Capital Markets',
    formerCompany: 'JPMorgan Chase (Retired)',
    experienceYears: 36,
    domain: 'Finance & M&A',
    skills: ['M&A Due Diligence', 'Series A–C Valuation', 'Financial Governance', 'SEC Compliance'],
    hourlyRate: 210,
    rating: 4.95,
    reviewsCount: 114,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    verified: true,
    availability: 'Available for Board Seats & Calls',
    bio: 'Advised on more than $4.5B in institutional mergers and capital allocations. Helps tech founders and growing companies navigate investor negotiations, financial governance, and exit strategy.',
    fullHistory: 'Managed global syndication desks across New York and London. Guest lecturer at Columbia Business School on corporate financial restructuring.',
    aiMatchScore: 95,
    matchReason: 'Recommended because of extensive transaction advisory experience and board-level financial oversight matching your capital raise inquiry.',
    location: 'New York, NY'
  },
  {
    id: 3,
    name: 'Robert Chen, PE',
    initials: 'RC',
    title: 'Former Chief Operations & Supply Officer',
    formerCompany: 'General Electric & Boeing (Retired)',
    experienceYears: 39,
    domain: 'Operations & Supply Chain',
    skills: ['Global Procurement', 'Lean Six Sigma', 'Crisis Logistics', 'Vendor Audits'],
    hourlyRate: 165,
    rating: 4.90,
    reviewsCount: 72,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    verified: true,
    availability: 'Available 15 hrs/week',
    bio: 'Streamlined complex aerospace and manufacturing supply lines worldwide. Helps expanding enterprises negotiate Tier-1 supplier contracts, eliminate logistics bottlenecks, and improve unit economics.',
    fullHistory: 'Managed 14 manufacturing facilities across North America and Asia. Master Black Belt in Lean Manufacturing.',
    aiMatchScore: 93,
    matchReason: 'Recommended because of 39 years in aerospace supply networks and vendor contract restructuring matching your operations challenge.',
    location: 'Chicago, IL'
  },
  {
    id: 4,
    name: 'Dr. Evelyn Sterling, PhD',
    initials: 'ES',
    title: 'Former Head of Regulatory Affairs & Clinical Trials',
    formerCompany: 'Pfizer & Novartis (Retired)',
    experienceYears: 34,
    domain: 'Life Sciences & Healthcare',
    skills: ['FDA 510(k) & PMA', 'Clinical Trial Protocols', 'Biotech IP Strategy', 'IRB Approvals'],
    hourlyRate: 225,
    rating: 4.99,
    reviewsCount: 103,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    verified: true,
    availability: 'Available for Advisory Reviews',
    bio: 'Directed 18 successful drug and medical device FDA regulatory submissions. Guides biotech founders and university researchers through clinical trial design and compliant approval pathways.',
    fullHistory: 'Chaired multinational advisory committees on pharmaceutical standards. Author of 24 peer-reviewed clinical regulatory papers.',
    aiMatchScore: 97,
    matchReason: 'Recommended because of direct experience authoring FDA submissions and clinical protocols matching your biotech project scope.',
    location: 'Boston, MA'
  },
  {
    id: 5,
    name: 'Harold Jenkins, JD',
    initials: 'HJ',
    title: 'Former General Counsel & Compliance Officer',
    formerCompany: 'Raytheon Technologies (Retired)',
    experienceYears: 41,
    domain: 'Legal & Regulatory',
    skills: ['Government Contracting', 'IP Licensing', 'ITAR Compliance', 'Corporate Governance'],
    hourlyRate: 195,
    rating: 4.92,
    reviewsCount: 64,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    verified: true,
    availability: 'Available 5–10 hrs/week',
    bio: 'Over four decades overseeing complex government procurement, technology licensing agreements, and high-stakes regulatory defense.',
    fullHistory: 'Admitted to the Supreme Court Bar. Served as lead counsel for major international aerospace procurement defense treaties.',
    aiMatchScore: 91,
    matchReason: 'Recommended because of 40+ years negotiating technology licensing and enterprise legal protections.',
    location: 'Washington, DC'
  },
  {
    id: 6,
    name: 'Eleanor Roosevelt-Adams',
    initials: 'EA',
    title: 'Former VP of People & Organization Strategy',
    formerCompany: 'IBM Corporation (Retired)',
    experienceYears: 37,
    domain: 'Business Strategy & Governance',
    skills: ['Executive Succession', 'Change Management', 'Intergenerational Mentorship', 'Board Governance'],
    hourlyRate: 175,
    rating: 4.96,
    reviewsCount: 91,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    verified: true,
    availability: 'Available 10 hrs/week',
    bio: 'Guided organizational redesign across 40,000+ employees. Now passionately mentoring founders, young managers, and emerging executives on leadership resilience.',
    fullHistory: 'Pioneered corporate mentorship programs in the tech industry during the personal computer revolution. Certified Executive Coach.',
    aiMatchScore: 94,
    matchReason: 'Recommended because of proven executive leadership coaching and organizational restructuring experience.',
    location: 'Austin, TX'
  }
];

// Professional Categories
export const professionalCategories = [
  { id: 'all', name: 'All Domains', count: '1,420 Experts', icon: 'Layers' },
  { id: 'tech', name: 'Technology & Hardware', count: '380 Experts', desc: 'VLSI, Semiconductors, Systems Architecture, Enterprise Software', icon: 'Cpu' },
  { id: 'finance', name: 'Finance & M&A', count: '290 Experts', desc: 'Capital Raising, Valuations, SEC Governance, Mergers', icon: 'TrendingUp' },
  { id: 'ops', name: 'Operations & Supply Chain', count: '210 Experts', desc: 'Global Logistics, Lean Manufacturing, Vendor Audits', icon: 'Truck' },
  { id: 'life', name: 'Life Sciences & Healthcare', count: '185 Experts', desc: 'FDA Submissions, Clinical Protocols, MedTech Approvals', icon: 'Activity' },
  { id: 'strategy', name: 'Business Strategy & Governance', count: '195 Experts', desc: 'Board Governance, Executive Coaching, Market Expansion', icon: 'Compass' },
  { id: 'legal', name: 'Legal & Regulatory', count: '160 Experts', desc: 'IP Licensing, Compliance, Government Procurement', icon: 'Shield' }
];

// Mock Opportunities for Retired Experts Portal
export const initialExpertOpportunities = [
  {
    id: 'opp-1',
    title: 'VLSI Architecture Review for Series A Edge AI Accelerator',
    client: 'HyperSilicon Labs (Palo Alto, CA)',
    budget: '$5,400',
    duration: '2 Weeks (15 hrs total)',
    domain: 'Technology & Hardware',
    requiredExp: '30+ Years Preferred',
    matchScore: 98,
    status: 'Open for Proposal',
    description: 'Looking for a veteran semiconductor architect to inspect our instruction pipeline and cache layout before upcoming MPW tape-out.'
  },
  {
    id: 'opp-2',
    title: 'Advisory Review: Series B Financial Model & Debt Structuring',
    client: 'AeroFreight Logistics',
    budget: '$3,800',
    duration: '1 Week (10 hrs total)',
    domain: 'Finance & M&A',
    requiredExp: '25+ Years Preferred',
    matchScore: 94,
    status: 'Open for Proposal',
    description: 'Seeking a retired managing director or investment banker to perform sanity check on our debt-financing covenants.'
  },
  {
    id: 'opp-3',
    title: 'FDA 510(k) Pre-Submission Protocol Consultation',
    client: 'VascularSense Medical Devices',
    budget: '$6,000',
    duration: '3 Weeks (20 hrs total)',
    domain: 'Life Sciences & Healthcare',
    requiredExp: '30+ Years Preferred',
    matchScore: 96,
    status: 'Open for Proposal',
    description: 'Need experienced regulatory director to review biocompatibility testing documentation and pre-sub Q-submission package.'
  }
];

// Mock Consultation Requests for Expert Portal
export const initialConsultationRequests = [
  {
    id: 'req-1',
    clientName: 'Daniel Vance (Founder & CEO)',
    company: 'QuantumCore Computing',
    topic: 'Chip Thermal Dissipation in High-Density Server Racks',
    requestedDate: 'Tomorrow at 10:00 AM EST',
    duration: '60 Minutes',
    status: 'Pending Confirmation',
    fee: '$180'
  },
  {
    id: 'req-2',
    clientName: 'Rachel Miller (VP Product)',
    company: 'NextGen Silicon',
    topic: 'Advice on US-Taiwan Semiconductor Assembly Partners',
    requestedDate: 'Thursday at 2:00 PM EST',
    duration: '60 Minutes',
    status: 'Confirmed',
    fee: '$180'
  }
];

// Mock Published Knowledge Articles
export const initialKnowledgeArticles = [
  {
    id: 1,
    title: 'Lessons from 40 Years of Silicon Architecture: Avoiding Hardware Pitfalls',
    author: 'Dr. Arthur Pendelton',
    role: 'Former VP of Microprocessor Architecture @ Intel & AMD',
    readTime: '12 min read',
    category: 'Technology & Hardware',
    summary: 'Practical checklist on cache coherence, clock domain crossing, and mitigating costly revision cycles prior to tape-out.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 2,
    title: 'Navigating FDA Path 510(k) vs PMA for Biotech & Medical Device Startups',
    author: 'Dr. Evelyn Sterling, PhD',
    role: 'Former Head of Regulatory Affairs @ Pfizer',
    readTime: '18 min read',
    category: 'Life Sciences & Healthcare',
    summary: 'How to choose the correct predicate device, draft airtight indications for use, and avoid multi-month FDA holds.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 3,
    title: 'Structuring M&A Due Diligence: What Board Advisors Look For Before Series B',
    author: 'Margaret Vance, CFA',
    role: 'Former Senior Managing Director @ JPMorgan Chase',
    readTime: '15 min read',
    category: 'Finance & M&A',
    summary: 'A seasoned investment banker shares the exact financial ratios, customer concentration limits, and governance red flags buyers scrutinize.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600'
  }
];
