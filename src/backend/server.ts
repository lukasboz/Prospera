import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Hardcoded test data
const user_info: string[] = ['18', '70000', 'TFSA', '3000', 'monthly', '100000'];

app.post("/generate-roadmap", async (req, res) => {
  try {
    const answers = user_info;

    const [
      age,
      annualIncome,
      accountType,
      monthlyExpenses,
      contributionFrequency,
      targetAmount,
    ] = answers;

    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const prompt = `
Today's date: ${today}
User info:
- Age: ${age}
- Annual Income: ${annualIncome}
- Account Type: ${accountType}
- Monthly Expenses: ${monthlyExpenses}
- Contribution Frequency: ${contributionFrequency}
- Target Amount: ${targetAmount}

Create a financial roadmap based on the user information that was provided. 
Create 15 tasks (AND ALWAYS 15 tasks), and with each task, the money invested increases 
little by little to eventually save up a lot of money and allows you to reinvest your earnings.
Each task should be maximum 2 sentences (should be very concise and minimal).
Be sure to include DEADLINES. using ${today} and the ${contributionFrequency}, include the date 
at the end of the task at which it should be completed by.
Example of task 3: "Invest $2000 by Nov 28, 2025"
Example of task 12: "Invest $2500 by March 30, 2025"
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ roadmap: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});