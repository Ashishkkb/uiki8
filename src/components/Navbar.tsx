
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun, Laptop, Menu, X, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const routes = [
    { path: "/", label: "Home" },
    { path: "/components", label: "Components" },
    { path: "/pricing", label: "Pricing" }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">UI</span>
            </div>
            <span className="hidden font-bold text-lg sm:inline-block">ModernKit</span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground/80",
                  location.pathname === route.path 
                    ? "text-foreground" 
                    : "text-foreground/60"
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light')}
            aria-label="Toggle theme"
          >
            {theme === 'light' && <Sun className="h-5 w-5" />}
            {theme === 'dark' && <Moon className="h-5 w-5" />}
            {theme === 'system' && <Laptop className="h-5 w-5" />}
          </Button>
          
          {/* GitHub link */}
          <Button variant="ghost" size="icon" className="rounded-full hidden md:flex">
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer" 
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>
          
          {/* Get Started button (desktop) */}
          <Button size="sm" className="hidden md:flex">
            <Link to="/components">Get Started</Link>
          </Button>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/10">
          <div className="container py-4 px-4 flex flex-col gap-4">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  "px-4 py-2 text-base font-medium rounded-md",
                  location.pathname === route.path 
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-border/10 pt-4 flex flex-col gap-3">
              <Button size="sm" className="w-full">
                <Link to="/components" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2">
                <Github className="h-4 w-4" />
                <a 
                  href="https://github.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center"
                >
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
