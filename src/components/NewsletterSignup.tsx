
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
        variant: "default",
      });
    }, 1000);
  };

  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with New Components
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new components, 
            updates, and exclusive offers.
          </p>
        </div>
        
        <form 
          onSubmit={handleSubmit}
          className="max-w-md mx-auto relative bg-white/10 backdrop-blur-sm p-1.5 rounded-lg flex items-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-transparent border-0 focus:ring-0 text-white placeholder-white/60 py-3 px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button 
            type="submit" 
            className="bg-white text-purple-600 hover:bg-white/90 rounded-md px-4 py-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span className="mr-2">Subscribe</span>
                <Send className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>
        
        <p className="text-center mt-4 text-sm opacity-80">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSignup;
