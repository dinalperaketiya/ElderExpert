import React, { useState, useCallback } from 'react';
import {
  LayoutDashboard, Search, Briefcase, Calendar, MessageSquare,
  Bookmark, Star, Building2, Settings, ArrowLeft, Sparkles,
  Bell, Filter, SortAsc, MapPin, Clock,
  CheckCircle2, AlertCircle, Users, TrendingUp, Activity,
  X, Send, Eye, Menu, Plus, LogOut
} from 'lucide-react';
import { initialExperts } from '../services/api';
import './CompanyPortal.css';

// ─── Demo / mock data clearly marked as illustrative ─────────────────────────

const DEMO_COMPANY = {
  name: 'AcroTech Dynamics Inc.',
  initials: 'AT',
  industry: 'Deep Tech · Series B',
  avatar: null,
};

const DEMO_STATS = [
  { label: 'Active Projects',     value: '4',  trend: '+1 this month',  color: 'forest',  icon: Briefcase },
  { label: 'Upcoming Bookings',   value: '3',  trend: 'Next: Tomorrow', color: 'blue',    icon: Calendar  },
  { label: 'Experts Contacted',   value: '12', trend: '5 responded',    color: 'amber',   icon: Users     },
  { label: 'Pending Requests',    value: '2',  trend: 'Awaiting reply', color: 'rose',    icon: AlertCircle },
];

const DEMO_BOOKINGS = [
  {
    id: 'bk-1',
    expertName: 'Dr. Arthur Pendelton',
    expertTitle: 'VLSI Architecture',
    expertAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    project: 'Edge AI Accelerator Tape-Out',
    date: 'Tomorrow',
    time: '10:00 AM EST',
    duration: '60 min',
    status: 'confirmed',
    fee: '$180',
  },
  {
    id: 'bk-2',
    expertName: 'Margaret Vance, CFA',
    expertTitle: 'Finance & M&A',
    expertAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    project: 'Series B Due Diligence',
    date: 'Thursday',
    time: '2:00 PM EST',
    duration: '60 min',
    status: 'pending',
    fee: '$210',
  },
  {
    id: 'bk-3',
    expertName: 'Dr. Evelyn Sterling, PhD',
    expertTitle: 'Regulatory Affairs',
    expertAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
    project: 'FDA 510(k) Submission',
    date: 'Next Monday',
    time: '9:00 AM EST',
    duration: '90 min',
    status: 'confirmed',
    fee: '$337.50',
  },
];

const DEMO_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Edge AI Accelerator Tape-Out Audit',
    description: 'Comprehensive VLSI architecture review and pre-tape-out validation for our edge inference chip targeting autonomous robotics.',
    status: 'active',
    domain: 'Technology & Hardware',
    expertsHired: 2,
    budget: '$12,000',
    deadline: 'Nov 15, 2026',
    proposals: 3,
  },
  {
    id: 'proj-2',
    title: 'Series B Financial Model & Debt Structuring',
    description: 'Advisory review of our cap table, debt covenants, and investor term-sheet before our $40M Series B close.',
    status: 'active',
    domain: 'Finance & M&A',
    expertsHired: 1,
    budget: '$8,500',
    deadline: 'Nov 30, 2026',
    proposals: 2,
  },
  {
    id: 'proj-3',
    title: 'Supply Chain Resilience for APAC Manufacturing',
    description: 'Tier-1 supplier audit and contingency logistics plan for our Southeast Asia manufacturing footprint.',
    status: 'draft',
    domain: 'Operations & Supply Chain',
    expertsHired: 0,
    budget: '$6,000',
    deadline: 'Dec 20, 2026',
    proposals: 0,
  },
  {
    id: 'proj-4',
    title: 'FDA 510(k) Pre-Submission Review',
    description: 'Regulatory strategy and biocompatibility documentation review for our medical monitoring wearable.',
    status: 'completed',
    domain: 'Life Sciences & Healthcare',
    expertsHired: 1,
    budget: '$9,200',
    deadline: 'Oct 01, 2026',
    proposals: 4,
  },
];

const DEMO_MESSAGES = [
  {
    id: 'msg-1',
    expertName: 'Dr. Arthur Pendelton',
    expertAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    lastMessage: "I've reviewed the cache coherence diagram. A few critical issues to flag before tape-out.",
    time: '10:42 AM',
    unread: 2,
  },
  {
    id: 'msg-2',
    expertName: 'Margaret Vance, CFA',
    expertAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    lastMessage: "The debt covenant structure looks reasonable. Let's discuss the carve-outs on Thursday.",
    time: 'Yesterday',
    unread: 0,
  },
  {
    id: 'msg-3',
    expertName: 'Robert Chen, PE',
    expertAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    lastMessage: 'Attached the vendor audit checklist. Three critical suppliers need immediate re-qualification.',
    time: 'Mon',
    unread: 1,
  },
];

