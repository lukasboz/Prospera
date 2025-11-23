import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

app.post("/generate-roadmap", async (req: Request, res: Response) => {
  try {
    const { answers } = req.body as string[];

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

Create a financial roadmap:
1. Summarize the goal
2. Include actionable tasks with exact dates based on contribution frequency
3. Format all dates like: "Nov 29, 2025"
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({ roadmap: result.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});