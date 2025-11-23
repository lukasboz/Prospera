import express, { Request, Response } from "express";

const router = express.Router();

export const accountScores: Record<string, Record<string, number>> = {
    // General
    "Maximize government incentives (RRSP)": { RRSP: 2, RESP: 2, RDSP: 2},
    "Contribute regularly": { RRSP: 1, TFSA: 1, RESP: 1, FHSA: 1, RDSP: 1},
    "Take advantage of compounding (RRSP)": { RRSP: 2, TFSA: 2, RESP: 2, FHSA: 2, RDSP: 2},

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
}