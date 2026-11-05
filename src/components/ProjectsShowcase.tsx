import React, { useState } from 'react';
import { ArrowUpRight, Play, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../data/portfolioData';

interface ProjectsShowcaseProps {
  onSelectProject: (project: Project) => void;
  onOpenSimulator?: () => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ onSelectProject }) => {
  const { projects } = usePortfolio();
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'deck' | 'grid'>('deck');

  // Keep index within bounds if projects are added/deleted
  const safeIdx = Math.min(selectedIdx, Math.max(projects.length - 1, 0));

  return (
    <section id="projects" className="py-16 border-t border-slate-200 dark:border-cyan-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 text-xs font-mono font-bold tracking-wide uppercase mb-2 border border-cyan-200 dark:border-transparent">
              my design & projects
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Studi Kasus & Rekayasa Sistem
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Koleksi karya nyata yang berfokus pada pemecahan masalah konkret di Bekasi: sistem rekomendasi rental mobil, perancangan data warehouse, dan analitik data nasional.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900/90 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setViewMode('deck')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'deck' 
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Fanned Cyber Deck
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'grid' 
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Grid View
            </button>
          </div>
        </div>

        {/* Fanned Deck View */}
        {viewMode === 'deck' ? (
          <div className="relative py-8 px-4 rounded-3xl bg-slate-50/90 dark:bg-[#081325]/70 border border-slate-200 dark:border-cyan-500/30 overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center mb-8">
              <span className="text-xs font-mono text-cyan-800 dark:text-cyan-400 uppercase tracking-widest font-bold">
                Interactive 3D Deck Showcase
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Klik kartu mana pun untuk memajukan dan membaca tantangan teknis serta arsitekturnya.
              </p>
            </div>

            {/* Fanned Cards Stage */}
            <div className="relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center">
              {projects.map((project, idx) => {
                const isSelected = idx === safeIdx;
                const offset = idx - safeIdx;
                
                return (
                  <div
                    key={project.id}
                    onClick={() => setSelectedIdx(idx)}
                    style={{
                      transform: `translateX(${offset * 48}px) translateY(${Math.abs(offset) * 12}px) rotate(${offset * 4}deg) scale(${isSelected ? 1.05 : 0.92})`,
                      zIndex: isSelected ? 30 : 20 - Math.abs(offset),
                      opacity: Math.abs(offset) > 2 ? 0.3 : 1
                    }}
                    className={`absolute cursor-pointer transition-all duration-300 ease-out w-full max-w-[320px] sm:max-w-[420px] rounded-2xl overflow-hidden border-2 shadow-2xl ${
                      isSelected 
                        ? 'border-cyan-500 shadow-cyan-500/20 ring-2 ring-cyan-500/30' 
                        : 'border-slate-300 dark:border-slate-700/80 hover:border-slate-400 dark:hover:border-slate-500 shadow-slate-300 dark:shadow-slate-950'
                    } bg-white dark:bg-[#0b162a]`}
                  >
                    {/* Card Thumbnail */}
                    <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-200 dark:bg-slate-900">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0b162a] via-transparent to-transparent" />
                      
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-cyan-800 dark:text-cyan-300 font-semibold shadow-xs">
                        {project.category}
                      </div>

                      <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 text-[10px] font-mono text-emerald-800 dark:text-emerald-300 font-semibold shadow-xs">
                        {project.year}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5 space-y-3">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
                        {project.title}
                      </h3>
                      
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {project.tagline}
                      </p>

                      {/* Key Metric Snapshot */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-500 dark:text-slate-400">Pencapaian:</span>
                        <span className="text-cyan-700 dark:text-cyan-300 font-bold">
                          {project.metrics?.[0]?.label || 'Status'}: {project.metrics?.[0]?.value || 'Completed'}
                        </span>
                      </div>

                      {/* Action buttons on active card */}
                      {isSelected && (
                        <div className="pt-2 flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectProject(project);
                            }}
                            className="w-full py-2.5 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                          >
                            <span>Bedah Tantangan & Solusi</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination / Stepper Indicator */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {projects.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === safeIdx ? 'w-8 bg-cyan-500' : 'w-2 bg-slate-300 dark:bg-slate-700'
                  }`}
                  aria-label={`Pilih proyek ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div
                key={project.id}
                className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#09152b] hover:border-cyan-400 dark:hover:border-cyan-500/50 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#09152b] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-white/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-cyan-800 dark:text-cyan-300 font-semibold shadow-xs">
                      {project.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {project.tagline}
                    </p>

                    <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <div className="flex justify-between">
                        <span>Sorotan Utama:</span>
                        <span className="text-cyan-700 dark:text-cyan-300 font-semibold">
                          {project.metrics?.[0]?.value || 'Completed'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{project.status}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="w-full py-2.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700/80"
                  >
                    <span>Studi Kasus Lengkap</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
