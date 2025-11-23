export const accountScores: Record<string, Record<string, number>> = {
    // General
    "Maximize government incentives": { RRSP: 2, RESP: 2, RDSP: 2},
    "Contribute regularly": { RRSP: 1, TFSA: 1, RESP: 1, FHSA: 1, RDSP: 1},
    "Take advantage of compounding": { RRSP: 2, TFSA: 2, RESP: 2, FHSA: 2, RDSP: 2},

    // RRSP
    "Save for retirement": { RRSP: 3},
    "Plan for early retirement": { RRSP: 3},

    // TFSA
    "Tax-free savings growth": { TFSA: 3},
    "Low-risk investments": { TFSA: 2},
    "Access funds without penalty": { TFSA: 3},
    "Start small, learn as I go": { TFSA: 2},
    "Build an emergency fund": { TFSA: 2},
    "Save for a major purchase": { TFSA: 1},

    // RESP
    "Save for my children’s education": { RESP: 3},
    "Prepare for tuition increases": { RESP: 3},
    "Ensure my child can attend post-secondary comfortably": { RESP: 3},

    // FHSA
    "Save for my first home": { FHSA: 4},
    "Tax-free savings growth for home purchase": { FHSA: 3},
    "Access funds for first home without penalty": { FHSA: 4},

    // RDSP
    "Plan for medical or disability needs": { RDSP: 4},
    "Use the Canada Disability Savings Grant (CDSG)": { RDSP: 3},
    "Save for long-term financial security for disability": { RDSP: 4},
};

interface Q2Answers {
    age: string;
    province: string;
    resident: string;
    sin: string;
    income: string;
    expenses: string;
    student: string;
    pension: string;
}

interface MatchResult {
    account: string;
    score: number;
}

export function calculateScore(
    selectedOptionsQ1: string[],
    demographicsAnswers: Q2Answers
): MatchResult[] {
    const totals: Record<string, number> = {
        RRSP: 0,
        TFSA: 0,
        RESP: 0,
        FHSA: 0,
        RDSP: 0,
    };

    selectedOptionsQ1.forEach((option) => {
        const points = accountScores[option];
        if (points) {
            Object.entries(points).forEach(([account, score]) => {
                totals[account] += score;
            });
        }
    });

    const ageOfMajority: Record<string, number> = {
        "Alberta": 18,
        "Manitoba": 18,
        "Ontario": 18,
        "Prince Edward Island": 18,
        "Quebec": 18,
        "Saskatchewan": 18,
        "British Columbia": 19,
        "New Brunswick": 19,
        "Newfoundland and Labrador": 19,
        "Nova Scotia": 19,
        "Northwest Territories": 19,
        "Nunavut": 19,
        "Yukon": 19,
    }

    // If age is invalid, default to 0.
    const age = parseInt(demographicsAnswers.age || "0");
    const province = demographicsAnswers.province;
    // Convert resident response to boolean value.
    const resident = demographicsAnswers.resident === "Yes";
    // Convert sin response to boolean value.
    const sin = demographicsAnswers.sin === "Yes";
    // If income is invalid, default to 0.
    const income = parseFloat(demographicsAnswers.income || "0");

    // To be eligible for RRSP:
    if ((age < (ageOfMajority[province] || 18) || (age > 71)) || !resident || !sin) {
        totals.RRSP = 0;
    }

    // To be eligible for TFSA:
    if (age < (ageOfMajority[province] || 18) || !resident || !sin) {
        totals.TFSA = 0;
    }

    // To be eligible for RESP:
    if (!resident || !sin) {
        totals.RESP = 0;
    }

    // To be eligible for FHSA:
    if ((age < (ageOfMajority[province] || 18) || (age > 71)) || !resident || !sin) {
        totals.FHSA = 0;
    }

    // To be eligible for RDSP:
    if (age <= 59 || !resident || !sin) {
        totals.RDSP = 0;
    }

    const results: MatchResult[] = Object.entries(totals)
        .map(([account, score]) => ({ account, score}))
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score);

    const topAccounts = results.slice(0, 2);
    return topAccounts;
}