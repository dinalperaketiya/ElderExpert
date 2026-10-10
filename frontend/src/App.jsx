import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustValueSection from './components/TrustValueSection';
import HowItWorks from './components/HowItWorks';
import FeaturedExperts from './components/FeaturedExperts';
import ExpertCategories from './components/ExpertCategories';
import MentorshipSection from './components/MentorshipSection';
import ExpertPortal from './components/ExpertPortal';
import CompanyPortal from './components/CompanyPortal';
import ExpertProfileModal from './components/ExpertProfileModal';
import LoginModal from './components/LoginModal';
import JoinExpertModal from './components/JoinExpertModal';
import Footer from './components/Footer';

import { initialExperts } from './services/api';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'expert-portal', 'company-portal'
  const [fontSize, setFontSize] = useState('large'); // 'normal', 'large', 'xlarge'
  const [experts] = useState(initialExperts);

  // Modals state
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginRole, setLoginRole] = useState('expert');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const handleOpenLogin = (role) => {
    setLoginRole(role);
    setIsLoginModalOpen(true);
  };

  const handleSelectExpert = (expert) => {
    setSelectedExpert(expert);
    setIsProfileModalOpen(true);
  };

  const handleSelectCategory = (categoryName) => {
    // Scroll to experts section and set search filter
    const expertsSec = document.getElementById('public-experts');
    if (expertsSec) {
      expertsSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fontSizeClass = fontSize === 'xlarge' ? 'font-size-xlarge' : fontSize === 'large' ? 'font-size-large' : 'font-size-normal';

  // If in dedicated Expert Portal view
  if (currentView === 'expert-portal') {
    return (
      <div className={`min-h-screen bg-slate-50 text-[#334155] font-sans ${fontSizeClass}`}>
        <ExpertPortal onReturnHome={() => setCurrentView('landing')} />
      </div>
    );
  }

  // If in dedicated Company Portal view
  if (currentView === 'company-portal') {
    return (
      <div className={`min-h-screen bg-slate-50 text-[#334155] font-sans ${fontSizeClass}`}>
        <CompanyPortal
          onReturnHome={() => setCurrentView('landing')}
          onSelectExpert={handleSelectExpert}
        />
        <ExpertProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          expert={selectedExpert}
        />
      </div>
    );
  }

  // Default Landing Page View
  return (
    <div className={`min-h-screen bg-white text-[#334155] flex flex-col justify-between selection:bg-blue-600 selection:text-white font-sans ${fontSizeClass}`}>
      
      {/* Narrow Taskbar Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        fontSize={fontSize}
        setFontSize={setFontSize}
        onOpenLogin={handleOpenLogin}
        onOpenJoinExpert={() => setIsJoinModalOpen(true)}
      />

      {/* Main Landing Page Body */}
      <main className="flex-1">
        
        {/* 1. Hero Section with provided office background */}
        <Hero
          onJoinExpert={() => setIsJoinModalOpen(true)}
          onFindExperts={() => {
            const el = document.getElementById('public-experts');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Trust and Value Section (3 Clear Benefits) */}
        <TrustValueSection
          onJoinExpert={() => setIsJoinModalOpen(true)}
          onFindExperts={() => {
            const el = document.getElementById('public-experts');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3. How It Works (4-Step Process) */}
        <HowItWorks />

        {/* 4. Featured Experts Directory */}
        <FeaturedExperts
          experts={experts}
          onSelectExpert={handleSelectExpert}
          onRequestConsultation={handleSelectExpert}
        />

        {/* 5. Expert Categories */}
        <ExpertCategories
          onSelectCategory={handleSelectCategory}
        />

        {/* 6. Mentorship & Knowledge Sharing */}
        <MentorshipSection
          onOpenArticle={(art) => alert(`Reading "${art.title}" by ${art.author}`)}
          onExploreMentorship={() => {
            const el = document.getElementById('public-experts');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

      </main>

      {/* 7. Final Call to Action & Clean Light Footer */}
      <Footer
        onJoinExpert={() => setIsJoinModalOpen(true)}
        onFindExperts={() => {
          const el = document.getElementById('public-experts');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Interactive Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        initialRole={loginRole}
      />

      <JoinExpertModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />

      <ExpertProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        expert={selectedExpert}
      />

    </div>
  );
}
