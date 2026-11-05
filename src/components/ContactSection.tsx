import React, { useState } from 'react';
import { Mail, MapPin, Send, Check, Copy, MessageSquare, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ContactSectionProps {
  onMessageSent: (name: string, msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onMessageSent }) => {
  const { profile } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formMsg.trim()) return;

    onMessageSent(
      `Pesan Baru dari ${formName || 'Rekan/HR'}`,
      `Subjek: ${formSubject || 'Inquiry'} — "${formMsg.trim()}" (Email: ${formEmail || 'Tidak dicantumkan'})`
    );

    setSubmitted(true);
    setFormName('');
    setFormEmail('');
    setFormSubject('');
    setFormMsg('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-16 border-t border-slate-200 dark:border-cyan-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 text-xs font-mono font-bold tracking-wide uppercase mb-3 border border-cyan-200 dark:border-transparent">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Mari Berdiskusi & Berkolaborasi
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            Terbuka untuk peluang kerja profesional, proyek rekayasa perangkat lunak, maupun diskusi seputar analitik data dan arsitektur database.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Direct Channels (Left) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-[#09152b] border border-slate-200 dark:border-cyan-500/30 space-y-5 shadow-xl">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Kontak Langsung</h3>

              {/* Email Card with Copy button */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Email Resmi</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white font-mono">
                      {profile.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-200/80 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-cyan-300 text-xs font-mono flex items-center gap-1 transition-colors"
                  aria-label="Salin email"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>

              {/* WhatsApp Card */}
              <a
                href={profile.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 flex items-center justify-between gap-3 transition-colors group shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">WhatsApp / Telepon</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white font-mono group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                      {profile.phone}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors" />
              </a>

              {/* Location Card */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-start gap-3 shadow-xs">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Domisili Saat Ini</div>
                  <div className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-relaxed mt-0.5">
                    {profile.address}
                  </div>
                </div>
              </div>

              {/* Quick Summary Strip */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                <span className="text-cyan-800 dark:text-cyan-300 font-semibold">Tersedia untuk: </span>
                Junior Software Engineer, Backend / Full-Stack Developer, Data Analyst, dan IT Specialist.
              </div>
            </div>

          </div>

          {/* Interactive Contact Form (Right) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#09152b] border border-slate-200 dark:border-cyan-500/30 shadow-xl space-y-5">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Kirim Pesan Langsung</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Pesan akan otomatis masuk ke stream notifikasi real-time portofolio.
                  </p>
                </div>
                <span className="text-xs font-mono text-cyan-800 dark:text-cyan-400 font-semibold">Enkripsi Aman</span>
              </div>

              {submitted && (
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/50 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Terima kasih! Pesan Anda telah berhasil disiarkan ke dashboard notifikasi Firly secara real-time.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-800 dark:text-slate-300">Nama Lengkap</label>
                    <input 
                      type="text" 
                      placeholder="cth. Budi Santoso"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-800 dark:text-slate-300">Email Anda</label>
                    <input 
                      type="email" 
                      placeholder="cth. budi@company.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-800 dark:text-slate-300">Subjek Diskusi</label>
                  <input 
                    type="text" 
                    placeholder="cth. Tawaran Peluang Kerja / Diskusi Proyek Skripsi"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-800 dark:text-slate-300">Isi Pesan</label>
                  <textarea 
                    rows={4}
                    placeholder="Tuliskan pesan Anda secara jelas..."
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan Sekarang</span>
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
