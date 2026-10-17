import React, { useState, useCallback, useEffect } from 'react';
import ProjectCreationWizard from './ProjectCreationWizard';
import { projectApi } from '../services/api';
import {
  LayoutDashboard, Search, Briefcase, Calendar, MessageSquare,
  Bookmark, Star, Building2, Settings,
  Bell, Filter, SortAsc, MapPin, Clock,
  Users, TrendingUp, Activity,
  X, Send, Menu, Plus, LogOut, ArrowRight, BarChart3, FileText, CircleCheck, Monitor, Leaf
} from 'lucide-react';
import './CompanyPortal.css';
import './BrandLogo.css';

// ─── Demo / mock data clearly marked as illustrative ─────────────────────────

const DEMO_COMPANY = {
  name: 'Your Company',
  initials: 'YC',
  industry: 'Company account',
  avatar: null,
};

const DEMO_STATS = [
  { label: 'Experts Contacted', value: '0', trend: 'No activity yet', color: 'forest', icon: Users },
  { label: 'Active Projects', value: '0', trend: 'Create your first project', color: 'blue', icon: Briefcase },
  { label: 'Upcoming Bookings', value: '0', trend: 'No bookings yet', color: 'amber', icon: Calendar },
  { label: 'Average Expert Rating', value: '—', trend: 'Available after your first session', color: 'rose', icon: Star },
];

const DEMO_BOOKINGS = [];
const DEMO_MESSAGES = [];
const DEMO_REVIEWS = [];
const initialExperts = [];

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

