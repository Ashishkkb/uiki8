
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
        <p className="text-xl text-foreground mb-6">Oops! The page you're looking for doesn't exist.</p>
        <p className="text-muted-foreground mb-8">
          The page you requested could not be found. It might have been removed, 
          renamed, or didn't exist in the first place.
        </p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
