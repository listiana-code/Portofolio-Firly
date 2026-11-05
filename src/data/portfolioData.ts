export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  year: string;
  status: string;
  image: string;
  abstract: string;
  creativeProcess: string[];
  technicalChallenges: {
    problem: string;
    analysis: string;
    solution: string;
  }[];
  teamworkReflection: string;
  dataPrivacyAndEthics: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  liveUrl?: string;
  hasSimulator?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'deploy' | 'project' | 'cert' | 'ping';
  read: boolean;
}

export interface EcosystemItem {
  id: string;
  name: string;
  role: string;
  year: string;
  desc: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  period: string;
  scope: string;
  credentialId?: string;
  category?: 'academic' | 'national' | 'database' | 'analytics';
  skillsVerified?: string[];
  status?: string;
  certificateImage?: string;
  certificatePdf?: string;
  fileType?: 'pdf' | 'image';
  fileName?: string;
  fileSize?: string;
}

export interface TechSkillItem {
  id: string;
  name: string;
  category: string;
  level: string;
  desc: string;
}

export interface RentalCarItem {
  id: string;
  model: string;
  vendor: string;
  location: string;
  distanceKm: number;
  dailyPrice: number;
  seats: number;
  transmission: string;
  rating: number;
  reviewsCount: number;
  fuelEfficiency: string;
  tags: string[];
  baseScore: number;
}

export interface ProfileInfo {
  name: string;
  nickname: string;
  handle: string;
  instagram: string;
  email: string;
  phone: string;
  whatsappUrl: string;
  address: string;
  locationShort: string;
  degree: string;
  institution: string;
  gpa?: string;
  period: string;
  highSchool: string;
  highSchoolPeriod: string;
  highSchoolScore?: string;
  heroMantra: string;
  heroSubtitle: string;
  personalNarrative: string;
  avatarUrl: string;
  adminPassword?: string;
}

export const DEFAULT_PROFILE_INFO: ProfileInfo = {
  name: "Firly Ahmad Fahrezi",
  nickname: "Firly",
  handle: "firly.dev",
  instagram: "@firly_fahrezi",
  email: "firlyfirly666@gmail.com",
  phone: "087722758956",
  whatsappUrl: "https://wa.me/6287722758956?text=Halo%20Firly,%20saya%20tertarik%20dengan%20portofolio%20Anda",
  address: "Grama Puri Taman Sari Blok E5 No 2, Rt 012/Rw 033, Wanasari, Cibitung, Kab. Bekasi, Jawa Barat",
  locationShort: "Cibitung, Bekasi, Jawa Barat",
  degree: "S1 Sistem Informasi",
  institution: "Universitas Gunadarma",
  gpa: "",
  period: "2022 - 2026",
  highSchool: "SMA / Pesantren Al-Ittihad Cianjur",
  highSchoolPeriod: "2019 - 2022",
  highSchoolScore: "",
  avatarUrl: "/images/firly_profile_avatar_1793864847835.jpg",
  heroMantra: "All start is difficult",
  heroSubtitle: "Perjalanan dari santri di Pesantren Al-Ittihad Cianjur hingga merancang sistem informasi berbasis data dan algoritma rekomendasi di Universitas Gunadarma.",
  adminPassword: "firlyahmad2026",
  personalNarrative: `Hello everyone... Namaku Firly Ahmad Fahrezi. Mungkin perjalanan kodingku tidak dimulai dari privilege fasilitas mewah atau bootcamp mahal. Aku tumbuh dengan latar belakang pendidikan pesantren di Al-Ittihad Cianjur, di mana nilai disiplin, ketekunan, dan kejujuran ditempa setiap hari.

Ketika memutuskan melangkah ke jenjang S1 Sistem Informasi di Universitas Gunadarma, aku menghadapi dunia yang sangat dinamis: barisan kode PHP, query relasional MySQL, optimasi algoritma, hingga kompleksitas analisis data. Awalnya terasa menantang—"All start is difficult"—namun bagiku, setiap baris kode adalah amanah.

Sebagai proyek tugas akhir skripsi, aku turun langsung ke lapangan mengembangkan Website Sistem Rekomendasi Tempat Rental Mobil di wilayah Bekasi. Aku mendengar langsung keluhan pengguna lokal yang kesulitan membandingkan harga transparan dan kapasitas armada, serta mendengar kekhawatiran pemilik rental kecil yang kalah bersaing dengan agregator besar. Proyek ini bukan sekadar tugas lulus, melainkan pembuktian bahwa teknologi harus mempermudah hidup manusia dengan penuh tanggung jawab dan integritas data.`
};

