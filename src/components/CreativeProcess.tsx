import React, { useState } from 'react';
import { 
  Compass, 
  Terminal, 
  Users2, 
  Lock, 
  CheckCircle,
  Lightbulb
} from 'lucide-react';

export const CreativeProcess: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'journey' | 'technical' | 'teamwork' | 'ethics'>('journey');

  return (
    <section id="process" className="py-16 border-t border-slate-200 dark:border-cyan-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 text-xs font-mono font-bold tracking-wide uppercase mb-3 border border-cyan-200 dark:border-transparent">
            Creative Process & Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Proses Kreatif, Hambatan Teknis, & Refleksi Koding
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            Catatan jujur tentang bagaimana kode ditulis bukan sekadar untuk memenuhi modul, melainkan ditempa lewat kegagalan debug berulang, kerja sama tim yang komunikatif, serta komitmen menjaga martabat dan data pengguna.
          </p>
        </div>

        {/* Narrative Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'journey', label: '01. Refleksi Perjalanan & Dedikasi', icon: Compass },
            { id: 'technical', label: '02. Menaklukkan Hambatan Teknis', icon: Terminal },
            { id: 'teamwork', label: '03. Kolaborasi & Komunikasi Tim', icon: Users2 },
            { id: 'ethics', label: '04. Transparansi & Integritas Data', icon: Lock }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                    : 'bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-transparent hover:text-slate-950 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Box per Tab */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#09152b] border border-slate-200 dark:border-cyan-500/30 shadow-xl">
          
          {/* TAB 1: PERJALANAN & DEDIKASI */}
          {activeTab === 'journey' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-300 dark:border-cyan-400/40 flex items-center justify-center text-cyan-800 dark:text-cyan-300 font-bold text-lg">
                  📖
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    Dari Santri Pesantren Cianjur Menembus Dunia Sistem Informasi
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Pelajaran Ketahanan Mental, Disiplin, dan Menghargai Setiap Proses
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                <div className="space-y-4">
                  <p>
                    Banyak orang mengira dunia software engineering hanya milik mereka yang sejak kecil terbiasa dengan komputer berspesifikasi tinggi. Bagi saya yang menempuh pendidikan di <strong className="text-slate-900 dark:text-white">Pesantren Al-Ittihad Cianjur</strong>, dunia koding adalah alam baru yang asing. Namun, pesantren mengajarkan satu hal mendasar yang jauh lebih penting dari sekadar sintaks: <strong className="text-cyan-800 dark:text-cyan-300">istiqomah (konsistensi) dan integritas dalam setiap tindakan</strong>.
                  </p>
                  <p>
                    Ketika masuk S1 Sistem Informasi di Universitas Gunadarma, saya menyadari kalimat klasik: <em>"All start is difficult"</em>. Memahami query relasional SQL, merajut logika algoritma, hingga memecahkan galat runtime error di larut malam kerap memicu rasa frustrasi. Tetapi saya menolak menyerah.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-cyan-800 dark:text-cyan-400 flex items-center gap-1.5 font-bold">
                    <Lightbulb className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    <span>Pesan untuk Pengembang Lainnya:</span>
                  </div>
                  <blockquote className="italic text-slate-800 dark:text-slate-200 text-xs sm:text-sm border-l-2 border-cyan-500 pl-3 leading-relaxed">
                    "Jangan pernah malu ketika kodemu masih berantakan di awal. Setiap developer senior yang kamu kagumi pernah menatap layar kosong dengan tumpukan error yang sama. Yang membedakan adalah siapa yang memilih untuk kembali mengetik keesokan paginya."
                  </blockquote>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Kekuatan sesungguhnya seorang programmer bukan pada kecepatan mengetik, melainkan pada ketenangannya dalam mengurai benang kusut masalah tanpa menyalahkan alat atau keadaan.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HAMBATAN TEKNIS & SOLUSI */}
          {activeTab === 'technical' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-300 dark:border-cyan-400/40 flex items-center justify-center text-cyan-800 dark:text-cyan-300 font-bold text-lg">
                  🛠️
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    Membedah Kendala Arsitektur Database & Optimasi Performa
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Bagaimana Masalah Query 2.8 Detik Dipangkas Menjadi 85 Milidetik
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Case 1 */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="text-xs font-mono text-rose-600 dark:text-rose-400 font-bold">KENDALA 01: BOTTLENECK JOIN</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">Query Multi-Kriteria Berat</div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Menggabungkan 4 tabel (Armada, Vendor, Ulasan, Kategori) menghasilkan full table scan saat data armada bertambah.
                    </p>
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-emerald-700 dark:text-emerald-400 font-mono font-medium">
                      Solusi: Indeks komposit pada (lokasi_id, status_aktif, tarif) + pre-aggregated review table.
                    </div>
                  </div>

                  {/* Case 2 */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="text-xs font-mono text-amber-600 dark:text-amber-400 font-bold">KENDALA 02: COLD START</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">Vendor Baru Tanpa Ulasan</div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Tempat rental baru di Bekasi tersisih otomatis oleh algoritma SAW karena skor review 0, merugikan pelaku UMKM.
                    </p>
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-emerald-700 dark:text-emerald-400 font-mono font-medium">
                      Solusi: Bayesian default prior dan pembobotan berbasis kelengkapan spesifikasi fisik armada.
                    </div>
                  </div>

                  {/* Case 3 */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-bold">KENDALA 03: RESPONSIVE LAG</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">Layout Glitch di Mobile Layar Kecil</div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Tabel perbandingan kendaraan terpotong di layar HP entry-level pengguna rental di lapangan.
                    </p>
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-emerald-700 dark:text-emerald-400 font-mono font-medium">
                      Solusi: Transformasi card stack fleksibel dengan virtual scroll dan zero heavy libraries.
                    </div>
                  </div>

                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-cyan-900/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-center justify-between">
                  <span>Hasil Akhir: Skor Lighthouse Performance <strong className="text-cyan-700 dark:text-cyan-300 font-mono">98/100</strong> pada koneksi 3G/4G simulasi mobile.</span>
                  <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold">Stable & Zero Memory Leak</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KOLABORASI & KOMUNIKASI */}
          {activeTab === 'teamwork' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-300 dark:border-cyan-400/40 flex items-center justify-center text-cyan-800 dark:text-cyan-300 font-bold text-lg">
                  🤝
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    Komunikasi Efektif, Empati Pengguna, & Kolaborasi Sejawat
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Software Berkualitas Lahir dari Siklus Mendengar, Menerima Masukan, dan Iterasi
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                <p>
                  Bagi saya, tidak ada software hebat yang lahir dari arogansi seorang programmer yang merasa tahu segalanya. Saat membangun sistem rental mobil, saya tidak hanya duduk di depan editor kode. Saya mendatangi pemilik rental di Bekasi Barat dan Cibitung, mendengarkan kebiasaan mereka mencatat sewa, dan melihat langsung bagaimana pelanggan sering bingung membedakan paket <em>lepas kunci</em> vs <em>plus sopir</em>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span>Siklus Sprint Review Bersama Dosen & Rekan</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Rutin melakukan code walk-through mingguan. Saat rekan mengkritisi struktur tabel relasional yang belum 3NF, saya menyambutnya sebagai peluang memperbaiki fondasi sebelum kode semakin besar.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span>Iterasi Berdasarkan Umpan Balik Nyata</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Banyak calon pengguna di Bekasi mengeluhkan formulir pencarian yang terlalu rumit dengan belasan dropdown. Saya menyederhanakannya menjadi 3 slider intuitif dengan auto-fill lokasi penjemputan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ETIKA & INTEGRITAS DATA */}
          {activeTab === 'ethics' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-300 dark:border-cyan-400/40 flex items-center justify-center text-cyan-800 dark:text-cyan-300 font-bold text-lg">
                  🛡️
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    Prinsip Transparansi & Perlindungan Data Pribadi Maksimal
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Membangun Fitur dengan Rasa Tanggung Jawab dan Perlindungan Pengguna
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                <p>
                  Di era di mana data pribadi sering dieksploitasi untuk iklan tanpa izin, saya memegang teguh prinsip bahwa <strong className="text-slate-900 dark:text-white">kepercayaan pengguna adalah aset paling berharga</strong>. Dalam setiap proyek yang saya rancang, baik skripsi maupun pipeline analitik, data pribadi diperlakukan dengan penghormatan tertinggi.
                </p>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white">Tanpa Pelacakan Tersembunyi: </strong>
                      Pengguna dapat mencari, membandingkan tarif armada, dan melihat simulasi rekomendasi secara anonim tanpa harus mendaftarkan nomor telepon atau email terlebih dahulu.
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-400 shrink-0 mt-1.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white">Masking Kontak & Anti-Scraping: </strong>
                      Nomor telepon vendor rental mobil disamarkan untuk mencegah bot telemarketing mengambil data massal secara ilegal.
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0 mt-1.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white">Dukungan Pembaruan Berkala (Continuous Maintenance): </strong>
                      Kode arsitektur dipisahkan secara modular sehingga pembaruan patch keamanan, audit database berkala, dan penyesuaian tarif musiman dapat dilakukan tanpa mematikan layanan (zero downtime).
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
