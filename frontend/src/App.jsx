import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Caregivers from './components/Caregivers'; // Experts Directory
import AiMatchEngine from './components/AiMatchEngine';
import Services from './components/Services';
import KnowledgeHub from './components/KnowledgeHub';
import BookingModal from './components/BookingModal';
import JoinExpertModal from './components/JoinExpertModal';
import Footer from './components/Footer';

import { initialExperts } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('experts');
  const [experts] = useState(initialExperts);
  const [searchFilter, setSearchFilter] = useState('');

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between selection:bg-sky-500 selection:text-slate-950 font-sans">
      
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenJoinModal={() => setIsJoinOpen(true)}
        onOpenPostProject={() => {
          setSelectedExpert(null);
          setSelectedService(null);
          setIsBookingOpen(true);
        }}
      />

      {/* Main View dependent on activeTab */}
      <main className="flex-1">
        {activeTab === 'experts' && (
          <>
            <Hero
              onSearchQuery={handleHeroSearch}
              onExploreClick={() => setActiveTab('experts')}
              onPostProjectClick={() => setIsBookingOpen(true)}
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

      {/* Modals */}
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

      <JoinExpertModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
      />

    </div>
  );
}
