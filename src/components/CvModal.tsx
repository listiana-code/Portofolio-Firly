import React, { useState } from 'react';
import { X, Download, FileText, GraduationCap, Award, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const { profile, certifications } = usePortfolio();
  const [activeCvType, setActiveCvType] = useState<'ats' | 'creative'>('ats');

  if (!isOpen) return null;

  const atsCvPath = "/assets/aistudio/CV_ATS_FIRLY_AHMAD_FAHREZI_f0b8adbd.pdf";
  const creativeCvPath = "/assets/aistudio/CV_KREATIF_FIRLY_AHMAD_FAHREZI_d35026cd.pdf";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-[#09152b] border border-slate-200 dark:border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-800 dark:text-slate-200 animate-fadeIn"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-cyan-900/40 flex items-center justify-between gap-4 bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Curriculum Vitae Resmi</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{profile.name} · {profile.degree}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Tutup CV modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection: ATS Friendly vs Creative Design */}
        <div className="px-6 pt-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 text-xs">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveCvType('ats')}
              className={`pb-3 px-2 font-semibold border-b-2 transition-colors ${
                activeCvType === 'ats' 
                  ? 'border-cyan-500 text-cyan-800 dark:text-cyan-300' 
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Versi Standar ATS (Cocok untuk HR & Sistem)
            </button>
            <button
              onClick={() => setActiveCvType('creative')}
              className={`pb-3 px-2 font-semibold border-b-2 transition-colors ${
                activeCvType === 'creative' 
                  ? 'border-cyan-500 text-cyan-800 dark:text-cyan-300' 
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Versi Desain Kreatif (SIAPKerja)
            </button>
          </div>

          <a
            href={activeCvType === 'ats' ? atsCvPath : creativeCvPath}
            download
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors mb-2 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh PDF</span>
          </a>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto max-h-[65vh] space-y-6 text-xs sm:text-sm">
          
          {/* Header Summary */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-base font-bold text-slate-900 dark:text-white">{profile.name}</span>
              <div className="flex items-center gap-3 text-cyan-800 dark:text-cyan-400 font-mono text-xs font-semibold">
                <span>{profile.email}</span>
                <span aria-hidden="true">·</span>
                <span>{profile.phone}</span>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
              Mahasiswa tingkat akhir {profile.degree} di {profile.institution} yang memiliki minat di bidang teknologi informasi, pengembangan website, dan analisis data. Memiliki kemampuan dasar dalam HTML, CSS, JavaScript, PHP, dan MySQL, serta menyelesaikan tugas akhir pengembangan sistem rekomendasi tempat rental mobil di wilayah Bekasi.
            </p>
          </div>

          {/* Pendidikan */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-800 dark:text-cyan-400 font-bold flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Riwayat Pendidikan</span>
            </h4>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex justify-between items-start shadow-xs">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{profile.degree} — {profile.institution}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{profile.locationShort}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-700 dark:text-slate-300 font-mono font-medium">{profile.period}</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex justify-between items-start shadow-xs">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{profile.highSchool}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Jurusan IPS</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-700 dark:text-slate-300 font-mono font-medium">{profile.highSchoolPeriod}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sertifikasi & Pelatihan Lengkap */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-800 dark:text-cyan-400 font-bold flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Sertifikasi & Pelatihan Resmi ({certifications.length} Lisensi)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
                  <div className="font-bold text-slate-900 dark:text-white text-xs">{cert.title}</div>
                  <div className="text-[11px] text-cyan-800 dark:text-cyan-300 font-mono font-medium">{cert.issuer} ({cert.period})</div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">{cert.scope}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Keterampilan Teknis */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-800 dark:text-cyan-400 font-bold">
              Keterampilan & Toolset
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "PHP", "MySQL", "JavaScript", "HTML+CSS", "SQL", "Oracle Intermediate",
                "Business Intelligence", "Data Preparation", "Machine Learning (Basic)",
                "Data Analysis", "Problem Solving", "Teamwork", "System Administration",
                "Microsoft Excel & Word"
              ].map((skill, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-cyan-900/40 bg-slate-50 dark:bg-slate-950/70 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            File PDF asli siap diunduh dan dilampirkan untuk proses rekrutmen.
          </span>
          <div className="flex items-center gap-2">
            <a
              href={activeCvType === 'ats' ? atsCvPath : creativeCvPath}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Buka di Tab Baru</span>
            </a>
            <a
              href={activeCvType === 'ats' ? atsCvPath : creativeCvPath}
              download
              className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Sekarang</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
