import React, { useState } from 'react';
import { Database, Code2, Cpu, BarChart2, Layers, Check } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const TechStackToggles: React.FC = () => {
  const { ecosystems } = usePortfolio();
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    php: true,
    mysql: true,
    js: true,
    oracle: true,
    bi: true,
    htmlcss: true
  });

  const handleToggle = (key: string) => {
    setToggleStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const softwareItems = [
    {
      id: 'php',
      name: 'PHP & PDO',
      icon: '🐘',
      role: 'Backend Core',
      useCase: 'Logika rekomendasi SAW, MVC native, endpoint API aman tanpa SQLi',
      active: toggleStates.php
    },
    {
      id: 'mysql',
      name: 'MySQL DB',
      icon: '🐬',
      role: 'Relational DB',
      useCase: 'Desain skema 3NF, composite index untuk pencarian armada 85ms',
      active: toggleStates.mysql
    },
    {
      id: 'js',
      name: 'JavaScript',
      icon: '⚡',
      role: 'Client Dynamics',
      useCase: 'AJAX live calculation, geolokasi interaktif, filter tanpa reload',
      active: toggleStates.js
    },
    {
      id: 'oracle',
      name: 'Oracle DB',
      icon: '🏛️',
      role: 'Enterprise DB',
      useCase: 'Sertifikasi Intermediate: PL/SQL, optimasi subquery, view tables',
      active: toggleStates.oracle
    },
    {
      id: 'bi',
      name: 'Power BI / ETL',
      icon: '📊',
      role: 'Data Intelligence',
      useCase: 'Sertifikasi Creating BI & Data Prep: 50k rows transactional data',
      active: toggleStates.bi
    },
    {
      id: 'htmlcss',
      name: 'Tailwind & CSS',
      icon: '🎨',
      role: 'UI System',
      useCase: 'Tata letak responsif cyber blueprint, dark mode native, micro-interactions',
      active: toggleStates.htmlcss
    }
  ];

  return (
    <section id="skills" className="py-12 border-t border-slate-200 dark:border-cyan-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-700 dark:text-cyan-400 font-bold mb-1">
              Interactive Toolkit
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>my software & technical stack</span>
              <span className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-400" />
            </h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md">
            Gunakan tombol sakelar untuk melihat bagaimana setiap teknologi diterapkan secara nyata dalam proyek skripsi dan sertifikasi.
          </p>
        </div>

        {/* 2-Column Showcase Card Grid matching reference layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Member Of Ecosystem */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#09152b]/90 border border-slate-200 dark:border-cyan-500/30 flex flex-col justify-between shadow-xl">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 text-xs font-bold tracking-wide uppercase mb-4 border border-cyan-200 dark:border-transparent">
                member of & credentials
              </div>
              
              <div className="space-y-4">
                {ecosystems.map((eco) => (
                  <div key={eco.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/40 transition-colors">
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-700 dark:text-cyan-400 mb-1 font-semibold">
                      <span className="text-slate-900 dark:text-white">{eco.name}</span>
                      <span>{eco.year}</span>
                    </div>
                    <div className="text-xs text-cyan-800 dark:text-cyan-300 font-medium">{eco.role}</div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{eco.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-cyan-950 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-mono">
              <span>Status Akademik:</span>
              <span className="text-cyan-700 dark:text-cyan-300 font-bold">Mahasiswa Tingkat Akhir S1</span>
            </div>
          </div>

          {/* Right Column: "my software" with Interactive Toggle Switches */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-[#09152b]/90 border border-slate-200 dark:border-cyan-500/30 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-block px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 text-xs font-bold tracking-wide uppercase border border-cyan-200 dark:border-transparent">
                  my software
                </div>
                <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">
                  {Object.values(toggleStates).filter(Boolean).length} Aktif
                </span>
              </div>

              {/* Grid of Softwares with Toggle Switches */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {softwareItems.map(item => (
                  <div 
                    key={item.id}
                    className={`p-3 rounded-xl border transition-all ${
                      item.active 
                        ? 'bg-slate-50 dark:bg-slate-900/90 border-cyan-300 dark:border-cyan-500/40 shadow-xs' 
                        : 'bg-slate-100/50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/60 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.icon}</span>
                        <div>
                          <div className="font-bold text-xs text-slate-900 dark:text-white">{item.name}</div>
                          <div className="text-[10px] text-cyan-700 dark:text-cyan-400 font-mono font-semibold">{item.role}</div>
                        </div>
                      </div>

                      {/* Working Toggle Switch */}
                      <button
                        onClick={() => handleToggle(item.id)}
                        type="button"
                        role="switch"
                        aria-checked={item.active}
                        className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                          item.active ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-slate-800'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                            item.active ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300/90 line-clamp-2 leading-relaxed">
                      {item.useCase}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-cyan-950 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-mono">
              <span>Keamanan Standar:</span>
              <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                <Check className="w-3.5 h-3.5" />
                <span>Zero Hardcoded Credentials / Sanitasi Input</span>
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
