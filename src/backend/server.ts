import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

//hardcoded test data
const user_info: string[] = ['18', '10000', 'TFSA', '100', 'monthly', '20000'];

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
First create a small blurb describing and explaining the personalized plan, then go STRAIGHT into the tasks.
Do not put ANY more text. Do not put more text to introduce the roadmap like "**Financial Roadmap:**" NO. 
Go straight into the tasks.
Create 15 tasks (AND ALWAYS 15 tasks), and with each task, the money invested increases 
little by little to eventually save up a lot of money and allows you to reinvest your earnings.
Each task should be maximum 2 sentences (should be very concise and minimal).
Be sure to include DEADLINES. using ${today} and the ${contributionFrequency}, include the date 
at the end of the task at which it should be completed by.
Example of task 3: "Invest $2000 by Nov 28, 2025. Focus on diversified low-cost ETFs."
Example of task 12: "Invest $2500 by March 30, 2025. Consider diversifying into new asset classes within your TFSA."
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    //split into array. each line is a task
    const tasks = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => line.replace(/^\d+\.\s*/, '')); //remove "1. " prefix

    console.log("TASKS ARRAY:");
    console.log(tasks);

    res.json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});