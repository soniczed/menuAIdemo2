import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Overview from '../components/dashboard/Overview';
import MenuAISection from '../components/dashboard/MenuAISection';
import AdminSection from '../components/dashboard/AdminSection';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<Overview />} />
        <Route path="menu-ai" element={<MenuAISection />} />
        <Route path="admin" element={<AdminSection />} />
      </Routes>
    </DashboardLayout>
  );
}