import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { authApi, saveAuthToken } from '../services/api';
import './AuthScreen.css';

const roleDetails = {
  company: { label: 'Company', description: 'Connect your organization with experienced professionals.' },
  expert: { label: 'Elder Expert', description: 'Share your experience and help the next generation grow.' },
  'young-professional': { label: 'Young Professional', description: 'Find mentors and build your career with trusted guidance.' },
};

const backendRole = (role) => role === 'young-professional' ? 'young_professional' : role;

function getErrorMessage(error) {
  const validationErrors = error.response?.data?.errors;
  if (validationErrors) return Object.values(validationErrors).flat()[0];
  return error.response?.data?.message || 'We couldn’t connect to your account. Please try again.';
}

export default function AuthScreen({ role, onRoleChange, mode, onModeChange, onBack, onSuccess, initialError }) {
  const [form, setForm] = useState({ name: '', email: '', identifier: '', password: '', passwordConfirmation: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(initialError || '');
  const isRegister = mode === 'register';
  const selectedRole = roleDetails[role];

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (isRegister && !role) {
      setErrorMessage('Choose a role from the home page before creating an account.');
      return;
    }

    if (isRegister && form.password !== form.passwordConfirmation) {
      setErrorMessage('Your passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = isRegister
        ? await authApi.register({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          password_confirmation: form.passwordConfirmation,
          role: backendRole(role),
        })
        : await authApi.login({ identifier: form.identifier.trim(), password: form.password });

      const { user, token } = response.data;
      if (!isRegister && role && user.role !== backendRole(role)) {
        const accountRole = roleDetails[user.role === 'young_professional' ? 'young-professional' : user.role]?.label || 'another role';
        setErrorMessage(`This account is registered as ${accountRole}. Choose the matching portal to sign in.`);
        return;
      }

      saveAuthToken(token);
      onSuccess(user);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-topbar">
        <button className="auth-back" type="button" onClick={onBack}>
          <ArrowLeft size={17} /> Back to role selection
        </button>
        <a className="auth-wordmark" href="#home" onClick={(event) => { event.preventDefault(); onBack(); }}>
          <span className="auth-wordmark__mark">E</span>
          <span>ElderExpert</span>
        </a>
      </div>

      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-card__intro">
          <span className="auth-eyebrow">{isRegister ? 'YOUR NEXT CHAPTER STARTS HERE' : 'WELCOME BACK'}</span>
          <h1 id="auth-title">{isRegister ? 'Create your account' : 'Sign in to ElderExpert'}</h1>
          <p>
            {isRegister
              ? 'Your account is the first step toward a community built on shared experience.'
              : 'Sign in to continue to your personalized ElderExpert portal.'}
          </p>
          {selectedRole && (
            <div className="auth-role-badge">
              <span className="auth-role-badge__dot" />
              {isRegister ? 'Creating an account as' : 'Signing in to'} <strong>{selectedRole.label}</strong>
            </div>
          )}
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegister && (
            <label className="auth-field">
              <span>Choose your role</span>
              <select
                autoComplete="off"
                onChange={(event) => onRoleChange(event.target.value || null)}
                required
                value={role || ''}
              >
                <option value="" disabled>Select a portal</option>
                <option value="company">Company</option>
                <option value="expert">Elder Expert</option>
                <option value="young-professional">Young Professional</option>
              </select>
            </label>
          )}

          {isRegister && (
            <label className="auth-field">
              <span>Username</span>
              <span className="auth-input-wrap">
                <UserRound size={18} aria-hidden="true" />
                <input autoComplete="username" name="name" onChange={updateField} placeholder="Choose a username" required value={form.name} />
              </span>
              <small className="auth-field-hint">You can use this or your email to sign in.</small>
            </label>
          )}

          {isRegister ? (
            <label className="auth-field">
              <span>Email address</span>
              <span className="auth-input-wrap">
                <Mail size={18} aria-hidden="true" />
                <input autoComplete="email" name="email" onChange={updateField} placeholder="you@example.com" required type="email" value={form.email} />
              </span>
            </label>
          ) : (
            <label className="auth-field">
              <span>Username or email</span>
              <span className="auth-input-wrap">
                <UserRound size={18} aria-hidden="true" />
                <input autoComplete="username" name="identifier" onChange={updateField} placeholder="Enter your username or email" required value={form.identifier} />
              </span>
            </label>
          )}

          <label className="auth-field">
            <span>Password</span>
            <span className="auth-input-wrap">
              <LockKeyhole size={18} aria-hidden="true" />
              <input autoComplete={isRegister ? 'new-password' : 'current-password'} minLength={isRegister ? 8 : undefined} name="password" onChange={updateField} placeholder={isRegister ? 'At least 8 characters' : 'Your password'} required type={showPassword ? 'text' : 'password'} value={form.password} />
              <button className="auth-password-toggle" type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>

          {isRegister && (
            <label className="auth-field">
              <span>Confirm password</span>
              <span className="auth-input-wrap">
                <LockKeyhole size={18} aria-hidden="true" />
                <input autoComplete="new-password" minLength={8} name="passwordConfirmation" onChange={updateField} placeholder="Enter your password again" required type={showPassword ? 'text' : 'password'} value={form.passwordConfirmation} />
              </span>
            </label>
          )}

          {errorMessage && <p className="auth-error" role="alert">{errorMessage}</p>}

          <button className="auth-submit" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Please wait…' : isRegister ? 'Create account' : 'Sign in'}
            {!isSubmitting && <ArrowRight size={18} aria-hidden="true" />}
          </button>
        </form>

        <p className="auth-switch">
          {isRegister ? 'Already have an account?' : role ? 'Don’t have an account?' : 'New to ElderExpert?'}{' '}
          <button type="button" onClick={() => {
            if (isRegister) onModeChange('login');
            else onModeChange('register');
          }}>
            {isRegister ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </section>

      <p className="auth-footnote">A community where experience meets opportunity.</p>
    </main>
  );
}
