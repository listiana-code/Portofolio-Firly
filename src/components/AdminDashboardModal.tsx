import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Upload, 
  Trash2, 
  Plus, 
  Edit3, 
  LogOut, 
  Check, 
  User, 
  GraduationCap, 
  Award, 
  Layers, 
  Car, 
  KeyRound, 
  ExternalLink,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, EcosystemItem, CertificationItem, RentalCarItem } from '../data/portfolioData';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const {
    profile,
    ecosystems,
    certifications,
    projects,
    rentalCars,
    updateProfile,
    addProject,
    updateProject,
    deleteProject,
    addCertification,
    updateCertification,
    deleteCertification,
    addEcosystem,
    updateEcosystem,
    deleteEcosystem,
    addCar,
    updateCar,
    deleteCar,
    handleImageUpload,
    handleDocumentUpload,
    resetAllToDefault,
    updatePassword,
    logoutAdmin
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'profile' | 'ecosystems' | 'certs' | 'projects' | 'cars' | 'deploy'>('profile');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Profile Form State
  const [profileForm, setProfileForm] = useState(profile);

  React.useEffect(() => {
    setProfileForm(profile);
  }, [profile]);

  // Sub-Item Edit Modals State
  const [editingEco, setEditingEco] = useState<EcosystemItem | null>(null);
  const [isEcoModalOpen, setIsEcoModalOpen] = useState(false);

  const [editingCert, setEditingCert] = useState<CertificationItem | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const [editingProj, setEditingProj] = useState<Project | null>(null);
  const [isProjModalOpen, setIsProjModalOpen] = useState(false);

  const [editingCar, setEditingCar] = useState<RentalCarItem | null>(null);
  const [isCarModalOpen, setIsCarModalOpen] = useState(false);

  // Password Change State
  const [newPassword, setNewPassword] = useState('');

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  // 1. Save Profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    showNotification('Profil & narasi personal berhasil diperbarui secara real-time!');
  };

  // 2. Handle Avatar File Upload
  const handleAvatarFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await handleImageUpload(file);
      setProfileForm(prev => ({ ...prev, avatarUrl: dataUrl }));
      updateProfile({ avatarUrl: dataUrl });
      showNotification('Foto profil baru berhasil diunggah & langsung diterapkan!');
    } catch (err) {
      alert('Gagal membaca gambar. Silakan coba file lain (JPG/PNG).');
    }
  };

  // 3. Save Ecosystem
  const handleSaveEco = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEco) return;

    if (editingEco.id) {
      updateEcosystem(editingEco.id, editingEco);
      showNotification('Data pengalaman berhasil diperbarui!');
    } else {
      addEcosystem({
        name: editingEco.name,
        role: editingEco.role,
        year: editingEco.year,
        desc: editingEco.desc
      });
      showNotification('Pengalaman baru berhasil ditambahkan!');
    }
    setIsEcoModalOpen(false);
    setEditingEco(null);
  };

  // 4. Save Certification
  const handleSaveCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;

    if (editingCert.id) {
      updateCertification(editingCert.id, editingCert);
      showNotification('Sertifikasi & dokumen berhasil diperbarui!');
    } else {
      addCertification({
        title: editingCert.title,
        issuer: editingCert.issuer,
        period: editingCert.period,
        scope: editingCert.scope,
        credentialId: editingCert.credentialId || `UG-${Date.now().toString().slice(-4)}`,
        status: editingCert.status || 'Verified & Active',
        category: editingCert.category || 'academic',
        skillsVerified: editingCert.skillsVerified || ['Data Analysis'],
        certificateImage: editingCert.certificateImage || '',
        certificatePdf: editingCert.certificatePdf || editingCert.certificateImage || '',
        fileType: editingCert.fileType || 'pdf',
        fileName: editingCert.fileName || `${editingCert.title.replace(/\s+/g, '_')}.pdf`,
        fileSize: editingCert.fileSize || '1.0 MB'
      });
      showNotification('Sertifikasi baru berhasil ditambahkan!');
    }
    setIsCertModalOpen(false);
    setEditingCert(null);
  };

  // 4b. Handle Certificate Document / PDF Upload
  const handleCertFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingCert) return;

    try {
      const res = await handleDocumentUpload(file);
      setEditingCert(prev => prev ? { 
        ...prev, 
        certificatePdf: res.dataUrl,
        certificateImage: res.dataUrl,
        fileType: res.fileType,
        fileName: res.fileName,
        fileSize: res.fileSize
      } : null);
      showNotification(`Dokumen ${res.fileType.toUpperCase()} berhasil diunggah: ${res.fileName}!`);
    } catch (err) {
      alert('Gagal membaca file PDF sertifikat.');
    }
  };

  // 5. Save Project
  const handleSaveProj = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProj) return;

    if (editingProj.id) {
      updateProject(editingProj.id, editingProj);
      showNotification('Proyek skripsi berhasil diperbarui!');
    } else {
      addProject({
        title: editingProj.title,
        category: editingProj.category,
        tagline: editingProj.tagline,
        year: editingProj.year,
        status: editingProj.status,
        image: editingProj.image || '/src/assets/images/project_rental_car_1793864849468.jpg',
        abstract: editingProj.abstract,
        creativeProcess: editingProj.creativeProcess || [],
        technicalChallenges: editingProj.technicalChallenges || [],
        teamworkReflection: editingProj.teamworkReflection || '',
        dataPrivacyAndEthics: editingProj.dataPrivacyAndEthics || '',
        techStack: editingProj.techStack || ['PHP', 'MySQL'],
        metrics: editingProj.metrics || [{ label: 'Hasil', value: '100%' }],
        hasSimulator: editingProj.hasSimulator
      });
      showNotification('Proyek baru berhasil ditambahkan!');
    }
    setIsProjModalOpen(false);
    setEditingProj(null);
  };

  // 6. Handle Project Image File
  const handleProjectImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProj) return;

    try {
      const dataUrl = await handleImageUpload(file);
      setEditingProj(prev => prev ? { ...prev, image: dataUrl } : null);
      showNotification('Gambar proyek berhasil dimuat!');
    } catch (err) {
      alert('Gagal membaca gambar.');
    }
  };

  // 7. Save Car in Simulator
  const handleSaveCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCar) return;

    if (editingCar.id) {
      updateCar(editingCar.id, editingCar);
      showNotification('Data armada sewa berhasil diperbarui!');
    } else {
      addCar({
        model: editingCar.model,
        vendor: editingCar.vendor,
        location: editingCar.location,
        distanceKm: Number(editingCar.distanceKm) || 2.0,
        dailyPrice: Number(editingCar.dailyPrice) || 350000,
        seats: Number(editingCar.seats) || 7,
        transmission: editingCar.transmission || 'Matic',
        rating: Number(editingCar.rating) || 4.8,
        reviewsCount: Number(editingCar.reviewsCount) || 20,
        fuelEfficiency: editingCar.fuelEfficiency || '15 km/liter',
        tags: editingCar.tags || ['Keluarga'],
        baseScore: Number(editingCar.baseScore) || 90
      });
      showNotification('Armada baru berhasil ditambahkan ke simulasi!');
    }
    setIsCarModalOpen(false);
    setEditingCar(null);
  };

  // 8. Update Password
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) return;
    updatePassword(newPassword.trim());
    setNewPassword('');
    showNotification('Kata sandi admin berhasil diperbarui!');
  };

  // 9. Reset Confirmation
  const handleReset = () => {
    if (window.confirm('Apakah Firly yakin ingin mengembalikan semua data ke versi default CV asli?')) {
      resetAllToDefault();
      showNotification('Semua data berhasil dikembalikan ke standar awal CV.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] bg-white dark:bg-[#081223] border border-slate-200 dark:border-cyan-500/50 rounded-2xl shadow-2xl flex flex-col text-slate-800 dark:text-slate-200 overflow-hidden animate-fadeIn"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-cyan-900/40 bg-slate-50 dark:bg-slate-950/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-300 dark:border-cyan-400/50 flex items-center justify-center text-cyan-800 dark:text-cyan-300 font-bold font-mono text-sm">
              CRUD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Dasbor Pengelolaan Mandiri Firly
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono font-semibold flex items-center gap-1 border border-emerald-300 dark:border-transparent">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Real-Time Sync</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Setiap perubahan langsung diperbarui di antarmuka portofolio publik.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logoutAdmin();
                onClose();
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-900/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Keluar dari mode admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Tutup dasbor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {successToast && (
          <div className="bg-emerald-50 dark:bg-emerald-950/90 border-b border-emerald-300 dark:border-emerald-500/50 px-4 py-2.5 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{successToast}</span>
            </div>
            <button onClick={() => setSuccessToast(null)} className="text-emerald-700 dark:text-emerald-400 hover:text-slate-900 dark:hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40 px-4 text-xs font-medium scrollbar-none">
          {[
            { id: 'profile', label: 'Profil & Foto', icon: User },
            { id: 'ecosystems', label: 'Pendidikan & Riwayat', icon: GraduationCap },
            { id: 'certs', label: 'Sertifikasi Lengkap', icon: Award },
            { id: 'projects', label: 'Proyek & Skripsi', icon: Layers },
            { id: 'cars', label: 'Simulasi Armada', icon: Car },
            { id: 'deploy', label: 'Deploy ke Vercel & Akses', icon: ExternalLink }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3.5 flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
                  isActive 
                    ? 'border-cyan-500 text-cyan-800 dark:text-cyan-300 font-bold bg-cyan-50/80 dark:bg-cyan-950/20' 
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panes */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm">
          
          {/* TAB 1: PROFIL & FOTO */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              
              {/* Photo Upload Section */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-cyan-500 shadow-md shrink-0 bg-slate-100 dark:bg-slate-950">
                    <img
                      src={profileForm.avatarUrl}
                      alt="Preview Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="font-bold text-slate-900 dark:text-white text-sm">Foto Profil Firly</div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Unggah foto baru dari laptop/HP Anda. Gambar akan dikonversi otomatis dan disimpan langsung di browser.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <label className="cursor-pointer px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Pilih Foto dari Komputer</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarFile}
                          className="hidden"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          setProfileForm(prev => ({
                            ...prev,
                            avatarUrl: "/src/assets/images/firly_profile_avatar_1793864847835.jpg"
                          }));
                          updateProfile({ avatarUrl: "/src/assets/images/firly_profile_avatar_1793864847835.jpg" });
                          showNotification('Foto dikembalikan ke foto AI Studio resmi.');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 text-xs border border-slate-300 dark:border-slate-700 transition-colors"
                      >
                        Gunakan Foto Asli Firly
                      </button>
                    </div>
                  </div>
                </div>

                {/* Direct Image URL input */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80">
                  <label className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">
                    Atau gunakan tautan URL gambar eksternal:
                  </label>
                  <input
                    type="url"
                    value={profileForm.avatarUrl}
                    onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                    placeholder="https://example.com/foto-firly.jpg"
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 font-mono focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Basic Info Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-800 dark:text-slate-300">Nama Lengkap</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-200 focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-800 dark:text-slate-300">Handle / Brand Username</label>
                  <input
                    type="text"
                    value={profileForm.handle}
                    onChange={(e) => setProfileForm({ ...profileForm, handle: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-200 focus:border-cyan-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-800 dark:text-slate-300">Gelar & Jurusan</label>
                  <input
                    type="text"
                    value={profileForm.degree}
                    onChange={(e) => setProfileForm({ ...profileForm, degree: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-200 focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-800 dark:text-slate-300">Kampus / Universitas</label>
                  <input
                    type="text"
                    value={profileForm.institution}
                    onChange={(e) => setProfileForm({ ...profileForm, institution: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-200 focus:border-cyan-500"
                  />
                </div>


                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-800 dark:text-slate-300">Periode Kuliah</label>
                  <input
                    type="text"
                    value={profileForm.period}
                    onChange={(e) => setProfileForm({ ...profileForm, period: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-200 focus:border-cyan-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-800 dark:text-slate-300">Alamat Email Resmi</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-200 focus:border-cyan-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-800 dark:text-slate-300">Nomor WhatsApp / HP</label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-200 focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              {/* Mantra & Narasi */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-800 dark:text-slate-300">Mantra / Slogan Hero</label>
                  <input
                    type="text"
                    value={profileForm.heroMantra}
                    onChange={(e) => setProfileForm({ ...profileForm, heroMantra: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-200 focus:border-cyan-500 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-800 dark:text-slate-300">Narasi Personal (About Me)</label>
                  <textarea
                    rows={5}
                    value={profileForm.personalNarrative}
                    onChange={(e) => setProfileForm({ ...profileForm, personalNarrative: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-200 focus:border-cyan-500 leading-relaxed"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Profil</span>
                </button>
              </div>

            </form>
          )}

          {/* TAB 2: PENDIDIKAN & EKOSISTEM */}
          {activeTab === 'ecosystems' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Riwayat Pendidikan & Ekosistem</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Kelola riwayat kampus, pesantren, dan organisasi.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingEco({ id: '', name: '', role: '', year: '', desc: '' });
                    setIsEcoModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Riwayat</span>
                </button>
              </div>

              <div className="space-y-3">
                {ecosystems.map(eco => (
                  <div key={eco.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 shadow-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{eco.name}</span>
                        <span className="text-xs font-mono text-cyan-800 dark:text-cyan-400 font-semibold">({eco.year})</span>
                      </div>
                      <div className="text-xs text-cyan-800 dark:text-cyan-300 font-medium">{eco.role}</div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">{eco.desc}</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setEditingEco(eco);
                          setIsEcoModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Hapus "${eco.name}"?`)) {
                            deleteEcosystem(eco.id);
                            showNotification('Data riwayat berhasil dihapus.');
                          }
                        }}
                        className="p-1.5 rounded-lg bg-slate-200 hover:bg-rose-100 dark:bg-slate-800 dark:hover:bg-rose-950 text-rose-600 dark:text-rose-400"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SERTIFIKASI LENGKAP */}
          {activeTab === 'certs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    Sertifikasi & Kredensial Resmi ({certifications.length} Lisensi)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Kelola sertifikasi Creating BI, Data Prep, Oracle, dan LSP BNSP.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingCert({
                      id: '',
                      title: '',
                      issuer: 'UNIVERSITAS GUNADARMA',
                      period: '2026',
                      scope: '',
                      credentialId: '',
                      status: 'Verified & Active',
                      category: 'academic'
                    });
                    setIsCertModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Sertifikasi</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {certifications.map(cert => (
                  <div key={cert.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-3 shadow-xs">
                    <div>
                      {/* PDF Certificate Document Badge in Admin */}
                      <div className="mb-2.5 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 p-2.5 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-mono font-bold text-[10px] flex items-center gap-1 border border-rose-300 dark:border-rose-900/40 shrink-0">
                            <FileText className="w-4 h-4" />
                            <span>PDF</span>
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                              {cert.fileName || `${cert.title.replace(/\s+/g, '_')}.pdf`}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                              Dokumen Resmi · {cert.fileSize || '1.2 MB'}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-300 dark:border-transparent shrink-0">
                          PDF Aktif
                        </span>
                      </div>

                      <div className="flex justify-between items-start gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{cert.title}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingCert(cert);
                              setIsCertModalOpen(true);
                            }}
                            className="p-1 rounded bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 text-slate-800 dark:text-slate-300 dark:hover:text-white"
                            title="Edit & Ganti File PDF"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Hapus sertifikasi "${cert.title}"?`)) {
                                deleteCertification(cert.id);
                                showNotification('Sertifikasi berhasil dihapus.');
                              }
                            }}
                            className="p-1 rounded bg-slate-200 hover:bg-rose-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 dark:hover:bg-rose-950"
                            title="Hapus"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] text-cyan-800 dark:text-cyan-400 font-mono font-medium">{cert.issuer} ({cert.period})</div>
                      {cert.credentialId && (
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">ID: {cert.credentialId}</div>
                      )}
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{cert.scope}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROYEK & SKRIPSI */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Daftar Proyek & Skripsi</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Edit studi kasus teknis, gambar showcase, dan metrik hasil.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingProj({
                      id: '',
                      title: '',
                      category: 'Web Application',
                      tagline: '',
                      year: '2026',
                      status: 'Completed',
                      image: '/src/assets/images/project_rental_car_1793864849468.jpg',
                      abstract: '',
                      creativeProcess: [],
                      technicalChallenges: [],
                      teamworkReflection: '',
                      dataPrivacyAndEthics: '',
                      techStack: ['PHP', 'MySQL'],
                      metrics: [{ label: 'Hasil', value: '100%' }],
                      hasSimulator: false
                    });
                    setIsProjModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Proyek Baru</span>
                </button>
              </div>

              <div className="space-y-3">
                {projects.map(proj => (
                  <div key={proj.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-16 h-12 rounded-lg object-cover border border-slate-300 dark:border-slate-700 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm">{proj.title}</div>
                        <div className="text-xs text-cyan-800 dark:text-cyan-400 font-mono font-medium">{proj.category} · {proj.year}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{proj.tagline}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => {
                          setEditingProj(proj);
                          setIsProjModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Hapus proyek "${proj.title}"?`)) {
                            deleteProject(proj.id);
                            showNotification('Proyek berhasil dihapus.');
                          }
                        }}
                        className="p-1.5 rounded-lg bg-slate-200 hover:bg-rose-100 dark:bg-slate-800 dark:hover:bg-rose-950 text-rose-600 dark:text-rose-400"
                        title="Hapus proyek"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SIMULASI ARMADA */}
          {activeTab === 'cars' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Armada Simulasi Rekomendasi (Skripsi)</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Atur database mobil yang dikomputasi oleh algoritma SAW.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingCar({
                      id: '',
                      model: '',
                      vendor: '',
                      location: 'Bekasi',
                      distanceKm: 2.5,
                      dailyPrice: 350000,
                      seats: 7,
                      transmission: 'Matic',
                      rating: 4.8,
                      reviewsCount: 20,
                      fuelEfficiency: '15 km/L',
                      tags: ['Keluarga'],
                      baseScore: 90
                    });
                    setIsCarModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Mobil</span>
                </button>
              </div>

              <div className="space-y-3">
                {rentalCars.map(car => (
                  <div key={car.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-xs">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{car.model}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {car.vendor} · {car.location} ({car.distanceKm} km)
                      </div>
                      <div className="text-xs text-cyan-800 dark:text-cyan-300 font-mono font-bold mt-0.5">
                        Rp {car.dailyPrice.toLocaleString('id-ID')}/hari · {car.seats} Kursi · ★ {car.rating}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          setEditingCar(car);
                          setIsCarModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Hapus armada "${car.model}"?`)) {
                            deleteCar(car.id);
                            showNotification('Armada sewa berhasil dihapus.');
                          }
                        }}
                        className="p-1.5 rounded-lg bg-slate-200 hover:bg-rose-100 dark:bg-slate-800 dark:hover:bg-rose-950 text-rose-600 dark:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: KEAMANAN & DEPLOY VERCEL */}
          {activeTab === 'deploy' && (
            <div className="space-y-6">
              
              {/* Step-by-step Vercel Guide */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-cyan-500/40 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
                    <ExternalLink className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    <span>Panduan Deploy Portofolio ke Vercel</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold border border-emerald-300 dark:border-transparent">
                    100% Siap Deploy
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Proyek ini telah dikonfigurasi lengkap dengan file <code className="text-cyan-800 dark:text-cyan-300 font-mono font-bold">vercel.json</code> dan script build Vite standar. Firly dapat mengunggahnya ke GitHub lalu menyambungkannya ke Vercel tanpa konfigurasi rumit.
                </p>

                <div className="space-y-3 pt-2 text-xs text-slate-700 dark:text-slate-300">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
                    <div className="font-bold text-cyan-800 dark:text-cyan-300 font-mono">Langkah 1: Hubungkan ke GitHub</div>
                    <p className="text-slate-600 dark:text-slate-400">
                      Buka repository GitHub Anda dan push seluruh source code proyek ini.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
                    <div className="font-bold text-cyan-800 dark:text-cyan-300 font-mono">Langkah 2: Buka Vercel.com & Import Project</div>
                    <p className="text-slate-600 dark:text-slate-400">
                      Masuk ke dashboard Vercel, pilih <strong>"Add New... Project"</strong>, lalu pilih repository GitHub Anda.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
                    <div className="font-bold text-cyan-800 dark:text-cyan-300 font-mono">Langkah 3: Pengaturan Build (Otomatis Terdeteksi)</div>
                    <ul className="text-slate-600 dark:text-slate-400 space-y-0.5 font-mono text-[11px]">
                      <li>• Framework Preset: <span className="text-slate-900 dark:text-white font-semibold">Vite</span></li>
                      <li>• Build Command: <span className="text-slate-900 dark:text-white font-semibold">npm run build</span></li>
                      <li>• Output Directory: <span className="text-slate-900 dark:text-white font-semibold">dist</span></li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
                    <div className="font-bold text-emerald-700 dark:text-emerald-400 font-mono">Langkah 4: Klik "Deploy"!</div>
                    <p className="text-slate-600 dark:text-slate-400">
                      Dalam hitungan detik, portofolio Firly akan online dengan domain resmi berkecepatan tinggi (misalnya: <code>firly-fahrezi.vercel.app</code>) lengkap dengan dukungan mode gelap, mode terang, PDF CV, dan dasbor CRUD rahasia ini.
                    </p>
                  </div>
                </div>
              </div>

              {/* Security / Change Password */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                  <KeyRound className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Ubah Kata Sandi Admin Rahasia</span>
                </div>

                <form onSubmit={handleUpdatePassword} className="flex gap-2 max-w-md">
                  <input
                    type="password"
                    placeholder="Kata sandi baru..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-200 focus:border-cyan-500 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                  >
                    Perbarui Sandi
                  </button>
                </form>
              </div>

              {/* Reset to Default */}
              <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 flex items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-rose-800 dark:text-rose-300 text-sm flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Reset Data ke Versi Awal CV</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Jika ingin mengembalikan semua teks, riwayat pendidikan, sertifikasi, dan proyek ke data bawaan CV Firly.
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 dark:bg-rose-900/40 dark:hover:bg-rose-900/70 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700/60 font-semibold text-xs transition-colors shrink-0"
                >
                  Reset ke Data Awal
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-cyan-900/40 bg-slate-50 dark:bg-slate-950/80 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
          <span>Akses Rahasia: Mode Admin Aktif untuk Firly Ahmad Fahrezi</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
          >
            Selesai & Tutup Dasbor
          </button>
        </div>

      </div>

      {/* Sub-Modal: Add/Edit Ecosystem */}
      {isEcoModalOpen && editingEco && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80">
          <form onSubmit={handleSaveEco} className="w-full max-w-lg bg-white dark:bg-[#09152b] border border-slate-200 dark:border-cyan-500/50 p-6 rounded-2xl shadow-2xl space-y-4 text-xs text-slate-800 dark:text-slate-200">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              {editingEco.id ? 'Edit Riwayat Pendidikan / Organisasi' : 'Tambah Riwayat Baru'}
            </h4>
            <div className="space-y-1">
              <label className="text-slate-700 dark:text-slate-300 font-semibold">Nama Institusi / Organisasi</label>
              <input
                type="text"
                value={editingEco.name}
                onChange={(e) => setEditingEco({ ...editingEco, name: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-700 dark:text-slate-300 font-semibold">Peran / Status</label>
              <input
                type="text"
                value={editingEco.role}
                onChange={(e) => setEditingEco({ ...editingEco, role: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-700 dark:text-slate-300 font-semibold">Periode / Tahun</label>
              <input
                type="text"
                value={editingEco.year}
                onChange={(e) => setEditingEco({ ...editingEco, year: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-700 dark:text-slate-300 font-semibold">Deskripsi</label>
              <textarea
                rows={3}
                value={editingEco.desc}
                onChange={(e) => setEditingEco({ ...editingEco, desc: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEcoModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sub-Modal: Add/Edit Certification */}
      {isCertModalOpen && editingCert && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 overflow-y-auto">
          <form onSubmit={handleSaveCert} className="w-full max-w-xl bg-white dark:bg-[#09152b] border border-slate-200 dark:border-cyan-500/50 p-6 rounded-2xl shadow-2xl space-y-4 text-xs text-slate-800 dark:text-slate-200 my-6">
            <h4 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-500" />
              <span>{editingCert.id ? 'Edit Sertifikasi & Foto Dokumen' : 'Tambah Sertifikasi Baru'}</span>
            </h4>

            {/* Certificate PDF Document Upload & Live Document Preview */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <span>Dokumen Sertifikat Resmi (File PDF / Dokumen Digital)</span>
                </label>
                {(editingCert.certificatePdf || editingCert.certificateImage) && (
                  <button
                    type="button"
                    onClick={() => setEditingCert({ ...editingCert, certificatePdf: '', certificateImage: '', fileName: '', fileSize: '' })}
                    className="text-[11px] text-rose-600 dark:text-rose-400 hover:underline font-semibold"
                  >
                    Hapus File
                  </button>
                )}
              </div>

              {/* PDF Document Status Card & Preview */}
              {(editingCert.certificatePdf || editingCert.certificateImage) ? (
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/70 border border-rose-300 dark:border-rose-900/50 flex items-center justify-center text-rose-600 dark:text-rose-400 font-bold font-mono text-xs shrink-0">
                        PDF
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {editingCert.fileName || `${editingCert.title.replace(/\s+/g, '_')}.pdf`}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                          Format: Dokumen PDF Resmi · Ukuran: {editingCert.fileSize || 'Tersimpan'}
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-mono text-[10px] font-bold border border-emerald-300 dark:border-transparent shrink-0">
                      Siap Tampil
                    </span>
                  </div>

                  {/* PDF Embedded Reader Preview */}
                  <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 h-40">
                    <iframe
                      src={editingCert.certificatePdf || editingCert.certificateImage}
                      title="Pratinjau PDF"
                      className="w-full h-full border-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-5 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-center space-y-1.5 bg-white/50 dark:bg-slate-950/40">
                  <FileText className="w-8 h-8 text-rose-500 mx-auto opacity-70" />
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Belum ada dokumen PDF diunggah
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Klik tombol di bawah untuk memilih file PDF sertifikat dari perangkat Anda.
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2">
                <label className="flex-1 cursor-pointer py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800/60 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs">
                  <Upload className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <span>Pilih &amp; Upload File PDF Sertifikat (dari HP / Laptop)</span>
                  <input
                    type="file"
                    accept=".pdf,application/pdf,image/*"
                    onChange={handleCertFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                File PDF asli yang Anda unggah akan langsung dapat dibaca via viewer interaktif dan diunduh oleh pengunjung / perekrut di tampilan portofolio publik.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 dark:text-slate-300 font-semibold">Judul Sertifikasi / Pelatihan</label>
              <input
                type="text"
                value={editingCert.title}
                onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Lembaga Penerbit</label>
                <input
                  type="text"
                  value={editingCert.issuer}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Masa Berlaku / Periode</label>
                <input
                  type="text"
                  value={editingCert.period}
                  onChange={(e) => setEditingCert({ ...editingCert, period: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Nomor Kredensial / ID</label>
                <input
                  type="text"
                  value={editingCert.credentialId || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, credentialId: e.target.value })}
                  placeholder="cth. UG-BI-2026-0518"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Kategori</label>
                <select
                  value={editingCert.category || 'academic'}
                  onChange={(e) => setEditingCert({ ...editingCert, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                >
                  <option value="analytics">Business Intelligence & Analitik</option>
                  <option value="database">Basis Data (Oracle / MySQL)</option>
                  <option value="national">Standar Nasional (LSP BNSP)</option>
                  <option value="academic">Akademik Gunadarma</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 dark:text-slate-300 font-semibold">Cakupan Kompetensi</label>
              <textarea
                rows={3}
                value={editingCert.scope}
                onChange={(e) => setEditingCert({ ...editingCert, scope: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCertModalOpen(false)}
                className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors shadow-md shadow-cyan-500/20"
              >
                Simpan Sertifikasi
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sub-Modal: Add/Edit Project */}
      {isProjModalOpen && editingProj && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 overflow-y-auto">
          <form onSubmit={handleSaveProj} className="w-full max-w-2xl bg-white dark:bg-[#09152b] border border-slate-200 dark:border-cyan-500/50 p-6 rounded-2xl shadow-2xl space-y-4 text-xs text-slate-800 dark:text-slate-200 my-6">
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              {editingProj.id ? 'Edit Detail Proyek' : 'Tambah Proyek Baru'}
            </h4>

            {/* Project Image Preview & File Upload */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-4">
              <img
                src={editingProj.image}
                alt="Thumbnail"
                className="w-20 h-14 rounded-lg object-cover border border-slate-300 dark:border-slate-700 shrink-0"
              />
              <div className="space-y-1.5 flex-1">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block">Gambar Sampul Proyek</span>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer px-3 py-1 rounded bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-xs">
                    <Upload className="w-3 h-3" />
                    <span>Upload Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProjectImageFile}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="text"
                    value={editingProj.image}
                    onChange={(e) => setEditingProj({ ...editingProj, image: e.target.value })}
                    placeholder="URL gambar..."
                    className="flex-1 px-2.5 py-1 rounded bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Judul Proyek</label>
                <input
                  type="text"
                  value={editingProj.title}
                  onChange={(e) => setEditingProj({ ...editingProj, title: e.target.value })}
                  required
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Kategori</label>
                <input
                  type="text"
                  value={editingProj.category}
                  onChange={(e) => setEditingProj({ ...editingProj, category: e.target.value })}
                  required
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Tahun</label>
                <input
                  type="text"
                  value={editingProj.year}
                  onChange={(e) => setEditingProj({ ...editingProj, year: e.target.value })}
                  required
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Status Proyek</label>
                <input
                  type="text"
                  value={editingProj.status}
                  onChange={(e) => setEditingProj({ ...editingProj, status: e.target.value })}
                  required
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 dark:text-slate-300 font-semibold">Tagline Ringkas</label>
              <input
                type="text"
                value={editingProj.tagline}
                onChange={(e) => setEditingProj({ ...editingProj, tagline: e.target.value })}
                required
                className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 dark:text-slate-300 font-semibold">Ringkasan / Abstrak Proyek</label>
              <textarea
                rows={3}
                value={editingProj.abstract}
                onChange={(e) => setEditingProj({ ...editingProj, abstract: e.target.value })}
                required
                className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="checkSim"
                checked={editingProj.hasSimulator || false}
                onChange={(e) => setEditingProj({ ...editingProj, hasSimulator: e.target.checked })}
                className="accent-cyan-500"
              />
              <label htmlFor="checkSim" className="text-slate-700 dark:text-slate-300">
                Hubungkan dengan tombol Simulasi Rekomendasi
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsProjModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold"
              >
                Simpan Proyek
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sub-Modal: Add/Edit Rental Car */}
      {isCarModalOpen && editingCar && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80">
          <form onSubmit={handleSaveCar} className="w-full max-w-lg bg-white dark:bg-[#09152b] border border-slate-200 dark:border-cyan-500/50 p-6 rounded-2xl shadow-2xl space-y-4 text-xs text-slate-800 dark:text-slate-200">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              {editingCar.id ? 'Edit Armada Sewa' : 'Tambah Mobil Baru ke Simulasi'}
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Model Kendaraan</label>
                <input
                  type="text"
                  value={editingCar.model}
                  onChange={(e) => setEditingCar({ ...editingCar, model: e.target.value })}
                  required
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Nama Vendor Rental</label>
                <input
                  type="text"
                  value={editingCar.vendor}
                  onChange={(e) => setEditingCar({ ...editingCar, vendor: e.target.value })}
                  required
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Lokasi di Bekasi</label>
                <input
                  type="text"
                  value={editingCar.location}
                  onChange={(e) => setEditingCar({ ...editingCar, location: e.target.value })}
                  required
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Tarif Sewa / Hari (Rp)</label>
                <input
                  type="number"
                  value={editingCar.dailyPrice}
                  onChange={(e) => setEditingCar({ ...editingCar, dailyPrice: Number(e.target.value) })}
                  required
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Kapasitas Kursi</label>
                <input
                  type="number"
                  value={editingCar.seats}
                  onChange={(e) => setEditingCar({ ...editingCar, seats: Number(e.target.value) })}
                  required
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Rating (1 - 5.0)</label>
                <input
                  type="number"
                  step="0.1"
                  value={editingCar.rating}
                  onChange={(e) => setEditingCar({ ...editingCar, rating: Number(e.target.value) })}
                  required
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsCarModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold"
              >
                Simpan Armada
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
