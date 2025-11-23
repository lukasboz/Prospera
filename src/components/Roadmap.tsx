import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar.tsx";
import { Target } from "lucide-react";

const Roadmap = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = (location && (location.state as any)) || {};
  const { selectedOptionsQ1 = [], demographicsAnswers = {}, topAccount = "" } = state;

  const hasData = selectedOptionsQ1.length > 0 || Object.keys(demographicsAnswers).length > 0;

  const steps = Array.from({ length: 15 }, (_, i) => ({
    title: `Step ${i + 1}`,
    description: `Placeholder description for step ${i + 1}`,
    icon: Target,
  }));

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {!hasData ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
          <p className="mb-4 text-lg">No questionnaire data found. Please complete the questionnaire first.</p>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/questions")}
              className="px-4 py-2 rounded bg-hero-gradient text-white hover:opacity-90 transition"
            >
              Go to Questionnaire
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded border border-border hover:bg-muted transition"
            >
              Back Home
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center py-12 px-4">
          <h1 className="text-3xl font-bold mb-12 text-center sm:text-left max-w-4xl pt-16">
            Your Financial Roadmap
          </h1>

          <div className="relative w-full max-w-3xl">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 w-1 h-full bg-hero-gradient rounded"></div>

            {/* Steps */}
            <div className="flex flex-col gap-8">
              {steps.map((step, idx) => (
                <div key={idx} className="relative pl-16 flex items-center"> {/* align center */}
                  {/* Step circle with number */}
                  <div className="absolute -left-14 w-12 h-12 rounded-xl bg-hero-gradient flex items-center justify-center text-white font-bold">
                    {idx + 1}
                  </div>
                  {/* Step card */}
                  <div className="p-4 rounded-xl border border-border bg-card shadow-sm w-full hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground w-full m-0 p-0">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {Object.keys(demographicsAnswers).length > 0 && (
            <div className="mt-12 w-full max-w-3xl bg-card rounded-xl p-6 shadow">
              <h2 className="text-2xl font-semibold mb-4">Your Demographics</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(demographicsAnswers).map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-medium capitalize">{k.replace(/([A-Z])/g, " $1")}</dt>
                    <dd className="text-sm">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 rounded-xl bg-hero-gradient text-white font-semibold hover:opacity-90 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roadmap;
