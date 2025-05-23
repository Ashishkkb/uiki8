
import React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "You've been subscribed to our newsletter."
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-6 md:px-12 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Subscribe to our newsletter for updates, tutorials, and early access to new features.
          </p>
        </div>
        
        <form 
          onSubmit={handleSubmit}
          className="max-w-md mx-auto flex gap-2 flex-col sm:flex-row"
        >
          <Input
            type="email"
            placeholder="Your email address"
            className="flex-grow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button 
            type="submit" 
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
        
        <div className="text-center text-sm text-muted-foreground mt-4">
          We respect your privacy. Unsubscribe at any time.
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
