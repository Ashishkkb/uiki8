
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export type FieldType = 
  | "text" 
  | "email" 
  | "password" 
  | "textarea" 
  | "select" 
  | "checkbox" 
  | "number";

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    message: string;
  };
}

export interface FormBuilderProps {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
  submitLabel?: string;
  resetLabel?: string;
  showReset?: boolean;
  className?: string;
  layout?: "vertical" | "horizontal";
}

const FormBuilder: React.FC<FormBuilderProps> = ({
  fields,
  onSubmit,
  submitLabel = "Submit",
  resetLabel = "Reset",
  showReset = true,
  className = "",
  layout = "vertical",
}) => {
  // Initialize form state with default values
  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field.type === "checkbox" ? false : "";
    return acc;
  }, {} as Record<string, any>);

  const [formValues, setFormValues] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (
    name: string,
    value: any,
    type: FieldType = "text"
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors on change
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    validateField(name, formValues[name]);
  };

  const validateField = (name: string, value: any): boolean => {
    const field = fields.find((f) => f.name === name);
    if (!field) return true;

    // Required validation
    if (field.required && (value === "" || value === null || value === undefined)) {
      setErrors((prev) => ({
        ...prev,
        [name]: `${field.label} is required`,
      }));
      return false;
    }

    // Pattern validation
    if (field.validation && value) {
      const { pattern, minLength, maxLength, message } = field.validation;

      if (pattern && !pattern.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: message,
        }));
        return false;
      }

      if (minLength && String(value).length < minLength) {
        setErrors((prev) => ({
          ...prev,
          [name]: message,
        }));
        return false;
      }

      if (maxLength && String(value).length > maxLength) {
        setErrors((prev) => ({
          ...prev,
          [name]: message,
        }));
        return false;
      }
    }

    // Clear errors if validation passes
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    return true;
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    // Validate all fields
    fields.forEach((field) => {
      const value = formValues[field.name];
      
      // Mark all fields as touched
      setTouched((prev) => ({
        ...prev,
        [field.name]: true,
      }));

      // Check required
      if (field.required && (value === "" || value === null || value === undefined)) {
        newErrors[field.name] = `${field.label} is required`;
        isValid = false;
      }

      // Check validation
      if (field.validation && value) {
        const { pattern, minLength, maxLength, message } = field.validation;

        if (pattern && !pattern.test(value)) {
          newErrors[field.name] = message;
          isValid = false;
        }

        if (minLength && String(value).length < minLength) {
          newErrors[field.name] = message;
          isValid = false;
        }

        if (maxLength && String(value).length > maxLength) {
          newErrors[field.name] = message;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formValues);
      toast.success("Form submitted successfully!");
    } else {
      toast.error("Please correct the errors in the form");
    }
  };

  const handleReset = () => {
    setFormValues(initialValues);
    setErrors({});
    setTouched({});
  };

  const renderField = (field: FormField) => {
    const { id, name, label, type, required, placeholder, options } = field;
    const value = formValues[name];
    const error = errors[name];
    const isTouched = touched[name];
    const showError = error && isTouched;
    const fieldId = id || `field-${name}`;

    const commonLabelProps = {
      htmlFor: fieldId,
      className: "mb-2 block"
    };

    const errorMessage = showError && (
      <p className="mt-1 text-sm text-red-500">{error}</p>
    );

    switch (type) {
      case "textarea":
        return (
          <div
            key={name}
            className={`form-field ${layout === "horizontal" ? "grid grid-cols-1 md:grid-cols-3 gap-4 items-start" : ""}`}
          >
            <Label {...commonLabelProps}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <div className={layout === "horizontal" ? "md:col-span-2" : ""}>
              <Textarea
                id={fieldId}
                value={value}
                onChange={(e) => handleChange(name, e.target.value, type)}
                onBlur={() => handleBlur(name)}
                placeholder={placeholder}
                className={`w-full ${showError ? "border-red-500" : ""}`}
              />
              {errorMessage}
            </div>
          </div>
        );

      case "select":
        return (
          <div
            key={name}
            className={`form-field ${layout === "horizontal" ? "grid grid-cols-1 md:grid-cols-3 gap-4 items-start" : ""}`}
          >
            <Label {...commonLabelProps}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <div className={layout === "horizontal" ? "md:col-span-2" : ""}>
              <Select
                value={value}
                onValueChange={(val) => handleChange(name, val, type)}
              >
                <SelectTrigger
                  className={`w-full ${showError ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder={placeholder || "Select an option"} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errorMessage}
            </div>
          </div>
        );

      case "checkbox":
        return (
          <div
            key={name}
            className={`form-field ${layout === "horizontal" ? "grid grid-cols-1 md:grid-cols-3 gap-4 items-center" : "flex items-center gap-2"}`}
          >
            <div className={layout === "horizontal" ? "md:col-span-3 flex items-center gap-2" : ""}>
              <Checkbox
                id={fieldId}
                checked={!!value}
                onCheckedChange={(checked) => 
                  handleChange(name, checked, type)
                }
              />
              <Label 
                htmlFor={fieldId} 
                className={`${showError ? "text-red-500" : ""}`}
              >
                {label} {required && <span className="text-red-500">*</span>}
              </Label>
            </div>
            {errorMessage && (
              <div className={layout === "horizontal" ? "md:col-span-3 ml-6" : "ml-6"}>
                {errorMessage}
              </div>
            )}
          </div>
        );

      default: // text, email, password, number
        return (
          <div
            key={name}
            className={`form-field ${layout === "horizontal" ? "grid grid-cols-1 md:grid-cols-3 gap-4 items-start" : ""}`}
          >
            <Label {...commonLabelProps}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <div className={layout === "horizontal" ? "md:col-span-2" : ""}>
              <Input
                id={fieldId}
                type={type}
                value={value}
                onChange={(e) => handleChange(name, e.target.value, type)}
                onBlur={() => handleBlur(name)}
                placeholder={placeholder}
                className={`w-full ${showError ? "border-red-500" : ""}`}
              />
              {errorMessage}
            </div>
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {fields.map(renderField)}

      <div className={`flex ${showReset ? "justify-between" : "justify-end"} mt-6`}>
        {showReset && (
          <Button type="button" variant="outline" onClick={handleReset}>
            {resetLabel}
          </Button>
        )}
        <Button type="submit">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default FormBuilder;
