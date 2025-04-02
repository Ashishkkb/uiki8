
import * as React from "react";
import { Menu, X, ChevronDown, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-background border-b border-border py-4 sticky top-0 z-50 transition-colors duration-200">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">U</span>
          </div>
          <span className="text-xl font-semibold text-foreground">UIKits Galaxy</span>
        </Link>

        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={cn(
                    "px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                    isActive("/") ? "text-primary" : ""
                  )}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/components">
                  <NavigationMenuLink className={cn(
                    "px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                    isActive("/components") ? "text-primary" : ""
                  )}>
                    Components
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/documentation">
                  <NavigationMenuLink className={cn(
                    "px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                    isActive("/documentation") ? "text-primary" : ""
                  )}>
                    Documentation
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="rounded-full hover:bg-accent transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Button variant="outline" className="border-border text-muted-foreground hover:bg-accent">
            Log in
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Sign up
          </Button>
        </div>

        <div className="flex md:hidden items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="rounded-full hover:bg-accent transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <button
            className="text-foreground"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-2 pb-4 px-4 bg-background border-b border-border">
          <div className="flex flex-col space-y-3">
            <Link
              to="/"
              className={`py-2 text-base ${isActive("/") ? "text-primary font-medium" : "text-foreground"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/components"
              className={`py-2 text-base ${isActive("/components") ? "text-primary font-medium" : "text-foreground"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Components
            </Link>
            <Link
              to="/documentation"
              className={`py-2 text-base ${isActive("/documentation") ? "text-primary font-medium" : "text-foreground"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Documentation
            </Link>
            <div className="flex flex-col space-y-3 pt-3 border-t border-border">
              <Button variant="outline" className="w-full justify-center border-border text-foreground hover:bg-accent">
                Log in
              </Button>
              <Button className="w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
