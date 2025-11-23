import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/advancing-the-role-of-women-in-the-financial-services-sector.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const router = useNavigate();
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-subtle-gradient -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-slide-in">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-foreground leading-tight">
              Take Control of Your{" "}
              <span className="bg-hero-gradient bg-clip-text text-transparent">
                Financial Future
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
              Join thousands of women building wealth, closing the pay gap, and achieving financial independence with AI-powered insights tailored to your goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-hero-gradient hover:opacity-90 transition-opacity text-base"
                onClick={() => router("/questions")}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-foreground">$2B+</div>
                <div className="text-sm text-muted-foreground">Managed Wealth</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-foreground">4.9★</div>
                <div className="text-sm text-muted-foreground">User Rating</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-medium">
              <img
                src={heroImage}
                alt="Women empowered in finance"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-medium border border-border animate-slide-in">
              <div className="text-sm text-muted-foreground mb-1">Monthly Savings</div>
              <div className="text-2xl font-bold bg-hero-gradient bg-clip-text text-transparent">
                +$2,450
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
