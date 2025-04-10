
import { ComponentItem } from "@/types/component";
import CreditCardInputComponent from "./CreditCardInputComponent";

const CreditCardInputComponentItem: ComponentItem = {
  id: 203,
  name: "Credit Card Input",
  description: "A form component for capturing credit card details with automatic formatting",
  category: "Form",
  component: CreditCardInputComponent,
  code: `import React, { useState } from 'react';
import { Calendar, CreditCard, User } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CreditCardData {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
  isValid: boolean;
}

export const CreditCardInput = ({
  onCardChange,
  className
}) => {
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    isValid: false
  });
  const [cardType, setCardType] = useState('');
  const [focused, setFocused] = useState(null);

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\\d{4,16}/g);
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

  // Detect card type based on number
  const detectCardType = (number) => {
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

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardType(detectCardType(formattedValue.replace(/\\s+/g, '')));
    
    updateCardData('number', formattedValue);
  };

  const updateCardData = (field, value) => {
    const updatedCard = {
      ...cardData,
      [field]: value
    };
    
    setCardData(updatedCard);
    
    if (onCardChange) {
      onCardChange({
        ...updatedCard,
        isValid: validateCard(updatedCard)
      });
    }
  };

  const validateCard = (card) => {
    // Basic validation logic
    return (
      card.number.replace(/\\s+/g, '').length >= 13 &&
      card.name.length > 3 &&
      /^\\d{2}\\/\\d{2}$/.test(card.expiry) &&
      /^\\d{3,4}$/.test(card.cvc)
    );
  };

  return (
    <div className={cn("grid gap-4", className)}>
      {/* Card number input */}
      <div className="space-y-2">
        <Label htmlFor="card-number">Card Number</Label>
        <div className="relative">
          <Input
            id="card-number"
            placeholder="0000 0000 0000 0000"
            value={cardData.number}
            onChange={handleCardNumberChange}
            maxLength={19}
            className="pl-10"
            onFocus={() => setFocused('number')}
            onBlur={() => setFocused(null)}
          />
          <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          {cardType && (
            <div className="absolute right-3 top-2.5 text-xs font-medium">
              {cardType}
            </div>
          )}
        </div>
      </div>
      
      {/* Name input */}
      <div className="space-y-2">
        <Label htmlFor="card-name">Cardholder Name</Label>
        <div className="relative">
          <Input
            id="card-name"
            placeholder="John Smith"
            value={cardData.name}
            onChange={(e) => updateCardData('name', e.target.value)}
            className="pl-10"
          />
          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      {/* Expiry and CVC inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Expiry Date</Label>
          <Input
            id="expiry"
            placeholder="MM/YY"
            value={cardData.expiry}
            onChange={(e) => updateCardData('expiry', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvc">CVC</Label>
          <Input
            id="cvc"
            placeholder="123"
            value={cardData.cvc}
            onChange={(e) => updateCardData('cvc', e.target.value)}
            maxLength={4}
          />
        </div>
      </div>
    </div>
  );
};`,
  framework: "React",
  isNew: true,
  tags: ["form", "credit card", "payment", "input"]
};

export default CreditCardInputComponentItem;
