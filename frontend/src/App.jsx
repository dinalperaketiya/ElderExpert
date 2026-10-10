import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Caregivers from './components/Caregivers'; // Experts Directory
import AiMatchEngine from './components/AiMatchEngine';
import Services from './components/Services';
import KnowledgeHub from './components/KnowledgeHub';
import BookingModal from './components/BookingModal';
import JoinExpertModal from './components/JoinExpertModal';
import LoginModal from './components/LoginModal';
import Footer from './components/Footer';

import { initialExperts } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('experts');
  const [experts] = useState(initialExperts);
  const [searchFilter, setSearchFilter] = useState('');
  const [fontSize, setFontSize] = useState('large'); // 'normal', 'large', 'xlarge' (Default large for elderly accessibility)

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginRole, setLoginRole] = useState('expert');

  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const handleOpenBookingForExpert = (expert) => {
    setSelectedExpert(expert);
    setSelectedService(null);
    setIsBookingOpen(true);
  };

  const handleOpenBookingForService = (service) => {
    setSelectedService(service);
    setSelectedExpert(null);
    setIsBookingOpen(true);
  };

  const handleHeroSearch = (query) => {
    setSearchFilter(query);
    setActiveTab('experts');
  };

  const handleOpenLoginModal = (role) => {
    setLoginRole(role);
    setIsLoginOpen(true);
  };

  const fontSizeClass = fontSize === 'xlarge' ? 'font-size-xlarge' : fontSize === 'large' ? 'font-size-large' : 'font-size-normal';

  return (
    <div className={`min-h-screen bg-slate-100 text-slate-900 flex flex-col justify-between selection:bg-sky-600 selection:text-white font-sans ${fontSizeClass}`}>
      
      {/* Accessible Navbar with Text Size controls & Separate Login buttons */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        fontSize={fontSize}
        setFontSize={setFontSize}
        onOpenLoginModal={handleOpenLoginModal}
      />

      {/* Main View dependent on activeTab */}
      <main className="flex-1">
        {activeTab === 'experts' && (
          <>
            <Hero
              onSearchQuery={handleHeroSearch}
              onOpenLoginModal={handleOpenLoginModal}
            />
            <Caregivers
              experts={experts}
              onSelectExpert={handleOpenBookingForExpert}
              searchFilter={searchFilter}
            />
            <AiMatchEngine
              onSelectExpert={handleOpenBookingForExpert}
            />
            <Services
              onBookService={handleOpenBookingForService}
            />
            <KnowledgeHub
              onBookSession={() => setIsBookingOpen(true)}
            />
          </>
        )}

        {activeTab === 'aimatch' && (
          <div className="py-8">
            <AiMatchEngine
              onSelectExpert={handleOpenBookingForExpert}
            />
          </div>
        )}

        {activeTab === 'services' && (
          <div className="py-8">
            <Services
              onBookService={handleOpenBookingForService}
            />
          </div>
        )}

        {activeTab === 'knowledge' && (
          <div className="py-8">
            <KnowledgeHub
              onBookSession={() => setIsBookingOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Separate Login / Register Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        initialRole={loginRole}
      />

      {/* Consultation Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedExpert(null);
          setSelectedService(null);
        }}
        selectedExpert={selectedExpert}
        selectedService={selectedService}
      />

      {/* Expert Onboarding Modal */}
      <JoinExpertModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
      />

    </div>
  );
}