const DEMO_AI_RECOMMENDATIONS = [
  {
    expertId: 1,
    matchScore: 98,
    matchReason: 'Deep VLSI tape-out experience aligns precisely with your Edge AI Accelerator project scope and timeline.',
    matchedSkills: ['VLSI Chip Design', 'System Architecture', 'Semiconductor R&D'],
  },
  {
    expertId: 4,
    matchScore: 97,
    matchReason: 'FDA regulatory pathway expertise directly addresses your 510(k) wearable device submission needs.',
    matchedSkills: ['FDA 510(k) & PMA', 'Clinical Trial Protocols', 'Biotech IP Strategy'],
  },
  {
    expertId: 2,
    matchScore: 95,
    matchReason: 'Extensive Series B advisory experience and capital-markets governance matches your upcoming fundraise.',
    matchedSkills: ['M&A Due Diligence', 'Series A–C Valuation', 'Financial Governance'],
  },
];

const DEMO_RECENT_ACTIVITY = [
  { id: 1, icon: CheckCircle2, color: 'green',  text: 'Booking confirmed with Dr. Arthur Pendelton',            time: '2 hours ago'  },
  { id: 2, icon: Star,         color: 'amber',  text: 'You left a 5-star review for Robert Chen, PE',          time: 'Yesterday'    },
  { id: 3, icon: Briefcase,    color: 'blue',   text: 'New project "FDA 510(k)" marked as completed',           time: '2 days ago'   },
  { id: 4, icon: MessageSquare,color: 'forest', text: 'New message from Margaret Vance, CFA',                  time: '3 days ago'   },
  { id: 5, icon: Sparkles,     color: 'purple', text: '3 new AI-recommended experts matched your projects',     time: '4 days ago'   },
];

const DEMO_REVIEWS = [
  {
    id: 'rev-1',
    expertName: 'Robert Chen, PE',
    expertTitle: 'Former Chief Operations & Supply Officer',
    expertAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    project: 'Supply Chain Audit',
    rating: 5,
    date: 'Oct 2, 2026',
    review: 'Robert\'s Lean Six Sigma analysis of our APAC suppliers saved us weeks of delay. Exceptional clarity and actionable recommendations.',
  },
  {
    id: 'rev-2',
    expertName: 'Harold Jenkins, JD',
    expertTitle: 'Former General Counsel',
    expertAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    project: 'ITAR Compliance Review',
    rating: 5,
    date: 'Sep 18, 2026',
    review: 'Thorough, precise, and efficient. Harold navigated our dual-use export control issues with remarkable expertise.',
  },
];

// ─── Reusable sub-components ──────────────────────────────────────────────────

function StatCard({ stat }) {
  const Icon = stat.icon;
  const colorMap = {
    forest: { bg: 'cp-stat-forest', dot: '#153f35' },
    blue:   { bg: 'cp-stat-blue',   dot: '#2563EB' },
    amber:  { bg: 'cp-stat-amber',  dot: '#D97706' },
    rose:   { bg: 'cp-stat-rose',   dot: '#E11D48' },
  };
  const cls = colorMap[stat.color] || colorMap.blue;

  return (
    <div className={`cp-stat-card ${cls.bg}`}>
      <div className="cp-stat-icon">
        <Icon size={18} />
      </div>
      <div className="cp-stat-value">{stat.value}</div>
      <div className="cp-stat-label">{stat.label}</div>
      <div className="cp-stat-trend">{stat.trend}</div>
    </div>
  );
}

