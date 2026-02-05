import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';

const VenueLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* The new structure uses a flex container for desktop */}
      <div className="lg:flex">
        {/* Sidebar takes its own space on desktop, is fixed on mobile */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
        
        {/* Main content area */}
        <div className="flex-1 lg:ml-72"> {/* Key Change: Add left margin equal to sidebar width on desktop */}
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
          
          <main>
            <div className="p-4 sm:p-6 lg:p-8 max-w-screen-2xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default VenueLayout;