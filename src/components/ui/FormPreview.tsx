
import React, { useState } from 'react';

type FormField = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[]; // For select fields
};

const FormPreview = () => {
  // Example form fields
  const fields: FormField[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter your name',
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      required: true
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      placeholder: 'Type your message'
    },
    {
      name: 'subscription',
      label: 'Subscribe to newsletter',
      type: 'checkbox'
    }
  ];

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    
    if (isValid) {
      setSubmitted(true);
      // Reset after showing success
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const renderField = (field: FormField) => {
    const { name, label, type, placeholder, required, options } = field;
    const value = formData[name] || '';
    const error = errors[name];
    
    const baseInputClasses = `
      w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
      ${error ? 'border-red-500' : 'border-gray-300'}
    `;

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
              placeholder={placeholder}
              className={baseInputClasses}
              rows={3}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
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
              className={baseInputClasses}
            >
              <option value="">Select...</option>
              {options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
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
                checked={!!value}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 block font-medium text-gray-700" htmlFor={name}>
                {label} {required && <span className="text-red-500">*</span>}
              </label>
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
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
              placeholder={placeholder}
              className={baseInputClasses}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
        );
    }
  };

  return (
    <div className="max-w-full">
      {submitted ? (
        <div className="bg-green-50 p-4 rounded-md border border-green-200 text-green-800">
          <div className="flex">
            <svg className="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p>Form submitted successfully!</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {fields.map(field => renderField(field))}
          
          <div className="mt-6 flex space-x-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
            
            <button
              type="button"
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FormPreview;
