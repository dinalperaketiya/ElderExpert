
import React from 'react';
import './RoleSelection.css';

const portals = [
    {
        id: 'company',
        number: '01',
        title: 'Company',
        description: 'Find experienced minds to move your business forward.',
        icon: '↗',
    },
    {
        id: 'young-professional',
        number: '02',
        title: 'Young Professional',
        description: 'Build your future with guidance from industry experts.',
        icon: '↗',
    },
    {
        id: 'expert',
        number: '03',
        title: 'Elder Expert',
        description: 'Share your experience. Inspire the next generation.',
        icon: '↗',
    },
];

export default function RoleSelection({ onSelectRole }) {
    return (
        <main className="role-page">
            {/* Left: Brand and future background photo */}
            <section className="role-visual">
                <div className="visual-glow visual-glow-one" />
                <div className="visual-glow visual-glow-two" />

                <header className="brand">
                    <div className="brand-mark">E</div>
                    <span>elder<span className="brand-light">expert</span></span>
                </header>

                <div className="visual-content">
          <span className="eyebrow">
            <span className="status-dot" />
            EXPERIENCE HAS NO AGE
          </span>

                    <h1>
                        Wisdom
                        <br />
                        meets
                        <br />
                        <span>possibility.</span>
                    </h1>

                    <p className="visual-description">
                        A place where experience creates opportunity,
                        knowledge builds confidence, and generations
                        grow together.
                    </p>

                    <div className="visual-bottom">
                        <div className="avatar-stack" aria-hidden="true">
                            <span>✦</span>
                            <span>+</span>
                            <span>∞</span>
                        </div>
                        <div>
                            <strong>One community.</strong>
                            <p>Three ways to grow together.</p>
                        </div>
                    </div>
                </div>

                <span className="visual-index">EE — 001 / CONNECT</span>
            </section>

            {/* Right: Role selection */}
            <section className="role-panel">
                <div className="panel-top">
                    <span className="panel-label">WELCOME TO ELDEREXPERT</span>
                    <span className="online-indicator">
            <span className="status-dot" />
            YOUR NEXT CHAPTER STARTS HERE
          </span>
                </div>

                <div className="panel-heading">
                    <span className="section-number">01 / GET STARTED</span>
                    <h2>
                        How will you
                        <br />
                        <span>grow with us?</span>
                    </h2>
                    <p>
                        Choose your space. We’ll help you take it from there.
                    </p>
                </div>

                <div className="portal-list">
                    {portals.map((portal) => (
                        <button
                            className="portal-card"
                            key={portal.id}
                            onClick={() => onSelectRole(portal.id)}
                            type="button"
                        >
                            <span className="portal-number">{portal.number}</span>

                            <span className="portal-copy">
                <span className="portal-title">{portal.title}</span>
                <span className="portal-description">
                  {portal.description}
                </span>
              </span>

                            <span className="portal-arrow" aria-hidden="true">
                {portal.icon}
              </span>
                        </button>
                    ))}
                </div>

                <footer className="panel-footer">
                    <span>KNOWLEDGE CONNECTS US ALL.</span>
                    <span>© ELDEREXPERT</span>
                </footer>
            </section>
        </main>
    );
}
