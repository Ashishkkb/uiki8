import React from 'react';
import { ComponentItem } from "@/types/component";
import FormPreview from "@/components/ui/FormPreview";

const FormComponent: ComponentItem = {
  id: 6,
  name: "Form",
  category: "UI",
  framework: "React",
  description: "A complete form component with validation and various input types",
  code: `import React, { useState } from 'react';

type FormField = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[]; // For select fields
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    message: string;
  };
};

type FormProps = {
  fields: FormField[];
  onSubmit: (formData: Record<string, any>) => void;
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
};

const Form = ({ fields, onSubmit, submitText = 'Submit', cancelText = 'Cancel', onCancel }: FormProps) => {
  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field.type === 'checkbox' ? false : '';
    return acc;
  }, {} as Record<string, any>);

  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleBlur = (name: string) => {
    setTouched({
      ...touched,
      [name]: true
    });
    
    // Validate on blur
    validateField(name, formData[name]);
  };

  const validateField = (name: string, value: any): boolean => {
    const field = fields.find(f => f.name === name);
    if (!field) return true;
    
    if (field.required && (value === '' || value === null || value === undefined)) {
      setErrors(prev => ({ ...prev, [name]: \`\${field.label} is required\` }));
      return false;
    }
    
    if (field.validation && value) {
      const { pattern, minLength, maxLength, message } = field.validation;
      
      if (pattern && !pattern.test(value)) {
        setErrors(prev => ({ ...prev, [name]: message }));
        return false;
      }
      
      if (minLength && value.length < minLength) {
        setErrors(prev => ({ ...prev, [name]: message }));
        return false;
      }
      
      if (maxLength && value.length > maxLength) {
        setErrors(prev => ({ ...prev, [name]: message }));
        return false;
      }
    }
    
    // Clear error if validation passes
    setErrors(prev => ({ ...prev, [name]: '' }));
    return true;
  };

  const validateForm = (): boolean => {
    let isValid = true;
    
    for (const field of fields) {
      const isFieldValid = validateField(field.name, formData[field.name]);
      if (!isFieldValid) isValid = false;
      
      // Mark all fields as touched on submit
      setTouched(prev => ({ ...prev, [field.name]: true }));
    }
    
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const renderField = (field: FormField) => {
    const { name, label, type, placeholder, required, options } = field;
    const value = formData[name];
    const error = errors[name];
    const isTouched = touched[name];
    const hasError = error && isTouched;
    
    const baseInputClasses = \`
      w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
      \${hasError ? 'border-red-500' : 'border-gray-300'}
    \`;

    switch (type) {
      case 'textarea':
        return (
          <div className="mb-4" key={name}>
            <label className="block mb-1 font-medium text-gray-700" htmlFor={name}>
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              id={name}
              name={name}
              value={value}
              onChange={handleChange}
              onBlur={() => handleBlur(name)}
              placeholder={placeholder}
              className={baseInputClasses}
              rows={4}
            />
            {hasError && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
        );
      
      case 'select':
        return (
          <div className="mb-4" key={name}>
            <label className="block mb-1 font-medium text-gray-700" htmlFor={name}>
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
              id={name}
              name={name}
              value={value}
              onChange={handleChange}
              onBlur={() => handleBlur(name)}
              className={baseInputClasses}
            >
              <option value="">Select...</option>
              {options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {hasError && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="mb-4" key={name}>
            <div className="flex items-center">
              <input
                id={name}
                name={name}
                type="checkbox"
                checked={value}
                onChange={handleChange}
                onBlur={() => handleBlur(name)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 block font-medium text-gray-700" htmlFor={name}>
                {label} {required && <span className="text-red-500">*</span>}
              </label>
            </div>
            {hasError && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
        );
      
      default: // text, email, password
        return (
          <div className="mb-4" key={name}>
            <label className="block mb-1 font-medium text-gray-700" htmlFor={name}>
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              value={value}
              onChange={handleChange}
              onBlur={() => handleBlur(name)}
              placeholder={placeholder}
              className={baseInputClasses}
            />
            {hasError && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {fields.map(field => renderField(field))}
      
      <div className="mt-6 flex space-x-3">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {submitText}
        </button>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            {cancelText}
          </button>
        )}
      </div>
    </form>
  );
};

export default Form;

export default FormComponent;