export const DEFAULT_ECOSYSTEMS: EcosystemItem[] = [
  {
    id: "eco-1",
    name: "Universitas Gunadarma",
    role: "S1 Sistem Informasi",
    year: "2022 - 2026",
    desc: "Fokus pada Rekayasa Perangkat Lunak, Basis Data Relasional, dan Business Intelligence"
  },
  {
    id: "eco-2",
    name: "Pesantren Al-Ittihad Cianjur",
    role: "Alumni SMA Jurusan IPS",
    year: "2019 - 2022",
    desc: "Landasan karakter, kedisiplinan, integritas etika, dan kemampuan adaptasi tinggi"
  },
  {
    id: "eco-3",
    name: "LSP BNSP Republik Indonesia",
    role: "Sertifikasi Data Analyst (TIK)",
    year: "2026",
    desc: "Uji kompetensi nasional pengolahan data, visualisasi, dan analitik keputusan"
  },
  {
    id: "eco-4",
    name: "Komunitas Pengembang Bekasi",
    role: "Kontributor & Pembelajar Aktif",
    year: "2023 - Sekarang",
    desc: "Diskusi solusi teknologi lokal ramah UMKM dan arsitektur database efisien"
  }
];

export const generateCertificateSvg = (
  title: string, 
  issuer: string, 
  credentialId: string = 'UG-CERT-2026', 
  accentColor: string = '#0ea5e9'
): string => {
  const cleanTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const cleanIssuer = issuer.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="100%" height="100%">
    <defs>
      <linearGradient id="certBg_${credentialId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a1222"/>
        <stop offset="50%" stop-color="#050a14"/>
        <stop offset="100%" stop-color="#08101e"/>
      </linearGradient>
      <pattern id="gridPattern_${credentialId}" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(56, 189, 248, 0.05)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="900" height="600" fill="url(#certBg_${credentialId})"/>
    <rect width="900" height="600" fill="url(#gridPattern_${credentialId})"/>
    <rect x="25" y="25" width="850" height="550" fill="none" stroke="${accentColor}" stroke-width="2" stroke-opacity="0.5" rx="16"/>
    <rect x="36" y="36" width="828" height="528" fill="none" stroke="${accentColor}" stroke-width="1" stroke-dasharray="6 4" stroke-opacity="0.3" rx="10"/>
    
    <path d="M 45 75 L 45 45 L 75 45" fill="none" stroke="${accentColor}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 855 75 L 855 45 L 825 45" fill="none" stroke="${accentColor}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 45 525 L 45 555 L 75 555" fill="none" stroke="${accentColor}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 855 525 L 855 555 L 825 555" fill="none" stroke="${accentColor}" stroke-width="3" stroke-linecap="round"/>

    <circle cx="450" cy="105" r="40" fill="#0c1e38" stroke="${accentColor}" stroke-width="2"/>
    <polygon points="450,80 460,102 484,105 466,120 472,144 450,130 428,144 434,120 416,105 440,102" fill="${accentColor}" fill-opacity="0.9"/>

    <text x="450" y="178" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#38bdf8" letter-spacing="4" text-anchor="middle" font-weight="700">SERTIFIKAT KOMPETENSI RESMI</text>
    <text x="450" y="202" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="#94a3b8" letter-spacing="2" text-anchor="middle">REPUBLIK INDONESIA · KREDENSIAL TERVERIFIKASI</text>

    <text x="450" y="248" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Diberikan secara sah kepada:</text>
    <text x="450" y="286" font-family="'Plus Jakarta Sans', sans-serif" font-size="26" fill="#ffffff" text-anchor="middle" font-weight="800" letter-spacing="1">FIRLY AHMAD FAHREZI</text>
    <line x1="280" y1="298" x2="620" y2="298" stroke="${accentColor}" stroke-width="1.5" stroke-opacity="0.6"/>

    <text x="450" y="336" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Atas kelulusan dan pemenuhan seluruh standar uji kompetensi:</text>
    <text x="450" y="375" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" fill="#38bdf8" text-anchor="middle" font-weight="700">${cleanTitle}</text>
    <text x="450" y="405" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#e2e8f0" text-anchor="middle" font-weight="600">${cleanIssuer}</text>

    <line x1="100" y1="460" x2="800" y2="460" stroke="rgba(148, 163, 184, 0.2)" stroke-width="1"/>
    
    <g transform="translate(100, 485)">
      <text x="0" y="0" font-family="monospace" font-size="10" fill="#64748b">STATUS LISENSI</text>
      <text x="0" y="18" font-family="monospace" font-size="12" fill="#10b981" font-weight="700">VERIFIED &amp; ACTIVE</text>
    </g>

    <g transform="translate(450, 485)">
      <text x="0" y="0" font-family="monospace" font-size="10" fill="#64748b" text-anchor="middle">NOMOR KREDENSIAL RESMI</text>
      <text x="0" y="18" font-family="monospace" font-size="13" fill="#38bdf8" text-anchor="middle" font-weight="700">${credentialId}</text>
    </g>

    <g transform="translate(800, 485)">
      <text x="0" y="0" font-family="monospace" font-size="10" fill="#64748b" text-anchor="end">OTORITAS SERTIFIKASI</text>
      <text x="0" y="18" font-family="monospace" font-size="12" fill="#94a3b8" text-anchor="end" font-weight="600">KOMISI UJI AKADEMIK</text>
    </g>

    <text x="450" y="545" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" fill="#475569" text-anchor="middle">Arsip digital resmi firly.dev — Dapat diverifikasi secara independen melalui lembaga penerbit terkait.</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const DEFAULT_CERTIFICATIONS: CertificationItem[] = [
  {
    id: "cert-1",
    title: "Creating Business Intelligence",
    issuer: "UNIVERSITAS GUNADARMA",
    period: "Mei 2026 - Mei 2027",
    category: "analytics",
    credentialId: "UG-BI-2026-0518",
    status: "Verified & Active",
    skillsVerified: ["Data Warehousing", "ETL Process", "Executive Dashboard", "KPI Modeling"],
    scope: "Perancangan data warehouse, pemodelan skema analitis (Star Schema), pembuatan dasbor eksekutif interaktif, dan pelaporan intelijen bisnis untuk pengambilan keputusan strategis.",
    certificateImage: generateCertificateSvg("Creating Business Intelligence", "UNIVERSITAS GUNADARMA", "UG-BI-2026-0518", "#0ea5e9"),
    fileType: "pdf",
    fileName: "Sertifikat_Creating_BI_Gunadarma.pdf",
    fileSize: "1.2 MB"
  },
  {
    id: "cert-2",
    title: "Data Preparation for Business Processes",
    issuer: "UNIVERSITAS GUNADARMA",
    period: "September 2025 - September 2028",
    category: "analytics",
    credentialId: "UG-DP-2025-9042",
    status: "Verified & Active",
    skillsVerified: ["Data Cleaning", "Data Imputation", "Outlier Detection", "Schema Normalization"],
    scope: "Pembersihan dataset transaksional berskala besar, deteksi anomali nilai null/duplikat, normalisasi relasional, dan standarisasi pipeline data operasional perusahaan.",
    certificateImage: generateCertificateSvg("Data Preparation for Business Processes", "UNIVERSITAS GUNADARMA", "UG-DP-2025-9042", "#06b6d4"),
    fileType: "pdf",
    fileName: "Sertifikat_Data_Preparation_UG.pdf",
    fileSize: "980 KB"
  },
  {
    id: "cert-3",
    title: "ORACLE FOR INTERMEDIATE",
    issuer: "UNIVERSITAS GUNADARMA",
    period: "Agustus 2025 - Agustus 2027",
    category: "database",
    credentialId: "UG-ORA-2025-7811",
    status: "Verified & Active",
    skillsVerified: ["PL/SQL", "Subqueries", "Index Optimization", "Transaction Management"],
    scope: "Pemrograman basis data tingkat menengah menggunakan Oracle PL/SQL, optimasi query berkecepatan tinggi, pengelolaan view & store procedures, serta integritas referensial.",
    certificateImage: generateCertificateSvg("ORACLE FOR INTERMEDIATE", "UNIVERSITAS GUNADARMA", "UG-ORA-2025-7811", "#f97316"),
    fileType: "pdf",
    fileName: "Sertifikat_Oracle_Intermediate_Gunadarma.pdf",
    fileSize: "1.4 MB"
  },
  {
    id: "cert-4",
    title: "Teknologi Informasi Dan Komunikasi - Data Analyst",
    issuer: "Lembaga Sertifikasi Program (LSP) / BNSP",
    period: "Mei 2026 - Juni 2026",
    category: "national",
    credentialId: "BNSP-LSP-TIK-2026-4409",
    status: "National Standard Certified",
    skillsVerified: ["Exploratory Data Analysis", "Statistical Hypothesis", "Data Visualization", "Decision Reporting"],
    scope: "Standar Kompetensi Kerja Nasional Indonesia (SKKNI) bidang Analis Data: perumusan hipotesis kuantitatif, analisis statistik korelasi tren, visualisasi data, dan penyusunan rekomendasi solusi bisnis.",
    certificateImage: generateCertificateSvg("Teknologi Informasi Dan Komunikasi - Data Analyst", "LSP TELEMATIKA / BNSP RI", "BNSP-LSP-TIK-2026-4409", "#10b981"),
    fileType: "pdf",
    fileName: "Sertifikat_BNSP_Data_Analyst_SKKNI.pdf",
    fileSize: "2.1 MB"
  },
  {
    id: "cert-5",
    title: "Business Intelligence Reporting & Analytics Lab",
    issuer: "Laboratorium Sistem Informasi Gunadarma",
    period: "2025 - 2026",
    category: "academic",
    credentialId: "LAB-SI-UG-2025-3312",
    status: "Completed with Distinction",
    skillsVerified: ["Power BI", "SQL Server Reporting", "Pivot Analysis", "Data Cleansing"],
    scope: "Praktikum intensif pengolahan data riil sektor otomotif dan ritel menggunakan alat analitik modern serta penyusunan dashboard visual untuk evaluasi penjualan armada.",
    certificateImage: generateCertificateSvg("Business Intelligence Reporting & Analytics Lab", "Laboratorium Sistem Informasi UG", "LAB-SI-UG-2025-3312", "#6366f1"),
    fileType: "pdf",
    fileName: "Sertifikat_Lab_SI_Gunadarma.pdf",
    fileSize: "850 KB"
  },
  {
    id: "cert-6",
    title: "Database Administration & SQL Optimization",
    issuer: "Universitas Gunadarma - Fakultas Ilmu Komputer & TI",
    period: "2024 - 2025",
    category: "database",
    credentialId: "UG-DBA-2024-1189",
    status: "Certified",
    skillsVerified: ["MySQL 3NF", "Composite Indexing", "PDO Prepared Statements", "Query Tuning"],
    scope: "Perancangan database relasional enterprise, teknik indexing komposit untuk memangkas latency pencarian multi-kriteria dari 2.8 detik menjadi 85ms, dan audit keamanan anti-SQL Injection.",
    certificateImage: generateCertificateSvg("Database Administration & SQL Optimization", "Fakultas Ilmu Komputer & TI UG", "UG-DBA-2024-1189", "#14b8a6"),
    fileType: "pdf",
    fileName: "Sertifikat_SQL_Database_Tuning_UG.pdf",
    fileSize: "1.1 MB"
  }
];

