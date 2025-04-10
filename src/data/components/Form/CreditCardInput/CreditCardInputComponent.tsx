
import React, { useState } from 'react';
import { Calendar, CreditCard, User } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CreditCardInputProps {
  onCardChange?: (card: CreditCardData) => void;
  className?: string;
}

export interface CreditCardData {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
  isValid: boolean;
}

const CreditCardInputComponent: React.FC<CreditCardInputProps> = ({
  onCardChange,
  className
}) => {
  const [cardData, setCardData] = useState<CreditCardData>({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    isValid: false
  });

  const [cardType, setCardType] = useState<string>('');
  const [focused, setFocused] = useState<string | null>(null);

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } 
    return value;
  };

  // Format expiry date (MM/YY)
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return value;
  };

  // Detect card type based on number
  const detectCardType = (number: string) => {
    const re = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/
    };
    
    if (re.visa.test(number)) return 'visa';
    if (re.mastercard.test(number)) return 'mastercard';
    if (re.amex.test(number)) return 'amex';
    if (re.discover.test(number)) return 'discover';
    
    return '';
  };

  // Handle card number change
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    const type = detectCardType(formattedValue.replace(/\s+/g, ''));
    
    setCardType(type);
    
    const updatedCard = {
      ...cardData,
      number: formattedValue
    };
    
    setCardData(updatedCard);
    validateAndNotify(updatedCard);
  };

  // Handle expiry date change
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiry(e.target.value);
    
    const updatedCard = {
      ...cardData,
      expiry: formattedValue
    };
    
    setCardData(updatedCard);
    validateAndNotify(updatedCard);
  };

  // Handle other field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    const updatedCard = {
      ...cardData,
      [name]: value
    };
    
    setCardData(updatedCard);
    validateAndNotify(updatedCard);
  };

  // Validate card data and notify parent
  const validateAndNotify = (card: Omit<CreditCardData, 'isValid'>) => {
    const isNumberValid = card.number.replace(/\s+/g, '').length >= 13;
    const isNameValid = card.name.length > 3;
    const isExpiryValid = /^\d{2}\/\d{2}$/.test(card.expiry);
    const isCvcValid = /^\d{3,4}$/.test(card.cvc);
    
    const isValid = isNumberValid && isNameValid && isExpiryValid && isCvcValid;
    
    const validatedCard = {
      ...card,
      isValid
    };
    
    if (onCardChange) {
      onCardChange(validatedCard);
    }
  };

  return (
    <div className={cn("grid gap-4", className)}>
      <div className="space-y-2">
        <Label htmlFor="card-number">Card Number</Label>
        <div className="relative">
          <Input
            id="card-number"
            name="number"
            placeholder="0000 0000 0000 0000"
            value={cardData.number}
            onChange={handleCardNumberChange}
            maxLength={19}
            className="pl-10"
            onFocus={() => setFocused('number')}
            onBlur={() => setFocused(null)}
          />
          <CreditCard 
            className={cn(
              "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground",
              focused === 'number' && "text-primary"
            )} 
          />
          {cardType && (
            <div className="absolute right-3 top-2.5 text-xs font-medium text-muted-foreground capitalize">
              {cardType}
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="card-name">Cardholder Name</Label>
        <div className="relative">
          <Input
            id="card-name"
            name="name"
            placeholder="John Smith"
            value={cardData.name}
            onChange={handleChange}
            className="pl-10"
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
          />
          <User 
            className={cn(
              "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground",
              focused === 'name' && "text-primary"
            )} 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="card-expiry">Expiry Date</Label>
          <div className="relative">
            <Input
              id="card-expiry"
              name="expiry"
              placeholder="MM/YY"
              value={cardData.expiry}
              onChange={handleExpiryChange}
              maxLength={5}
              className="pl-10"
              onFocus={() => setFocused('expiry')}
              onBlur={() => setFocused(null)}
            />
            <Calendar 
              className={cn(
                "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground",
                focused === 'expiry' && "text-primary"
              )} 
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="card-cvc">CVC</Label>
          <Input
            id="card-cvc"
            name="cvc"
            placeholder="123"
            value={cardData.cvc}
            onChange={handleChange}
            maxLength={4}
            onFocus={() => setFocused('cvc')}
            onBlur={() => setFocused(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default CreditCardInputComponent;
