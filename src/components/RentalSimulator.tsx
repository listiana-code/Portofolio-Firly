import React, { useState, useMemo } from 'react';
import { Sliders, MapPin, Check, ShieldCheck, Sparkles, Info } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const RentalSimulator: React.FC = () => {
  const { rentalCars, profile } = usePortfolio();
  const [priority, setPriority] = useState<'balanced' | 'budget' | 'rating' | 'distance'>('balanced');
  const [maxBudget, setMaxBudget] = useState<number>(600000);
  const [minSeats, setMinSeats] = useState<number>(5);
  const [selectedSubdistrict, setSelectedSubdistrict] = useState<string>('all');
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState<string | null>(null);

  // Live Multi-Criteria Decision Calculation (SAW - Simple Additive Weighting Simulation)
  const scoredCars = useMemo(() => {
    // Determine weights based on user priority
    let wPrice = 0.35;
    let wRating = 0.30;
    let wDistance = 0.20;
    let wSeats = 0.15;

    if (priority === 'budget') {
      wPrice = 0.55;
      wRating = 0.20;
      wDistance = 0.15;
      wSeats = 0.10;
    } else if (priority === 'rating') {
      wPrice = 0.15;
      wRating = 0.60;
      wDistance = 0.15;
      wSeats = 0.10;
    } else if (priority === 'distance') {
      wPrice = 0.20;
      wRating = 0.20;
      wDistance = 0.50;
      wSeats = 0.10;
    }

    // Filter by basic constraints
    const filtered = rentalCars.filter(car => {
      const budgetOk = car.dailyPrice <= maxBudget;
      const seatsOk = car.seats >= minSeats;
      const locationOk = selectedSubdistrict === 'all' || car.location.toLowerCase().includes(selectedSubdistrict.toLowerCase());
      return budgetOk && seatsOk && locationOk;
    });

    if (filtered.length === 0) return [];

    // Calculate min/max for normalization
    const minPrice = Math.min(...rentalCars.map(c => c.dailyPrice));
    const maxRating = Math.max(...rentalCars.map(c => c.rating));
    const minDistance = Math.min(...rentalCars.map(c => c.distanceKm));

    return filtered.map(car => {
      // Cost attribute (Price): lower is better -> minPrice / carPrice
      const normPrice = minPrice / car.dailyPrice;
      
      // Benefit attribute (Rating): higher is better -> carRating / maxRating
      const normRating = car.rating / maxRating;

      // Cost attribute (Distance): closer is better -> minDistance / carDistance
      const normDistance = minDistance / Math.max(car.distanceKm, 0.5);

      // Benefit attribute (Seats)
      const normSeats = car.seats >= 7 ? 1.0 : 0.75;

      const totalScore = (normPrice * wPrice + normRating * wRating + normDistance * wDistance + normSeats * wSeats) * 100;

      return {
        ...car,
        calculatedScore: Math.min(Math.round(totalScore), 99),
        scoreBreakdown: {
          priceFactor: Math.round(normPrice * 100),
          ratingFactor: Math.round(normRating * 100),
          distanceFactor: Math.round(normDistance * 100)
        }
      };
    }).sort((a, b) => b.calculatedScore - a.calculatedScore);
  }, [rentalCars, priority, maxBudget, minSeats, selectedSubdistrict]);

  const handleSimulateInquiry = (carModel: string, vendor: string) => {
    setBookingSuccessMsg(`Simulasi Berhasil: Permintaan ketersediaan untuk "${carModel}" dari ${vendor} terenkripsi tanpa menyimpan cookies pelacakan pribadi.`);
    setTimeout(() => {
      setBookingSuccessMsg(null);
    }, 6000);
  };

  return (
    <section id="simulator" className="py-16 border-t border-slate-200 dark:border-cyan-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 text-xs font-mono font-bold tracking-wide uppercase mb-3 border border-cyan-200 dark:border-transparent">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Skripsi Simulation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Simulasi Algoritma Rekomendasi Rental Bekasi
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            Uji coba langsung logika pembobotan multi-kriteria (MCDA / SAW) yang dirancang Firly untuk skripsi {profile.degree} {profile.institution}. Ubah parameter prioritas dan lihat ranking armada secara real-time.
          </p>
        </div>

        {/* Simulator Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (Left Col) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#09152b] border border-slate-200 dark:border-cyan-500/30 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Parameter Preferensi Pengguna</span>
              </span>
              <span className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 font-semibold">Live Compute</span>
            </div>

            {/* 1. Prioritas Utama */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-800 dark:text-slate-300 block">
                Prioritas Keputusan:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPriority('balanced')}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    priority === 'balanced' 
                      ? 'bg-cyan-50 border-cyan-400 text-cyan-900 dark:bg-cyan-500/20 dark:border-cyan-400 dark:text-cyan-300 font-bold shadow-xs' 
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold">Seimbang</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Harga, Jarak & Rating merata</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPriority('budget')}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    priority === 'budget' 
                      ? 'bg-cyan-50 border-cyan-400 text-cyan-900 dark:bg-cyan-500/20 dark:border-cyan-400 dark:text-cyan-300 font-bold shadow-xs' 
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold">Budget Paling Hemat</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Bobot harga sewa 55%</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPriority('rating')}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    priority === 'rating' 
                      ? 'bg-cyan-50 border-cyan-400 text-cyan-900 dark:bg-cyan-500/20 dark:border-cyan-400 dark:text-cyan-300 font-bold shadow-xs' 
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold">Rating & Kenyamanan</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Bobot ulasan 60%</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPriority('distance')}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    priority === 'distance' 
                      ? 'bg-cyan-50 border-cyan-400 text-cyan-900 dark:bg-cyan-500/20 dark:border-cyan-400 dark:text-cyan-300 font-bold shadow-xs' 
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold">Jarak Terdekat</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Prioritas radius penjemputan</div>
                </button>
              </div>
            </div>

            {/* 2. Slider Batas Tarif Harian */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-300">Batas Maksimal Tarif / Hari:</span>
                <span className="font-mono text-cyan-700 dark:text-cyan-400 font-bold">
                  Rp {maxBudget.toLocaleString('id-ID')}
                </span>
              </div>
              <input 
                type="range"
                min={250000}
                max={900000}
                step={25000}
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-200 dark:bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Rp 250.000</span>
                <span>Rp 900.000</span>
              </div>
            </div>

            {/* 3. Kapasitas Penumpang Minimal */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-800 dark:text-slate-300 block">
                Kapasitas Kursi Minimal:
              </label>
              <div className="flex gap-2">
                {[
                  { label: 'Semua (5+ Kursi)', val: 5 },
                  { label: 'Keluarga Besar (7 Kursi)', val: 7 }
                ].map(opt => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => setMinSeats(opt.val)}
                    className={`flex-1 py-2 px-3 rounded-lg border text-xs font-medium transition-colors ${
                      minSeats === opt.val
                        ? 'bg-cyan-50 border-cyan-400 text-cyan-900 dark:bg-cyan-500/20 dark:border-cyan-400 dark:text-cyan-300 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Filter Titik Wilayah Bekasi */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-800 dark:text-slate-300 block">
                Fokus Lokasi di Bekasi:
              </label>
              <select
                value={selectedSubdistrict}
                onChange={(e) => setSelectedSubdistrict(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-400"
              >
                <option value="all">Semua Area Bekasi Terdaftar</option>
                <option value="Cibitung">Cibitung (Dekat Tempat Tinggal Firly)</option>
                <option value="Pekayon">Pekayon Jaya / Bekasi Selatan</option>
                <option value="Summarecon">Summarecon Bekasi / Bekasi Utara</option>
                <option value="Tambun">Tambun Selatan</option>
                <option value="Cikarang">Cikarang Barat / Kawasan Industri</option>
              </select>
            </div>

            {/* Algorithmic Integrity Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-cyan-900/40 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
              <div className="font-semibold text-cyan-800 dark:text-cyan-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Prinsip Zero-Bias Skripsi:</span>
              </div>
              <p className="leading-relaxed">
                Algoritma tidak memihak sponsor berbayar. Skor dihitung secara objektif berdasarkan matriks terstandarisasi untuk melindungi konsumen dari markup harga.
              </p>
            </div>
          </div>

          {/* Results Showcase (Right Col) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Hasil Urutan Rekomendasi Teratas</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 border border-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800 font-semibold">
                  {scoredCars.length} Armada Cocok
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Skor Relatif: SAW Method
              </span>
            </div>

            {/* Toast Success Message */}
            {bookingSuccessMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/50 text-emerald-800 dark:text-emerald-300 text-xs flex items-start gap-2 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{bookingSuccessMsg}</span>
              </div>
            )}

            {/* List of Scored Fleet */}
            {scoredCars.length > 0 ? (
              <div className="space-y-3">
                {scoredCars.map((car, idx) => {
                  const isTop = idx === 0;
                  return (
                    <div
                      key={car.id}
                      className={`p-4 rounded-xl border transition-all shadow-sm ${
                        isTop 
                          ? 'bg-cyan-50/70 border-cyan-400 dark:bg-[#0d1e38] dark:border-cyan-400/80' 
                          : 'bg-white border-slate-200 dark:bg-slate-900/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {isTop && (
                              <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-xs">
                                <Sparkles className="w-3 h-3 fill-current" />
                                <span>Peringkat 1</span>
                              </span>
                            )}
                            <h4 className="font-bold text-slate-900 dark:text-white text-base">
                              {car.model}
                            </h4>
                          </div>

                          <div className="text-xs text-slate-600 dark:text-slate-400 flex flex-wrap items-center gap-2">
                            <span className="text-cyan-800 dark:text-cyan-300 font-semibold">{car.vendor}</span>
                            <span aria-hidden="true">·</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{car.location} ({car.distanceKm} km)</span>
                            </span>
                          </div>
                        </div>

                        {/* Price & Match Score */}
                        <div className="text-left sm:text-right shrink-0">
                          <div className="text-cyan-800 dark:text-cyan-300 font-bold text-base font-mono">
                            Rp {car.dailyPrice.toLocaleString('id-ID')}
                            <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/hari</span>
                          </div>
                          <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                            Skor Kecocokan: {car.calculatedScore}%
                          </div>
                        </div>
                      </div>

                      {/* Specs and Score Bar */}
                      <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex flex-wrap items-center gap-1.5 text-slate-700 dark:text-slate-300">
                          <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px] font-mono border border-slate-200 dark:border-transparent">
                            {car.seats} Kursi
                          </span>
                          <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px] font-mono border border-slate-200 dark:border-transparent">
                            {car.transmission}
                          </span>
                          <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px] font-mono border border-slate-200 dark:border-transparent">
                            ★ {car.rating} ({car.reviewsCount} review)
                          </span>
                        </div>

                        <button
                          onClick={() => handleSimulateInquiry(car.model, car.vendor)}
                          className="px-3 py-1.5 rounded-lg bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-500/20 dark:hover:bg-cyan-500/30 text-cyan-900 dark:text-cyan-300 text-xs font-semibold border border-cyan-300 dark:border-cyan-500/40 transition-colors"
                        >
                          Tes Request Ketersediaan
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2 shadow-sm">
                <Info className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mx-auto" />
                <div className="text-sm font-bold text-slate-900 dark:text-white">Tidak Ada Armada yang Sesuai Filter</div>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Cobalah menaikkan slider batas tarif harian atau memilih wilayah Bekasi yang lebih luas.
                </p>
                <button
                  onClick={() => {
                    setMaxBudget(750000);
                    setMinSeats(5);
                    setSelectedSubdistrict('all');
                  }}
                  className="mt-2 px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
                >
                  Reset Filter Default
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