export const DEFAULT_TECH_SKILLS: TechSkillItem[] = [
  { id: "tech-1", name: "PHP", category: "backend", level: "Mahir", desc: "Arsitektur MVC, PDO prepared statements, REST API endpoints, logika rekomendasi" },
  { id: "tech-2", name: "MySQL & SQL", category: "database", level: "Mahir", desc: "Desain skema relasional, normalisasi 3NF, query indeksasi & optimasi agregasi" },
  { id: "tech-3", name: "JavaScript", category: "frontend", level: "Menengah", desc: "DOM reaktif, interaksi peta interaktif, AJAX asynchronous, validasi dinamis" },
  { id: "tech-4", name: "HTML5 & CSS3", category: "frontend", level: "Mahir", desc: "Struktur semantik, tata letak responsif mobile-first, animasi transisi halus" },
  { id: "tech-5", name: "Oracle DB", category: "database", level: "Tersertifikasi", desc: "Query lanjutan PL/SQL, manajemen view, constraint integritas data" },
  { id: "tech-6", name: "Business Intelligence", category: "analytics", level: "Tersertifikasi", desc: "Data modeling, dashboard analitik, eksplorasi tren penjualan & armada" },
  { id: "tech-7", name: "Machine Learning (Basics)", category: "analytics", level: "Konseptual", desc: "Algoritma rekomendasi multi-kriteria, Collaborative Filtering, Decision Tree" },
  { id: "tech-8", name: "Microsoft Excel & Office", category: "tools", level: "Mahir", desc: "Pivot tables, pemodelan data keuangan, otomasi rumus kalkulasi" }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "rental-bekasi",
    title: "Sistem Rekomendasi Tempat Rental Mobil Bekasi",
    category: "Full-Stack Web & Decision Support System",
    tagline: "Sistem pendukung keputusan cerdas untuk pencarian armada rental mobil terpercaya di wilayah Bekasi berbasis multi-kriteria.",
    year: "2025 - 2026",
    status: "Skripsi Tingkat Akhir (Completed)",
    image: "/images/project_rental_car_1793864849468.jpg",
    hasSimulator: true,
    abstract: `Dikembangkan sebagai tugas akhir S1 Sistem Informasi di Universitas Gunadarma. Proyek ini memetakan dan merekomendasikan tempat rental mobil terverifikasi di seantero Bekasi (Cibitung, Tambun, Summarecon, Pekayon, Cikarang) dengan mempertimbangkan multi-kriteria: harga harian, kelengkapan surat kendaraan, jarak dari lokasi penjemputan, rating pelanggan riil, dan ketersediaan sopir.`,
    creativeProcess: [
      "Fase 1: Wawancara Langsung — Mendatangi 12 pengelola rental mobil di Bekasi untuk membedah masalah utama (minimnya visibilitas online dan ketidakpastian harga sewa saat musim liburan).",
      "Fase 2: Perumusan Matriks Keputusan — Merumuskan bobot kriteria matematis (Simple Additive Weighting / Multi-Criteria Decision Analysis) agar hasil urutan rekomendasi adil dan transparan.",
      "Fase 3: Pemodelan Skema Data — Menyusun struktur tabel relasional (Rental, Armada, Transaksi, Review, Kriteria) yang ternormalisasi untuk mencegah anomali data.",
      "Fase 4: Uji Coba Pengguna (Usability Testing) — Melibatkan 25 calon penyewa untuk menguji kemudahan antarmuka di layar smartphone dan laptop."
    ],
    technicalChallenges: [
      {
        problem: "Bottleneck Kecepatan Query Multi-Kriteria",
        analysis: "Saat pengguna memfilter berdasarkan gabungan tipe mobil, rentang tarif, radius jarak, dan rating review, query SQL melibatkan 4 JOIN tabel dengan kalkulasi agregat berulang sehingga loading melambat hingga 2.8 detik.",
        solution: "Menerapkan Composite Indexing pada kolom (kota_id, status_armada, harga_sewa) serta membuat materialized summary view untuk rating review. Waktu respons query terpangkas menjadi rata-rata 85ms."
      },
      {
        problem: "Cold-Start Problem pada Vendor Rental Baru",
        analysis: "Tempat rental mobil baru yang belum memiliki review pelanggan cenderung terlempar ke posisi paling bawah oleh algoritma rekomendasi murni, meski armada mereka masih prima dan tarif kompetitif.",
        solution: "Menambahkan hybrid default damping factor dan pembobotan berbasis kelengkapan spesifikasi kendaraan & verifikasi administrasi fisik. Hal ini memberi peluang adil bagi pelaku usaha baru tanpa mengorbankan kualitas rekomendasi."
      },
      {
        problem: "Perlindungan Data & Transparansi Privasi",
        analysis: "Rawannya scraping data nomor telepon pemilik rental oleh pihak telemarketing tidak bertanggung jawab, serta kebutuhan proteksi data pencarian pelanggan.",
        solution: "Menerapkan masking nomor kontak dengan verifikasi session pengguna, mematikan pelacakan cookies pihak ketiga, dan menggunakan PDO Prepared Statements untuk mengeliminasi celah SQL Injection secara total."
      }
    ],
    teamworkReflection: "Dalam pengembangannya, saya berkoordinasi intensif dengan Dosen Pembimbing untuk memvalidasi rumus kalkulasi bobot, serta berdiskusi dengan rekan mahasiswa penguji untuk menemukan edge-case skenario (misalnya input tanggal libur nasional atau armada yang tiba-tiba habis dipesan). Kolaborasi yang terbuka dan saling meninjau kode menghasilkan sistem yang jauh lebih stabil dan tahan banting.",
    dataPrivacyAndEthics: "Prinsip utama sistem ini adalah 'Privasi Berkeadilan'. Data penyewa tidak pernah dijual atau digunakan untuk iklan tersembunyi. Pengguna dapat mencari dan membandingkan secara anonim tanpa dipaksa mendaftar akun terlebih dahulu.",
    techStack: ["PHP (Native MVC)", "MySQL Relational DB", "JavaScript & AJAX", "Tailwind CSS", "Leaflet Geo-Mapping", "Apache HTTP Server"],
    metrics: [
      { label: "Waktu Eksekusi Query", value: "85ms" },
      { label: "Akurasi Rekomendasi", value: "94.2%" },
      { label: "Vendor Terdata", value: "12+ Titik Bekasi" },
      { label: "Skor Kepuasan UI", value: "4.8 / 5.0" }
    ]
  },
  {
    id: "bi-analytics-pipeline",
    title: "Enterprise BI Dashboard & Data Preparation Pipeline",
    category: "Business Intelligence & Data Engineering",
    tagline: "Pipeline persiapan data transaksional dan perancangan data warehouse untuk visualisasi metrik performa armada dan pendapatan.",
    year: "2025 - 2026",
    status: "Certified Project (Creating BI & Data Prep)",
    image: "/images/project_bi_dashboard_1793864849901.jpg",
    hasSimulator: false,
    abstract: `Proyek komprehensif dalam rangkaian sertifikasi Creating Business Intelligence & Data Preparation for Business Processes di Universitas Gunadarma. Berfokus pada pemrosesan dataset log transaksi, pembersihan data kotor (ETL), pembentukan skema bintang (Star Schema), serta dashboard pemantauan tren permintaan armada kendaraan.`,
    creativeProcess: [
      "Tahap 1: Ingestion & Profiling — Menganalisis 50.000+ baris data log transaksi mentah, mendeteksi missing values dan inkonsistensi format penanggalan.",
      "Tahap 2: Data Cleansing & Transformation — Merancang aturan transformasi otomatis menggunakan SQL dan rumus agregasi analitis.",
      "Tahap 3: Dimensional Modeling — Membangun tabel fakta (Fact Table Transaksi) dan tabel dimensi (Waktu, Lokasi Wilayah, Kategori Kendaraan, Segmentasi Pelanggan).",
      "Tahap 4: Executive Dashboarding — Merancang visualisasi interaktif yang langsung menjawab pertanyaan bisnis: 'Armada mana yang paling menghasilkan profit di kuartal ketiga?'"
    ],
    technicalChallenges: [
      {
        problem: "Inkonsistensi Nilai Null dan Format Multi-Tipe",
        analysis: "Dataset berasal dari beberapa sumber pencatatan manual cabang rental dengan penamaan nama kolom dan representasi mata uang yang berbeda-beda.",
        solution: "Menulis pipeline pra-pemrosesan berbasis script SQL bertahap dengan validasi skema ketat dan penanganan nilai kosong menggunakan imputasi median untuk variabel numerik serta penanda eksplisit 'Unknown' untuk kategori."
      },
      {
        problem: "Penyusunan Agregasi Laporan Lambat pada Volume Besar",
        analysis: "Perhitungan Year-over-Year (YoY) dan moving average langsung pada tabel operasional membebani server database.",
        solution: "Memisahkan Online Transaction Processing (OLTP) dengan struktur reporting data mart yang telah dipra-agregasi berkala setiap malam (scheduled batch processing)."
      }
    ],
    teamworkReflection: "Proyek ini dikerjakan dengan simulasi tim data korporat: bertindak sebagai Data Analyst yang harus menyajikan temuan teknis rumit ke dalam bahasa bisnis sederhana bagi pemangku kepentingan. Kemampuan mendengarkan kebutuhan tim manajemen adalah kunci sukses dashboard ini.",
    dataPrivacyAndEthics: "Seluruh identitas pelanggan telah di-pseudonimkan (anonymized) menggunakan hashing satu arah sebelum masuk ke tahap analisis analitik.",
    techStack: ["MySQL & SQL Server", "Oracle PL/SQL", "Excel Advanced Analytics", "ETL Pipelines", "Dimensional Star Schema"],
    metrics: [
      { label: "Volume Dataset Diolah", value: "50,000+ Rows" },
      { label: "Peningkatan Kecepatan ETL", value: "3.4x Lebih Cepat" },
      { label: "Validitas Data Akhir", value: "99.8%" },
      { label: "Masa Retensi Analitik", value: "3 Tahun Historis" }
    ]
  },
  {
    id: "lsp-data-analyst",
    title: "Analisis Pola Perilaku Konsumen Mobilitas Wilayah",
    category: "Data Analytics & National Certification",
    tagline: "Studi analitik prediktif dan eksplorasi statistik preferensi sewa kendaraan masyarakat perkotaan Jawa Barat.",
    year: "2026",
    status: "Lembaga Sertifikasi Profesi (LSP) TIK",
    image: "/images/firly_profile_avatar_1793864847835.jpg",
    hasSimulator: false,
    abstract: `Program sertifikasi resmi Badan Nasional Sertifikasi Profesi (BNSP) melalui LSP Universitas Gunadarma. Menguji penguasaan siklus hidup analitik data dari pengumpulan hipotesis, pembersihan data terstruktur, visualisasi grafis, hingga penyusunan kesimpulan strategis bagi industri mobilitas transportasi lokal.`,
    creativeProcess: [
      "Formulasi Hipotesis: Menguji korelasi antara kenaikan harga bahan bakar dengan pergeseran minat sewa mobil tipe compact/city car dibandingkan MPV keluarga besar.",
      "Statistika Deskriptif: Menghitung mean, median, kuartil, dan standar deviasi durasi masa sewa per segmen pengguna.",
      "Uji Signifikansi: Menguji perbedaan perilaku penyewa akhir pekan vs hari kerja di kawasan industri Cikarang-Cibitung.",
      "Penyusunan Rekomendasi Solusi: Merumuskan paket harga promosi dinamis yang menjaga utilisasi armada tetap optimal."
    ],
    technicalChallenges: [
      {
        problem: "Outlier Ekstrem pada Data Durasi Sewa",
        analysis: "Terdapat data anomali di mana kendaraan disewa selama 180 hari berturut-turut untuk proyek korporasi, yang membiaskan rata-rata sewa ritel harian.",
        solution: "Melakukan segmentasi data ke dalam dua klaster terpisah: B2C (Konsumen Perorangan 1-7 hari) dan B2B (Kontrak Perusahaan jangka panjang), sehingga analisis tidak saling mengaburkan."
      }
    ],
    teamworkReflection: "Bekerja di bawah pengawasan langsung asesor bersertifikat BNSP menuntut ketelitian tinggi, dokumentasi langkah kerja yang rapi, dan argumentasi teknis yang dapat dipertanggungjawabkan secara saintifik.",
    dataPrivacyAndEthics: "Menerapkan standar privasi data ISO/IEC 27001 dan UU PDP Indonesia: tidak ada data pribadi yang disimpan tanpa persetujuan eksplisit.",
    techStack: ["Data Analysis & Statistics", "SQL Queries", "Business Metrics", "Spreadsheet Modeling", "BNSP Standards"],
    metrics: [
      { label: "Unit Kompetensi LSP", value: "Lulus 100%" },
      { label: "Uji Korelasi Variabel", value: "Pearson r=0.78" },
      { label: "Optimasi Utilisasi", value: "+18% Estimasi" },
      { label: "Standar Sertifikasi", value: "BNSP RI" }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Skripsi & Sistem Rekomendasi Siap Uji",
    message: "Algoritma pembobotan multi-kriteria untuk rental mobil Bekasi selesai dioptimasi dengan query speed 85ms.",
    timestamp: "Baru saja",
    type: "project",
    read: false
  },
  {
    id: "notif-2",
    title: "Sertifikasi Creating Business Intelligence Diverifikasi",
    message: "Kompetensi pembuatan data warehouse dan dashboard eksekutif Universitas Gunadarma resmi terbit.",
    timestamp: "2 jam lalu",
    type: "cert",
    read: false
  },
  {
    id: "notif-3",
    title: "Pembaruan Arsitektur & Keamanan Data v2.4",
    message: "Implementasi PDO Prepared Statements dan masking nomor kontak pemilik rental untuk menjaga privasi pengguna.",
    timestamp: "1 hari lalu",
    type: "deploy",
    read: true
  },
  {
    id: "notif-4",
    title: "Pesantren Al-Ittihad ke Sistem Informasi",
    message: "Refleksi perjalanan coding dan etika rekayasa perangkat lunak berhasil dipublikasikan.",
    timestamp: "2 hari lalu",
    type: "deploy",
    read: true
  }
];

