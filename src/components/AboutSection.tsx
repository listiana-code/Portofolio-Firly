import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  FileCheck, 
  ShieldCheck, 
  Eye, 
  X, 
  Download, 
  ExternalLink,
  ZoomIn,
  FileText
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { CertificationItem } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenCvModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenCvModal }) => {
  const { profile, certifications } = usePortfolio();
  const [certFilter, setCertFilter] = useState<'all' | 'analytics' | 'database' | 'national'>('all');
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredCerts = certifications.filter(c => {
    if (certFilter === 'all') return true;
    return c.category === certFilter;
  });

  return (
    <section id="about" className="py-16 border-t border-slate-200 dark:border-cyan-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 text-xs font-mono font-bold tracking-wide uppercase mb-3 border border-cyan-300/60 dark:border-cyan-500/30">
            Academic &amp; Background Archive
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Fondasi Karakter &amp; Kualifikasi Resmi
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            Perjalanan akademik terstruktur dari penempaan integritas di pesantren hingga penguasaan standar kompetensi sistem informasi, basis data, dan analitik data berlisensi.
          </p>
        </div>

        {/* 2-Column Split: Education Timeline vs Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Education & Character Formation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#09152b] border border-slate-200 dark:border-cyan-500/30 shadow-xl space-y-5">
              
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
                <GraduationCap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Jejak Pendidikan Formal</h3>
              </div>

              {/* Gunadarma Card */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {profile.degree}
                    </h4>
                    <p className="text-xs text-cyan-700 dark:text-cyan-300 font-semibold">{profile.institution}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{profile.locationShort}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 font-mono text-xs font-semibold border border-cyan-200 dark:border-cyan-500/30">
                      {profile.period}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300/90 leading-relaxed pt-1">
                  Mendalami perancangan sistem informasi enterprise, permodelan basis data relasional, pengujian perangkat lunak, serta skripsi sistem rekomendasi tempat rental mobil di wilayah Bekasi.
                </p>
              </div>

              {/* Al-Ittihad Card */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {profile.highSchool}
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold">Jurusan IPS</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Kab. Cianjur, Jawa Barat</p>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-semibold border border-emerald-200 dark:border-emerald-500/30">
                      {profile.highSchoolPeriod}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300/90 leading-relaxed pt-1">
                  Membentuk fondasi kedisiplinan diri, akhlak, kejujuran etika kerja, serta kemampuan adaptasi sosial yang tinggi dalam lingkungan yang majemuk.
                </p>
              </div>

              {/* Button to view CV */}
              <button
                onClick={onOpenCvModal}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-cyan-800 dark:text-cyan-300 font-semibold text-xs border border-cyan-300 dark:border-cyan-500/30 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <FileCheck className="w-4 h-4" />
                <span>Buka Rincian CV ATS &amp; Kreatif</span>
              </button>
            </div>
          </div>

          {/* Right Column: Complete Official Certifications */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#09152b] border border-slate-200 dark:border-cyan-500/30 shadow-xl space-y-5">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-3">
                <div className="flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Sertifikasi &amp; Kredensial Resmi ({certifications.length} Lisensi)
                  </h3>
                </div>

                {/* Filter buttons */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg text-xs">
                  {[
                    { id: 'all', label: 'Semua' },
                    { id: 'analytics', label: 'BI & Analitik' },
                    { id: 'database', label: 'Basis Data' },
                    { id: 'national', label: 'BNSP / LSP' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setCertFilter(tab.id as any)}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        certFilter === tab.id
                          ? 'bg-white dark:bg-cyan-500 text-slate-900 dark:text-slate-950 font-bold shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Certifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredCerts.map((cert) => (
                  <div 
                    key={cert.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-3 group shadow-sm hover:shadow-md"
                  >
                    <div>
                      {/* PDF Document Preview Card */}
                      <div 
                        onClick={() => setSelectedCert(cert)}
                        className="mb-3 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-rose-50/70 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 p-3 relative cursor-pointer group/thumb hover:border-rose-400 dark:hover:border-rose-500/50 transition-all shadow-xs"
                        title="Klik untuk membuka dokumen PDF sertifikat resmi"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 flex items-center justify-center shrink-0">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50">
                                  PDF RESMI
                                </span>
                                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                                  {cert.fileSize || '1.2 MB'}
                                </span>
                              </div>
                              <p className="text-xs font-bold text-slate-900 dark:text-white truncate mt-1">
                                {cert.fileName || `${cert.title.replace(/\s+/g, '_')}.pdf`}
                              </p>
                            </div>
                          </div>
                          <span className="p-1 rounded-md bg-white dark:bg-slate-800 text-slate-400 group-hover/thumb:text-rose-600 dark:group-hover/thumb:text-rose-400 transition-colors shadow-xs shrink-0">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </span>
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            <span>Dokumen Terverifikasi</span>
                          </span>
                          <span className="font-semibold text-rose-600 dark:text-rose-400 group-hover/thumb:underline flex items-center gap-1">
                            <span>Baca PDF</span>
                            <span>&rarr;</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800">
                          {cert.period}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>{cert.status || 'Verified'}</span>
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                        {cert.title}
                      </h4>
                      
                      <div className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-1 font-medium">
                        {cert.issuer}
                      </div>

                      {cert.credentialId && (
                        <div className="text-[11px] text-cyan-800 dark:text-cyan-300/90 font-mono mt-1 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">No: {cert.credentialId}</span>
                        </div>
                      )}

                      <p className="text-xs text-slate-600 dark:text-slate-300/80 mt-2.5 leading-relaxed line-clamp-3">
                        {cert.scope}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800/80">
                      {/* Verified Skills Tags */}
                      {cert.skillsVerified && cert.skillsVerified.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {cert.skillsVerified.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded text-[10px] bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* View Certificate PDF Button */}
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="w-full py-1.5 px-3 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-900/40 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center justify-center gap-1.5 border border-rose-200 dark:border-rose-800/60 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Buka &amp; Baca Dokumen PDF</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Verified Trust Strip */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>Seluruh sertifikasi diterbitkan melalui evaluasi resmi {profile.institution} dan BNSP RI.</span>
                <span className="font-mono text-cyan-700 dark:text-cyan-300 font-semibold shrink-0">100% Terverifikasi</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* LIGHTBOX MODAL: FULL RESOLUTION PDF VIEWER */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-4xl bg-white dark:bg-[#081223] border border-slate-200 dark:border-cyan-500/50 rounded-2xl shadow-2xl overflow-hidden my-4">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-cyan-900/40 bg-slate-50 dark:bg-slate-950/70 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                      {selectedCert.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-[10px] font-mono font-bold uppercase border border-rose-200 dark:border-rose-900/60">
                      Dokumen PDF
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                    <span>{selectedCert.issuer}</span>
                    <span>•</span>
                    <span className="text-cyan-700 dark:text-cyan-300 font-semibold">{selectedCert.period}</span>
                    {selectedCert.credentialId && (
                      <>
                        <span>•</span>
                        <span className="text-slate-600 dark:text-slate-300 font-bold">ID: {selectedCert.credentialId}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Tutup pratinjau sertifikat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Interactive PDF Reader Viewer */}
            <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              
              {/* PDF Frame / Object Reader */}
              <div className="rounded-xl overflow-hidden border border-slate-300 dark:border-slate-800 bg-slate-900 shadow-xl flex flex-col items-center justify-center">
                <iframe
                  src={selectedCert.certificatePdf || selectedCert.certificateImage}
                  title={`Dokumen PDF ${selectedCert.title}`}
                  className="w-full h-[58vh] min-h-[350px] border-none bg-white rounded-lg"
                />
              </div>

              {/* Certificate Verification Details Card */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>STATUS: {selectedCert.status || 'TERVERIFIKASI & AKTIF'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      File: {selectedCert.fileName || 'Dokumen_Sertifikat.pdf'} ({selectedCert.fileSize || '1.2 MB'})
                    </span>
                    {selectedCert.credentialId && (
                      <span className="text-xs font-mono text-cyan-800 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-200 dark:border-cyan-800">
                        ID: {selectedCert.credentialId}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong className="text-slate-900 dark:text-white font-semibold">Cakupan Kompetensi Teruji: </strong>
                  {selectedCert.scope}
                </div>

                {selectedCert.skillsVerified && selectedCert.skillsVerified.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono font-medium mr-1">
                      Keahlian Teruji:
                    </span>
                    {selectedCert.skillsVerified.map((sk, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[11px] bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer with Direct PDF Download & View Options */}
            <div className="p-4 border-t border-slate-200 dark:border-cyan-900/40 bg-slate-50 dark:bg-slate-950/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-rose-500" />
                <span>Dokumen PDF Resmi: Firly Ahmad Fahrezi</span>
              </span>
              
              <div className="flex items-center gap-2">
                {/* Open in New Tab Button */}
                {(selectedCert.certificatePdf || selectedCert.certificateImage) && (
                  <a
                    href={selectedCert.certificatePdf || selectedCert.certificateImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-1.5 transition-colors border border-slate-300 dark:border-slate-700"
                  >
                    <ExternalLink className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span>Buka di Tab Baru</span>
                  </a>
                )}

                {/* Direct Download PDF Button */}
                {(selectedCert.certificatePdf || selectedCert.certificateImage) && (
                  <a
                    href={selectedCert.certificatePdf || selectedCert.certificateImage}
                    download={selectedCert.fileName || `Sertifikat_${selectedCert.title.replace(/\s+/g, '_')}.pdf`}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Unduh File PDF</span>
                  </a>
                )}
                
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
