import React from 'react';
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  ChartNoAxesCombined,
  ClipboardList,
  GraduationCap,
  Leaf,
  Search,
  ShieldCheck,
  UserRound,
  UsersRound,
} from 'lucide-react';
import rolePortalsImage from '../assets/role-portals.png';
import './RoleSelection.css';

const portals = [
  {
    id: 'company',
    title: 'Company',
    description: 'Find experienced professionals, get expert advice, and collaborate on your projects.',
    icon: BriefcaseBusiness,
    features: [
      [ShieldCheck, 'Access verified experts'],
      [ClipboardList, 'Post projects and opportunities'],
      [CalendarDays, 'Manage bookings and consultations'],
    ],
  },
  {
    id: 'expert',
    title: 'Elder Expert',
    description: 'Share your knowledge, provide consultations, and make an impact with your experience.',
    icon: GraduationCap,
    features: [
      [UserRound, 'Create expert profile'],
      [CalendarDays, 'Manage your availability'],
      [UsersRound, 'Connect with companies and talent'],
    ],
  },
  {
    id: 'young-professional',
    title: 'Young Professional',
    description: 'Learn from experienced experts, get career guidance, and build your network.',
    icon: UsersRound,
    features: [
      [Search, 'Find mentors and experts'],
      [CalendarDays, 'Book consultations'],
      [ChartNoAxesCombined, 'Grow your skills and career'],
    ],
  },
];

export default function RoleSelection({ onSelectRole, onCreateAccount }) {
  return (
    <main className="role-page">
      <header className="role-header">
        <a className="role-brand" href="#home" aria-label="ElderExpert home">
          <span className="role-brand__text"><strong className="role-brand__name">ElderExpert</strong><span className="role-brand__tagline">CONNECT · COLLABORATE · GROW</span></span>
        </a>

        <div className="role-signin">
          <span>New to ElderExpert?</span>
          <button type="button" className="role-signin__button" onClick={onCreateAccount}>
            Create Account <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </header>

      <section className="role-intro" aria-labelledby="role-title">
        <p className="role-kicker">WELCOME TO ELDEREXPERT</p>
        <h1 id="role-title">Choose Your Role</h1>
        <p className="role-intro__copy">
          Join a community where experience meets opportunity.<br className="desktop-break" />
          Select your role to continue to your personalized portal.
        </p>
        <div className="role-divider" aria-hidden="true">
          <span /> <Leaf size={18} fill="currentColor" /> <span />
        </div>
      </section>

      <section className="portal-grid" aria-label="Choose your ElderExpert portal">
        {portals.map((portal) => {
          const RoleIcon = portal.icon;
          return (
            <article className="portal-card" key={portal.id}>
              <div
                className={`portal-card__art portal-card__art--${portal.id}`}
                role="img"
                aria-label={`${portal.title} portal illustration`}
              >
                <img src={rolePortalsImage} alt="" aria-hidden="true" />
              </div>

              <div className="portal-card__body">
                <span className="portal-card__icon" aria-hidden="true">
                  <RoleIcon size={25} strokeWidth={2.5} />
                </span>
                <h2>{portal.title}</h2>
                <p className="portal-card__description">{portal.description}</p>

                <ul className="portal-card__features">
                  {portal.features.map(([FeatureIcon, label]) => (
                    <li key={label}>
                      <FeatureIcon size={20} strokeWidth={2.2} aria-hidden="true" />
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="portal-card__button"
                  onClick={() => onSelectRole(portal.id)}
                  type="button"
                >
                  Continue as {portal.title}
                  <ArrowRight size={19} aria-hidden="true" />
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <footer className="role-footer">
        <span />
        <p>Different Generations <b>•</b> Shared Knowledge <b>•</b> A Brighter Tomorrow</p>
        <span />
      </footer>
    </main>
  );
}
