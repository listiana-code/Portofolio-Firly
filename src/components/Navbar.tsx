import React, { useRef } from 'react';
import { Moon, Sun, Bell, FileText, Menu, X, ShieldAlert } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenCvModal: () => void;
  onSecretLoginTrigger: () => void;
  onOpenAdminDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  unreadCount,
  onOpenNotifications,
  onOpenCvModal,
  onSecretLoginTrigger,
  onOpenAdminDashboard
}) => {
  const { profile, isAdmin } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Hidden triple-click on FA logo to trigger secret login
  const handleLogoClick = (e: React.MouseEvent) => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      if (isAdmin) {
        onOpenAdminDashboard();
      } else {
        onSecretLoginTrigger();
      }
      return;
    }

    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 800);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-300 bg-white/90 border-slate-200 text-slate-900 dark:bg-[#060c16]/85 dark:border-cyan-900/30 dark:text-white shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        
        {/* Zone 1: Single Brand Element Wordmark */}
        <div 
          onClick={handleLogoClick}
          className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2 group whitespace-nowrap shrink-0 cursor-pointer select-none"
          title="archive by firly.dev"
        >
          <span className="w-8 h-8 rounded-full bg-cyan-100 border border-cyan-300 text-cyan-800 dark:bg-cyan-500/20 dark:border-cyan-400/40 dark:text-cyan-300 flex items-center justify-center font-mono text-xs font-semibold group-hover:scale-105 group-hover:border-cyan-400 transition-all">
            FA
          </span>
          <span className="text-slate-900 dark:text-slate-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
            {profile.handle}
          </span>
          
          {/* Subtle admin indicator when Firly is logged in */}
          {isAdmin && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenAdminDashboard();
              }}
              className="ml-2 px-2 py-0.5 rounded-full bg-cyan-100 border border-cyan-400 text-cyan-800 dark:bg-cyan-500/20 dark:border-cyan-400 dark:text-cyan-300 text-[10px] font-mono flex items-center gap-1 hover:bg-cyan-200 dark:hover:bg-cyan-500/30 transition-colors"
            >
              <ShieldAlert className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
              <span>Admin Aktif (Buka CRUD)</span>
            </button>
          )}
        </div>

        {/* Zone 2: 4-5 Concise Single-Line Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-700 dark:text-slate-300">
          <a href="#about" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Tentang & Sertifikasi
          </a>
          <a href="#projects" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Proyek & Skripsi
          </a>
          <a href="#process" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Proses & Tantangan
          </a>
          <a href="#skills" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Keahlian & Stack
          </a>
          <a href="#contact" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Kontak
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action + Utility Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Notification Bell Button */}
          <button
            onClick={onOpenNotifications}
            aria-label="Buka notifikasi sistem"
            className="relative p-2 rounded-lg text-slate-700 hover:text-cyan-700 hover:bg-slate-100 border border-slate-300 dark:text-slate-300 dark:hover:text-cyan-300 dark:hover:bg-slate-800/60 dark:border-slate-700/50 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(prev => !prev)}
            aria-label={darkMode ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
            className="p-2 rounded-lg text-slate-700 hover:text-cyan-700 hover:bg-slate-100 border border-slate-300 dark:text-slate-300 dark:hover:text-cyan-300 dark:hover:bg-slate-800/60 dark:border-slate-700/50 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-cyan-600" />}
          </button>

          {/* Primary Action Button: CV Modal */}
          <button
            onClick={onOpenCvModal}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors flex items-center gap-1.5 shadow-sm shadow-cyan-500/20 whitespace-nowrap shrink-0"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Lihat CV</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-5 border-t border-slate-200 bg-white dark:border-cyan-950/60 dark:bg-[#070e1c] space-y-2 shadow-lg">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-800 hover:text-cyan-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:text-cyan-300 dark:hover:bg-slate-800/50"
          >
            Tentang & Sertifikasi
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-800 hover:text-cyan-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:text-cyan-300 dark:hover:bg-slate-800/50"
          >
            Proyek & Skripsi
          </a>
          <a
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-800 hover:text-cyan-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:text-cyan-300 dark:hover:bg-slate-800/50"
          >
            Proses & Tantangan
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-800 hover:text-cyan-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:text-cyan-300 dark:hover:bg-slate-800/50"
          >
            Keahlian & Stack
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-800 hover:text-cyan-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:text-cyan-300 dark:hover:bg-slate-800/50"
          >
            Kontak & Kolaborasi
          </a>
          {isAdmin && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminDashboard();
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-bold text-cyan-800 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-950/40 border border-cyan-400"
            >
              Buka Panel CRUD Admin
            </button>
          )}
        </div>
      )}
    </header>
  );
};
