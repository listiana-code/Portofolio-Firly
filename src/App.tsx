import React, { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TechStackToggles } from './components/TechStackToggles';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { CreativeProcess } from './components/CreativeProcess';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CvModal } from './components/CvModal';
import { NotificationCenter } from './components/NotificationCenter';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { 
  INITIAL_NOTIFICATIONS, 
  NotificationItem, 
  Project 
} from './data/portfolioData';
import { Bell, X, ShieldAlert } from 'lucide-react';

function PortfolioApp() {
  const { isAdmin } = usePortfolio();

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme_firly');
    if (saved) return saved === 'dark';
    return true; // Default dark for cyber blueprint aesthetic
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('notifs_firly');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_NOTIFICATIONS;
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cvModalOpen, setCvModalOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [activeToast, setActiveToast] = useState<{ id: string; title: string; message: string } | null>(null);

  // Admin Hidden Modals State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // Sync theme with document element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme_firly', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme_firly', 'light');
    }
  }, [darkMode]);

  // Sync notifications to localStorage
  useEffect(() => {
    localStorage.setItem('notifs_firly', JSON.stringify(notifications));
  }, [notifications]);

  // Check URL Hash for secret direct access (#admin or #login)
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin' || hash === '#login' || hash === '#crud') {
        if (isAdmin) {
          setIsAdminDashboardOpen(true);
        } else {
          setIsLoginModalOpen(true);
        }
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, [isAdmin]);

  // Keyboard shortcut listener: Ctrl + Shift + A or Cmd + Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'F' || e.key === 'f')) {
        e.preventDefault();
        if (isAdmin) {
          setIsAdminDashboardOpen(prev => !prev);
        } else {
          setIsLoginModalOpen(prev => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdmin]);

  // Play subtle web audio chime for real-time notification
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      // Audio fallback
    }
  };

  const handleSendPing = (title: string, message: string) => {
    const newNotif: NotificationItem = {
      id: `ping-${Date.now()}`,
      title,
      message,
      timestamp: 'Baru saja',
      type: 'ping',
      read: false
    };

    setNotifications(prev => [newNotif, ...prev]);
    playChime();
    
    // Show toast
    setActiveToast({
      id: newNotif.id,
      title,
      message
    });

    setTimeout(() => {
      setActiveToast(null);
    }, 5500);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'cyber-grid-dark text-slate-100' : 'cyber-grid-light text-slate-800'}`}>
      
      {/* Top Navigation Bar (Zero visible Login button for public visitors!) */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        unreadCount={unreadCount}
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenCvModal={() => setCvModalOpen(true)}
        onSecretLoginTrigger={() => setIsLoginModalOpen(true)}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
      />

      {/* Floating Admin Banner (Only visible when Firly is logged in) */}
      {isAdmin && (
        <aside 
          aria-label="Panel status administrator"
          className="fixed bottom-6 left-6 z-40 bg-[#081223]/95 border border-cyan-400 p-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md animate-fadeIn"
        >
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold font-mono text-xs">
            FA
          </div>
          <div className="text-xs">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>Admin Mode: Firly</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[10px] text-cyan-400 font-mono">Real-Time CRUD Aktif</div>
          </div>
          <button
            onClick={() => setIsAdminDashboardOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow transition-colors"
          >
            Buka CRUD
          </button>
        </aside>
      )}

      {/* Floating Real-Time Toast Banner */}
      {activeToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full p-4 rounded-xl bg-[#09152b] border border-cyan-400 shadow-2xl shadow-cyan-950/80 flex items-start justify-between gap-3 animate-fadeIn">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 mt-0.5">
              <Bell className="w-4 h-4 animate-bounce" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>{activeToast.title}</span>
                <span className="text-[10px] text-cyan-400 font-mono">Real-Time</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                {activeToast.message}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveToast(null)}
            className="text-slate-400 hover:text-white p-1"
            aria-label="Tutup pemberitahuan"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <HeroSection
          onOpenCvModal={() => setCvModalOpen(true)}
          onExploreProjects={scrollToProjects}
        />

        {/* Tech Stack Toggles & Credentials */}
        <TechStackToggles />

        {/* Projects Showcase & Cyber Deck */}
        <ProjectsShowcase
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Creative Process, Reflections, Technical Hurdles & Ethics */}
        <CreativeProcess />

        {/* Academic History & Certifications */}
        <AboutSection
          onOpenCvModal={() => setCvModalOpen(true)}
        />

        {/* Contact & Real-Time Interaction */}
        <ContactSection
          onMessageSent={handleSendPing}
        />
      </main>

      {/* Clean Footer (with discreet admin trigger) */}
      <Footer
        onOpenCvModal={() => setCvModalOpen(true)}
        onSecretLoginTrigger={() => setIsLoginModalOpen(true)}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
      />

      {/* Public Modals & Drawers */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CvModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
      />

      <NotificationCenter
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllAsRead}
        onSendPing={handleSendPing}
      />

      {/* Hidden Admin Modals (Only for Firly Ahmad) */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={() => {
          setIsLoginModalOpen(false);
          setIsAdminDashboardOpen(true);
        }}
      />

      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}
