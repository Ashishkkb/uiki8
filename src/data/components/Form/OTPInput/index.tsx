
import React from 'react';
import { ComponentItem } from "@/types/component";
import OTPInputComponent from "./OTPInputComponent";

const OTPInputComponentItem: ComponentItem = {
  id: 151,
  name: "OTP Input",
  category: "Form",
  framework: "React",
  description: "A specialized input for one-time passwords and verification codes.",
  component: OTPInputComponent,
  tags: ["form", "input", "verification", "otp"],
  isNew: true,
  fileSize: "1.8 KB",
  complexity: "medium"
};

export default OTPInputComponentItem;
