import React, { useState } from 'react';
import { User, Code2, Layers, Heart, Sparkles, CheckCircle2, ArrowUpRight, Cpu } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const PhoneMockup: React.FC = () => {
  const { profile, projects, techSkills } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'projects'>('profile');
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[360px] select-none">
      {/* Ambient Cyber Neon Aura */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-indigo-500/20 rounded-[48px] blur-xl opacity-75 animate-pulse -z-10 pointer-events-none" />

      {/* Cyber Hardware Frame */}
      <div className="relative rounded-[40px] border-4 border-slate-700/80 bg-slate-950 p-2.5 shadow-2xl shadow-cyan-950/50 backdrop-blur-md">
        {/* Notch / Speaker Ear */}
        <div className="relative w-full flex justify-center pb-2">
          <div className="w-24 h-4 bg-slate-900 rounded-b-xl flex items-center justify-center gap-1.5 border-b border-x border-slate-800">
            <div className="w-2 h-2 rounded-full bg-slate-700" />
            <div className="w-10 h-1 bg-slate-800 rounded-full" />
          </div>
        </div>

        {/* Screen Content Container */}
        <div className="bg-[#091222] rounded-[32px] overflow-hidden border border-cyan-900/40 text-slate-200 h-[520px] flex flex-col justify-between text-xs">
          
          {/* Top Screen Status Bar */}
          <div className="px-4 pt-2.5 pb-1 flex items-center justify-between text-[11px] text-slate-400 font-mono border-b border-slate-800/60 shrink-0 z-20 bg-[#091222]/90 backdrop-blur-xs">
            <span className="font-semibold text-slate-300">09:41</span>
            <span className="tracking-wider text-cyan-400 font-semibold">{profile.handle}</span>
            <div className="flex items-center gap-1">
              <span>5G</span>
              <div className="w-4 h-2 border border-slate-400 rounded-sm p-[1px] flex items-center">
                <div className="w-2.5 h-full bg-cyan-400 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Screen Body Content */}
          <div className="flex-1 overflow-hidden relative flex flex-col">
            
            {/* TAB 1: FOTO PROFIL FULL */}
            {activeTab === 'profile' && (
              <div className="relative w-full h-full flex flex-col justify-between p-3 animate-fadeIn overflow-hidden">
                {/* Full Bleed Profile Photo Background */}
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.95]"
                />

                {/* Cyber Gradient Vignette Overlays for Maximum Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/50 pointer-events-none" />
                <div className="absolute inset-0 bg-cyan-950/10 pointer-events-none" />

                {/* Top Floating Badge Bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-400/40 flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-mono font-bold text-cyan-300">{profile.handle}</span>
                  </div>

                  <button 
                    onClick={() => setLiked(!liked)}
                    className="p-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-rose-400 hover:scale-110 transition-transform shadow-lg active:scale-95"
                    aria-label="Suka foto Firly"
                  >
                    <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Bottom Floating Glass Card */}
                <div className="relative z-10 space-y-2">
                  <div className="p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 space-y-2 shadow-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-extrabold text-sm text-white tracking-tight">{profile.name}</h4>
                        <span className="w-4 h-4 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-[9px] font-bold">
                          ✓
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40">
                        Final Year
                      </span>
                    </div>

                    <p className="text-[11px] text-cyan-300 font-medium font-mono">
                      {profile.degree} · {profile.institution}
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80 text-[10px] font-mono">
                      <div className="text-slate-300 flex items-center gap-1">
                        <span className="text-cyan-400 font-bold">Lokasi:</span>
                        <span className="truncate">Cibitung, Bekasi</span>
                      </div>
                      <div className="text-emerald-400 font-semibold text-right">
                        6 Sertifikasi Resmi
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-[10px] text-slate-300 italic">
                      "{profile.heroMantra}"
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: KEAHLIAN & CORE STACK */}
            {activeTab === 'skills' && (
              <div className="p-3.5 space-y-3 h-full overflow-y-auto animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                    <Code2 className="w-4 h-4 text-cyan-400" />
                    <span>Keahlian &amp; Core Stack</span>
                  </div>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-mono font-semibold">
                    Full Stack &amp; DB
                  </span>
                </div>

                {/* Skill List with Progress & Badges */}
                <div className="space-y-2">
                  {[
                    { name: "PHP (Native MVC & PDO)", level: "Mahir", score: 92, desc: "REST API, logika rekomendasi, prepared statements anti SQLi", color: "bg-cyan-500" },
                    { name: "MySQL Relational DB", level: "Mahir", score: 94, desc: "Desain skema 3NF, composite index query speed 85ms", color: "bg-emerald-500" },
                    { name: "JavaScript & AJAX", level: "Menengah", score: 85, desc: "DOM dinamis, filter reaktif tanpa reload, geo-mapping", color: "bg-amber-500" },
                    { name: "Oracle PL/SQL", level: "Tersertifikasi", score: 88, desc: "Sertifikasi Intermediate Gunadarma: Subqueries & Procedures", color: "bg-blue-500" },
                    { name: "Business Intelligence", level: "Tersertifikasi", score: 90, desc: "Power BI, ETL Pipeline 50k rows, Dimensional Star Schema", color: "bg-indigo-500" },
                    { name: "HTML5 & Tailwind CSS", level: "Mahir", score: 95, desc: "Mobile-first, cyber grid blueprint, dark/light theme", color: "bg-teal-500" }
                  ].map((sk, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white text-[11px]">{sk.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-800 text-cyan-300 font-semibold">
                          {sk.level}
                        </span>
                      </div>
                      
                      {/* Skill Meter Bar */}
                      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className={`h-full ${sk.color} rounded-full transition-all duration-500`} 
                          style={{ width: `${sk.score}%` }} 
                        />
                      </div>

                      <p className="text-[9.5px] text-slate-400 leading-tight">
                        {sk.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-2 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-[10px] text-cyan-300 text-center font-mono">
                  Teruji dalam skripsi &amp; uji kompetensi LSP BNSP
                </div>
              </div>
            )}

            {/* TAB 3: PROYEK SHOWCASE */}
            {activeTab === 'projects' && (
              <div className="p-3.5 space-y-3 h-full overflow-y-auto animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Proyek &amp; Studi Kasus</span>
                  </div>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-mono font-semibold">
                    {projects.length} Proyek
                  </span>
                </div>

                {/* Projects Stack Inside Phone */}
                <div className="space-y-2.5">
                  {projects.map((proj) => (
                    <div 
                      key={proj.id}
                      className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-colors space-y-2 group"
                    >
                      <div className="relative rounded-lg overflow-hidden h-24 border border-slate-800">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-2 flex flex-col justify-end">
                          <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase">
                            {proj.year} · {proj.status}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-bold text-white text-[11px] leading-tight group-hover:text-cyan-300 transition-colors">
                          {proj.title}
                        </h5>
                        <p className="text-[9.5px] text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                          {proj.tagline}
                        </p>
                      </div>

                      {/* Micro Metrics Strip */}
                      {proj.metrics && proj.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-1 pt-1.5 border-t border-slate-800/80">
                          {proj.metrics.slice(0, 2).map((m, mIdx) => (
                            <div key={mIdx} className="bg-slate-950/80 px-1.5 py-1 rounded text-center">
                              <div className="text-[10px] font-bold text-cyan-300 font-mono">{m.value}</div>
                              <div className="text-[8px] text-slate-400 truncate">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Interactive Bottom Tab Bar */}
          <div className="p-2 bg-slate-950/95 border-t border-slate-800/80 grid grid-cols-3 gap-1 shrink-0 z-20">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-1.5 rounded-lg flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'profile' 
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span className="text-[9px]">Profil</span>
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`py-1.5 rounded-lg flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'skills' 
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="text-[9px]">Keahlian</span>
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-1.5 rounded-lg flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'projects' 
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="text-[9px]">Proyek</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
