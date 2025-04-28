
import React, { useState, useEffect } from 'react';
import { Shield, Copy, RefreshCw, Key, Smartphone, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

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

// Mock function to validate a recovery code
const validateRecoveryCode = (code: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would validate against stored recovery codes
      // For demonstration, any code with the format XXXX-XXXX-XX is valid
      const recoveryCodeRegex = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{2}$/;
      resolve(recoveryCodeRegex.test(code));
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
  const [recoveryCodeValue, setRecoveryCodeValue] = useState("");
  const [showBackupCodesDialog, setShowBackupCodesDialog] = useState(false);
  const [isUsingRecoveryCode, setIsUsingRecoveryCode] = useState(false);

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
      toast.success("Recovery codes copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy recovery codes");
    }
  };

  const downloadBackupCodes = () => {
    const text = `# ${issuer} Recovery Codes\n# Generated on ${new Date().toLocaleString()}\n# For account: ${account}\n\n${backupCodesList.join('\n')}\n\nKeep these codes safe and private. Each code can only be used once.`;
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${issuer.replace(/\s/g, '_')}_recovery_codes.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Recovery codes downloaded");
  };

  const verifyCode = async () => {
    setIsVerifying(true);
    setError(null);
    
    try {
      let isValid: boolean;
      
      if (isUsingRecoveryCode) {
        // Validate recovery code
        isValid = await validateRecoveryCode(recoveryCodeValue);
      } else {
        // Validate OTP code
        isValid = await validateTOTPCode(value, secret);
      }
      
      if (isValid) {
        if (mode === 'setup') {
          setIsSetupComplete(true);
          toast.success("Two-factor authentication enabled successfully");
        } else {
          toast.success("Authentication successful");
        }
        
        if (onVerify) onVerify(true);
      } else {
        const codeType = isUsingRecoveryCode ? "recovery" : "verification";
        setError(`Invalid ${codeType} code. Please try again.`);
        if (onVerify) onVerify(false);
      }
    } catch (error) {
      setError("An error occurred during verification. Please try again.");
      if (onVerify) onVerify(false);
    } finally {
      setIsVerifying(false);
    }
  };

  const toggleRecoveryCodeInput = () => {
    setIsUsingRecoveryCode(!isUsingRecoveryCode);
    setError(null);
    setValue("");
    setRecoveryCodeValue("");
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
            {!isUsingRecoveryCode ? (
              <div className="flex justify-center mb-4">
                <InputOTP
                  maxLength={6}
                  value={value}
                  onChange={setValue}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, i) => (
                        <InputOTPSlot key={i} {...slot} index={i} />
                      ))}
                    </InputOTPGroup>
                  )}
                />
              </div>
            ) : (
              <div className="mb-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm text-muted-foreground">
                    Recovery Code
                  </label>
                  <InputOTP
                    maxLength={12}
                    placeholder="XXXX-XXXX-XX"
                    value={recoveryCodeValue}
                    onChange={setRecoveryCodeValue}
                    render={({ slots }) => (
                      <InputOTPGroup>
                        {slots.map((slot, i) => (
                          <InputOTPSlot key={i} {...slot} index={i} />
                        ))}
                      </InputOTPGroup>
                    )}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Format: XXXX-XXXX-XX (each code can only be used once)
                  </p>
                </div>
              </div>
            )}
            
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
              disabled={
                (isUsingRecoveryCode 
                  ? recoveryCodeValue.length < 10 
                  : value.length !== 6) || isVerifying
              }
            >
              {isVerifying ? "Verifying..." : "Verify Identity"}
            </Button>
            
            <div className="mt-4 text-center">
              <Button
                variant="ghost"
                onClick={toggleRecoveryCodeInput}
                className="text-sm"
              >
                {isUsingRecoveryCode 
                  ? "Use authenticator code instead" 
                  : "Use recovery code instead"}
              </Button>
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
            
            <div className="flex flex-col space-y-4 mb-6">
              <Button 
                variant="outline" 
                onClick={() => setShowBackupCodesDialog(true)}
                className="flex items-center justify-center gap-2"
              >
                <Key className="h-4 w-4" />
                View Recovery Codes
              </Button>
              
              <Collapsible className="w-full">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="flex items-center justify-center gap-2 w-full">
                    <Smartphone className="h-4 w-4" />
                    Set Up Another Device
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-center mb-4">
                      <img
                        src={qrCodeURL}
                        alt="QR Code for Two-Factor Authentication"
                        className="h-40 w-40 border border-border rounded-md"
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
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            
            <Button
              variant="outline"
              onClick={() => setIsSetupComplete(false)}
              className="mt-2"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Setup Again
            </Button>
            
            <Dialog open={showBackupCodesDialog} onOpenChange={setShowBackupCodesDialog}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Recovery Codes
                  </DialogTitle>
                  <DialogDescription>
                    Save these recovery codes in a secure location. You can use them to access your account if you lose your authentication device.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    {backupCodesList.map((code, i) => (
                      <div key={i} className="flex items-center">
                        <Badge variant="outline" className="font-mono text-xs p-1.5 w-full">
                          {code}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Alert className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800">
                  <AlertTitle className="text-amber-800 dark:text-amber-300">
                    Important
                  </AlertTitle>
                  <AlertDescription className="text-amber-700 dark:text-amber-400 text-sm">
                    Each recovery code can only be used once. Store them securely and don't share them with anyone.
                  </AlertDescription>
                </Alert>
                
                <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                  <Button
                    variant="outline"
                    onClick={copyBackupCodes}
                    className="w-full sm:w-auto"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Codes
                  </Button>
                  <Button 
                    onClick={downloadBackupCodes}
                    className="w-full sm:w-auto"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Codes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                  <TabsTrigger value="manual">
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
                            {slots.map((slot, i) => (
                              <InputOTPSlot key={i} {...slot} index={i} />
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
                
                <TabsContent value="manual" className="space-y-4">
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
                            {slots.map((slot, i) => (
                              <InputOTPSlot key={i} {...slot} index={i} />
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
