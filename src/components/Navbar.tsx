
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md py-4 px-6 md:px-12 fixed top-0 left-0 right-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <span className="font-bold text-xl hidden md:block">UIKits Galaxy</span>
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#components" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Components</a>
          <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Pricing</a>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 py-4 px-6 flex flex-col gap-4">
          <a href="#components" className="text-gray-600 hover:text-gray-900 font-medium transition-colors py-2" onClick={toggleMenu}>Components</a>
          <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors py-2" onClick={toggleMenu}>Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors py-2" onClick={toggleMenu}>Pricing</a>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white w-full">Get Started</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
