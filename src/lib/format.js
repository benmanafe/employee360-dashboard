const MONTHS_SHORT = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "Mei",
  "06": "Jun",
  "07": "Jul",
  "08": "Agt",
  "09": "Sep",
  "10": "Okt",
  "11": "Nov",
  "12": "Des",
};

const MONTHS_FULL = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export function monthLabel(month) {
  const key = String(month).slice(5, 7);
  return MONTHS_SHORT[key] ?? month;
}

export function formatNumber(value) {
  return Number(value).toLocaleString("id-ID");
}

function decimalComma(value) {
  return String(Math.round(value * 10) / 10).replace(".", ",");
}

export function formatPct(value) {
  return `${decimalComma(value)}%`;
}

export function formatRupiahShort(value) {
  if (value >= 1e9) return `Rp ${decimalComma(value / 1e9)} Miliar`;
  if (value >= 1e6) return `Rp ${decimalComma(value / 1e6)} Juta`;
  return `Rp ${formatNumber(value)}`;
}

export function formatDateTime(iso) {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${d.getDate()} ${MONTHS_FULL[d.getMonth()]} ${d.getFullYear()} ${hh}:${mm} WIB`;
}
