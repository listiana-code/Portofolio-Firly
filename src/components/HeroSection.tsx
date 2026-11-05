import React from 'react';
import { ArrowRight, FileText, CheckCircle2, Terminal, Shield, MapPin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { PhoneMockup } from './PhoneMockup';

interface HeroSectionProps {
  onOpenCvModal: () => void;
  onExploreProjects: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCvModal, onExploreProjects }) => {
  const { profile } = usePortfolio();

  return (
    <section id="hero" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      
      {/* Background Decorative Blueprint Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-blue-600/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Blueprint Archive Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-8 border-b border-slate-200 dark:border-cyan-900/30 text-xs font-mono text-cyan-700 dark:text-cyan-400/90 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-400" />
            <span className="tracking-widest uppercase">archive by {profile.handle}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-[11px]">
            <span>{profile.degree} · {profile.institution}</span>
            <span aria-hidden="true">·</span>
            <span>{profile.locationShort}</span>
          </div>
        </div>

        {/* Main Hero Split Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Authentic Personal Narrative & Headline */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Display Title with Cyber Emblem */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300/80 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-300 text-xs font-mono font-semibold">
                <Terminal className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Full-Stack Web & Data Enthusiast</span>
              </div>

              <div className="relative">
                <span className="text-sm font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase block font-semibold">
                  official creative portfolio
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white flex flex-wrap items-center gap-3">
                  <span>my</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 dark:from-cyan-400 dark:via-sky-300 dark:to-blue-400">
                    portofolio
                  </span>
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 font-black text-xl shadow-lg shadow-cyan-500/30">
                    ⚡
                  </span>
                </h1>
              </div>
            </div>

            {/* "About Me" Capsule Card from Reference Image */}
            <div className="p-6 rounded-2xl bg-white/95 dark:bg-[#091427]/80 border border-slate-200 dark:border-cyan-500/30 shadow-xl shadow-slate-200/50 dark:shadow-cyan-950/40 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full pointer-events-none" />
              
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-cyan-900/40">
                <div className="inline-block px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 text-xs font-bold tracking-wide uppercase border border-cyan-200 dark:border-transparent">
                  about me
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>{profile.locationShort}</span>
                </div>
              </div>

              {/* Personal Indonesian Narrative */}
              <div className="space-y-3 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong className="text-slate-900 dark:text-white font-semibold">Hello everyone...</strong> namaku <span className="text-cyan-700 dark:text-cyan-300 font-bold">{profile.name}</span>, mahasiswa tingkat akhir {profile.degree} {profile.institution}.
                </p>
                <p className="text-slate-600 dark:text-slate-300/90 text-sm">
                  Lahir dan ditempa dari latar belakang <strong className="text-slate-900 dark:text-slate-100">{profile.highSchool}</strong>, saya belajar bahwa teknologi bukan tentang pamer istilah rumit, melainkan tentang dedikasi menyelesaikan masalah nyata masyarakat.
                </p>
                <p className="text-slate-600 dark:text-slate-300/90 text-sm whitespace-pre-line">
                  {profile.personalNarrative.split('\n\n')[2] || "Selama masa kuliah, saya mengembangkan Sistem Rekomendasi Tempat Rental Mobil Bekasi sebagai karya tugas akhir skripsi."}
                </p>
              </div>

              {/* Verified Trust Strip */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-cyan-950 flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400 font-mono">
                <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>LSP BNSP Certified</span>
                </span>
                <span className="flex items-center gap-1 text-cyan-700 dark:text-cyan-300 font-semibold">
                  <Shield className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Oracle & BI Accredited</span>
                </span>
              </div>
            </div>

            {/* "All Start is Difficult" Motto Banner */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-50 via-sky-50 to-blue-50 dark:from-cyan-950/70 dark:via-blue-950/60 dark:to-slate-900 border border-cyan-200 dark:border-cyan-500/40 flex items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500 text-slate-950 flex items-center justify-center font-bold text-sm shadow">
                  ★
                </div>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold text-sm sm:text-base tracking-tight">
                    {profile.heroMantra}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {profile.heroSubtitle}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Action Controls */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreProjects}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 group"
              >
                <span>Buka Proyek & Skripsi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenCvModal}
                className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700/80 font-medium text-sm transition-colors flex items-center gap-2 shadow-sm"
              >
                <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Unduh CV (ATS / Kreatif)</span>
              </button>
            </div>

          </div>

          {/* Right Column: 3D Interactive Cyber Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <PhoneMockup />
          </div>

        </div>

        {/* 4-Column Proof & KPI Strip Below Hero Split */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-cyan-900/40 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-700 dark:text-cyan-300 font-mono tabular-nums">
              2022 - 2026
            </div>
            <div className="text-xs font-semibold text-slate-900 dark:text-slate-200 mt-0.5">{profile.degree}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">{profile.institution}</div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              85ms
            </div>
            <div className="text-xs font-semibold text-slate-900 dark:text-slate-200 mt-0.5">Latency Rekomendasi</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Optimasi Query MySQL</div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-700 dark:text-cyan-300 font-mono tabular-nums">
              6 Sertifikat
            </div>
            <div className="text-xs font-semibold text-slate-900 dark:text-slate-200 mt-0.5">Kualifikasi Profesional</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">LSP BNSP, BI & Oracle</div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              12+ Mitra
            </div>
            <div className="text-xs font-semibold text-slate-900 dark:text-slate-200 mt-0.5">Rental Mobil Bekasi</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Riset Lapangan Skripsi</div>
          </div>
        </div>

      </div>
    </section>
  );
};
