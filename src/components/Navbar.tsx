
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 md:px-12">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-purple-600">UIKits</span>
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">
            Home
          </Link>
          <Link to="/components" className="text-gray-600 hover:text-purple-600 transition-colors">
            Components
          </Link>
          <Link to="#features" className="text-gray-600 hover:text-purple-600 transition-colors">
            Features
          </Link>
          <Link to="#pricing" className="text-gray-600 hover:text-purple-600 transition-colors">
            Pricing
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline">Log in</Button>
          <Button>Sign up</Button>
        </div>

        <button
          className="md:hidden text-gray-600"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 px-4">
          <div className="flex flex-col space-y-4 pb-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-purple-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/components"
              className="text-gray-600 hover:text-purple-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Components
            </Link>
            <Link
              to="#features"
              className="text-gray-600 hover:text-purple-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="#pricing"
              className="text-gray-600 hover:text-purple-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="flex flex-col space-y-3 pt-3 border-t border-gray-200">
              <Button variant="outline" className="w-full justify-center">
                Log in
              </Button>
              <Button className="w-full justify-center">Sign up</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
