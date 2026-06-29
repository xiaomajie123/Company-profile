import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Contact from '@/pages/Contact';
import AdminLayout from '@/admin/AdminLayout';
import AdminLogin from '@/admin/AdminLogin';
import AdminDashboard from '@/admin/AdminDashboard';
import AdminCourses from '@/admin/AdminCourses';
import AdminTeam from '@/admin/AdminTeam';
import AdminMilestones from '@/admin/AdminMilestones';
import AdminConfig from '@/admin/AdminConfig';
import AdminContacts from '@/admin/AdminContacts';
import AdminAdvantages from '@/admin/AdminAdvantages';
import AdminFeatures from '@/admin/AdminFeatures';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Public pages with Header/Footer */}
        <Route path="/*" element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </div>
            <Footer />
          </div>
        } />

        {/* Admin pages without Header/Footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={
          <AdminLayout>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/config" element={<AdminConfig />} />
              <Route path="/courses" element={<AdminCourses />} />
              <Route path="/advantages" element={<AdminAdvantages />} />
              <Route path="/features" element={<AdminFeatures />} />
              <Route path="/team" element={<AdminTeam />} />
              <Route path="/milestones" element={<AdminMilestones />} />
              <Route path="/contacts" element={<AdminContacts />} />
            </Routes>
          </AdminLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
