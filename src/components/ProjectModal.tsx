import React from 'react';
import { X, AlertTriangle, Users, Lock, Play } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenSimulator?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#091426] border border-slate-200 dark:border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-800 dark:text-slate-200 animate-fadeIn"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-cyan-900/40 flex items-start justify-between gap-4 bg-slate-50 dark:bg-slate-950/50">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-800 dark:text-cyan-400 font-bold mb-1">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{project.status}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Hero Image Showcase */}
          <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-cyan-500/30 max-h-72">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover" 
            />
            <div className="absolute bottom-3 right-3">
              <span className="px-3 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md text-cyan-300 font-mono font-bold text-xs border border-cyan-400/40">
                {project.year} · {project.status}
              </span>
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics?.map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="text-lg sm:text-xl font-bold text-cyan-800 dark:text-cyan-300 font-mono tabular-nums">
                  {m.value}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Abstract / Ringkasan Proyek */}
          <div className="space-y-2">
            <h4 className="text-sm font-mono uppercase tracking-wider text-cyan-800 dark:text-cyan-400 font-bold">
              Latar Belakang & Ringkasan Solusi
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {project.abstract}
            </p>
          </div>

          {/* Creative Process Steps */}
          {project.creativeProcess && project.creativeProcess.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-mono uppercase tracking-wider text-cyan-800 dark:text-cyan-400 font-bold">
                Tahapan Proses Kreatif & Riset Lapangan
              </h4>
              <div className="space-y-2">
                {project.creativeProcess.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 border border-cyan-300 dark:border-transparent">
                      0{idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deep Dive Technical Challenges & Solutions */}
          {project.technicalChallenges && project.technicalChallenges.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-mono uppercase tracking-wider text-cyan-800 dark:text-cyan-400 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span>Hambatan Teknis Nyata & Solusi Arsitektural</span>
              </h4>
              
              <div className="space-y-3">
                {project.technicalChallenges.map((ch, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
                    <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                      <span className="text-cyan-800 dark:text-cyan-400 font-mono text-xs">#{idx + 1}</span>
                      <span>{ch.problem}</span>
                    </div>
                    
                    <div className="text-xs text-slate-600 dark:text-slate-400 pl-4 border-l-2 border-amber-500">
                      <strong className="text-amber-700 dark:text-amber-300">Analisis Akar Masalah: </strong>
                      {ch.analysis}
                    </div>

                    <div className="text-xs text-slate-700 dark:text-slate-300 pl-4 border-l-2 border-emerald-500">
                      <strong className="text-emerald-700 dark:text-emerald-400">Solusi & Optimasi: </strong>
                      {ch.solution}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Teamwork & Collaboration */}
          {project.teamworkReflection && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-cyan-900/30 space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-800 dark:text-cyan-400 font-bold flex items-center gap-1.5">
                <Users className="w-4 h-4 text-cyan-700 dark:text-cyan-300" />
                <span>Kolaborasi Tim & Komunikasi Efektif</span>
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {project.teamworkReflection}
              </p>
            </div>
          )}

          {/* Privacy & Ethical Responsibility */}
          {project.dataPrivacyAndEthics && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-emerald-900/30 space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                <Lock className="w-4 h-4" />
                <span>Integritas Data Pribadi & Etika Rekayasa</span>
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {project.dataPrivacyAndEthics}
              </p>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span className="text-slate-800 dark:text-slate-300 font-bold">Stack:</span>
            {project.techStack?.map((tech, idx) => (
              <span key={idx} className="bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-md text-cyan-800 dark:text-cyan-300 border border-slate-200 dark:border-slate-800 font-semibold">
                {tech}
              </span>
            ))}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-cyan-900/40 bg-slate-50 dark:bg-slate-950/70 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Universitas Gunadarma · S1 Sistem Informasi
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            Tutup Jendela
          </button>
        </div>

      </div>
    </div>
  );
};
