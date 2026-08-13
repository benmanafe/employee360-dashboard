const company = {
  name: "PT Maju Sejahtera Abadi",
  npp: "3175012345670001",
  nib: "8120301234567",
  npwp: "01.234.567.8-901.000",
  klasifikasi: "Besar",
  lokasi: "DKI Jakarta",
  sektor: "Jasa Konstruksi",
  status: "Aktif",
};

const monthlyWorkforce = [
  { month: "2023-01", count: 2550 },
  { month: "2023-02", count: 2500 },
  { month: "2023-03", count: 2420 },
  { month: "2023-04", count: 2210 },
  { month: "2023-05", count: 2033 },
  { month: "2023-06", count: 2100 },
  { month: "2023-07", count: 2050 },
  { month: "2023-08", count: 2000 },
  { month: "2023-09", count: 1950 },
  { month: "2023-10", count: 1900 },
  { month: "2023-11", count: 1850 },
  { month: "2023-12", count: 1780 },
  { month: "2024-01", count: 1650 },
  { month: "2024-02", count: 1500 },
  { month: "2024-03", count: 1380 },
  { month: "2024-04", count: 1300 },
  { month: "2024-05", count: 1256 },
];

const monthlyAvgSalary = [
  { month: "2023-01", value: 7500000 },
  { month: "2023-02", value: 7300000 },
  { month: "2023-03", value: 7000000 },
  { month: "2023-04", value: 6800000 },
  { month: "2023-05", value: 6620000 },
  { month: "2023-06", value: 9200000 },
  { month: "2023-07", value: 9000000 },
  { month: "2023-08", value: 8700000 },
  { month: "2023-09", value: 8400000 },
  { month: "2023-10", value: 8000000 },
  { month: "2023-11", value: 7700000 },
  { month: "2023-12", value: 7400000 },
  { month: "2024-01", value: 7000000 },
  { month: "2024-02", value: 6600000 },
  { month: "2024-03", value: 6200000 },
  { month: "2024-04", value: 5900000 },
  { month: "2024-05", value: 5600000 },
];

const workforceCategories = [
  { label: "Tetap", count: 632, color: "#3b82f6" },
  { label: "Kontrak", count: 412, color: "#22c55e" },
  { label: "PKWT", count: 156, color: "#f97316" },
  { label: "Lainnya", count: 56, color: "#eab308" },
];

const contributionPayments = [
  { label: "Des 2023", dueDate: "2024-01-10", paidDate: "2024-01-18" },
  { label: "Jan 2024", dueDate: "2024-02-10", paidDate: null },
  { label: "Feb 2024", dueDate: "2024-03-10", paidDate: null },
  { label: "Mar 2024", dueDate: "2024-04-10", paidDate: null },
  { label: "Apr 2024", dueDate: "2024-05-10", paidDate: null },
  { label: "Mei 2024", dueDate: "2024-06-10", paidDate: null },
];

const riskIndicators = [
  {
    id: "kepatuhan_iuran",
    label: "Kepatuhan Iuran",
    value: 97,
    weight: 0.4,
    icon: "audit",
    note: "Tunggakan 2 periode berjalan",
  },
  {
    id: "stabilitas_pekerja",
    label: "Stabilitas Tenaga Kerja",
    value: 84,
    weight: 0.25,
    icon: "workforce-management",
    note: "Penurunan pekerja 38% (YoY)",
  },
  {
    id: "tren_upah",
    label: "Tren Upah",
    value: 76,
    weight: 0.2,
    icon: "trend-two",
    note: "Rata-rata upah turun 15% (YoY)",
  },
  {
    id: "risiko_eksternal",
    label: "Risiko Eksternal",
    value: 60,
    weight: 0.1,
    icon: "risk-analysis-outline",
    note: "Pemberitaan negatif terkait PHK massal",
  },
  {
    id: "kepatuhan_pemeriksaan",
    label: "Kepatuhan Pemeriksaan",
    value: 20,
    weight: 0.05,
    icon: "compliance-audit",
    note: "Tidak ada pelanggaran dalam 2 tahun terakhir",
  },
];

const timeline = [
  {
    date: "15 Mei 2024",
    color: "#ef4444",
    title: "Pemberitaan PHK Massal",
    desc: "Media online memberitakan PHK massal ± 300 pekerja",
  },
  {
    date: "10 Apr 2024",
    color: "#f97316",
    title: "Penurunan Jumlah Pekerja",
    desc: "Jumlah pekerja turun di bawah 1.500 orang",
  },
  {
    date: "28 Feb 2024",
    color: "#ef4444",
    title: "Tunggakan Iuran",
    desc: "Tunggakan iuran 2 periode (Feb & Mar 2024)",
  },
  {
    date: "12 Sep 2023",
    color: "#22c55e",
    title: "Pemeriksaan Rutin",
    desc: "Tidak ditemukan pelanggaran",
  },
];

const aiSummary = {
  text: "PT Maju Sejahtera Abadi menunjukkan peningkatan risiko signifikan dalam 6 bulan terakhir. Penurunan jumlah pekerja yang tajam, penurunan rata-rata upah, serta tunggakan iuran mengindikasikan potensi kesulitan keuangan. Terdapat pula pemberitaan negatif terkait PHK massal yang menambah risiko reputasi dan keberlangsungan usaha.",
  recommendations: {
    kepatuhan_iuran: "Lakukan konfirmasi & klarifikasi kepada perusahaan",
    stabilitas_pekerja: "Pantau ketat pembayaran iuran dan tren tenaga kerja",
    tren_upah: "Prioritaskan untuk pemeriksaan kepatuhan",
    risiko_eksternal: "Tinjau dampak pemberitaan negatif pada keberlangsungan usaha",
    kepatuhan_pemeriksaan: "Pertahankan rekomendasi kepatuhan saat ini",
  },
};

const riskScoreConfig = {
  maxScore: 100,
  snapshotDate: "2024-05-20",
  lastUpdated: "2024-05-20T09:30:00+07:00",
};

export const seedEmployer = {
  company,
  monthlyWorkforce,
  monthlyAvgSalary,
  workforceCategories,
  contributionPayments,
  riskIndicators,
  timeline,
  aiSummary,
  riskScoreConfig,
};
