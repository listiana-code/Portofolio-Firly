import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Lock } from 'lucide-react';

interface FooterProps {
  onOpenCvModal: () => void;
  onSecretLoginTrigger: () => void;
  onOpenAdminDashboard: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCvModal,
  onSecretLoginTrigger,
  onOpenAdminDashboard
}) => {
  const { profile, isAdmin } = usePortfolio();

  return (
    <footer className="border-t border-slate-200 dark:border-cyan-900/30 bg-slate-50 dark:bg-[#050a14] text-slate-600 dark:text-slate-400 text-xs py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span 
              onClick={() => {
                if (isAdmin) onOpenAdminDashboard();
                else onSecretLoginTrigger();
              }}
              title="Akses Rahasia Pengembang Firly"
              className="w-7 h-7 rounded-full bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-300 dark:border-cyan-400/40 flex items-center justify-center text-cyan-800 dark:text-cyan-300 font-mono text-xs font-bold cursor-pointer hover:border-cyan-500 transition-colors"
            >
              FA
            </span>
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-200">{profile.name}</span>
              <span className="text-slate-500 ml-2">· {profile.degree} {profile.institution}</span>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-5 text-slate-600 dark:text-slate-400 font-medium">
            <a href="#about" className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">Tentang & Sertifikasi</a>
            <a href="#projects" className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">Proyek</a>
            <a href="#process" className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">Proses Kreatif</a>
            <a href="#skills" className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">Keahlian & Stack</a>
            <button onClick={onOpenCvModal} className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">
              Curriculum Vitae
            </button>
            <a href="#contact" className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">Kontak</a>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} {profile.name}. Hak Cipta Dilindungi.</span>
            
            {/* Subtle secret trigger button for Firly Ahmad */}
            <button
              onClick={() => {
                if (isAdmin) onOpenAdminDashboard();
                else onSecretLoginTrigger();
              }}
              className="text-slate-400 hover:text-cyan-600 dark:text-slate-700 dark:hover:text-cyan-400/60 p-0.5 transition-colors focus:outline-none"
              title="Portal Rahasia Firly (Ctrl+Shift+A)"
              aria-label="Portal Rahasia"
            >
              <Lock className="w-2.5 h-2.5" />
            </button>
          </div>

          <div>
            Dikembangkan dengan Tailwind CSS, React & TypeScript · Domisili: {profile.locationShort}
          </div>
        </div>

      </div>
    </footer>
  );
};
