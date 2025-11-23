import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "./Navbar.tsx";
import { useNavigate } from "react-router-dom";
import { accountScores } from "@/backend/accountScore.ts";

const Questions = () => {
  const router = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionsQ1, setSelectedOptionsQ1] = useState<string[]>([]);
  const [demographicsAnswers, setDemographicsAnswers] = useState<{ [key: string]: string }>({});

  const goNext = () => setCurrentIndex((prev) => Math.min(prev + 1, 1));
  const goPrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const question1Options = [
    {
      category: "General Goals",
      items: [
        "Maximize government incentives",
        "Contribute regularly",
        "Take advantage of compounding",
      ],
    },
    {
      category: "RRSP Goals",
      items: ["Save for retirement", "Plan for early retirement"],
    },
    {
      category: "TFSA Goals",
      items: [
        "Tax-free savings growth",
        "Low-risk investments",
        "Access funds without penalty",
        "Start small, learn as I go",
        "Build an emergency fund",
        "Save for a major purchase",
      ],
    },
    {
      category: "RESP Goals",
      items: [
        "Save for my children’s education",
        "Prepare for tuition increases",
        "Ensure my child can attend post-secondary comfortably",
      ],
    },
    {
      category: "FHSA Goals",
      items: [
        "Save for my first home",
        "Tax-free savings growth for home purchase",
        "Contribute regularly",
        "Access funds for first home without penalty",
      ],
    },
    {
      category: "RDSP Goals",
      items: [
        "Plan for medical or disability needs",
        "Use the Canada Disability Savings Grant (CDSG)",
        "Save for long-term financial security for disability",
      ],
    },
  ];

  const toggleOptionQ1 = (option: string) => {
    setSelectedOptionsQ1((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const provinces = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Northwest Territories",
    "Nunavut",
    "Yukon",
  ];

  const question2Fields = [
    { label: "Age", key: "age", type: "text", placeholder: "Enter your age" },
    { label: "Province of residence", key: "province", type: "dropdown" },
    { label: "Are you a Canadian resident for tax purposes?", key: "resident", type: "yesno" },
    { label: "Do you have a valid SIN?", key: "sin", type: "yesno" },
    { label: "What is your current annual income?", key: "income", type: "text", placeholder: "Enter your annual income" },
    { label: "What are your average monthly expenses?", key: "expenses", type: "text", placeholder: "Enter your monthly expenses" },
    { label: "Are you a student?", key: "student", type: "yesno" },
    { label: "Do you have a pension plan at work?", key: "pension", type: "yesno" },
  ];

  const handleDemographicsChange = (key: string, value: string) => {
    setDemographicsAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const allFieldsFilled = question2Fields.every((field) => demographicsAnswers[field.key]?.trim());

  // New function to tally selected goals and find the bank with highest count
  const getTopAccount = (): string | null => {
    const totals: Record<string, number> = { RRSP: 0, TFSA: 0, RESP: 0, FHSA: 0, RDSP: 0 };

    selectedOptionsQ1.forEach((option) => {
      const accounts = accountScores[option];
      if (accounts) {
        Object.keys(accounts).forEach((account) => {
          totals[account] += 1; // Count each selected goal once
        });
      }
    });

    // Determine the account with the highest tally
    const maxScore = Math.max(...Object.values(totals));
    const topAccounts = Object.entries(totals)
      .filter(([_, score]) => score === maxScore)
      .map(([account]) => account);

    const topAccount = topAccounts[0] || null; // return one if tie
    console.log("Top Bank Account:", topAccount);
    return topAccount;
  };

  return (
    <div>
      <Navbar />

      <div className="flex min-h-screen items-center justify-center bg-background/50 px-4 pt-12">
        <div
          className="bg-card rounded-2xl shadow-xl w-full max-w-3xl p-8 relative animate-fade-in
                     max-h-[85vh] overflow-y-auto"
        >
          {/* Question Header */}
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center font-display">
            Question {currentIndex + 1} of 2
          </h2>

          {/* Question 1 */}
          {currentIndex === 0 && (
            <div className="flex flex-col items-center gap-6 w-full">
              {question1Options.map((group, idx) => (
                <div key={idx} className="w-full">
                  <p className="text-muted-foreground font-semibold mb-2">{group.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <button
                        key={item}
                        onClick={() => toggleOptionQ1(item)}
                        className={`px-3 py-2 rounded-md border transition-all ${
                          selectedOptionsQ1.includes(item)
                            ? "bg-hero-gradient text-white border-transparent"
                            : "bg-background text-foreground border-border hover:bg-muted"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="mt-4 text-sm text-muted-foreground">
                Selected: {selectedOptionsQ1.join(", ") || "None"}
              </div>
            </div>
          )}

          {/* Question 2 */}
          {currentIndex === 1 && (
            <div className="flex flex-col items-center gap-6 w-full">
              {question2Fields.map((field) => (
                <div key={field.key} className="w-full flex flex-col gap-2">
                  <p className="text-muted-foreground font-medium">{field.label}</p>

                  {field.type === "text" && (
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={demographicsAnswers[field.key] || ""}
                      onChange={(e) => handleDemographicsChange(field.key, e.target.value)}
                      className="w-full p-2 rounded-md border border-border bg-background text-foreground"
                    />
                  )}

                  {field.type === "dropdown" && (
                    <select
                      value={demographicsAnswers[field.key] || ""}
                      onChange={(e) => handleDemographicsChange(field.key, e.target.value)}
                      className="w-full p-2 rounded-md border border-border bg-background text-foreground"
                    >
                      <option value="">Select a province/territory</option>
                      {provinces.map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </select>
                  )}

                  {field.type === "yesno" && (
                    <div className="flex gap-4">
                      {["Yes", "No"].map((option) => (
                        <button
                          key={option}
                          onClick={() => handleDemographicsChange(field.key, option)}
                          className={`px-4 py-2 rounded-md border transition-all ${
                            demographicsAnswers[field.key] === option
                              ? "bg-hero-gradient text-white border-transparent"
                              : "bg-background text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Build Roadmap Button */}
              {allFieldsFilled && (
                <div className="mt-6 w-full flex justify-center">
                  <button
                    onClick={() =>
                      router("/roadmap", {
                        state: { selectedOptionsQ1, demographicsAnswers },
                      })
                    }
                    className="px-6 py-3 rounded-xl bg-hero-gradient text-white font-semibold hover:opacity-90 transition"
                  >
                    Build My Roadmap
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center mt-10">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className={`p-2 rounded-full transition-colors hover:bg-muted ${
                currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ArrowLeft className="h-6 w-6 text-foreground" />
            </button>

            <div className="flex space-x-2">
              {[0, 1].map((idx) => (
                <span
                  key={idx}
                  className={`h-2 w-2 rounded-full ${
                    idx === currentIndex ? "bg-foreground" : "bg-border"
                  }`}
                ></span>
              ))}
            </div>

            <button
              onClick={goNext}
              disabled={currentIndex === 1}
              className={`p-2 rounded-full transition-colors hover:bg-muted ${
                currentIndex === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ArrowRight className="h-6 w-6 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
