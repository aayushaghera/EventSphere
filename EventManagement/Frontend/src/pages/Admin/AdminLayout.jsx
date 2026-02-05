// src/pages/Admin/AdminLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../Admin/Components/AdminSidebar';
import Header from '../Admin/Components/Header'; // Reusing your existing Header
import { adminQuickStats } from '../Admin/Components/adminConstants';

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // A simple way to pass admin-specific stats to the generic Header
  // You might want a more robust context-based solution later
  const AdminHeader = () => <Header onMenuClick={() => setSidebarOpen(true)} quickStats={adminQuickStats} />;


  return (
    <div className="flex h-screen bg-gray-50/50">
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50/50">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;