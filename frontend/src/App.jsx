
import React, { useState } from 'react';
import RoleSelection from './components/RoleSelection';
import CompanyPortal from './components/CompanyPortal';
import ExpertPortal from './components/ExpertPortal';
import ExpertProfileModal from './components/ExpertProfileModal';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'company' | 'expert'
  const [selectedExpert, setSelectedExpert] = useState(null);

  const handleSelectRole = (role) => {
    if (role === 'company') {
      setCurrentView('company');
    } else if (role === 'expert') {
      setCurrentView('expert');
    } else {
      // young-professional — placeholder
      alert('Young Professional portal coming soon!');
    }
  };

  const handleReturnHome = () => {
    setCurrentView('home');
    setSelectedExpert(null);
  };

  const handleSelectExpert = (expert) => {
    setSelectedExpert(expert);
  };

  const handleCloseExpertModal = () => {
    setSelectedExpert(null);
  };

  return (
    <>
      {currentView === 'home' && (
        <RoleSelection onSelectRole={handleSelectRole} />
      )}

      {currentView === 'company' && (
        <CompanyPortal
          onReturnHome={handleReturnHome}
          onSelectExpert={handleSelectExpert}
        />
      )}

      {currentView === 'expert' && (
        <ExpertPortal onReturnHome={handleReturnHome} />
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
