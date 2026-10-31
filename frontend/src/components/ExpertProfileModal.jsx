import React from 'react';
import {
  X, Star, MapPin, Clock, ShieldCheck, Award, Briefcase, Calendar
} from 'lucide-react';

export default function ExpertProfileModal({ expert, onClose }) {
  if (!expert) return null;
  const matchReasons = expert.matchReasons || (expert.matchReason ? [expert.matchReason] : []);
  const matchScore = expert.matchScore ?? expert.aiMatchScore;
  const rateLabel = expert.rateLabel || (expert.hourlyRate ? `$${expert.hourlyRate}/hr` : 'Rate on request');

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="epm-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Profile: ${expert.name}`}
    >
      <div className="epm-panel">
        {/* Header */}
        <div className="epm-header">
          <div className="epm-header__info">
            <img
              src={expert.avatar}
              alt={expert.name}
              className="epm-avatar"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div>
              <div className="epm-name-row">
                <h2 className="epm-name">{expert.name}</h2>
                {expert.verified && (
                  <span className="epm-verified">
                    <ShieldCheck size={13} />
                    Verified
                  </span>
                )}
              </div>
              <p className="epm-title">{expert.title}</p>
              <p className="epm-company">{expert.formerCompany || 'Verified ElderExpert professional'}</p>
              <div className="epm-meta-row">
                {expert.rating && (
                  <span className="epm-meta">
                    <Star size={13} fill="#D97706" color="#D97706" />
                    {expert.rating} ({expert.reviewsCount} reviews)
                  </span>
                )}
                {expert.location && (
                  <span className="epm-meta">
                    <MapPin size={13} />
                    {expert.location}
                  </span>
                )}
                {expert.availability && (
                  <span className="epm-meta">
                    <Clock size={13} />
                    {expert.availability}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button className="epm-close" onClick={onClose} aria-label="Close profile">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="epm-body">
          {/* Rate & Book */}
          <div className="epm-cta-banner">
            <div>
              <span className="epm-rate">{rateLabel}</span>
              <span className="epm-exp">{expert.experienceYears} years experience</span>
            </div>
            <button
              className="epm-book-btn"
              onClick={() => alert(`Consultation request sent to ${expert.name}. (Backend endpoint pending.)`)}
            >
              <Calendar size={15} />
              Request Consultation
            </button>
          </div>

          {/* Bio */}
          <section className="epm-section">
            <h3 className="epm-section__title">About</h3>
            <p className="epm-bio">{expert.bio}</p>
          </section>

          {/* Career History */}
          {expert.fullHistory && (
            <section className="epm-section">
              <h3 className="epm-section__title">
                <Award size={15} />
                Career Highlights
              </h3>
              <p className="epm-history">{expert.fullHistory}</p>
            </section>
          )}

          {/* Skills */}
          {expert.skills?.length > 0 && (
            <section className="epm-section">
              <h3 className="epm-section__title">
                <Briefcase size={15} />
                Skills & Specializations
              </h3>
              <div className="epm-skills">
                {expert.skills.map((s, i) => (
                  <span key={i} className="epm-skill">{s}</span>
                ))}
              </div>
            </section>
          )}

          {/* AI Match (if present) */}
          {matchReasons.length > 0 && (
            <section className="epm-section">
              <h3 className="epm-section__title epm-section__title--ai">
                Why this expert matched
                {matchScore !== undefined && (
                  <span className="epm-match-score">{matchScore}% match</span>
                )}
              </h3>
              <p className="epm-match-reason">{matchReasons.join(' ')}</p>
            </section>
          )}
        </div>
      </div>

      <style>{`
        .epm-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(12, 45, 38, 0.45);
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          backdrop-filter: blur(3px);
        }
        .epm-panel {
          width: 480px;
          max-width: 100vw;
          height: 100vh;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          box-shadow: -8px 0 32px rgba(12, 45, 38, 0.12);
          animation: slideIn 0.25s ease;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        .epm-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          padding: 24px 24px 20px;
          border-bottom: 1px solid #e8e7e0;
          background: #f0f8f5;
        }
        .epm-header__info { display: flex; align-items: flex-start; gap: 16px; }
        .epm-avatar {
          width: 72px;
          height: 72px;
          border-radius: 14px;
          object-fit: cover;
          border: 2px solid #c4d5cc;
          flex-shrink: 0;
        }
        .epm-name-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 3px; }
        .epm-name { font-size: 18px; font-weight: 800; color: #0c2d26; font-family: 'Plus Jakarta Sans', sans-serif; }
        .epm-verified {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 10px; font-weight: 700;
          background: #ecfdf5; color: #059669;
          border: 1px solid #a7f3d0;
          padding: 2px 7px; border-radius: 99px;
        }
        .epm-title { font-size: 13px; font-weight: 600; color: #2563eb; }
        .epm-company { font-size: 12px; color: #64748b; margin-top: 2px; }
        .epm-meta-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 8px; }
        .epm-meta {
          display: flex; align-items: center; gap: 4px;
          font-size: 12px; color: #64748b; font-weight: 500;
        }
        .epm-close {
          display: grid; place-items: center;
          width: 34px; height: 34px;
          border: 1.5px solid #e8e7e0;
          border-radius: 8px;
          background: white;
          color: #64748b;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.14s;
        }
        .epm-close:hover { border-color: #153f35; color: #153f35; background: #f0f8f5; }

        .epm-body { flex: 1; padding: 24px; display: flex; flex-direction: column; gap: 22px; }

        .epm-cta-banner {
          display: flex; align-items: center; justify-content: space-between; gap: 14px;
          padding: 18px 20px;
          background: #f0f8f5;
          border: 1px solid #c4d5cc;
          border-radius: 14px;
        }
        .epm-rate { font-size: 24px; font-weight: 800; color: #0c2d26; display: block; }
        .epm-rate span { font-size: 14px; font-weight: 500; color: #64748b; }
        .epm-exp { font-size: 12px; color: #64748b; display: block; margin-top: 2px; }
        .epm-book-btn {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 10px 20px;
          background: #153f35;
          color: #d8edc5;
          border: none;
          border-radius: 10px;
          font-size: 13px; font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.15s;
        }
        .epm-book-btn:hover { background: #0c2d26; }

        .epm-section { display: flex; flex-direction: column; gap: 10px; }
        .epm-section__title {
          display: flex; align-items: center; gap: 7px;
          font-size: 13px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.5px;
          color: #153f35;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .epm-section__title--ai { color: #7c3aed; }
        .epm-bio, .epm-history { font-size: 13px; color: #475569; line-height: 1.7; }
        .epm-skills { display: flex; flex-wrap: wrap; gap: 7px; }
        .epm-skill {
          font-size: 12px; font-weight: 500;
          padding: 4px 12px; border-radius: 6px;
          background: #f1f5f9; color: #334155;
          border: 1px solid #e2e8f0;
        }
        .epm-match-score {
          background: #e8f4f0; color: #153f35;
          font-size: 10px; font-weight: 700;
          padding: 2px 8px; border-radius: 99px;
          border: 1px solid #9dc9b8;
          margin-left: 4px;
        }
        .epm-match-reason {
          font-size: 13px; color: #475569;
          background: #f3e8ff;
          border: 1px solid #e9d5ff;
          border-radius: 10px;
          padding: 12px 14px;
          line-height: 1.6;
        }

        @media (max-width: 520px) {
          .epm-panel { width: 100vw; }
          .epm-cta-banner { flex-direction: column; align-items: flex-start; }
          .epm-book-btn { width: 100%; justify-content: center; }
        }
        @media (prefers-reduced-motion: reduce) {
          .epm-panel { animation: none; }
        }
      `}</style>
    </div>
  );
}
