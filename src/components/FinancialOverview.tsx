import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar.tsx";

// Ticker → Company Name
const stockInfo: Record<string, string> = {
  // ---- US STOCKS ----
  AAPL: "Apple Inc.",
  MSFT: "Microsoft",
  GOOGL: "Alphabet Class A",
  AMZN: "Amazon",
  TSLA: "Tesla",
  NVDA: "NVIDIA",
  META: "Meta Platforms",
  JPM: "JPMorgan Chase",
  V: "Visa",
  MA: "Mastercard",
  DIS: "Walt Disney Co.",
  NKE: "Nike",
  NFLX: "Netflix",
  KO: "Coca-Cola",
  XOM: "ExxonMobil",
  PFE: "Pfizer",

  // ---- CANADIAN STOCKS ----
  SHOP: "Shopify",
  TD: "Toronto-Dominion Bank",
  RY: "Royal Bank of Canada",
  BNS: "Bank of Nova Scotia",
  ENB: "Enbridge",
  SU: "Suncor Energy",
  BCE: "BCE Inc.",
  CM: "CIBC",

  // ---- BROAD MARKET ETFs ----
  SPY: "S&P 500 ETF (SPDR)",
  VOO: "S&P 500 ETF (Vanguard)",
  QQQ: "Nasdaq-100 ETF (Invesco)",
  VT: "Global Stock Market ETF (Vanguard)",
  VTI: "Total US Stock Market ETF (Vanguard)",
  XEQT: "All-Equity ETF Portfolio (iShares)",
  VEQT: "All-Equity ETF Portfolio (Vanguard)",
  XAW: "Global ex-Canada ETF (iShares)",

  // ---- SECTOR ETFs ----
  XLF: "US Financials ETF",
  XLK: "US Technology ETF",
  XLE: "US Energy ETF",
  XLY: "US Consumer Discretionary ETF",
  XLI: "US Industrials ETF",
  XLP: "US Consumer Staples ETF",

  // ---- DIVIDEND ETFs ----
  VYM: "High Dividend Yield ETF (Vanguard)",
  SCHD: "US Dividend Equity ETF (Schwab)",
  XDV: "Canadian Dividend ETF (iShares)",
  ZDV: "Canadian Dividend ETF (BMO)",

  // ---- INTERNATIONAL ETFs ----
  EEM: "Emerging Markets ETF",
  EFA: "Developed Markets ETF",
  XEF: "International ex-US & Canada ETF (iShares)",

  // ---- BOND ETFs ----
  BND: "Total US Bond Market ETF (Vanguard)",
  AGG: "US Aggregate Bond ETF (iShares)",
  TLT: "20+ Year US Treasury Bond ETF",
  IEF: "7–10 Year US Treasury Bond ETF",
  HBB: "Canadian Universe Bond ETF (Horizons)",
  ZAG: "Canadian Aggregate Bond ETF (BMO)",
  XBB: "Canadian Universe Bond ETF (iShares)",

  // ---- GOVERNMENT & TREASURY ----
  SGOV: "Short-Term U.S. Treasury ETF",
  GOVT: "U.S. Treasury Bond ETF",
};

const stockList = Object.keys(stockInfo);

const getRandomStocks = (list: string[], count: number) => {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Roadmap = () => {
  const location = useLocation();
  const [suggestedStocks, setSuggestedStocks] = useState<string[]>([]);

  useEffect(() => {
    setSuggestedStocks(getRandomStocks(stockList, 6));
  }, []);

  return (
    <div>
  <Navbar />

  <div className="flex min-h-screen items-start justify-center bg-muted px-2 pt-20 pb-20">
    <div className="bg-card rounded-2xl shadow-xl max-w-7xl w-full mx-4 p-8 flex flex-col gap-10">


      {/* Header */}
      <h1 className="text-3xl font-bold text-center mt-2">Your Financial Roadmap</h1>

      {/* --- MAIN GRID: LEFT + RIGHT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT SIDE (Investments) */}
        <div className="flex flex-col gap-5">

          <div className="bg-background p-5 rounded-xl shadow text-center min-h-[90px] flex flex-col justify-center">
            <h2 className="text-xl font-semibold">Yearly Investments</h2>
            <p className="text-lg font-bold">$50,000 / year (placeholder)</p>
          </div>

          <div className="bg-background p-5 rounded-xl shadow text-center min-h-[90px] flex flex-col justify-center">
            <h2 className="text-xl font-semibold">Monthly Investments</h2>
            <p className="text-lg font-bold">$1,200 / month (placeholder)</p>
          </div>

          <div className="bg-background p-5 rounded-xl shadow text-center min-h-[90px] flex flex-col justify-center">
            <h2 className="text-xl font-semibold">Projected Stock Growth</h2>
            <p className="text-lg font-bold">8.2 - 9.0%</p>
          </div>

        </div>


        {/* RIGHT SIDE (Stock Picks) */}
        <div className="bg-background p-5 rounded-xl shadow flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-center">Suggested Stock Picks</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {suggestedStocks.map((ticker) => (
              <div
                key={ticker}
                className="p-3 bg-muted rounded-lg flex items-center justify-center font-medium shadow text-center"
              >
                {ticker}
                <span className="text-muted-foreground">&nbsp;({stockInfo[ticker]})</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* --- BOTTOM FULL-WIDTH ADVICE SECTION --- */}
      <div className="bg-background p-5 rounded-xl shadow flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Financial Advice</h2>

        <p className="text-muted-foreground italic text-sm leading-relaxed">
          Audio transcription from AI-generated advice (Gemini): <br />
          "Diversify your portfolio across multiple sectors and consider both long-term and short-term opportunities.
          Revisit your allocations quarterly and adjust according to your risk tolerance."
        </p>

        <div className="w-full flex justify-center mt-1">
          <audio controls>
            <source src="/path-to-audio.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>

    </div>
  </div>
</div>

  );
};

export default Roadmap;
