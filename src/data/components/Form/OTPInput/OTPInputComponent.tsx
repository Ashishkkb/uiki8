
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { Check } from "lucide-react";
import { toast } from "sonner";

interface OTPInputComponentProps {
  length?: number;
  demo?: boolean;
}

const OTPInputComponent: React.FC<OTPInputComponentProps> = ({ 
  length = 6, 
  demo = true 
}) => {
  const [value, setValue] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const simulateVerification = () => {
    setIsVerifying(true);
    
    // Simulate an API call
    setTimeout(() => {
      setIsVerifying(false);
      
      if (value.length === length && demo) {
        // For demo, any complete code works
        setIsVerified(true);
        toast.success("OTP verified successfully");
      } else {
        toast.error("Invalid verification code");
      }
    }, 1500);
  };

  const simulateResendCode = () => {
    setIsResending(true);
    
    // Simulate an API call
    setTimeout(() => {
      setIsResending(false);
      setValue("");
      setIsVerified(false);
      toast.success("New verification code sent");
    }, 1000);
  };

  const resetDemo = () => {
    setValue("");
    setIsVerified(false);
  };
  
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Verification</CardTitle>
        <CardDescription>
          Enter the verification code sent to your device.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-6">
          {isVerified ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-center text-sm">Your identity has been verified successfully.</p>
            </div>
          ) : (
            <>
              <InputOTP
                maxLength={length}
                value={value}
                onChange={setValue}
                disabled={isVerifying || isVerified}
                containerClassName="group flex items-center has-[:disabled]:opacity-70"
                render={({ slots }) => (
                  <>
                    <InputOTPGroup>
                      {slots.slice(0, 3).map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} index={index} />
                      ))}
                    </InputOTPGroup>
                    {length > 3 && (
                      <>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          {slots.slice(3, 6).map((slot, index) => (
                            <InputOTPSlot key={index + 3} {...slot} index={index + 3} />
                          ))}
                        </InputOTPGroup>
                      </>
                    )}
                  </>
                )}
              />
              <p className="text-center text-sm text-muted-foreground px-4">
                The verification code will expire in 10 minutes.
              </p>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        {isVerified ? (
          demo && (
            <Button variant="outline" className="w-full" onClick={resetDemo}>
              Reset Demo
            </Button>
          )
        ) : (
          <>
            <Button 
              className="w-full" 
              onClick={simulateVerification}
              disabled={value.length < length || isVerifying}
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </Button>
            <Button 
              variant="ghost" 
              className="w-full text-sm"
              onClick={simulateResendCode}
              disabled={isResending}
            >
              {isResending ? "Sending..." : "Resend Code"}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default OTPInputComponent;
