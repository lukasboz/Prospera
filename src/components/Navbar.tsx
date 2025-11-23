import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="/"
              className="text-2xl font-bold font-display bg-hero-gradient bg-clip-text text-transparent"
            >
              Prospera
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-foreground hover:text-primary transition-colors"
            >
              Features
            </a>

            <SignedIn>
              {/* Divider */}
              <span className="h-8 w-px bg-foreground/60 mx-2" />

              {/* New sections */}
              <a
                href="/questions"
                className="text-foreground hover:text-primary transition-colors"
              >
                Questionnaire
              </a>
              <a
                href="/roadmap"
                className="text-foreground hover:text-primary transition-colors"
              >
                Roadmap
              </a>
              <a
                href="/financial-overview"
                className="text-foreground hover:text-primary transition-colors"
              >
                Overview
              </a>
            </SignedIn>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full btn-ghost">Sign In</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <Button className="bg-hero-gradient hover:opacity-90 transition-opacity">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-foreground hover:bg-muted"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <a
              href="#features"
              className="block py-2 text-foreground hover:text-primary transition-colors"
            >
              Features
            </a>

            <SignedIn>
              <div className="border-t border-border pt-2 flex flex-col space-y-2">
                <a
                  href="/questions"
                  className="block py-2 text-foreground hover:text-primary transition-colors"
                >
                  Questionnaire
                </a>
                <a
                  href="/roadmap"
                  className="block py-2 text-foreground hover:text-primary transition-colors"
                >
                  Roadmap
                </a>
                <a
                  href="/financial-overview"
                  className="block py-2 text-foreground hover:text-primary transition-colors"
                >
                  Overview
                </a>
              </div>
            </SignedIn>

            <div className="flex flex-col space-y-2 pt-4 border-t border-border">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full btn-ghost">Sign In</button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <Button className="w-full bg-hero-gradient hover:opacity-90 transition-opacity">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