function CatalogHeading({ eyebrow, title, description, action }) {
  return (
    <div className="cp-projects-heading">
      <div>
        <span className="cp-projects-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}

function CatalogStat({ icon: Icon, value, label, tone = 'active' }) {
  return (
    <div className={`cp-project-stat cp-project-stat--${tone}`}>
      <span className="cp-project-stat__icon"><Icon size={23} /></span>
      <strong>{value}</strong>
      <span className="cp-project-stat__label"><i /> {label}</span>
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
    published: 'cp-badge cp-badge--active',
    draft:     'cp-badge cp-badge--draft',
    completed: 'cp-badge cp-badge--completed',
    confirmed: 'cp-badge cp-badge--confirmed',
    pending:   'cp-badge cp-badge--pending',
  };
  const labels = {
    active: 'Active', published: 'Published', draft: 'Draft', completed: 'Completed',
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

function DashboardEmpty({ icon: Icon, title, description, action, onClick }) {
  return (
    <div className="cp-dashboard-empty">
      <span className="cp-dashboard-empty__icon"><Icon size={19} /></span>
      <strong>{title}</strong>
      <p>{description}</p>
      {action && <button className="cp-link" onClick={onClick}>{action}<ArrowRight size={13} /></button>}
    </div>
  );
}

function ViewOverview({ onNav, companyProfile }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let active = true;
    projectApi.mine()
      .then(({ data }) => {
        if (active) setProjects(data.data || []);
      })
      .catch(() => {})
      .finally(() => { active = false; });
    return () => { active = false; };
  }, []);

  const dashboardStats = DEMO_STATS.map((stat) => stat.label === 'Active Projects'
    ? { ...stat, value: String(projects.filter((project) => project.status === 'published').length), trend: projects.length ? `${projects.length} saved project${projects.length === 1 ? '' : 's'}` : 'Create your first project' }
    : stat);

  return (
    <div className="cp-view cp-view--dashboard">
      <section className="cp-dashboard-hero">
        <div className="cp-dashboard-hero__content">
          <span className="cp-dashboard-hero__eyebrow">COMPANY PORTAL</span>
          <h1>Welcome back, {companyProfile?.company_name || 'Your company'} <span aria-hidden="true">👋</span></h1>
          <p>Find the right expertise, start meaningful collaborations, and bring your projects to life.</p>
          <div className="cp-dashboard-hero__actions">
            <button className="cp-btn cp-btn--primary" onClick={() => onNav('projects')}><Plus size={15} /> Post a New Project</button>
            <button className="cp-btn cp-btn--hero-ghost" onClick={() => onNav('find-experts')}><Search size={15} /> Find Experts</button>
          </div>
        </div>
        <div className="cp-dashboard-hero__art" aria-hidden="true"><span /><span /><span /></div>
      </section>

      <div className="cp-stats-grid cp-dashboard-stats">
        {dashboardStats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
      </div>

      <div className="cp-dashboard-grid">
        <section className="cp-dashboard-panel cp-dashboard-panel--activity">
          <div className="cp-dashboard-panel__header"><h2>Recent Activity</h2><span>Updates from your workspace</span></div>
          <DashboardEmpty icon={Activity} title="Nothing here yet" description="Your project, booking, and collaboration updates will appear here." />
        </section>

        <section className="cp-dashboard-panel cp-dashboard-panel--projects">
          <div className="cp-dashboard-panel__header"><h2>Your Projects</h2><button className="cp-link" onClick={() => onNav('projects')}>View all <ArrowRight size={13} /></button></div>
          {projects.length === 0
            ? <DashboardEmpty icon={Briefcase} title="Start with a project" description="Describe the support you need and invite experts to collaborate." action="Create a project" onClick={() => onNav('projects')} />
            : <div className="cp-dashboard-project-list">{projects.slice(0, 3).map((project) => <button className="cp-dashboard-project-row" key={project.id} onClick={() => onNav('projects')} type="button"><span><strong>{project.title}</strong><small>{project.category || 'Draft'} · {project.status}</small></span><ArrowRight size={15} /></button>)}</div>}
        </section>

        <section className="cp-dashboard-panel cp-dashboard-panel--bookings">
          <div className="cp-dashboard-panel__header"><h2>Upcoming Consultations</h2><button className="cp-link" onClick={() => onNav('bookings')}>View all <ArrowRight size={13} /></button></div>
          <DashboardEmpty icon={Calendar} title="No consultations booked" description="Once you book a consultation, the details will appear here." />
        </section>

        <section className="cp-dashboard-panel cp-dashboard-panel--matches">
          <div className="cp-dashboard-panel__header"><h2>Expert Matches</h2><button className="cp-link" onClick={() => onNav('find-experts')}>Browse directory <ArrowRight size={13} /></button></div>
          <DashboardEmpty icon={Users} title="Expert profiles are being prepared" description="We’ll show verified expert details here when real profiles are available." action="Open expert directory" onClick={() => onNav('find-experts')} />
        </section>

        <section className="cp-dashboard-panel cp-dashboard-panel--messages">
          <div className="cp-dashboard-panel__header"><h2>Messages</h2><button className="cp-link" onClick={() => onNav('messages')}>View all <ArrowRight size={13} /></button></div>
          <DashboardEmpty icon={MessageSquare} title="No conversations yet" description="Messages will appear here when you connect with an expert." />
        </section>
      </div>
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
    <div className="cp-view cp-view--catalog">
      <CatalogHeading eyebrow="EXPERT DIRECTORY" title="Find Experts" description="Explore verified professionals by skills, experience, and focus area." />
      <div className="cp-project-stats">
        <CatalogStat icon={Users} value={initialExperts.length} label="Expert Profiles" />
        <CatalogStat icon={CircleCheck} value={initialExperts.length} label="Verified Experts" tone="completed" />
        <CatalogStat icon={Bookmark} value={0} label="Saved Experts" tone="draft" />
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
        <section className="cp-project-empty cp-project-empty--catalog">
          <div className="cp-project-empty__leaf cp-project-empty__leaf--top"><Leaf size={82} /></div>
          <div className="cp-project-empty__art"><Search size={88} strokeWidth={1.3} /></div>
          <h2>{initialExperts.length === 0 ? 'Expert profiles are being prepared' : 'No experts match your search'}</h2>
          <p>{initialExperts.length === 0 ? 'We’ll show verified professional profiles here when real expert details are available.' : 'Try changing your search or filters to see more results.'}</p>
        </section>
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
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectError, setProjectError] = useState('');

  useEffect(() => {
    let active = true;
    projectApi.mine()
      .then(({ data }) => {
        if (active) setProjects(data.data || []);
      })
      .catch(() => {
        if (active) setProjectError('Could not load your projects. Please refresh and try again.');
      })
      .finally(() => {
        if (active) setLoadingProjects(false);
      });
    return () => { active = false; };
  }, []);

  const statusCounts = {
    active:    projects.filter((project) => project.status === 'published').length,
    draft:     projects.filter((project) => project.status === 'draft').length,
    completed: projects.filter((project) => project.status === 'completed').length,
  };

  if (showForm) return <ProjectCreationWizard onBack={() => setShowForm(false)} onSaved={(project) => { setProjects((current) => [project, ...current]); setShowForm(false); }} />;

  return (
    <div className="cp-view cp-view--projects">
      <div className="cp-projects-heading">
        <div>
          <span className="cp-projects-eyebrow">MY PROJECTS</span>
          <h1>My Projects</h1>
          <p>Create, manage, and track your projects with expert support.</p>
        </div>
        <button className="cp-btn cp-btn--primary" onClick={() => setShowForm(f => !f)}>
          <Plus size={15} /> New Project
        </button>
      </div>

      <div className="cp-project-stats">
        <div className="cp-project-stat cp-project-stat--active"><span className="cp-project-stat__icon"><Briefcase size={23} /></span><strong>{statusCounts.active}</strong><span className="cp-project-stat__label"><i /> Active Projects</span></div>
        <div className="cp-project-stat cp-project-stat--draft"><span className="cp-project-stat__icon"><FileText size={23} /></span><strong>{statusCounts.draft}</strong><span className="cp-project-stat__label"><i /> Draft Projects</span></div>
        <div className="cp-project-stat cp-project-stat--completed"><span className="cp-project-stat__icon"><CircleCheck size={23} /></span><strong>{statusCounts.completed}</strong><span className="cp-project-stat__label"><i /> Completed Projects</span></div>
      </div>

      {projectError && <p className="project-wizard__notice" role="alert">{projectError}</p>}

      {loadingProjects ? <section className="cp-project-empty"><h2>Loading projects…</h2></section> : projects.length === 0 ? (
        <section className="cp-project-empty">
          <div className="cp-project-empty__leaf cp-project-empty__leaf--top"><Leaf size={88} /></div>
          <div className="cp-project-empty__leaf cp-project-empty__leaf--bottom"><Leaf size={102} /></div>
          <div className="cp-project-empty__art"><Monitor size={146} strokeWidth={1.2} /><Briefcase className="cp-project-empty__briefcase" size={40} strokeWidth={1.6} /></div>
          <h2>No projects yet</h2>
          <p>Create a project to describe the expertise and support<br className="cp-project-empty__desktop-break" /> your team is looking for.</p>
          <button className="cp-btn cp-btn--primary" onClick={() => setShowForm(true)}><Plus size={17} /> Create Your First Project</button>
        </section>
      ) : (
        <div className="cp-projects-list">
        {projects.map((proj) => (
          <div key={proj.id} className="cp-project-card">
            <div className="cp-project-card__header">
              <div>
                <span className="cp-project-card__domain">{proj.category || 'Project draft'}</span>
                <h3 className="cp-project-card__title">{proj.title}</h3>
              </div>
              <div className="cp-project-card__status-area">
                <StatusBadge status={proj.status} />
              </div>
            </div>
            <p className="cp-project-card__desc">{proj.description}</p>
            <div className="cp-project-card__meta">
              <span><Users size={13} /> {proj.experts_needed || '1 expert'} needed</span>
              <span><TrendingUp size={13} /> {proj.required_skills?.length || 0} required skills</span>
              <span><Briefcase size={13} /> Budget: {proj.budget || 'Negotiable'}</span>
              <span><Calendar size={13} /> Deadline: {proj.preferred_completion_date || 'Not set'}</span>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
}

// ─── View: Bookings ───────────────────────────────────────────────────────────

function ViewBookings() {
  const [bookings, setBookings] = useState(DEMO_BOOKINGS);

  const confirm = (id) => setBookings(bs => bs.map(b => b.id === id ? {...b, status: 'confirmed'} : b));
  const cancel  = (id) => setBookings(bs => bs.filter(b => b.id !== id));

  return (
    <div className="cp-view cp-view--catalog">
      <CatalogHeading eyebrow="CONSULTATIONS" title="Bookings" description="Manage consultation requests and upcoming sessions with experts." />
      <div className="cp-project-stats">
        <CatalogStat icon={Calendar} value={bookings.length} label="Upcoming Bookings" />
        <CatalogStat icon={Clock} value={bookings.filter((booking) => booking.status === 'pending').length} label="Pending Requests" tone="draft" />
        <CatalogStat icon={CircleCheck} value={bookings.filter((booking) => booking.status === 'confirmed').length} label="Confirmed Sessions" tone="completed" />
      </div>

      <div className="cp-bookings-detail-list">
        {bookings.length === 0 && <section className="cp-project-empty cp-project-empty--catalog"><div className="cp-project-empty__leaf cp-project-empty__leaf--top"><Leaf size={80} /></div><div className="cp-project-empty__art"><Calendar size={88} strokeWidth={1.3} /></div><h2>No bookings yet</h2><p>Consultations you book with verified experts will be listed here.</p></section>}
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
  const [activeConv, setActiveConv] = useState(null);
  const [text, setText] = useState('');
  const [convMessages, setConvMessages] = useState([]);


  const send = () => {
    if (!text.trim()) return;
    setConvMessages(m => [...m, { id: Date.now(), from: 'me', text: text.trim(), time: 'Now' }]);
    setText('');
  };

  if (DEMO_MESSAGES.length === 0) {
    return (
      <div className="cp-view cp-view--catalog">
        <CatalogHeading eyebrow="YOUR INBOX" title="Messages" description="Keep your expert conversations and project updates in one place." />
        <div className="cp-project-stats">
          <CatalogStat icon={MessageSquare} value="0" label="Conversations" />
          <CatalogStat icon={Bell} value="0" label="Unread Messages" tone="draft" />
          <CatalogStat icon={Users} value="0" label="Expert Connections" tone="completed" />
        </div>
        <section className="cp-project-empty cp-project-empty--catalog">
          <div className="cp-project-empty__leaf cp-project-empty__leaf--top"><Leaf size={80} /></div>
          <div className="cp-project-empty__art"><MessageSquare size={88} strokeWidth={1.3} /></div>
          <h2>No conversations yet</h2>
          <p>Once you connect with verified experts, your messages will appear here.</p>
        </section>
      </div>
    );
  }

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
          {DEMO_MESSAGES.length === 0 && <DashboardEmpty icon={MessageSquare} title="No messages yet" description="Your conversations will appear here after you connect with an expert." />}
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
    <div className="cp-view cp-view--catalog">
      <CatalogHeading eyebrow="YOUR SHORTLIST" title="Saved Experts" description="Keep promising professional profiles close at hand." />
      <div className="cp-project-stats">
        <CatalogStat icon={Bookmark} value={saved.length} label="Saved Experts" />
        <CatalogStat icon={Users} value={saved.length} label="Available Profiles" tone="completed" />
        <CatalogStat icon={MessageSquare} value="0" label="New Updates" tone="draft" />
      </div>

      {saved.length === 0 ? (
        <section className="cp-project-empty cp-project-empty--catalog"><div className="cp-project-empty__leaf cp-project-empty__leaf--top"><Leaf size={80} /></div><div className="cp-project-empty__art"><Bookmark size={88} strokeWidth={1.3} /></div><h2>No saved experts yet</h2><p>Save verified profiles from the expert directory and they’ll be collected here.</p></section>
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
    <div className="cp-view cp-view--catalog">
      <CatalogHeading eyebrow="YOUR FEEDBACK" title="Reviews" description="Review your completed consultations and share feedback." />
      <div className="cp-project-stats">
        <CatalogStat icon={Star} value={DEMO_REVIEWS.length} label="Reviews Written" />
        <CatalogStat icon={CircleCheck} value={DEMO_REVIEWS.length} label="Completed Sessions" tone="completed" />
        <CatalogStat icon={Star} value="—" label="Average Rating" tone="draft" />
      </div>
      <div className="cp-reviews-list">
        {DEMO_REVIEWS.length === 0 && <section className="cp-project-empty cp-project-empty--catalog"><div className="cp-project-empty__leaf cp-project-empty__leaf--top"><Leaf size={80} /></div><div className="cp-project-empty__art"><Star size={88} strokeWidth={1.3} /></div><h2>No reviews yet</h2><p>Your feedback will appear here after completed consultations.</p></section>}
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

function ViewAnalytics() {
  return (
    <div className="cp-view cp-view--catalog">
      <CatalogHeading eyebrow="WORKSPACE INSIGHTS" title="Analytics" description="Understand your project activity and expert collaborations." />
      <div className="cp-project-stats">
        <CatalogStat icon={Briefcase} value="0" label="Projects Tracked" />
        <CatalogStat icon={Calendar} value="0" label="Consultations" tone="draft" />
        <CatalogStat icon={TrendingUp} value="—" label="Engagement Trend" tone="completed" />
      </div>
      <section className="cp-project-empty cp-project-empty--catalog"><div className="cp-project-empty__leaf cp-project-empty__leaf--top"><Leaf size={80} /></div><div className="cp-project-empty__art"><BarChart3 size={88} strokeWidth={1.3} /></div><h2>Analytics will appear here</h2><p>Once you have projects and consultations, your company’s activity will be summarized here.</p></section>
    </div>
  );
}

// ─── View: Company Profile ────────────────────────────────────────────────────

function ViewCompanyProfile({ companyProfile }) {
  const [form, setForm] = useState({
    name: companyProfile?.company_name || '',
    industry: companyProfile?.industry || '',
    size: '',
    website: companyProfile?.website || '',
    location: companyProfile?.location || '',
    about: companyProfile?.description || '',
    focusAreas: companyProfile?.industry || '',
  });

  return (
    <div className="cp-view cp-view--catalog">
      <CatalogHeading eyebrow="YOUR ORGANIZATION" title="Company Profile" description="Manage the details professionals see about your company." />

      <div className="cp-form-card">
        <div className="cp-profile-avatar-row">
          <div className="cp-profile-avatar">{form.name.slice(0, 2).toUpperCase() || 'CO'}</div>
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
    <div className="cp-view cp-view--catalog">
      <CatalogHeading eyebrow="PREFERENCES" title="Settings" description="Manage your company portal preferences and account settings." />

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
  { id: 'overview',         label: 'Dashboard',       icon: LayoutDashboard },
  { id: 'find-experts',     label: 'Find Experts',    icon: Search          },
  { id: 'projects',         label: 'My Projects',     icon: Briefcase },
  { id: 'bookings',         label: 'Bookings',        icon: Calendar },
  { id: 'messages',         label: 'Messages',        icon: MessageSquare },
  { id: 'saved-experts',    label: 'Saved Experts',   icon: Bookmark        },
  { id: 'company-profile',  label: 'Company Profile', icon: Building2       },
  { id: 'reviews',          label: 'Reviews',         icon: Star            },
  { id: 'analytics',        label: 'Analytics',       icon: BarChart3       },
  { id: 'settings',         label: 'Settings',        icon: Settings        },
];

export default function CompanyPortal({ onReturnHome, onSelectExpert, onLogout, companyProfile }) {
  const [activeNav,    setActiveNav]    = useState('overview');
  const [savedExperts, setSavedExperts] = useState([]);
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
      case 'overview':        return <ViewOverview       {...sharedProps} companyProfile={companyProfile} onNav={navTo} />;
      case 'find-experts':    return <ViewFindExperts    {...sharedProps} />;
      case 'projects':        return <ViewProjects />;
      case 'bookings':        return <ViewBookings />;
      case 'messages':        return <ViewMessages />;
      case 'saved-experts':   return <ViewSavedExperts   {...sharedProps} />;
      case 'reviews':         return <ViewReviews />;
      case 'analytics':       return <ViewAnalytics />;
      case 'company-profile': return <ViewCompanyProfile companyProfile={companyProfile} />;
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
        </div>
        <button className="cp-global-search" onClick={() => navTo('find-experts')} type="button">
          <Search size={16} />
          <span>Search experts by skills, experience, or keywords…</span>
        </button>
        <div className="cp-header__right">
          <button className="cp-header__notif" aria-label="Notifications">
            <Bell size={18} />
            <span className="cp-header__notif-dot" />
          </button>
          <div className="cp-header__company">
              <div className="cp-header__company-avatar">{(companyProfile?.company_name || DEMO_COMPANY.name).slice(0, 2).toUpperCase()}</div>
            <div className="cp-header__company-info">
                <span className="cp-header__company-name">{companyProfile?.company_name || DEMO_COMPANY.name}</span>
                <span className="cp-header__company-sub">{companyProfile?.industry || DEMO_COMPANY.industry}</span>
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
          <button className="cp-sidebar__brand" onClick={onReturnHome} type="button" aria-label="Return to ElderExpert home">
            <span className="cp-sidebar__brand-copy"><strong>ElderExpert</strong><small>COMPANY PORTAL</small></span>
          </button>
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
                  {item.id === 'saved-experts' && savedExperts.length > 0 && <span className={`cp-nav-badge ${isActive ? 'cp-nav-badge--active' : ''}`}>{savedExperts.length}</span>}
                </button>
              );
            })}
          </nav>

          {/* Company snippet at sidebar bottom */}
          <div className="cp-sidebar__company">
            <div className="cp-sidebar__company-avatar">{(companyProfile?.company_name || DEMO_COMPANY.name).slice(0, 2).toUpperCase()}</div>
            <div className="cp-sidebar__company-info">
              <span className="cp-sidebar__company-name">{companyProfile?.company_name || DEMO_COMPANY.name}</span>
              <span className="cp-sidebar__company-sub">{companyProfile?.industry || 'Corporate Account'}</span>
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
