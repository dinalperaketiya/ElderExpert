import React, { useState } from 'react';
import { ArrowRight, Building2, Globe2, MapPin, Target } from 'lucide-react';
import { companyProfileApi } from '../services/api';
import './CompanyProfileSetup.css';

const initialProfile = (user) => ({
  company_name: '',
  email: user?.email || '',
  website: '',
  industry: '',
  location: '',
});

function getErrorMessage(error) {
  const validationErrors = error.response?.data?.errors;
  if (validationErrors) return Object.values(validationErrors).flat()[0];
  return error.response?.data?.message || 'We couldn’t save your company profile. Please try again.';
}

export default function CompanyProfileSetup({ user, onComplete, onLogout }) {
  const [profile, setProfile] = useState(() => initialProfile(user));
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (event) => {
    setProfile((current) => ({ ...current, [event.target.name]: event.target.value }));
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const { data } = await companyProfileApi.create(profile);
      onComplete(data.data);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page company-setup-page">
      <div className="auth-topbar">
        <a className="auth-wordmark" href="#home" onClick={(event) => event.preventDefault()}>
          <span className="auth-wordmark__mark">E</span>
          <span>ElderExpert</span>
        </a>
        <button className="company-setup-signout" onClick={onLogout} type="button">Sign out</button>
      </div>

      <section className="auth-card company-setup-card" aria-labelledby="company-setup-title">
        <div className="auth-card__intro">
          <span className="auth-eyebrow">ONE LAST STEP</span>
          <h1 id="company-setup-title">Set up your company</h1>
          <p>Tell professionals a little about your organization so we can personalize your portal.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Company name</span>
            <span className="auth-input-wrap"><Building2 size={18} aria-hidden="true" /><input autoComplete="organization" maxLength={255} name="company_name" onChange={updateField} placeholder="Your company name" required value={profile.company_name} /></span>
          </label>
          <label className="auth-field">
            <span>Company email</span>
            <span className="auth-input-wrap"><input autoComplete="email" name="email" onChange={updateField} placeholder="hello@company.com" required type="email" value={profile.email} /></span>
            <small className="auth-field-hint">Use an email address for your company.</small>
          </label>
          <label className="auth-field">
            <span>Website</span>
            <span className="auth-input-wrap"><Globe2 size={18} aria-hidden="true" /><input autoComplete="url" name="website" onChange={updateField} placeholder="https://www.company.com" required type="url" value={profile.website} /></span>
          </label>
          <label className="auth-field">
            <span>Focus area</span>
            <span className="auth-input-wrap"><Target size={18} aria-hidden="true" /><input maxLength={255} name="industry" onChange={updateField} placeholder="e.g. Healthcare, Technology, Education" required value={profile.industry} /></span>
          </label>
          <label className="auth-field">
            <span>Address</span>
            <span className="auth-input-wrap"><MapPin size={18} aria-hidden="true" /><input autoComplete="street-address" maxLength={255} name="location" onChange={updateField} placeholder="Street, city, and country" required value={profile.location} /></span>
          </label>

          {errorMessage && <p className="auth-error" role="alert">{errorMessage}</p>}
          <button className="auth-submit" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Saving profile…' : 'Save and continue'}
            {!isSubmitting && <ArrowRight size={18} aria-hidden="true" />}
          </button>
        </form>
      </section>
      <p className="auth-footnote">A community where experience meets opportunity.</p>
    </main>
  );
}
