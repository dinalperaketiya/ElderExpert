import React, { useState } from 'react';
import { ArrowRight, Award, Bell, Bookmark, BriefcaseBusiness, CalendarDays, ChevronDown, CircleUserRound, FileText, GraduationCap, HelpCircle, Home, MapPin, MessageCircle, Search, Settings, Sparkles, UserRound, Users } from 'lucide-react';
import './YoungProfessionalPortal.css';
import './ProfilePhotoCrop.css';
import './BrandLogo.css';

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'profile', label: 'My Profile', icon: CircleUserRound },
  { id: 'browse', label: 'Browse Experts', icon: Search },
  { id: 'applications', label: 'My Applications', icon: FileText },
  { id: 'saved', label: 'Saved Experts', icon: Bookmark },
  { id: 'messages', label: 'Messages', icon: MessageCircle },
  { id: 'development', label: 'Skill Development', icon: GraduationCap },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function YoungProfessionalPortal({ user, profile, onEditProfile, onLogout, onReturnHome }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const name = user?.name || profile?.user?.name || 'Young Professional';
  const initials = name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  const avatar = profile?.profile_photo ? <img src={profile.profile_photo} alt=""/> : initials;
  const fields = [Boolean(profile?.professional_title), Boolean(profile?.bio), Boolean(profile?.location), Boolean(profile?.profile_photo)];
  const completion = Math.round(fields.filter(Boolean).length * 100 / fields.length);
  const empty = (title, detail, Icon = FileText) => <section className="yp-empty"><span><Icon size={24}/></span><h2>{title}</h2><p>{detail}</p></section>;
  const editProfile = () => { onEditProfile?.(); };

  return (
    <div className="yp-root">
      <aside className="yp-sidebar">
        <button className="yp-brand" onClick={onReturnHome} type="button" aria-label="ElderExpert home"><span className="yp-brand__copy"><b>ElderExpert</b><small>YOUNG PROFESSIONAL</small></span></button>
        <nav className="yp-nav" aria-label="Young professional portal">{navigation.map(({ id, label, icon: Icon }) => <button className={`yp-nav__item ${activeTab === id ? 'is-active' : ''}`} key={id} onClick={() => setActiveTab(id)} type="button"><Icon size={18}/><span>{label}</span></button>)}</nav>
        <section className="yp-help"><span><HelpCircle size={17}/></span><b>Need help?</b><p>Our community support team is happy to help.</p><button onClick={() => setActiveTab('messages')} type="button">Contact support <ArrowRight size={14}/></button></section>
        <button className="yp-sidebar__user" onClick={() => setActiveTab('profile')} type="button"><span className="yp-avatar yp-avatar--small">{avatar}</span><span><b>{name}</b><small>Young professional</small></span><ChevronDown size={15}/></button>
      </aside>

      <div className="yp-content">
        <header className="yp-header"><label className="yp-search"><Search size={17}/><input aria-label="Search the portal" placeholder="Search experts, skills, or opportunities…"/><kbd>⌘ K</kbd></label><div className="yp-header__actions"><button className="yp-icon-button" aria-label="Notifications" type="button"><Bell size={18}/></button><button className="yp-account" onClick={() => setActiveTab('profile')} type="button"><span className="yp-avatar">{avatar}</span><span><b>{name}</b><small>Young professional</small></span><ChevronDown size={15}/></button></div></header>
        <main className="yp-main">
          {activeTab === 'dashboard' && <>
            <section className="yp-welcome"><div className="yp-welcome__copy"><span className="yp-eyebrow">YOUR YOUNG PROFESSIONAL SPACE</span><h1>Welcome, {name.split(' ')[0]} <span>✦</span></h1><p>Build connections, learn from experience, and take the next step in your professional journey.</p><div className="yp-welcome__actions"><button className="yp-button yp-button--primary" onClick={editProfile} type="button"><UserRound size={16}/> {completion < 100 ? 'Complete your profile' : 'Update your profile'} <ArrowRight size={15}/></button><button className="yp-button yp-button--light" onClick={() => setActiveTab('browse')} type="button"><Search size={16}/> Explore the community</button></div></div><div className="yp-welcome__art" aria-hidden="true"><div className="yp-art-ring yp-art-ring--one"/><div className="yp-art-ring yp-art-ring--two"/><span className="yp-art-star">✦</span><div className="yp-art-note"><GraduationCap size={29}/><b>Learn from<br/>experience</b></div></div></section>

            <section className="yp-profile-banner"><div className="yp-profile-banner__cover"><span>Learning from experience<br/>to build a better tomorrow.</span></div><div className="yp-profile-banner__body"><span className="yp-avatar yp-avatar--profile">{avatar}</span><div className="yp-profile-banner__details"><h2>{name}</h2><p>{profile?.professional_title || 'Add your current role or study area'}{profile?.location ? `  ·  ${profile.location}` : ''}</p><button onClick={() => setActiveTab('profile')} type="button">View profile <ArrowRight size={14}/></button></div><button className="yp-outline-button" onClick={editProfile} type="button"><UserRound size={15}/> Edit Profile</button></div></section>

            <section className="yp-metrics"><article className="yp-metric"><span className="yp-metric__icon yp-metric__icon--mint"><CircleUserRound size={20}/></span><div><small>Profile completion</small><b>{completion}%</b></div><button onClick={editProfile} type="button" aria-label="Complete profile"><ArrowRight size={17}/></button></article><article className="yp-metric"><span className="yp-metric__icon yp-metric__icon--blue"><Users size={20}/></span><div><small>Mentor connections</small><b>—</b></div><span className="yp-metric__note">As you connect</span></article><article className="yp-metric"><span className="yp-metric__icon yp-metric__icon--gold"><CalendarDays size={20}/></span><div><small>Upcoming sessions</small><b>—</b></div><span className="yp-metric__note">As you book</span></article></section>

            <section className="yp-dashboard-grid"><div className="yp-dashboard-main"><article className="yp-card yp-about"><div className="yp-card__heading"><div><span className="yp-eyebrow">YOUR INTRODUCTION</span><h2>About me</h2></div><button onClick={editProfile} type="button">Edit <span>↗</span></button></div><p>{profile?.bio || 'Add a short introduction to help mentors understand your interests and the guidance you are looking for.'}</p></article><article className="yp-card yp-interests"><div className="yp-card__heading"><div><span className="yp-eyebrow">KEEP GROWING</span><h2>Skills & interests</h2></div></div><div className="yp-inline-empty"><span><Sparkles size={17}/></span><p>Share your learning interests when skills are added to your profile.</p></div></article><article className="yp-card yp-recent"><div className="yp-card__heading"><div><span className="yp-eyebrow">YOUR JOURNEY</span><h2>Recent activity</h2></div></div><div className="yp-inline-empty"><span><ActivityIcon/></span><p>Your profile and community activity will appear here.</p></div></article></div>
              <aside className="yp-dashboard-aside"><article className="yp-card yp-completion"><div className="yp-card__heading"><h2>Profile completion</h2><b>{completion}%</b></div><div className="yp-progress"><span style={{width:`${completion}%`}}/></div><p>Complete your profile to introduce yourself to the ElderExpert community.</p><div className="yp-checks">{[['Basic information',fields[0] && fields[1]],['Location',fields[2]],['Profile picture',fields[3]]].map(([label,done])=><span className={done?'is-done':''} key={label}><i>{done?'✓':''}</i>{label}</span>)}</div><button className="yp-completion__button" onClick={editProfile} type="button">{completion<100?'Complete your profile':'Review your profile'} <ArrowRight size={15}/></button></article><article className="yp-card yp-guidance"><div className="yp-card__heading"><h2>Career direction</h2><BriefcaseBusiness size={17}/></div><div className="yp-inline-empty"><span><Award size={17}/></span><p>Add your goals and interests to shape your learning journey.</p></div><button onClick={editProfile} type="button">Build your profile <ArrowRight size={14}/></button></article></aside></section>
          </>}
          {activeTab === 'profile' && <section className="yp-page"><div className="yp-page__heading"><div><span className="yp-eyebrow">YOUR PROFESSIONAL PRESENCE</span><h1>My Profile</h1><p>Manage the details you share with the ElderExpert community.</p></div><button className="yp-button yp-button--primary" onClick={editProfile} type="button">Edit profile <ArrowRight size={15}/></button></div><article className="yp-card yp-full-profile"><span className="yp-avatar yp-avatar--large">{avatar}</span><div><span className="yp-eyebrow">YOUNG PROFESSIONAL</span><h2>{name}</h2><h3>{profile?.professional_title || 'Role or study area not added'}</h3>{profile?.location&&<span className="yp-location"><MapPin size={14}/>{profile.location}</span>}<p>{profile?.bio || 'Your introduction will appear here after you add it to your profile.'}</p></div></article></section>}
          {activeTab === 'browse' && <section className="yp-page"><div className="yp-page__heading"><div><span className="yp-eyebrow">LEARN FROM EXPERIENCE</span><h1>Browse Experts</h1><p>Explore verified expert profiles when they become available.</p></div></div>{empty('Expert profiles are being prepared','There are no expert profiles to show right now. Please check back later.',Search)}</section>}
          {activeTab === 'applications' && <section className="yp-page"><div className="yp-page__heading"><div><span className="yp-eyebrow">YOUR OPPORTUNITIES</span><h1>My Applications</h1><p>Application updates will appear here when opportunities are available.</p></div></div>{empty('No applications yet','Your applications and their status will be listed here.',FileText)}</section>}
          {activeTab === 'saved' && <section className="yp-page"><div className="yp-page__heading"><div><span className="yp-eyebrow">YOUR BOOKMARKS</span><h1>Saved Experts</h1><p>Keep track of experts you want to connect with.</p></div></div>{empty('No saved experts yet','Experts you save will be available here.',Bookmark)}</section>}
          {activeTab === 'messages' && <section className="yp-page"><div className="yp-page__heading"><div><span className="yp-eyebrow">STAY CONNECTED</span><h1>Messages</h1><p>Your conversations with experts will appear here.</p></div></div>{empty('No messages yet','Conversations will show here when you connect with an expert.',MessageCircle)}</section>}
          {activeTab === 'development' && <section className="yp-page"><div className="yp-page__heading"><div><span className="yp-eyebrow">YOUR NEXT CHAPTER</span><h1>Skill Development</h1><p>Learning resources and your growth plan will live here.</p></div></div>{empty('Your learning space is getting ready','Add your role and introduction to help personalize future learning resources.',GraduationCap)}</section>}
          {activeTab === 'settings' && <section className="yp-page"><div className="yp-page__heading"><div><span className="yp-eyebrow">ACCOUNT PREFERENCES</span><h1>Settings</h1><p>Manage your ElderExpert account and session.</p></div></div><article className="yp-card yp-settings"><div><b>Account email</b><span>{user?.email || 'Not available'}</span></div><button onClick={onLogout} type="button">Sign out</button></article></section>}
        </main>
        <footer className="yp-footer"><span>ElderExpert <i>•</i> Connect across generations</span><button onClick={onReturnHome} type="button">Back to home</button></footer>
      </div>
    </div>
  );
}

function ActivityIcon() { return <FileText size={17}/>; }