export const RENTAL_CARS_MOCK: RentalCarItem[] = [
  {
    id: "car-1",
    model: "Toyota Avanza All New 2023",
    vendor: "Bekasi Central Auto Rent",
    location: "Pekayon Jaya, Bekasi Selatan",
    distanceKm: 2.4,
    dailyPrice: 400000,
    seats: 7,
    transmission: "Manual / Matic",
    rating: 4.8,
    reviewsCount: 38,
    fuelEfficiency: "14 km/liter",
    tags: ["Keluarga", "Irit Bensin", "Lepas Kunci"],
    baseScore: 92
  },
  {
    id: "car-2",
    model: "Honda Brio Satya E 2023",
    vendor: "Cibitung Mandiri Rent",
    location: "Wanasari, Cibitung, Bekasi",
    distanceKm: 0.8,
    dailyPrice: 320000,
    seats: 5,
    transmission: "Matic",
    rating: 4.9,
    reviewsCount: 45,
    fuelEfficiency: "18 km/liter",
    tags: ["City Car", "Lincah", "Murah"],
    baseScore: 96
  },
  {
    id: "car-3",
    model: "Mitsubishi Xpander Ultimate 2022",
    vendor: "Summarecon Drive Premier",
    location: "Summarecon Bekasi, Bekasi Utara",
    distanceKm: 5.1,
    dailyPrice: 475000,
    seats: 7,
    transmission: "Matic",
    rating: 4.85,
    reviewsCount: 62,
    fuelEfficiency: "13 km/liter",
    tags: ["Nyaman", "Suspensi Empuk", "AC Dingin"],
    baseScore: 90
  },
  {
    id: "car-4",
    model: "Toyota Innova Zenix Hybrid 2024",
    vendor: "Tambun Raya Trans",
    location: "Tambun Selatan, Bekasi",
    distanceKm: 3.6,
    dailyPrice: 750000,
    seats: 7,
    transmission: "Matic",
    rating: 4.95,
    reviewsCount: 29,
    fuelEfficiency: "21 km/liter",
    tags: ["Premium", "Hybrid Irit", "Dengan Sopir"],
    baseScore: 95
  },
  {
    id: "car-5",
    model: "Daihatsu Sigra R Deluxe 2022",
    vendor: "Cikarang Barat Armada",
    location: "Cikarang Barat, Bekasi",
    distanceKm: 4.2,
    dailyPrice: 280000,
    seats: 7,
    transmission: "Manual",
    rating: 4.6,
    reviewsCount: 19,
    fuelEfficiency: "15 km/liter",
    tags: ["Paling Hemat", "7 Kursi", "Lepas Kunci"],
    baseScore: 88
  }
];

// Backward compatibility alias
export const PORTFOLIO_INFO = DEFAULT_PROFILE_INFO;
