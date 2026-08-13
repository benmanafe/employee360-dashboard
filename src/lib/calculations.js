import { monthLabel } from "./format.js";

const LEVEL_THRESHOLDS = [
  { min: 85, level: "Sangat Tinggi" },
  { min: 65, level: "Tinggi" },
  { min: 40, level: "Sedang" },
  { min: 0, level: "Rendah" },
];

export const LEVEL_STYLES = {
  "Sangat Tinggi": { color: "#ef4444", bg: "#1a0a0a" },
  Tinggi: { color: "#f97316", bg: "#1a0d07" },
  Sedang: { color: "#eab308", bg: "#14110a" },
  Rendah: { color: "#22c55e", bg: "#0a1a0d" },
};

const GRADE_THRESHOLDS = [
  { min: 90, grade: "F" },
  { min: 80, grade: "E" },
  { min: 65, grade: "D" },
  { min: 50, grade: "C" },
  { min: 35, grade: "B" },
  { min: 0, grade: "A" },
];

export const GRADE_COLORS = {
  A: "#15803d",
  B: "#16a34a",
  C: "#ca8a04",
  D: "#ea580c",
  E: "#dc2626",
  F: "#b91c1c",
};

const PERCENTILE_EXPONENT = 13;

export function sum(values) {
  return values.reduce((acc, v) => acc + v, 0);
}

export function round1(value) {
  return Math.round(value * 10) / 10;
}

export function yoyPercent(current, baseline) {
  return ((current - baseline) / baseline) * 100;
}

export function riskScore(indicators) {
  const totalWeight = sum(indicators.map((i) => i.weight));
  const weighted = indicators.reduce((acc, i) => acc + i.value * i.weight, 0);
  return Math.round(weighted / totalWeight);
}

export function scoreToGrade(score) {
  const match = GRADE_THRESHOLDS.find((t) => score >= t.min);
  return match.grade;
}

export function scoreToPercentile(score) {
  const ratio = Math.max(score, 1) / 100;
  return Math.max(1, Math.round(100 * Math.pow(ratio, PERCENTILE_EXPONENT)));
}

export function riskLevelFromValue(value) {
  const match = LEVEL_THRESHOLDS.find((t) => value >= t.min);
  return match.level;
}

export function scoreRiskTier(score) {
  const level = riskLevelFromValue(score);
  if (level === "Rendah") return "Low";
  if (level === "Sedang") return "Medium";
  return "High";
}

export function complianceStatus(record, asOf) {
  const due = new Date(record.dueDate);
  if (record.paidDate) {
    return new Date(record.paidDate) <= due ? "lunas" : "late";
  }
  return new Date(asOf) > due ? "overdue" : "late";
}

export function niceCeil(value, step) {
  return Math.max(step, Math.ceil(value / step) * step);
}

export function deriveDashboardData(raw) {
  const {
    company,
    monthlyWorkforce,
    monthlyAvgSalary,
    workforceCategories,
    contributionPayments,
    riskIndicators,
    timeline,
    aiSummary,
    riskScoreConfig,
  } = raw;

  const snapshotDate = riskScoreConfig.snapshotDate;
  const snapshotLabel = `${monthLabel(snapshotDate)} ${snapshotDate.slice(0, 4)}`;

  const score = riskScore(riskIndicators);
  const grade = scoreToGrade(score);
  const percentile = scoreToPercentile(score);

  const riskItems = riskIndicators
    .map((ind) => {
      const level = riskLevelFromValue(ind.value);
      const style = LEVEL_STYLES[level];
      return {
        label: ind.label,
        icon: ind.icon,
        sublabel: ind.note,
        level,
        color: style.color,
        bg: style.bg,
        weight: ind.weight,
      };
    })
    .sort((a, b) => b.weight - a.weight);

  const lastWorkforce = monthlyWorkforce[monthlyWorkforce.length - 1];
  const baselineWorkforce = monthlyWorkforce.find((m) => m.month === "2023-05");

  const lastSalary = monthlyAvgSalary[monthlyAvgSalary.length - 1];
  const baselineSalary = monthlyAvgSalary.find((m) => m.month === "2023-05");

  const baselineLabel = `${monthLabel(baselineWorkforce.month)} ${baselineWorkforce.month.slice(0, 4)}`;

  const workerTrend = {
    series: monthlyWorkforce
      .slice(-12)
      .map(({ month, count }) => ({ month: monthLabel(month), value: count })),
    current: lastWorkforce.count,
    yoy: yoyPercent(lastWorkforce.count, baselineWorkforce.count),
    baselineLabel,
    color: "#3b82f6",
  };

  const salaryTrend = {
    series: monthlyAvgSalary.slice(-12).map(({ month, value }) => ({
      month: monthLabel(month),
      value: round1(value / 1e6),
    })),
    currentRupiah: lastSalary.value,
    yoy: yoyPercent(lastSalary.value, baselineSalary.value),
    baselineLabel,
    color: "#22c55e",
  };

  const complianceMonths = contributionPayments.map((r) => ({
    label: r.label,
    status: complianceStatus(r, snapshotDate),
  }));

  const totalWorkers = sum(workforceCategories.map((c) => c.count));
  const workforce = workforceCategories.map((c) => ({
    ...c,
    pct: round1((c.count / totalWorkers) * 100),
  }));

  const recommendations = riskIndicators
    .filter((ind) => {
      const level = riskLevelFromValue(ind.value);
      return level === "Sangat Tinggi" || level === "Tinggi";
    })
    .sort((a, b) => b.weight - a.weight)
    .map((ind) => aiSummary.recommendations[ind.id]);

  return {
    company,
    lastUpdated: riskScoreConfig.lastUpdated,
    snapshotLabel,
    risk: {
      score,
      grade,
      gradeColor: GRADE_COLORS[grade],
      percentile,
      maxScore: riskScoreConfig.maxScore,
      tier: scoreRiskTier(score),
    },
    riskItems,
    workerTrend,
    salaryTrend,
    complianceMonths,
    workforce,
    totalWorkers,
    timeline,
    aiSummary: { text: aiSummary.text, recommendations },
  };
}
