// src/backend/accountScore.ts

// ----------------------------
// TYPES
// ----------------------------
export interface Q2Answers {
  age: string;
  province: string;
  resident: string;
  sin: string;
  income: string;
  expenses: string;
  student: string;
  pension: string;
}

// ----------------------------
// SCORE DATA
// ----------------------------
export const accountScores: Record<string, Record<string, number>> = {
  // General
  "Maximize government incentives": { RRSP: 2, RESP: 2, RDSP: 2 },
  "Contribute regularly": { RRSP: 1, TFSA: 1, RESP: 1, FHSA: 1, RDSP: 1 },
  "Take advantage of compounding": { RRSP: 2, TFSA: 2, RESP: 2, FHSA: 2, RDSP: 2 },

  // RRSP
  "Save for retirement": { RRSP: 3 },
  "Plan for early retirement": { RRSP: 3 },

  // TFSA
  "Tax-free savings growth": { TFSA: 3 },
  "Low-risk investments": { TFSA: 2 },
  "Access funds without penalty": { TFSA: 3 },
  "Start small, learn as I go": { TFSA: 2 },
  "Build an emergency fund": { TFSA: 2 },
  "Save for a major purchase": { TFSA: 1 },

  // RESP
  "Save for my children’s education": { RESP: 3 },
  "Prepare for tuition increases": { RESP: 3 },
  "Ensure my child can attend post-secondary comfortably": { RESP: 3 },

  // FHSA
  "Save for my first home": { FHSA: 4 },
  "Tax-free savings growth for home purchase": { FHSA: 3 },
  "Access funds for first home without penalty": { FHSA: 4 },

  // RDSP
  "Plan for medical or disability needs": { RDSP: 4 },
  "Use the Canada Disability Savings Grant (CDSG)": { RDSP: 3 },
  "Save for long-term financial security for disability": { RDSP: 4 },
};

export const ageOfMajority: Record<string, number> = {
  Alberta: 18,
  Manitoba: 18,
  Ontario: 18,
  "Prince Edward Island": 18,
  Quebec: 18,
  Saskatchewan: 18,
  "British Columbia": 19,
  "New Brunswick": 19,
  "Newfoundland and Labrador": 19,
  "Nova Scotia": 19,
  "Northwest Territories": 19,
  Nunavut: 19,
  Yukon: 19,
};

// ----------------------------
// MAIN FUNCTION
// ----------------------------
export function calculateTopAccount(selectedOptionsQ1: string[], demographicsAnswers: Q2Answers): string | null {
  const age = parseInt(demographicsAnswers.age || "0");
  const province = demographicsAnswers.province;
  const resident = demographicsAnswers.resident === "Yes";
  const sin = demographicsAnswers.sin === "Yes";

  // Initialize totals
  const totals: Record<string, number> = { RRSP: 0, TFSA: 0, RESP: 0, FHSA: 0, RDSP: 0 };

  // Add points
  selectedOptionsQ1.forEach((option) => {
    const points = accountScores[option];
    if (!points) return;
    Object.entries(points).forEach(([account, score]) => {
      totals[account] += score;
    });
  });

  // Eligibility rules
  if ((age < (ageOfMajority[province] || 18) || age > 71) || !resident || !sin) totals.RRSP = 0;
  if (age < (ageOfMajority[province] || 18) || !resident || !sin) totals.TFSA = 0;
  if (!resident || !sin) totals.RESP = 0;
  if ((age < (ageOfMajority[province] || 18) || age > 71) || !resident || !sin) totals.FHSA = 0;
  if (age > 59 || !resident || !sin) totals.RDSP = 0;

  // Find top account
  const sorted = Object.entries(totals)
    .sort(([, aScore], [, bScore]) => bScore - aScore);

  const top = sorted[0];
  if (!top || top[1] === 0) return null;

  console.log("Top Account:", top[0]);
  return top[0];
}
