import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import AnalyzeSkills from "./pages/AnalyzeSkills";
import CareerRecommendations from "./pages/CareerRecommendations";
import CourseSuggestions from "./pages/CourseSuggestions";
import JobMatching from "./pages/JobMatching";
import InterviewPractice from "./pages/InterviewPractice";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze-skills" element={<AnalyzeSkills />} />
            <Route path="/careers" element={<CareerRecommendations />} />
            <Route path="/courses" element={<CourseSuggestions />} />
            <Route path="/jobs" element={<JobMatching />} />
            <Route path="/interview" element={<InterviewPractice />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
