
import { ComponentItem } from "@/types/component";
import TwoFactorAuthComponent from "./TwoFactorAuthComponent";

const TwoFactorAuthComponentItem: ComponentItem = {
  id: 301,
  name: "Two-Factor Authentication",
  description: "A secure 2FA setup component with QR code generation and verification",
  category: "Security",
  component: TwoFactorAuthComponent,
  code: `import React, { useState } from 'react';
import { Shield, Copy, RefreshCw, Key } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

// Mock function to generate a TOTP secret
const generateTOTPSecret = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  // Format with spaces every 4 characters
  return result.match(/.{1,4}/g)?.join(' ') || result;
};

// Mock function to generate a QR code URL
const generateQRCodeURL = (secret: string, account: string = 'user@example.com', issuer: string = 'YourApp') => {
  const cleanedSecret = secret.replace(/\\s/g, '');
  const encodedAccount = encodeURIComponent(account);
  const encodedIssuer = encodeURIComponent(issuer);
  return \`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/\${encodedAccount}?secret=\${cleanedSecret}&issuer=\${encodedIssuer}\`;
};

interface TwoFactorAuthProps {
  account?: string;
  issuer?: string;
  onVerify?: (verified: boolean) => void;
}

export const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({
  account = 'user@example.com',
  issuer = 'YourApp',
  onVerify,
}) => {
  const [secret] = useState(generateTOTPSecret());
  const [qrCodeURL] = useState(generateQRCodeURL(secret, account, issuer));
  const [value, setValue] = useState("");
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copySecret = async () => {
    try {
      await navigator.clipboard.writeText(secret.replace(/\\s/g, ''));
      toast.success("Secret key copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy secret key");
    }
  };

  const verifyCode = () => {
    setIsVerifying(true);
    setError(null);
    
    // In a real app, we would validate this against a backend
    // This is just a mock implementation for demonstration
    setTimeout(() => {
      const isValid = value.length === 6; // Simplified check, just for UI demo
      
      if (isValid) {
        setIsSetupComplete(true);
        if (onVerify) onVerify(true);
        toast.success("Two-factor authentication enabled successfully");
      } else {
        setError("Invalid verification code. Please try again.");
        if (onVerify) onVerify(false);
      }
      
      setIsVerifying(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle>Two-Factor Authentication</CardTitle>
        </div>
        <CardDescription>
          Enhance your account security by enabling two-factor authentication
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSetupComplete ? (
          <div className="text-center py-4">
            <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg mb-4">
              <div className="flex justify-center mb-2">
                <div className="bg-green-500 rounded-full p-3">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
                Two-Factor Authentication Enabled
              </h3>
              <p className="text-sm text-green-600 dark:text-green-400">
                Your account is now protected with an additional layer of security
              </p>
            </div>
            
            <Button
              variant="outline"
              onClick={() => setIsSetupComplete(false)}
              className="mt-2"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Setup Again
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Step 1: Scan QR Code</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                </p>
                
                <div className="flex justify-center mb-4">
                  <img
                    src={qrCodeURL}
                    alt="QR Code for Two-Factor Authentication"
                    className="h-44 w-44 border border-border rounded-md"
                    loading="lazy"
                  />
                </div>
                
                <div className="bg-background border border-border rounded-md p-3 flex items-center justify-between mb-2">
                  <div className="font-mono text-xs overflow-x-auto whitespace-nowrap pr-2">
                    {secret}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copySecret}
                    className="flex-shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  If you can't scan the QR code, enter this key manually in your app.
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">
                  Step 2: Enter Verification Code
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Enter the 6-digit code from your authenticator app to verify setup
                </p>
                
                <div className="flex justify-center mb-4">
                  <InputOTP
                    maxLength={6}
                    value={value}
                    onChange={setValue}
                    render={({ slots }) => (
                      <InputOTPGroup>
                        {slots.map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}
                      </InputOTPGroup>
                    )}
                  />
                </div>
                
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <Button 
                  onClick={verifyCode} 
                  className="w-full"
                  disabled={value.length !== 6 || isVerifying}
                >
                  {isVerifying ? "Verifying..." : "Verify & Enable"}
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};`,
  framework: "React",
  isNew: true,
  tags: ["security", "2fa", "authentication", "verification", "totp", "qr-code"],
  fileSize: "4.8kb",
  complexity: "medium",
  lastUpdated: "2025-04-27",
  author: "Enchant UI Team"
};

export default TwoFactorAuthComponentItem;