function ExpertCard({ expert, isSaved, onSave, onView, onBook, compact = false }) {
  return (
    <div className={`cp-expert-card ${compact ? 'cp-expert-card--compact' : ''}`}>
      <div className="cp-expert-card__header">
        <img
          src={expert.avatar}
          alt={expert.name}
          className="cp-expert-card__avatar"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="cp-expert-card__info">
          <div className="cp-expert-card__name-row">
            <span className="cp-expert-card__name">{expert.name}</span>
            {expert.verified && (
              <span className="cp-badge cp-badge--verified">Verified</span>
            )}
          </div>
          <span className="cp-expert-card__title">{expert.title}</span>
          <span className="cp-expert-card__meta">{expert.formerCompany} · {expert.experienceYears} yrs</span>
        </div>

        <div className="cp-expert-card__actions">
          <span className="cp-expert-card__rate">${expert.hourlyRate}/hr</span>
          <div className="cp-expert-card__btns">
            <button
              className={`cp-icon-btn ${isSaved ? 'cp-icon-btn--saved' : ''}`}
              onClick={() => onSave(expert.id)}
              title={isSaved ? 'Remove from saved' : 'Save expert'}
              aria-label={isSaved ? 'Remove from saved' : 'Save expert'}
            >
              <Bookmark size={15} />
            </button>
            {!compact && (
              <button className="cp-btn cp-btn--ghost" onClick={() => onView(expert)}>
                View Profile
              </button>
            )}
            <button className="cp-btn cp-btn--primary" onClick={() => onBook(expert)}>
              {compact ? 'Book' : 'Request Consultation'}
            </button>
          </div>
        </div>
      </div>

      {!compact && (
        <>
          <p className="cp-expert-card__bio">{expert.bio}</p>
          <div className="cp-expert-card__skills">
            {expert.skills.map((s, i) => (
              <span key={i} className="cp-skill-tag">{s}</span>
            ))}
          </div>
          <div className="cp-expert-card__footer">
            <span className="cp-expert-card__rating">
              <Star size={13} fill="#D97706" color="#D97706" />
              {expert.rating} ({expert.reviewsCount} reviews)
            </span>
            <span className="cp-expert-card__avail">
              <Clock size={13} />
              {expert.availability}
            </span>
            {expert.location && (
              <span className="cp-expert-card__loc">
                <MapPin size={13} />
                {expert.location}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    active:    'cp-badge cp-badge--active',
    draft:     'cp-badge cp-badge--draft',
    completed: 'cp-badge cp-badge--completed',
    confirmed: 'cp-badge cp-badge--confirmed',
    pending:   'cp-badge cp-badge--pending',
  };
  const labels = {
    active: 'Active', draft: 'Draft', completed: 'Completed',
    confirmed: 'Confirmed', pending: 'Pending',
  };
  return <span className={map[status] || 'cp-badge'}>{labels[status] || status}</span>;
}

function Stars({ count }) {
  return (
    <span className="cp-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} fill={i < count ? '#D97706' : 'none'} color={i < count ? '#D97706' : '#CBD5E1'} />
      ))}
    </span>
  );
}

// ─── View: Overview Dashboard ─────────────────────────────────────────────────

function ViewOverview({ onView, onBook, onNav }) {
  const aiExperts = DEMO_AI_RECOMMENDATIONS.map(rec => ({
    ...initialExperts.find(e => e.id === rec.expertId),
    ...rec,
  }));

  return (
    <div className="cp-view">
      {/* Welcome */}
      <div className="cp-welcome">
        <div>
          <h2 className="cp-welcome__title">Welcome back, {DEMO_COMPANY.name} 👋</h2>
          <p className="cp-welcome__sub">
            Find experienced professionals, manage consultations, and accelerate your projects.
          </p>
        </div>
        <button className="cp-btn cp-btn--primary" onClick={() => onNav('find-experts')}>
          <Search size={15} /> Find Experts
        </button>
      </div>

      {/* Stats */}
      <div className="cp-stats-grid">
        {DEMO_STATS.map((s, i) => <StatCard key={i} stat={s} />)}
      </div>

      {/* Upcoming Consultations */}
      <section className="cp-section">
        <div className="cp-section__header">
          <h3 className="cp-section__title">Upcoming Consultations</h3>
          <button className="cp-link" onClick={() => onNav('bookings')}>View all</button>
        </div>
        <div className="cp-bookings-list">
          {DEMO_BOOKINGS.slice(0, 3).map(bk => (
            <div key={bk.id} className="cp-booking-row">
              <img src={bk.expertAvatar} alt={bk.expertName} className="cp-booking-avatar" />
              <div className="cp-booking-info">
                <span className="cp-booking-expert">{bk.expertName}</span>
                <span className="cp-booking-project">{bk.project}</span>
                <span className="cp-booking-time">{bk.date} · {bk.time} · {bk.duration}</span>
              </div>
              <div className="cp-booking-right">
                <StatusBadge status={bk.status} />
                <span className="cp-booking-fee">{bk.fee}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Recommended Experts */}
      <section className="cp-section">
        <div className="cp-section__header">
          <div>
            <h3 className="cp-section__title">
              <Sparkles size={16} className="cp-section__icon cp-section__icon--ai" />
              AI Recommended Experts
            </h3>
            <p className="cp-section__note cp-demo-note">
              ✦ Illustrative demo data — recommendations will be powered by a matching algorithm in production.
            </p>
          </div>
          <button className="cp-link" onClick={() => onNav('find-experts')}>Browse all</button>
        </div>
        <div className="cp-ai-grid">
          {aiExperts.map((exp) => (
            <div key={exp.id} className="cp-ai-card">
              <img src={exp.avatar} alt={exp.name} className="cp-ai-card__avatar" />
              <div className="cp-ai-card__body">
                <div className="cp-ai-card__name-row">
                  <span className="cp-ai-card__name">{exp.name}</span>
                  <span className="cp-badge cp-badge--match">{exp.matchScore}% match</span>
                </div>
                <span className="cp-ai-card__title">{exp.title}</span>
                <p className="cp-ai-card__reason">{exp.matchReason}</p>
                <div className="cp-ai-card__skills">
                  {exp.matchedSkills.map((s, i) => <span key={i} className="cp-skill-tag cp-skill-tag--ai">{s}</span>)}
                </div>
              </div>
              <button className="cp-btn cp-btn--ghost cp-ai-card__btn" onClick={() => onBook(exp)}>
                Request Consultation
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Viewed */}
      <section className="cp-section">
        <div className="cp-section__header">
          <h3 className="cp-section__title">
            <Eye size={16} className="cp-section__icon" />
            Recently Viewed Experts
          </h3>
        </div>
        <div className="cp-recent-experts">
          {initialExperts.slice(0, 4).map(exp => (
            <div key={exp.id} className="cp-recent-expert" onClick={() => onView(exp)}>
              <img src={exp.avatar} alt={exp.name} className="cp-recent-expert__avatar" />
              <span className="cp-recent-expert__name">{exp.name}</span>
              <span className="cp-recent-expert__domain">{exp.domain}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="cp-section">
        <h3 className="cp-section__title">
          <Activity size={16} className="cp-section__icon" />
          Recent Activity
        </h3>
        <div className="cp-activity-list">
          {DEMO_RECENT_ACTIVITY.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="cp-activity-row">
                <span className={`cp-activity-icon cp-activity-icon--${item.color}`}>
                  <Icon size={14} />
                </span>
                <span className="cp-activity-text">{item.text}</span>
                <span className="cp-activity-time">{item.time}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// ─── View: Find Experts ───────────────────────────────────────────────────────

function ViewFindExperts({ savedExperts, onSave, onView, onBook }) {
  const [search, setSearch]         = useState('');
  const [domain, setDomain]         = useState('All');
  const [minRating, setMinRating]   = useState(0);
  const [sortBy, setSortBy]         = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  const domains = ['All', 'Technology & Hardware', 'Finance & M&A', 'Operations & Supply Chain', 'Life Sciences & Healthcare', 'Business Strategy & Governance', 'Legal & Regulatory'];
  const sortOptions = [
    { value: 'rating',      label: 'Highest Rating' },
    { value: 'experience',  label: 'Most Experience' },
    { value: 'rate-low',    label: 'Rate: Low to High' },
    { value: 'rate-high',   label: 'Rate: High to Low' },
  ];

  const filtered = initialExperts
    .filter(exp => {
      const q = search.toLowerCase();
      const matchQ = !q || exp.name.toLowerCase().includes(q) || exp.title.toLowerCase().includes(q) || exp.skills.some(s => s.toLowerCase().includes(q)) || exp.domain.toLowerCase().includes(q);
      const matchD = domain === 'All' || exp.domain === domain;
      const matchR = exp.rating >= minRating;
      return matchQ && matchD && matchR;
    })
    .sort((a, b) => {
      if (sortBy === 'rating')      return b.rating - a.rating;
      if (sortBy === 'experience')  return b.experienceYears - a.experienceYears;
      if (sortBy === 'rate-low')    return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'rate-high')   return b.hourlyRate - a.hourlyRate;
      return 0;
    });

  return (
    <div className="cp-view">
      <div className="cp-page-header">
        <div>
          <h2 className="cp-page-header__title">Find Experts</h2>
          <p className="cp-page-header__sub">Search {initialExperts.length} verified retired professionals.</p>
        </div>
      </div>

      {/* Search & Sort bar */}
      <div className="cp-search-bar">
        <div className="cp-search-input-wrap">
          <Search size={16} className="cp-search-icon" />
          <input
            id="expert-search"
            type="text"
            placeholder="Search by name, skill, specialization..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="cp-search-input"
          />
          {search && (
            <button className="cp-search-clear" onClick={() => setSearch('')} aria-label="Clear search">
              <X size={14} />
            </button>
          )}
        </div>
        <button
          className={`cp-btn cp-btn--ghost ${showFilters ? 'cp-btn--active' : ''}`}
          onClick={() => setShowFilters(f => !f)}
        >
          <Filter size={15} /> Filters
        </button>
        <div className="cp-sort-wrap">
          <SortAsc size={15} />
          <select
            className="cp-sort-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* Expandable Filters */}
      {showFilters && (
        <div className="cp-filters-panel">
          <div className="cp-filter-group">
            <label className="cp-filter-label">Domain / Expertise</label>
            <div className="cp-filter-chips">
              {domains.map(d => (
                <button
                  key={d}
                  className={`cp-chip ${domain === d ? 'cp-chip--active' : ''}`}
                  onClick={() => setDomain(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div className="cp-filter-group">
            <label className="cp-filter-label">Minimum Rating</label>
            <div className="cp-filter-chips">
              {[0, 4.5, 4.8, 4.9].map(r => (
                <button
                  key={r}
                  className={`cp-chip ${minRating === r ? 'cp-chip--active' : ''}`}
                  onClick={() => setMinRating(r)}
                >
                  {r === 0 ? 'Any' : `${r}+`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="cp-results-meta">
        {filtered.length} expert{filtered.length !== 1 ? 's' : ''} found
      </div>

      {filtered.length === 0 ? (
        <div className="cp-empty">
          <Search size={40} />
          <p>No experts match your search. Try adjusting the filters.</p>
        </div>
      ) : (
        <div className="cp-experts-list">
          {filtered.map(exp => (
            <ExpertCard
              key={exp.id}
              expert={exp}
              isSaved={savedExperts.includes(exp.id)}
              onSave={onSave}
              onView={onView}
              onBook={onBook}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── View: My Projects ────────────────────────────────────────────────────────

function ViewProjects() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', domain: '', budget: '' });

  const statusCounts = {
    active:    DEMO_PROJECTS.filter(p => p.status === 'active').length,
    draft:     DEMO_PROJECTS.filter(p => p.status === 'draft').length,
    completed: DEMO_PROJECTS.filter(p => p.status === 'completed').length,
  };

  return (
    <div className="cp-view">
      <div className="cp-page-header">
        <div>
          <h2 className="cp-page-header__title">My Projects</h2>
          <p className="cp-page-header__sub">{statusCounts.active} active · {statusCounts.draft} draft · {statusCounts.completed} completed</p>
        </div>
        <button className="cp-btn cp-btn--primary" onClick={() => setShowForm(f => !f)}>
          <Plus size={15} /> New Project
        </button>
      </div>

      {/* Create project form */}
      {showForm && (
        <div className="cp-form-card">
          <h3 className="cp-form-card__title">Create New Project</h3>
          <p className="cp-demo-note">✦ Demo UI — form submission is not yet connected to the backend.</p>
          <div className="cp-form-grid">
            <div className="cp-form-field cp-form-field--full">
              <label htmlFor="proj-title">Project Title</label>
              <input id="proj-title" type="text" placeholder="e.g. VLSI Architecture Review" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
            </div>
            <div className="cp-form-field">
              <label htmlFor="proj-domain">Domain</label>
              <select id="proj-domain" value={form.domain} onChange={e => setForm({...form, domain: e.target.value})}>
                <option value="">Select domain…</option>
                <option>Technology & Hardware</option>
                <option>Finance & M&A</option>
                <option>Operations & Supply Chain</option>
                <option>Life Sciences & Healthcare</option>
                <option>Legal & Regulatory</option>
                <option>Business Strategy & Governance</option>
              </select>
            </div>
            <div className="cp-form-field">
              <label htmlFor="proj-budget">Budget</label>
              <input id="proj-budget" type="text" placeholder="e.g. $5,000" value={form.budget} onChange={e => setForm({...form, budget: e.target.value})} />
            </div>
            <div className="cp-form-field cp-form-field--full">
              <label htmlFor="proj-desc">Description</label>
              <textarea id="proj-desc" rows={3} placeholder="Describe the scope, deliverables, and required expertise…" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            </div>
          </div>
          <div className="cp-form-actions">
            <button className="cp-btn cp-btn--ghost" onClick={() => setShowForm(false)}>Cancel</button>
            <button className="cp-btn cp-btn--primary" onClick={() => { alert('Project creation will be available once the backend endpoint is connected.'); setShowForm(false); }}>
              Save Project
            </button>
          </div>
        </div>
      )}

      <div className="cp-projects-list">
        {DEMO_PROJECTS.map(proj => (
          <div key={proj.id} className="cp-project-card">
            <div className="cp-project-card__header">
              <div>
                <span className="cp-project-card__domain">{proj.domain}</span>
                <h3 className="cp-project-card__title">{proj.title}</h3>
              </div>
              <div className="cp-project-card__status-area">
                <StatusBadge status={proj.status} />
              </div>
            </div>
            <p className="cp-project-card__desc">{proj.description}</p>
            <div className="cp-project-card__meta">
              <span><Users size={13} /> {proj.expertsHired} expert{proj.expertsHired !== 1 ? 's' : ''} hired</span>
              <span><TrendingUp size={13} /> {proj.proposals} proposal{proj.proposals !== 1 ? 's' : ''}</span>
              <span><Briefcase size={13} /> Budget: {proj.budget}</span>
              <span><Calendar size={13} /> Deadline: {proj.deadline}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── View: Bookings ───────────────────────────────────────────────────────────

function ViewBookings() {
  const [bookings, setBookings] = useState(DEMO_BOOKINGS);

  const confirm = (id) => setBookings(bs => bs.map(b => b.id === id ? {...b, status: 'confirmed'} : b));
  const cancel  = (id) => setBookings(bs => bs.filter(b => b.id !== id));

  return (
    <div className="cp-view">
      <div className="cp-page-header">
        <div>
          <h2 className="cp-page-header__title">Bookings</h2>
          <p className="cp-page-header__sub">Consultation requests and upcoming sessions.</p>
        </div>
      </div>

      <div className="cp-bookings-detail-list">
        {bookings.map(bk => (
          <div key={bk.id} className="cp-booking-detail-card">
            <img src={bk.expertAvatar} alt={bk.expertName} className="cp-booking-detail-avatar" />
            <div className="cp-booking-detail-body">
              <div className="cp-booking-detail-top">
                <div>
                  <span className="cp-booking-detail-expert">{bk.expertName}</span>
                  <span className="cp-booking-detail-sub">{bk.expertTitle}</span>
                </div>
                <StatusBadge status={bk.status} />
              </div>
              <div className="cp-booking-detail-meta">
                <span><Briefcase size={13} /> {bk.project}</span>
                <span><Calendar size={13} /> {bk.date} · {bk.time}</span>
                <span><Clock size={13} /> {bk.duration}</span>
                <span><TrendingUp size={13} /> Fee: {bk.fee}</span>
              </div>
              <div className="cp-booking-detail-actions">
                {bk.status === 'confirmed' ? (
                  <span className="cp-booking-detail-link">
                    🔗 https://meet.elderexpert.com/{bk.id}
                  </span>
                ) : (
                  <button className="cp-btn cp-btn--primary cp-btn--sm" onClick={() => confirm(bk.id)}>
                    Confirm Session
                  </button>
                )}
                <button className="cp-btn cp-btn--danger cp-btn--sm" onClick={() => cancel(bk.id)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── View: Messages ───────────────────────────────────────────────────────────

function ViewMessages() {
  const [activeConv, setActiveConv] = useState(DEMO_MESSAGES[0]);
  const [text, setText] = useState('');

  const [convMessages, setConvMessages] = useState([
    {
      id: 1,
      from: 'expert',
      text: "Hello! I've had a chance to look at your tape-out schedule.",
      time: '10:30 AM',
    },
    {
      id: 2,
      from: 'expert',
      text: "I've reviewed the cache coherence diagram. A few critical issues to flag before tape-out.",
      time: '10:42 AM',
    },
    {
      id: 3,
      from: 'me',
      text: 'Thank you for the quick turnaround, Dr. Pendelton. Please share your notes.',
      time: '10:55 AM',
    },
  ]);


  const send = () => {
    if (!text.trim()) return;
    setConvMessages(m => [...m, { id: Date.now(), from: 'me', text: text.trim(), time: 'Now' }]);
    setText('');
  };

  return (
    <div className="cp-view cp-view--messages">
      <div className="cp-messages-layout">
        {/* Conversation list */}
        <aside className="cp-conv-list">
          <div className="cp-conv-list__header">
            <h3>Messages</h3>
          </div>
          {DEMO_MESSAGES.map(m => (
            <button
              key={m.id}
              className={`cp-conv-item ${activeConv?.id === m.id ? 'cp-conv-item--active' : ''}`}
              onClick={() => setActiveConv(m)}
            >
              <img src={m.expertAvatar} alt={m.expertName} className="cp-conv-avatar" />
              <div className="cp-conv-info">
                <span className="cp-conv-name">{m.expertName}</span>
                <span className="cp-conv-preview">{m.lastMessage}</span>
              </div>
              <div className="cp-conv-meta">
                <span className="cp-conv-time">{m.time}</span>
                {m.unread > 0 && <span className="cp-conv-badge">{m.unread}</span>}
              </div>
            </button>
          ))}
        </aside>

        {/* Message panel */}
        <div className="cp-chat-panel">
          {activeConv ? (
            <>
              <div className="cp-chat-header">
                <img src={activeConv.expertAvatar} alt={activeConv.expertName} className="cp-chat-header-avatar" />
                <span className="cp-chat-header-name">{activeConv.expertName}</span>
              </div>
              <div className="cp-chat-messages">
                {convMessages.map(msg => (
                  <div key={msg.id} className={`cp-chat-bubble cp-chat-bubble--${msg.from}`}>
                    <span className="cp-chat-bubble__text">{msg.text}</span>
                    <span className="cp-chat-bubble__time">{msg.time}</span>
                  </div>
                ))}
              </div>
              <div className="cp-chat-input-row">
                <input
                  type="text"
                  placeholder="Write a message…"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                  className="cp-chat-input"
                />
                <button className="cp-btn cp-btn--primary cp-chat-send" onClick={send} aria-label="Send message">
                  <Send size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="cp-empty">
              <MessageSquare size={40} />
              <p>Select a conversation to start messaging.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── View: Saved Experts ──────────────────────────────────────────────────────

function ViewSavedExperts({ savedExperts, onSave, onView, onBook }) {
  const saved = initialExperts.filter(e => savedExperts.includes(e.id));

  return (
    <div className="cp-view">
      <div className="cp-page-header">
        <div>
          <h2 className="cp-page-header__title">Saved Experts</h2>
          <p className="cp-page-header__sub">{saved.length} expert{saved.length !== 1 ? 's' : ''} bookmarked</p>
        </div>
      </div>

      {saved.length === 0 ? (
        <div className="cp-empty">
          <Bookmark size={40} />
          <p>No saved experts yet. Browse the Find Experts page to bookmark professionals.</p>
        </div>
      ) : (
        <div className="cp-experts-list">
          {saved.map(exp => (
            <ExpertCard
              key={exp.id}
              expert={exp}
              isSaved={true}
              onSave={onSave}
              onView={onView}
              onBook={onBook}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── View: Reviews ────────────────────────────────────────────────────────────

function ViewReviews() {
  return (
    <div className="cp-view">
      <div className="cp-page-header">
        <div>
          <h2 className="cp-page-header__title">Reviews</h2>
          <p className="cp-page-header__sub">Your reviews of engaged experts.</p>
        </div>
      </div>
      <div className="cp-reviews-list">
        {DEMO_REVIEWS.map(rev => (
          <div key={rev.id} className="cp-review-card">
            <img src={rev.expertAvatar} alt={rev.expertName} className="cp-review-avatar" />
            <div className="cp-review-body">
              <div className="cp-review-top">
                <div>
                  <span className="cp-review-name">{rev.expertName}</span>
                  <span className="cp-review-sub">{rev.expertTitle}</span>
                </div>
                <span className="cp-review-date">{rev.date}</span>
              </div>
              <Stars count={rev.rating} />
              <p className="cp-review-text">"{rev.review}"</p>
              <span className="cp-review-project">Project: {rev.project}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── View: Company Profile ────────────────────────────────────────────────────

function ViewCompanyProfile() {
  const [form, setForm] = useState({
    name: DEMO_COMPANY.name,
    industry: 'Deep Tech',
    size: '51–200 employees',
    website: 'https://acrotechdynamics.com',
    location: 'Palo Alto, CA',
    about: 'AcroTech Dynamics is a deep tech company building edge AI acceleration chips for autonomous robotics and industrial automation.',
    focusAreas: 'VLSI Architecture, FDA Regulatory, Finance & M&A',
  });

  return (
    <div className="cp-view">
      <div className="cp-page-header">
        <div>
          <h2 className="cp-page-header__title">Company Profile</h2>
          <p className="cp-page-header__sub">How experts see your organization.</p>
        </div>
      </div>

      <div className="cp-form-card">
        <div className="cp-profile-avatar-row">
          <div className="cp-profile-avatar">{DEMO_COMPANY.initials}</div>
          <div>
            <span className="cp-profile-avatar-name">{form.name}</span>
            <span className="cp-profile-avatar-sub">{form.industry}</span>
          </div>
        </div>
        <div className="cp-form-grid">
          <div className="cp-form-field">
            <label htmlFor="cp-name">Company Name</label>
            <input id="cp-name" type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div className="cp-form-field">
            <label htmlFor="cp-industry">Industry</label>
            <input id="cp-industry" type="text" value={form.industry} onChange={e => setForm({...form, industry: e.target.value})} />
          </div>
          <div className="cp-form-field">
            <label htmlFor="cp-size">Company Size</label>
            <select id="cp-size" value={form.size} onChange={e => setForm({...form, size: e.target.value})}>
              <option>1–10 employees</option>
              <option>11–50 employees</option>
              <option>51–200 employees</option>
              <option>201–500 employees</option>
              <option>500+ employees</option>
            </select>
          </div>
          <div className="cp-form-field">
            <label htmlFor="cp-location">Headquarters</label>
            <input id="cp-location" type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
          </div>
          <div className="cp-form-field">
            <label htmlFor="cp-website">Website</label>
            <input id="cp-website" type="url" value={form.website} onChange={e => setForm({...form, website: e.target.value})} />
          </div>
          <div className="cp-form-field">
            <label htmlFor="cp-focus">Focus Areas</label>
            <input id="cp-focus" type="text" value={form.focusAreas} onChange={e => setForm({...form, focusAreas: e.target.value})} />
          </div>
          <div className="cp-form-field cp-form-field--full">
            <label htmlFor="cp-about">About Company</label>
            <textarea id="cp-about" rows={4} value={form.about} onChange={e => setForm({...form, about: e.target.value})} />
          </div>
        </div>
        <div className="cp-form-actions">
          <button className="cp-btn cp-btn--primary" onClick={() => alert('Profile saved. (Backend integration pending.)')}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── View: Settings ───────────────────────────────────────────────────────────

function ViewSettings() {
  const [notifications, setNotifications] = useState({ email: true, sms: false, inApp: true });
  const [privacy, setPrivacy]             = useState({ showCompany: true });

  return (
    <div className="cp-view">
      <div className="cp-page-header">
        <div>
          <h2 className="cp-page-header__title">Settings</h2>
          <p className="cp-page-header__sub">Preferences and account configuration.</p>
        </div>
      </div>

      <div className="cp-settings-sections">
        <div className="cp-form-card">
          <h3 className="cp-form-card__title">Notifications</h3>
          {[
            { key: 'email', label: 'Email notifications', desc: 'Booking confirmations, messages, and expert proposals' },
            { key: 'sms',   label: 'SMS notifications',   desc: 'Reminders for upcoming consultations'               },
            { key: 'inApp', label: 'In-app notifications', desc: 'Activity feed and system alerts'                   },
          ].map(item => (
            <div key={item.key} className="cp-settings-row">
              <div>
                <span className="cp-settings-row__label">{item.label}</span>
                <span className="cp-settings-row__desc">{item.desc}</span>
              </div>
              <button
                className={`cp-toggle ${notifications[item.key] ? 'cp-toggle--on' : ''}`}
                onClick={() => setNotifications(n => ({...n, [item.key]: !n[item.key]}))}
                aria-pressed={notifications[item.key]}
              >
                <span className="cp-toggle__thumb" />
              </button>
            </div>
          ))}
        </div>

        <div className="cp-form-card">
          <h3 className="cp-form-card__title">Privacy</h3>
          <div className="cp-settings-row">
            <div>
              <span className="cp-settings-row__label">Show company profile to experts</span>
              <span className="cp-settings-row__desc">Experts can view your company details and project postings</span>
            </div>
            <button
              className={`cp-toggle ${privacy.showCompany ? 'cp-toggle--on' : ''}`}
              onClick={() => setPrivacy(p => ({...p, showCompany: !p.showCompany}))}
              aria-pressed={privacy.showCompany}
            >
              <span className="cp-toggle__thumb" />
            </button>
          </div>
        </div>

        <div className="cp-form-card">
          <h3 className="cp-form-card__title">Danger Zone</h3>
          <div className="cp-settings-row">
            <div>
              <span className="cp-settings-row__label">Delete Account</span>
              <span className="cp-settings-row__desc">Permanently remove your company account and all data.</span>
            </div>
            <button className="cp-btn cp-btn--danger" onClick={() => alert('Please contact support to delete your account.')}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main CompanyPortal Component ─────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'overview',         label: 'Overview',        icon: LayoutDashboard },
  { id: 'find-experts',     label: 'Find Experts',    icon: Search          },
  { id: 'projects',         label: 'My Projects',     icon: Briefcase,  badge: '4' },
  { id: 'bookings',         label: 'Bookings',        icon: Calendar,   badge: '3' },
  { id: 'messages',         label: 'Messages',        icon: MessageSquare, badge: '3' },
  { id: 'saved-experts',    label: 'Saved Experts',   icon: Bookmark        },
  { id: 'reviews',          label: 'Reviews',         icon: Star            },
  { id: 'company-profile',  label: 'Company Profile', icon: Building2       },
  { id: 'settings',         label: 'Settings',        icon: Settings        },
];

export default function CompanyPortal({ onReturnHome, onSelectExpert, onLogout }) {
  const [activeNav,    setActiveNav]    = useState('overview');
  const [savedExperts, setSavedExperts] = useState([1, 2]);
  const [sidebarOpen,  setSidebarOpen]  = useState(false);

  const toggleSave = useCallback((id) => {
    setSavedExperts(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  }, []);

  const handleView = useCallback((expert) => {
    onSelectExpert(expert);
  }, [onSelectExpert]);

  const handleBook = useCallback((expert) => {
    onSelectExpert(expert);
  }, [onSelectExpert]);

  const navTo = useCallback((id) => {
    setActiveNav(id);
    setSidebarOpen(false);
  }, []);

  const renderView = () => {
    const sharedProps = { savedExperts, onSave: toggleSave, onView: handleView, onBook: handleBook };
    switch (activeNav) {
      case 'overview':        return <ViewOverview       {...sharedProps} onNav={navTo} />;
      case 'find-experts':    return <ViewFindExperts    {...sharedProps} />;
      case 'projects':        return <ViewProjects />;
      case 'bookings':        return <ViewBookings />;
      case 'messages':        return <ViewMessages />;
      case 'saved-experts':   return <ViewSavedExperts   {...sharedProps} />;
      case 'reviews':         return <ViewReviews />;
      case 'company-profile': return <ViewCompanyProfile />;
      case 'settings':        return <ViewSettings />;
      default:                return <ViewOverview       {...sharedProps} onNav={navTo} />;
    }
  };

  return (
    <div className="cp-root">

      {/* ── Top Header ───────────────────────────────────────────────────── */}
      <header className="cp-header">
        <div className="cp-header__left">
          <button
            className="cp-header__menu-btn"
            onClick={() => setSidebarOpen(o => !o)}
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
          <button className="cp-header__back" onClick={onReturnHome} aria-label="Return to home">
            <ArrowLeft size={16} />
            <span className="cp-header__back-text">ElderExpert</span>
          </button>
          <span className="cp-header__divider" />
          <span className="cp-header__workspace">Enterprise Hirer Workspace</span>
        </div>
        <div className="cp-header__right">
          <button className="cp-header__notif" aria-label="Notifications">
            <Bell size={18} />
            <span className="cp-header__notif-dot" />
          </button>
          <div className="cp-header__company">
            <div className="cp-header__company-avatar">{DEMO_COMPANY.initials}</div>
            <div className="cp-header__company-info">
              <span className="cp-header__company-name">{DEMO_COMPANY.name}</span>
              <span className="cp-header__company-sub">{DEMO_COMPANY.industry}</span>
            </div>
          </div>
          <button className="cp-header__logout" onClick={onLogout} type="button" title="Sign out">
            <LogOut size={16} />
            <span>Sign out</span>
          </button>
        </div>
      </header>

      <div className="cp-body">

        {/* ── Sidebar Overlay (mobile) ──────────────────────────────────── */}
        {sidebarOpen && (
          <div
            className="cp-sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* ── Left Sidebar ─────────────────────────────────────────────── */}
        <aside className={`cp-sidebar ${sidebarOpen ? 'cp-sidebar--open' : ''}`}>
          <nav className="cp-sidebar__nav">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  className={`cp-nav-item ${isActive ? 'cp-nav-item--active' : ''}`}
                  onClick={() => navTo(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={17} />
                  <span className="cp-nav-item__label">{item.label}</span>
                  {item.badge && (
                    <span className={`cp-nav-badge ${isActive ? 'cp-nav-badge--active' : ''}`}>
                      {item.id === 'saved-experts' ? savedExperts.length : item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Company snippet at sidebar bottom */}
          <div className="cp-sidebar__company">
            <div className="cp-sidebar__company-avatar">{DEMO_COMPANY.initials}</div>
            <div className="cp-sidebar__company-info">
              <span className="cp-sidebar__company-name">{DEMO_COMPANY.name}</span>
              <span className="cp-sidebar__company-sub">Corporate Account</span>
            </div>
          </div>
        </aside>

        {/* ── Main Content ──────────────────────────────────────────────── */}
        <main className="cp-main">
          {renderView()}
        </main>

      </div>
    </div>
  );
}
