import { Target, TrendingUp, Shield, Users, Sparkles, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Goal-Based Planning",
    description: "Set and track personalized financial goals with intelligent recommendations tailored to your journey."
  },
  {
    icon: TrendingUp,
    title: "Investment Insights",
    description: "Access curated investment opportunities and portfolio strategies designed for long-term growth."
  },
  {
    icon: Sparkles,
    title: "AI-Powered Advisor",
    description: "Get instant answers to your financial questions with our intelligent AI assistant."
  },
  {
    icon: BarChart3,
    title: "Wealth Dashboard",
    description: "Visualize your complete financial picture with intuitive charts and actionable insights."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground mb-6">
            Everything You Need to{" "}
            <span className="bg-hero-gradient bg-clip-text text-transparent">
              Thrive Financially
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful tools designed specifically for women's financial success, all in one place.
          </p>
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-border bg-card hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-hero-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold font-display text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
