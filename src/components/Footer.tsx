const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="text-2xl font-bold font-display bg-hero-gradient bg-clip-text text-transparent inline-block mb-4">
              Prospera
            </a>
            <p className="text-sm text-muted-foreground">
              Empowering women to achieve financial independence and build lasting wealth.
            </p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Prospera. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="/extra-info" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="/extra-info" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="/extra-info" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
