
import React, { useEffect, useState } from 'react';
import RoleSelection from './components/RoleSelection';
import AuthScreen from './components/AuthScreen';
import CompanyPortal from './components/CompanyPortal';
import CompanyProfileSetup from './components/CompanyProfileSetup';
import ExpertPortal from './components/ExpertPortal';
import ExpertProfileSetup from './components/ExpertProfileSetup';
import YoungProfessionalPortal from './components/YoungProfessionalPortal';
import YoungProfessionalProfileSetup from './components/YoungProfessionalProfileSetup';
import ExpertProfileModal from './components/ExpertProfileModal';
import { authApi, clearAuthToken, companyProfileApi, expertProfileApi, getAuthToken, youngProfessionalProfileApi } from './services/api';

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
  const [youngProfessionalProfile, setYoungProfessionalProfile] = useState(null);
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

    if (user.role === 'young_professional') {
      try {
        const { data } = await youngProfessionalProfileApi.mine();
        setYoungProfessionalProfile(data.data);
        setCurrentView(data.data ? 'young-professional' : 'young-professional-setup');
      } catch {
        setAuthMode('login');
        setAuthError('We couldn’t load your profile. Please sign in again.');
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

  const handleYoungProfessionalProfileComplete = (profile) => {
    setYoungProfessionalProfile(profile);
    setCurrentView('young-professional');
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
    setYoungProfessionalProfile(null);
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
        <YoungProfessionalPortal user={authUser} profile={youngProfessionalProfile} onEditProfile={() => setCurrentView('young-professional-setup')} onLogout={handleLogout} onReturnHome={handleReturnHome} />
      )}

      {currentView === 'young-professional-setup' && (
        <YoungProfessionalProfileSetup profile={youngProfessionalProfile} onComplete={handleYoungProfessionalProfileComplete} onLogout={handleLogout} />
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
