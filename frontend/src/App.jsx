import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VitalsDashboard from './components/VitalsDashboard';
import Caregivers from './components/Caregivers';
import Services from './components/Services';
import EmergencyModal from './components/EmergencyModal';
import BookingModal from './components/BookingModal';
import AddVitalModal from './components/AddVitalModal';
import Footer from './components/Footer';

import { initialCaregivers, initialVitals, initialMedications } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [caregivers] = useState(initialCaregivers);
  const [vitals, setVitals] = useState(initialVitals);
  const [medications, setMedications] = useState(initialMedications);

  // Modals state
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAddVitalOpen, setIsAddVitalOpen] = useState(false);

  const [selectedCaregiver, setSelectedCaregiver] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const handleOpenBookingForCaregiver = (caregiver) => {
    setSelectedCaregiver(caregiver);
    setSelectedService(null);
    setIsBookingOpen(true);
  };

  const handleOpenBookingForService = (service) => {
    setSelectedService(service);
    setSelectedCaregiver(null);
    setIsBookingOpen(true);
  };

  const handleAddVital = (newVital) => {
    setVitals([newVital, ...vitals]);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-white font-sans">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenProfile={() => alert('ElderExpert Patient Account: Eleanor Vance\nStatus: Active Care Plan')}
      />

      {/* Main Content Body dependent on activeTab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero
              onExploreCaregivers={() => setActiveTab('caregivers')}
              onOpenVitals={() => setActiveTab('vitals')}
              onBookService={() => setIsBookingOpen(true)}
            />
            <VitalsDashboard
              vitals={vitals}
              setVitals={setVitals}
              medications={medications}
              setMedications={setMedications}
              onAddVital={() => setIsAddVitalOpen(true)}
            />
            <Caregivers
              caregivers={caregivers}
              onSelectCaregiver={handleOpenBookingForCaregiver}
            />
            <Services
              onBookService={handleOpenBookingForService}
            />
          </>
        )}

        {activeTab === 'vitals' && (
          <div className="py-8">
            <VitalsDashboard
              vitals={vitals}
              setVitals={setVitals}
              medications={medications}
              setMedications={setMedications}
              onAddVital={() => setIsAddVitalOpen(true)}
            />
          </div>
        )}

        {activeTab === 'caregivers' && (
          <div className="py-8">
            <Caregivers
              caregivers={caregivers}
              onSelectCaregiver={handleOpenBookingForCaregiver}
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
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedCaregiver(null);
          setSelectedService(null);
        }}
        selectedCaregiver={selectedCaregiver}
        selectedService={selectedService}
      />

      <AddVitalModal
        isOpen={isAddVitalOpen}
        onClose={() => setIsAddVitalOpen(false)}
        onAdd={handleAddVital}
      />

    </div>
  );
}
