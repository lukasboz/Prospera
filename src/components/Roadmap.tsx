import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar.tsx";

// Format keys like `age`, `province`, `resident` into Title Case for display
const titleCase = (key: string) => {
  if (!key) return "";
  return String(key)
    .replace(/[_-]/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

const Roadmap = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = (location && (location.state as any)) || {};
  const { selectedOptionsQ1 = [], demographicsAnswers = {} } = state;

  const hasData =
    selectedOptionsQ1.length > 0 ||
    Object.keys(demographicsAnswers).length > 0;

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedGoals, setGeneratedGoals] = useState<string[] | null>(null);

  const generateGoals = async () => {
    const key = "AIzaSyB0cOam3VDbrqxTPs-GvHrF7olypYGhFcs";

    setIsGenerating(true);
    setGeneratedGoals(null);

    try {
      const prompt = `You are an expert financial planner. Given the user's selected goals and demographics, produce exactly 15 distinct financial goals as a JSON array of strings. Each goal should be two sentences long (no more, no less). Return only valid JSON (an array of 15 strings) with no extra explanation.

Selected goals: ${JSON.stringify(selectedOptionsQ1)}
Demographics: ${JSON.stringify(demographicsAnswers)}

Provide pragmatic, clear, and actionable goals tailored to the provided inputs.`;

      const modelsToTry = [
        "gemini-2.0-flash",
        "gemini-1.5-flash",
        "gemini-1.5-pro"
      ];

      const body = {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 800
        }
      };

      let data: any = null;

      for (const model of modelsToTry) {
        try {
          // ✅ FIXED ENDPOINT — v1, not v1beta
          const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${encodeURIComponent(
            key
          )}`;

          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          });

          if (res.status === 404) {
            console.warn(`Model ${model} not found. Trying next.`);
            continue;
          }

          if (!res.ok) {
            console.error(`Model ${model} error:`, await res.text());
            continue;
          }

          data = await res.json();
          break;
        } catch (err) {
          console.error(`Request error for model ${model}:`, err);
        }
      }

      if (!data) {
        alert("No available Gemini model found for this API key.");
        return;
      }

      let text = "";
      try {
        text =
          data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
          "";
      } catch (e) {
        text = JSON.stringify(data);
      }

      let parsed: string[] | null = null;

      try {
        parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) parsed = null;
      } catch (e) {
        const match = text.match(/\[.*\]/s);
        if (match) {
          try {
            const maybe = JSON.parse(match[0]);
            if (Array.isArray(maybe)) parsed = maybe;
          } catch {}
        }
      }

      if (!parsed) {
        const lines = text
          .split(/\n+/)
          .map((l: string) => l.replace(/^\d+\.\s*/, "").trim())
          .filter((l: string) => l.length > 0);
        parsed = lines.slice(0, 15);
      }

      if (parsed.length < 15) {
        const pad: string[] = [];
        for (let i = parsed.length; i < 15; i++) {
          pad.push(
            `Establish a diversified savings plan. Review and adjust it quarterly to stay on track.`
          );
        }
        parsed = [...parsed, ...pad];
      }

      const finalGoals = parsed
        .slice(0, 15)
        .map((s: string) => s.trim());
      setGeneratedGoals(finalGoals);
    } catch (err) {
      console.error(err);
      alert("Error generating goals. See console for details.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-muted px-4 pt-20">
        <div className="text-left w-full max-w-3xl bg-card rounded-2xl p-8 shadow">
          <h1 className="mb-4 text-3xl font-bold">Your Roadmap</h1>

          {!hasData ? (
            <div>
              <p className="mb-4">
                No questionnaire data found. Please complete the
                questionnaire first.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/questions")}
                  className="px-4 py-2 rounded bg-hero-gradient text-white"
                >
                  Go to Questionnaire
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="px-4 py-2 rounded border"
                >
                  Back Home
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-2">
                  Selected Goals
                </h2>
                {selectedOptionsQ1.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No goals selected.
                  </p>
                ) : (
                  <ul className="list-disc ml-5">
                    {selectedOptionsQ1.map(
                      (opt: string, idx: number) => (
                        <li key={idx}>{opt}</li>
                      )
                    )}
                  </ul>
                )}
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  Demographics
                </h2>
                {Object.keys(demographicsAnswers).length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No demographic answers provided.
                  </p>
                ) : (
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(
                      demographicsAnswers
                    ).map(([k, v]) => (
                      <div key={k}>
                        <dt className="font-medium">{titleCase(k)}</dt>
                        <dd className="text-sm">{String(v)}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </section>

              <div className="pt-4 flex flex-col gap-3">
                <div className="flex gap-2">
                  <button
                    onClick={generateGoals}
                    className="px-4 py-2 rounded bg-primary text-white"
                    disabled={isGenerating}
                  >
                    {isGenerating
                      ? "Generating..."
                      : "Generate 15 Financial Goals"}
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 rounded border"
                  >
                    Back to Home
                  </button>
                </div>

                {generatedGoals && (
                  <div className="mt-4 bg-background p-4 rounded">
                    <h3 className="font-semibold mb-2">
                      Generated Goals
                    </h3>
                    <ol className="list-decimal ml-5 space-y-2">
                      {generatedGoals.map((g, i) => (
                        <li key={i} className="text-sm">
                          {g}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;