import { calculateScore } from "./accountScore";

const selectedOptionsQ1 = [
  "Save for retirement",
  "Contribute regularly",
  "Tax-free savings growth",
  "Maximize government incentives",
  "Plan for medical or disability needs"
];

const demographicsAnswers = {
  age: "30",
  province: "Ontario",
  resident: "Yes",
  sin: "Yes",
  income: "60000",
  expenses: "2000",
  student: "No",
  pension: "No"
};

const topAccounts = calculateScore(selectedOptionsQ1, demographicsAnswers);

console.log("Top account matches:", topAccounts);
