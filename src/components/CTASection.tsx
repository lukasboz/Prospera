import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient opacity-5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground mb-6 animate-fade-in">
            Ready to Transform Your{" "}
            <span className="bg-hero-gradient bg-clip-text text-transparent">
              Financial Life?
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in">
            Join thousands of women who are taking control of their finances and building lasting wealth. Start your free trial today, no credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button size="lg" className="bg-hero-gradient hover:opacity-90 transition-opacity text-base px-8">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;
