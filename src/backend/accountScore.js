"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountScores = void 0;
exports.calculateScore = calculateScore;
exports.accountScores = {
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
function calculateScore(selectedOptionsQ1, demographicsAnswers) {
    var totals = {
        RRSP: 0,
        TFSA: 0,
        RESP: 0,
        FHSA: 0,
        RDSP: 0,
    };
    selectedOptionsQ1.forEach(function (option) {
        var points = exports.accountScores[option];
        if (points) {
            Object.entries(points).forEach(function (_a) {
                var account = _a[0], score = _a[1];
                totals[account] += score;
            });
        }
    });
    var ageOfMajority = {
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
    };
    // If age is invalid, default to 0.
    var age = parseInt(demographicsAnswers.age || "0");
    var province = demographicsAnswers.province;
    // Convert resident response to boolean value.
    var resident = demographicsAnswers.resident === "Yes";
    // Convert sin response to boolean value.
    var sin = demographicsAnswers.sin === "Yes";
    // If income is invalid, default to 0.
    var income = parseFloat(demographicsAnswers.income || "0");
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
    var results = Object.entries(totals)
        .map(function (_a) {
        var account = _a[0], score = _a[1];
        return ({ account: account, score: score });
    })
        .filter(function (r) { return r.score > 0; })
        .sort(function (a, b) { return b.score - a.score; });
    var topAccounts = results.slice(0, 2);
    return topAccounts;
}
