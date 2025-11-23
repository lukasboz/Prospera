import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Roadmap from "./components/Roadmap.tsx";
import Questions from "./components/Questions.tsx";
import FinancialOverview from "./components/FinancialOverview.tsx";
import ExtraInfo from "./components/ExtraInfo.tsx";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/financial-overview" element={<FinancialOverview />} />
          <Route path="/extra-info" element={<ExtraInfo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
