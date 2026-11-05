import React, { useState } from 'react';
import { X, Lock, Eye, EyeOff, ShieldCheck, KeyRound, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginAdmin } = usePortfolio();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const success = loginAdmin(password);
    if (success) {
      setPassword('');
      onSuccess();
    } else {
      setErrorMsg('Kata sandi salah. Silakan periksa kembali kata sandi khusus Firly Ahmad.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-md bg-white dark:bg-[#091426] border border-slate-200 dark:border-cyan-500/50 rounded-2xl shadow-2xl p-6 text-slate-800 dark:text-slate-200 animate-fadeIn"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Tutup login"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-200 dark:border-cyan-900/40">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-300 dark:border-cyan-400/40 flex items-center justify-center text-cyan-800 dark:text-cyan-300">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Portal Otentikasi Khusus
            </h3>
            <p className="text-xs text-cyan-800 dark:text-cyan-400 font-mono font-medium">
              Akses Rahasia Pengembang · Firly Ahmad Fahrezi
            </p>
          </div>
        </div>

        {/* Info Note */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 mb-5 leading-relaxed">
          <div className="flex items-center gap-1.5 text-cyan-800 dark:text-cyan-300 font-semibold mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Dasbor CRUD Tersembunyi</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-[11px]">
            Hanya Firly yang dapat mengakses panel ini untuk memperbarui profil, mengganti foto, menambah sertifikasi & proyek skripsi secara real-time.
          </p>
        </div>

        {/* Error Feedback */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-500/50 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2 animate-fadeIn font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-800 dark:text-slate-300 block">
              Masukkan Kata Sandi Admin Firly:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Kata sandi admin..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                required
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
              Kata sandi default: <span className="text-cyan-800 dark:text-cyan-300 font-bold">firlyahmad2026</span> (dapat diubah di dalam dasbor)
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors border border-slate-200 dark:border-slate-800"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all"
            >
              <KeyRound className="w-4 h-4" />
              <span>Masuk Dasbor</span>
            </button>
          </div>
        </form>

        <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-900 text-center">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
            Pintasan Cepat Keyboard: Tekan <kbd className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 font-semibold">Ctrl</kbd> + <kbd className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 font-semibold">Shift</kbd> + <kbd className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 font-semibold">A</kbd> kapan saja.
          </span>
        </div>

      </div>
    </div>
  );
};
