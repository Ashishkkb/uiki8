
import React, { useState, useEffect } from 'react';
import { Shield, Copy, RefreshCw, Key, Smartphone, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

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
  const cleanedSecret = secret.replace(/\s/g, '');
  const encodedAccount = encodeURIComponent(account);
  const encodedIssuer = encodeURIComponent(issuer);
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/${encodedAccount}?secret=${cleanedSecret}&issuer=${encodedIssuer}`;
};

// Mock function to validate a TOTP code
const validateTOTPCode = (code: string, secret: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would validate against a proper TOTP algorithm
      // For demonstration, we'll consider any 6-digit code valid
      resolve(code.length === 6);
    }, 1000);
  });
};

interface TwoFactorAuthProps {
  account?: string;
  issuer?: string;
  onVerify?: (verified: boolean) => void;
  mode?: 'setup' | 'verify';
  backupCodes?: number;
}

const TwoFactorAuthComponent: React.FC<TwoFactorAuthProps> = ({
  account = 'user@example.com',
  issuer = 'YourApp',
  onVerify,
  mode = 'setup',
  backupCodes = 8,
}) => {
  const [secret] = useState(generateTOTPSecret());
  const [qrCodeURL] = useState(generateQRCodeURL(secret, account, issuer));
  const [value, setValue] = useState("");
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("app");
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [backupCodesList, setBackupCodesList] = useState<string[]>([]);
  const [recoveryCodesVisible, setRecoveryCodesVisible] = useState(false);

  // Generate backup codes when component mounts
  useEffect(() => {
    generateBackupCodes();
  }, []);

  // Progress bar animation for verification
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isVerifying) {
      setVerificationProgress(0);
      
      timer = setInterval(() => {
        setVerificationProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            clearInterval(timer);
          }
          return Math.min(newProgress, 100);
        });
      }, 100);
    } else {
      setVerificationProgress(0);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isVerifying]);

  const generateBackupCodes = () => {
    const codes: string[] = [];
    for (let i = 0; i < backupCodes; i++) {
      // Generate a random 10-character backup code
      const code = Math.random().toString(36).substring(2, 12).toUpperCase();
      // Format it as XXXX-XXXX-XX
      const formatted = `${code.substring(0, 4)}-${code.substring(4, 8)}-${code.substring(8, 10)}`;
      codes.push(formatted);
    }
    setBackupCodesList(codes);
  };

  const copySecret = async () => {
    try {
      await navigator.clipboard.writeText(secret.replace(/\s/g, ''));
      toast.success("Secret key copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy secret key");
    }
  };

  const copyBackupCodes = async () => {
    try {
      await navigator.clipboard.writeText(backupCodesList.join('\n'));
      toast.success("Backup codes copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy backup codes");
    }
  };

  const verifyCode = async () => {
    setIsVerifying(true);
    setError(null);
    
    try {
      const isValid = await validateTOTPCode(value, secret);
      
      if (isValid) {
        setIsSetupComplete(true);
        if (onVerify) onVerify(true);
        toast.success("Two-factor authentication enabled successfully");
      } else {
        setError("Invalid verification code. Please try again.");
        if (onVerify) onVerify(false);
      }
    } catch (error) {
      setError("An error occurred during verification. Please try again.");
      if (onVerify) onVerify(false);
    } finally {
      setIsVerifying(false);
    }
  };

  if (mode === 'verify') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Two-Factor Authentication</CardTitle>
          </div>
          <CardDescription>
            Enter the verification code from your authenticator app
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-center mb-4">
              <InputOTP
                maxLength={6}
                value={value}
                onChange={setValue}
                render={({ slots }) => (
                  <InputOTPGroup>
                    {slots.map((slot, index) => (
                      <InputOTPSlot key={index} {...slot} index={index} />
                    ))}
                  </InputOTPGroup>
                )}
              />
            </div>
            
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Error
                </AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {isVerifying && (
              <Progress value={verificationProgress} className="mb-2" />
            )}
            
            <Button 
              onClick={verifyCode} 
              className="w-full"
              disabled={value.length !== 6 || isVerifying}
            >
              {isVerifying ? "Verifying..." : "Verify Identity"}
            </Button>
            
            <div className="mt-4 text-center">
              <Button
                variant="link"
                onClick={() => setRecoveryCodesVisible(!recoveryCodesVisible)}
                className="text-sm"
              >
                Use recovery code instead
              </Button>
              
              {recoveryCodesVisible && (
                <div className="mt-2">
                  <InputOTP
                    maxLength={12}
                    value={value}
                    onChange={setValue}
                    placeholder="XXXX-XXXX-XX"
                    render={({ slots }) => (
                      <InputOTPGroup>
                        {slots.map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} index={index} />
                        ))}
                      </InputOTPGroup>
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
                Two-Factor Authentication Enabled
              </h3>
              <p className="text-sm text-green-600 dark:text-green-400">
                Your account is now protected with an additional layer of security
              </p>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-4 mb-6">
              <h4 className="text-amber-800 dark:text-amber-300 font-medium mb-2">Recovery Codes</h4>
              <p className="text-sm text-amber-700 dark:text-amber-400 mb-4">
                Save these recovery codes in a secure location. You can use these codes to access your account if you lose your authentication device.
              </p>
              
              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-amber-200 dark:border-amber-800 mb-3">
                <div className="grid grid-cols-2 gap-2">
                  {backupCodesList.map((code, i) => (
                    <code key={i} className="block font-mono text-xs p-1">
                      {code}
                    </code>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={copyBackupCodes} 
                className="w-full"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Recovery Codes
              </Button>
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
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="app">
                    <Smartphone className="h-4 w-4 mr-2" />
                    App Setup
                  </TabsTrigger>
                  <TabsTrigger value="sms">
                    <Key className="h-4 w-4 mr-2" />
                    Manual Setup
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="app" className="space-y-4">
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
                              <InputOTPSlot key={index} {...slot} index={index} />
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
                    
                    {isVerifying && (
                      <Progress value={verificationProgress} className="mb-2" />
                    )}
                    
                    <Button 
                      onClick={verifyCode} 
                      className="w-full"
                      disabled={value.length !== 6 || isVerifying}
                    >
                      {isVerifying ? "Verifying..." : "Verify & Enable"}
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="sms" className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Step 1: Get Secret Key</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Enter this secret key manually in your authenticator app
                    </p>
                    
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
                      Add this key with account: {account} in your authenticator app
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
                              <InputOTPSlot key={index} {...slot} index={index} />
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
                    
                    {isVerifying && (
                      <Progress value={verificationProgress} className="mb-2" />
                    )}
                    
                    <Button 
                      onClick={verifyCode} 
                      className="w-full"
                      disabled={value.length !== 6 || isVerifying}
                    >
                      {isVerifying ? "Verifying..." : "Verify & Enable"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TwoFactorAuthComponent;
