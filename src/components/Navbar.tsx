
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  
  const routes = [
    { path: "/", label: "Home" },
    { path: "/components", label: "Components" },
    { path: "/documentation", label: "Documentation" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">UI</span>
            </div>
            <span className="hidden font-bold text-lg sm:inline-block">ModernKit</span>
          </Link>
          
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
        
        <div className="flex items-center gap-2">
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
          
          <Button size="sm" className="hidden md:flex">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
