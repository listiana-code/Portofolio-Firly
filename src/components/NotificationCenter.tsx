import React, { useState } from 'react';
import { X, Bell, Check, Send, Sparkles } from 'lucide-react';
import { NotificationItem } from '../data/portfolioData';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onSendPing: (title: string, message: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSendPing
}) => {
  const [visitorName, setVisitorName] = useState('');
  const [visitorMsg, setVisitorMsg] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [pingSuccess, setPingSuccess] = useState(false);

  if (!isOpen) return null;

  const filteredNotifs = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const handleSubmitPing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorMsg.trim()) return;

    const sender = visitorName.trim() || 'Pengunjung Anonim';
    onSendPing(
      `Sapaan Baru dari ${sender}`,
      visitorMsg.trim()
    );

    setVisitorName('');
    setVisitorMsg('');
    setPingSuccess(true);
    setTimeout(() => setPingSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/70 backdrop-blur-sm">
      <div 
        className="w-full max-w-md h-full bg-white dark:bg-[#091326] border-l border-slate-200 dark:border-cyan-500/40 p-5 flex flex-col justify-between shadow-2xl text-slate-800 dark:text-slate-200 animate-slideLeft overflow-hidden"
        role="dialog"
        aria-label="Pusat Notifikasi Real-time"
      >
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-cyan-900/40">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Sistem Notifikasi Real-Time</h3>
                <p className="text-[11px] text-cyan-700 dark:text-cyan-400 font-mono font-medium">Pembaruan & Sinyal Aktivitas</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Tutup notifikasi"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter and Actions Bar */}
          <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-800/80 text-xs">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  filter === 'all' 
                    ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-900 dark:text-cyan-300 font-bold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Semua ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  filter === 'unread' 
                    ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-900 dark:text-cyan-300 font-bold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Belum Dibaca ({notifications.filter(n => !n.read).length})
              </button>
            </div>

            <button
              onClick={onMarkAllAsRead}
              className="text-[11px] text-slate-600 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center gap-1 transition-colors font-medium"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Tandai Terbaca</span>
            </button>
          </div>
        </div>

        {/* Notifications Feed List (Scrollable) */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2.5 pr-1">
          {filteredNotifs.length > 0 ? (
            filteredNotifs.map(n => (
              <div
                key={n.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  !n.read 
                    ? 'bg-cyan-50/70 border-cyan-300 dark:bg-[#0e213b] dark:border-cyan-500/50 shadow-xs' 
                    : 'bg-slate-50 border-slate-200 dark:bg-slate-900/60 dark:border-slate-800/80 text-slate-500 dark:text-slate-400'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-semibold text-xs text-slate-900 dark:text-white">
                    {n.title}
                  </div>
                  <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 font-semibold shrink-0">
                    {n.timestamp}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {n.message}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-xs text-slate-500 dark:text-slate-400 space-y-1">
              <Check className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto opacity-70" />
              <div className="font-semibold text-slate-800 dark:text-slate-300">Semua Notifikasi Bersih</div>
              <p>Tidak ada pemberitahuan baru yang tertunda.</p>
            </div>
          )}
        </div>

        {/* Bottom Interactive Area: Visitor Live Ping Simulation */}
        <div className="pt-3 border-t border-slate-200 dark:border-cyan-900/40 bg-slate-50 dark:bg-slate-950/50 -mx-5 -mb-5 p-5">
          <div className="mb-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Tes Notifikasi Real-Time: Kirim Sinyal</span>
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Kirim pesan langsung ke dashboard portofolio ini untuk menguji reaksi sistem notifikasi instan.
            </p>
          </div>

          {pingSuccess && (
            <div className="mb-2 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-500/50 text-emerald-800 dark:text-emerald-300 text-[11px] flex items-center gap-1.5 font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>Sinyal terkirim ke notifikasi sistem secara instan!</span>
            </div>
          )}

          <form onSubmit={handleSubmitPing} className="space-y-2">
            <input 
              type="text" 
              placeholder="Nama Anda / Perusahaan (Opsional)"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
            />
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Tulis pesan sapaan atau apresiasi..."
                value={visitorMsg}
                onChange={(e) => setVisitorMsg(e.target.value)}
                required
                className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-colors shrink-0"
              >
                <Send className="w-3 h-3" />
                <span>Kirim</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
