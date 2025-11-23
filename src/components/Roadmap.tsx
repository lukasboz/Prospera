import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar.tsx";

const Roadmap = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // data passed from Questions via router state
  const state = (location && (location.state as any)) || {};
  const { selectedOptionsQ1 = [], demographicsAnswers = {} } = state;

  const hasData = selectedOptionsQ1.length > 0 || Object.keys(demographicsAnswers).length > 0;

  return (
    <div>
      <Navbar/>
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="text-left w-full max-w-3xl bg-card rounded-2xl p-8 shadow">
        <h1 className="mb-4 text-3xl font-bold">Your Roadmap</h1>

        {!hasData ? (
          <div>
            <p className="mb-4">No questionnaire data found. Please complete the questionnaire first.</p>
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
              <h2 className="text-xl font-semibold mb-2">Selected Goals</h2>
              {selectedOptionsQ1.length === 0 ? (
                <p className="text-sm text-muted-foreground">No goals selected.</p>
              ) : (
                <ul className="list-disc ml-5">
                  {selectedOptionsQ1.map((opt: string, idx: number) => (
                    <li key={idx}>{opt}</li>
                  ))}
                </ul>
              )}
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Demographics</h2>
              {Object.keys(demographicsAnswers).length === 0 ? (
                <p className="text-sm text-muted-foreground">No demographic answers provided.</p>
              ) : (
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(demographicsAnswers).map(([k, v]) => (
                    <div key={k}>
                      <dt className="font-medium">{k}</dt>
                      <dd className="text-sm">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </section>

            <div className="pt-4">
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 rounded bg-hero-gradient text-white"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Roadmap;