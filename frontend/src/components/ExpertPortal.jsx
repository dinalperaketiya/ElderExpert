import React, { useState } from 'react';
import { Activity, BarChart3, Bell, CalendarDays, Check, ChevronDown, CircleUserRound, FileText, HelpCircle, Home, LogOut, MessageCircle, Search, Settings, ShieldCheck, Star, UserRound, Users } from 'lucide-react';
import './ExpertPortal.css';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'bookings', label: 'My Bookings', icon: CalendarDays },
  { id: 'messages', label: 'Messages', icon: MessageCircle },
  { id: 'profile', label: 'My Profile', icon: CircleUserRound },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function ExpertPortal({ onReturnHome, onLogout, onEditProfile, user, profile }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [search, setSearch] = useState('');
  const name = user?.name || profile?.user?.name || 'Expert';
  const initials = name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  const profileFields = [profile?.professional_title, profile?.bio, profile?.location, profile?.years_of_experience, profile?.profile_photo];
  const completion = Math.round((profileFields.filter(Boolean).length / profileFields.length) * 100);
  const avatar = profile?.profile_photo ? <img src={profile.profile_photo} alt="" /> : initials;

  const openProfile = () => { setActiveTab('profile'); onEditProfile?.(); };
  const showEmpty = (title, description, icon = FileText) => {
    const Icon = icon;
    return <section className="expert-empty"><span><Icon size={25}/></span><h2>{title}</h2><p>{description}</p></section>;
  };

  return (
    <div className="ep-root">
      <aside className="ep-sidebar">
        <button className="ep-brand" onClick={onReturnHome} type="button"><span className="ep-brand__mark">✦</span><span><b>ElderExpert</b><small>EXPERT PORTAL</small></span></button>
        <nav className="ep-nav" aria-label="Expert portal">
          {navItems.map(({ id, label, icon: Icon }) => <button className={`ep-nav__item ${activeTab === id ? 'is-active' : ''}`} key={id} onClick={() => setActiveTab(id)} type="button"><Icon size={18}/><span>{label}</span></button>)}
        </nav>
        <div className="ep-help"><span className="ep-help__icon"><HelpCircle size={18}/></span><b>Need help?</b><p>Our team is here to support your expert journey.</p><button onClick={() => setActiveTab('messages')} type="button">Contact support <span>→</span></button></div>
        <button className="ep-sidebar__user" onClick={() => setActiveTab('profile')} type="button"><span className="ep-avatar ep-avatar--small">{avatar}</span><span><b>{name}</b><small>Expert account</small></span><ChevronDown size={15}/></button>
      </aside>

      <div className="ep-content">
        <header className="ep-header">
          <label className="ep-search"><Search size={17}/><input aria-label="Search your portal" onChange={(event) => setSearch(event.target.value)} placeholder="Search your portal…" value={search}/><kbd>⌘ K</kbd></label>
          <div className="ep-header__actions"><button className="ep-icon-button" aria-label="Notifications" type="button"><Bell size={18}/><i/></button><button className="ep-account" onClick={() => setActiveTab('profile')} type="button"><span className="ep-avatar">{avatar}</span><span><b>{name}</b><small>Expert</small></span><ChevronDown size={15}/></button></div>
        </header>

        <main className="ep-main">
          {activeTab === 'dashboard' && <>
            <section className="ep-welcome"><div className="ep-welcome__copy"><span className="ep-eyebrow">YOUR EXPERT WORKSPACE</span><h1>Welcome, {name.split(' ')[0]} <span>✦</span></h1><p>Share your experience, connect with organizations, and make a meaningful impact.</p><div className="ep-welcome__buttons"><button className="ep-button ep-button--primary" onClick={openProfile} type="button"><UserRound size={16}/> {completion < 100 ? 'Complete your profile' : 'Update your profile'} <span>→</span></button><button className="ep-button ep-button--light" onClick={() => setActiveTab('bookings')} type="button"><CalendarDays size={16}/> View bookings</button></div></div><div className="ep-welcome__art" aria-hidden="true"><div className="ep-art-orbit ep-art-orbit--one"/><div className="ep-art-orbit ep-art-orbit--two"/><span className="ep-art-leaf">✦</span><div className="ep-art-card"><ShieldCheck size={30}/><b>Experience<br/>that inspires</b></div></div><blockquote className="ep-quote">“Your knowledge can open doors for the next generation.”<span>— ElderExpert community</span></blockquote></section>

            <section className="ep-stats" aria-label="Expert account summary">
              <article className="ep-stat"><span className="ep-stat__icon ep-stat__icon--mint"><CalendarDays size={19}/></span><div><b>0</b><small>Upcoming bookings</small></div><span className="ep-stat__foot">Ready when you are</span></article>
              <article className="ep-stat"><span className="ep-stat__icon ep-stat__icon--blue"><MessageCircle size={19}/></span><div><b>0</b><small>New messages</small></div><span className="ep-stat__foot">No unread messages</span></article>
              <article className="ep-stat"><span className="ep-stat__icon ep-stat__icon--gold"><Star size={19}/></span><div><b>—</b><small>Expert rating</small></div><span className="ep-stat__foot">Build your track record</span></article>
            </section>

            <section className="ep-overview-grid"><article className="ep-panel ep-profile-progress"><div className="ep-panel__heading"><div><span className="ep-eyebrow">MAKE A GREAT FIRST IMPRESSION</span><h2>Profile completion</h2></div><span className="ep-percent">{completion}%</span></div><div className="ep-progress"><span style={{ width: `${completion}%` }}/></div><p className="ep-panel__hint">A complete profile helps organizations understand your experience and expertise.</p><div className="ep-checklist">{[['Professional title', Boolean(profile?.professional_title)], ['Professional summary', Boolean(profile?.bio)], ['Location', Boolean(profile?.location)], ['Years of experience', Boolean(profile?.years_of_experience)]].map(([label, done]) => <div key={label} className={done ? 'is-done' : ''}><span>{done ? <Check size={13}/> : <i/>}</span>{label}</div>)}</div><button className="ep-panel__link" onClick={openProfile} type="button">{completion < 100 ? 'Finish your profile' : 'Review your profile'} <span>→</span></button></article>

              <article className="ep-panel ep-next-steps"><div className="ep-panel__heading"><div><span className="ep-eyebrow">GET STARTED</span><h2>Your next steps</h2></div><Activity size={20}/></div><button className="ep-step" onClick={openProfile} type="button"><span className="ep-step__number">01</span><span><b>Polish your profile</b><small>Add the details that showcase your career.</small></span><span className="ep-step__arrow">→</span></button><button className="ep-step" onClick={() => setActiveTab('bookings')} type="button"><span className="ep-step__number">02</span><span><b>Set your availability</b><small>Let people know when you can connect.</small></span><span className="ep-step__arrow">→</span></button><button className="ep-step" onClick={() => setActiveTab('messages')} type="button"><span className="ep-step__number">03</span><span><b>Stay connected</b><small>Messages and booking requests will appear here.</small></span><span className="ep-step__arrow">→</span></button></article></section>

            <section className="ep-panel ep-activity"><div className="ep-panel__heading"><div><span className="ep-eyebrow">YOUR WORKSPACE</span><h2>Recent activity</h2></div><button className="ep-panel__link" onClick={() => setActiveTab('messages')} type="button">View messages <span>→</span></button></div><div className="ep-activity__empty"><span><Users size={19}/></span><p>Your expert activity will show here as you connect with organizations.</p></div></section>
          </>}
          {activeTab === 'profile' && <section className="ep-page-section"><div className="ep-page-heading"><div><span className="ep-eyebrow">YOUR PROFESSIONAL PRESENCE</span><h1>My Profile</h1><p>Manage the details organizations see when they discover your expertise.</p></div><button className="ep-button ep-button--primary" onClick={openProfile} type="button">Edit profile <span>→</span></button></div><article className="ep-panel ep-public-profile"><span className="ep-avatar ep-avatar--large">{avatar}</span><div><span className="ep-eyebrow">EXPERT PROFILE</span><h2>{name}</h2><h3>{profile?.professional_title}</h3><p>{profile?.bio}</p><div className="ep-profile-meta">{profile?.location && <span>{profile.location}</span>}{profile?.years_of_experience != null && <span>{profile.years_of_experience} years of experience</span>}<span>{profile?.is_verified ? 'Verified expert' : 'Pending verification'}</span></div></div></article></section>}
          {activeTab === 'bookings' && <section className="ep-page-section"><div className="ep-page-heading"><div><span className="ep-eyebrow">YOUR SCHEDULE</span><h1>My Bookings</h1><p>Consultation requests and scheduled sessions will appear here.</p></div></div>{showEmpty('No bookings yet', 'When an organization requests a consultation, you’ll find the details here.', CalendarDays)}</section>}
          {activeTab === 'messages' && <section className="ep-page-section"><div className="ep-page-heading"><div><span className="ep-eyebrow">STAY CONNECTED</span><h1>Messages</h1><p>Your conversations with organizations will appear here.</p></div></div>{showEmpty('No messages yet', 'Messages will be available here when an organization reaches out.', MessageCircle)}</section>}
          {activeTab === 'reviews' && <section className="ep-page-section"><div className="ep-page-heading"><div><span className="ep-eyebrow">COMMUNITY FEEDBACK</span><h1>Reviews</h1><p>Feedback you receive after consultations will appear here.</p></div></div>{showEmpty('No reviews yet', 'Your reviews will appear here as you complete consultations.', Star)}</section>}
          {activeTab === 'analytics' && <section className="ep-page-section"><div className="ep-page-heading"><div><span className="ep-eyebrow">YOUR IMPACT</span><h1>Analytics</h1><p>Insights about your consultations and profile activity.</p></div></div>{showEmpty('Insights are on their way', 'Your expert activity insights will appear here as your profile gets started.', BarChart3)}</section>}
          {activeTab === 'settings' && <section className="ep-page-section"><div className="ep-page-heading"><div><span className="ep-eyebrow">ACCOUNT PREFERENCES</span><h1>Settings</h1><p>Manage your ElderExpert account and session.</p></div></div><article className="ep-panel ep-settings-card"><div><b>Account email</b><span>{user?.email || 'Not available'}</span></div><button onClick={onLogout} type="button"><LogOut size={16}/> Sign out</button></article></section>}
        </main>
        <footer className="ep-footer"><span>ElderExpert <i>•</i> Connect across generations</span><button onClick={onReturnHome} type="button">Back to home</button></footer>
      </div>
    </div>
  );
}
