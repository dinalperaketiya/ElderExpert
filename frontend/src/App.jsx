
import React, { useEffect, useState } from 'react';
import RoleSelection from './components/RoleSelection';
import AuthScreen from './components/AuthScreen';
import CompanyPortal from './components/CompanyPortal';
import CompanyProfileSetup from './components/CompanyProfileSetup';
import ExpertPortal from './components/ExpertPortal';
import ExpertProfileSetup from './components/ExpertProfileSetup';
import ExpertProfileModal from './components/ExpertProfileModal';
import { authApi, clearAuthToken, companyProfileApi, expertProfileApi, getAuthToken } from './services/api';

const portalForRole = (role) => {
  if (role === 'company') return 'company';
  if (role === 'expert') return 'expert';
  return 'young-professional';
};

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [authMode, setAuthMode] = useState('register');
  const [selectedRole, setSelectedRole] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [companyProfile, setCompanyProfile] = useState(null);
  const [expertProfile, setExpertProfile] = useState(null);
  const [authError, setAuthError] = useState('');
  const [isCheckingSession, setIsCheckingSession] = useState(() => Boolean(getAuthToken()));
  const [selectedExpert, setSelectedExpert] = useState(null);

  const showUserPortal = async (user) => {
    setAuthUser(user);
    setSelectedRole(null);
    setAuthError('');

    if (user.role === 'company') {
      try {
        const { data } = await companyProfileApi.mine();
        setCompanyProfile(data.data);
        setCurrentView(data.data ? 'company' : 'company-setup');
      } catch {
        setAuthMode('login');
        setAuthError('We couldn’t load your company profile. Please sign in again.');
        setCurrentView('auth');
      }
      return;
    }

    if (user.role === 'expert') {
      try {
        const { data } = await expertProfileApi.mine();
        setExpertProfile(data.data);
        setCurrentView(data.data ? 'expert' : 'expert-setup');
      } catch {
        setAuthMode('login');
        setAuthError('We couldn’t load your expert profile. Please sign in again.');
        setCurrentView('auth');
      }
      return;
    }

    setCompanyProfile(null);
    setCurrentView(portalForRole(user.role));
  };

  useEffect(() => {
    if (!getAuthToken()) return undefined;

    let isActive = true;
    authApi.me()
      .then(async ({ data }) => {
        if (!isActive) return;
        await showUserPortal(data.user);
      })
      .catch((error) => {
        if (!isActive) return;
        if (error.response?.status === 401) {
          clearAuthToken();
        } else {
          setAuthMode('login');
          setAuthError('We couldn’t reconnect to your account. Please sign in again.');
          setCurrentView('auth');
        }
      })
      .finally(() => {
        if (isActive) setIsCheckingSession(false);
      });

    return () => { isActive = false; };
  }, []);

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setAuthMode('login');
    setAuthError('');
    setCurrentView('auth');
  };

  const handleCreateAccount = () => {
    setSelectedRole(null);
    setAuthMode('register');
    setAuthError('');
    setCurrentView('auth');
  };

  const handleAuthSuccess = (user) => {
    void showUserPortal(user);
  };

  const handleCompanyProfileComplete = (profile) => {
    setCompanyProfile(profile);
    setCurrentView('company');
  };

  const handleExpertProfileComplete = (profile) => {
    setExpertProfile(profile);
    setCurrentView('expert');
  };

  const handleReturnHome = () => {
    setCurrentView('home');
    setSelectedExpert(null);
    setSelectedRole(null);
    setAuthError('');
  };

  const handleSelectExpert = (expert) => {
    setSelectedExpert(expert);
  };

  const handleCloseExpertModal = () => {
    setSelectedExpert(null);
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Clear the local session even if the API is unavailable.
    }
    clearAuthToken();
    setAuthUser(null);
    setCompanyProfile(null);
    setExpertProfile(null);
    setSelectedExpert(null);
    setSelectedRole(null);
    setCurrentView('home');
  };

  if (isCheckingSession) {
    return <main className="min-h-screen grid place-items-center bg-[#faf9f4] text-[#0c382f]">Loading your account…</main>;
  }

  return (
    <>
      {currentView === 'home' && (
        <RoleSelection onSelectRole={handleSelectRole} onCreateAccount={handleCreateAccount} />
      )}

      {currentView === 'auth' && (
        <AuthScreen
          role={selectedRole}
          onRoleChange={setSelectedRole}
          mode={authMode}
          onModeChange={setAuthMode}
          onBack={handleReturnHome}
          onSuccess={handleAuthSuccess}
          initialError={authError}
        />
      )}

      {currentView === 'company' && (
        <CompanyPortal
          onReturnHome={handleReturnHome}
          onSelectExpert={handleSelectExpert}
          onLogout={handleLogout}
          user={authUser}
          companyProfile={companyProfile}
        />
      )}

      {currentView === 'company-setup' && (
        <CompanyProfileSetup user={authUser} onComplete={handleCompanyProfileComplete} onLogout={handleLogout} />
      )}

      {currentView === 'expert' && (
        <ExpertPortal onReturnHome={handleReturnHome} onLogout={handleLogout} onEditProfile={() => setCurrentView('expert-setup')} user={authUser} profile={expertProfile} />
      )}

      {currentView === 'expert-setup' && (
        <ExpertProfileSetup profile={expertProfile} onComplete={handleExpertProfileComplete} onLogout={handleLogout} />
      )}

      {currentView === 'young-professional' && (
        <main className="min-h-screen grid place-items-center bg-[#faf9f4] p-6 text-[#10241f]">
          <section className="w-full max-w-lg rounded-3xl border border-[#e3e7df] bg-white p-9 text-center shadow-xl">
            <p className="mb-2 text-xs font-bold tracking-[.2em] text-[#4f7463]">ACCOUNT READY</p>
            <h1 className="font-serif text-3xl font-bold">Welcome, {authUser?.name}</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">Your Young Professional account is active. Your personalized portal is coming soon.</p>
            <button className="mt-7 rounded-full bg-[#0c382f] px-7 py-3 text-sm font-semibold text-white" onClick={handleLogout} type="button">Sign out</button>
          </section>
        </main>
      )}

      {selectedExpert && (
        <ExpertProfileModal
          expert={selectedExpert}
          onClose={handleCloseExpertModal}
        />
      )}
    </>
  );
}
