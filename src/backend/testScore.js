"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var accountScore_1 = require("./accountScore");
var selectedOptionsQ1 = [
    "Save for retirement",
    "Contribute regularly",
    "Tax-free savings growth",
    "Maximize government incentives",
    "Plan for medical or disability needs"
];
var demographicsAnswers = {
    age: "30",
    province: "Ontario",
    resident: "Yes",
    sin: "Yes",
    income: "60000",
    expenses: "2000",
    student: "No",
    pension: "No"
};
var topAccounts = (0, accountScore_1.calculateScore)(selectedOptionsQ1, demographicsAnswers);
console.log("Top account matches:", topAccounts);
