
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface PasswordRequirement {
  label: string;
  isValid: (password: string) => boolean;
}

interface PasswordStrengthComponentProps {
  onChange?: (value: string, isValid: boolean) => void;
  minLength?: number;
  requireLowercase?: boolean;
  requireUppercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
}

const PasswordStrengthComponent: React.FC<PasswordStrengthComponentProps> = ({
  onChange,
  minLength = 8,
  requireLowercase = true,
  requireUppercase = true,
  requireNumbers = true,
  requireSpecialChars = true
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [isValid, setIsValid] = useState(false);
  
  const passwordRequirements: PasswordRequirement[] = [
    {
      label: `At least ${minLength} characters`,
      isValid: (password) => password.length >= minLength
    }
  ];
  
  if (requireLowercase) {
    passwordRequirements.push({
      label: "At least one lowercase letter",
      isValid: (password) => /[a-z]/.test(password)
    });
  }
  
  if (requireUppercase) {
    passwordRequirements.push({
      label: "At least one uppercase letter",
      isValid: (password) => /[A-Z]/.test(password)
    });
  }
  
  if (requireNumbers) {
    passwordRequirements.push({
      label: "At least one number",
      isValid: (password) => /[0-9]/.test(password)
    });
  }
  
  if (requireSpecialChars) {
    passwordRequirements.push({
      label: "At least one special character",
      isValid: (password) => /[^A-Za-z0-9]/.test(password)
    });
  }
  
  useEffect(() => {
    // Calculate password strength
    if (password === '') {
      setStrength(0);
      setIsValid(false);
      return;
    }
    
    const validCriteriaCount = passwordRequirements.filter(req => req.isValid(password)).length;
    const strengthPercentage = Math.floor((validCriteriaCount / passwordRequirements.length) * 100);
    setStrength(strengthPercentage);
    
    // Consider the password valid if all requirements are met
    const allValid = validCriteriaCount === passwordRequirements.length;
    setIsValid(allValid);
    
    if (onChange) {
      onChange(password, allValid);
    }
  }, [password, onChange]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Determine color based on strength
  const getStrengthColor = () => {
    if (strength < 40) return "bg-red-500";
    if (strength < 80) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  // Determine text description based on strength
  const getStrengthText = () => {
    if (strength < 40) return "Weak";
    if (strength < 80) return "Moderate";
    return "Strong";
  };

  return (
    <div className="space-y-4 w-full">
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter a secure password"
            value={password}
            onChange={handleChange}
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={togglePasswordVisibility}
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Password strength</span>
          <span className={`font-medium ${
            strength < 40 ? 'text-red-500' : 
            strength < 80 ? 'text-yellow-500' : 
            'text-green-500'
          }`}>
            {getStrengthText()}
          </span>
        </div>
        <Progress value={strength} className={getStrengthColor()} />
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">Requirements:</p>
        <ul className="space-y-1 text-sm">
          {passwordRequirements.map((requirement, index) => {
            const isMet = requirement.isValid(password);
            return (
              <li 
                key={index}
                className="flex items-center gap-2"
              >
                {isMet ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-gray-300 dark:text-gray-600" />
                )}
                <span className={isMet ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'}>
                  {requirement.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PasswordStrengthComponent;
