
import { useState } from "react";
import { Eye, Code as CodeIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FrameworkFilter from "./FrameworkFilter";
import CodeSnippet from "./CodeSnippet";

// Sample component data
const components = [
  {
    id: 1,
    name: "Button Group",
    framework: "React",
    category: "Buttons",
    preview: "bg-purple-100",
    code: `// Button.jsx
import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md' }) => {
  const baseClasses = "font-medium rounded focus:outline-none";
  
  const variantClasses = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    outline: "border border-purple-600 text-purple-600 hover:bg-purple-50"
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };
  
  return (
    <button 
      className={\`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]}\`}
    >
      {children}
    </button>
  );
};

export default Button;`,
  },
  {
    id: 2,
    name: "Card Component",
    framework: "React",
    category: "Cards",
    preview: "bg-blue-100",
    code: `// Card.jsx
import React from 'react';

const Card = ({ title, description, imageUrl, footer }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {imageUrl && (
        <div className="h-48 w-full overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        {title && <h3 className="text-xl font-bold mb-2">{title}</h3>}
        {description && <p className="text-gray-600">{description}</p>}
      </div>
      {footer && (
        <div className="border-t border-gray-100 p-4">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;`,
  },
  {
    id: 3,
    name: "Alert Component",
    framework: "Vue",
    category: "Alerts",
    preview: "bg-green-100",
    code: `<!-- Alert.vue -->
<template>
  <div :class="alertClasses">
    <div class="flex">
      <div class="flex-shrink-0">
        <component :is="icon" class="h-5 w-5" />
      </div>
      <div class="ml-3">
        <h3 v-if="title" class="text-sm font-medium">{{ title }}</h3>
        <div v-if="message" class="text-sm">{{ message }}</div>
      </div>
      <div class="ml-auto pl-3">
        <button v-if="dismissible" @click="dismiss" class="inline-flex text-gray-400 hover:text-gray-500">
          <span class="sr-only">Dismiss</span>
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'info',
      validator: value => ['info', 'success', 'warning', 'error'].includes(value)
    },
    title: String,
    message: String,
    dismissible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: true
    }
  },
  computed: {
    alertClasses() {
      const baseClasses = 'p-4 rounded-md'
      const typeClasses = {
        info: 'bg-blue-50 text-blue-700',
        success: 'bg-green-50 text-green-700',
        warning: 'bg-yellow-50 text-yellow-700',
        error: 'bg-red-50 text-red-700'
      }
      return [baseClasses, typeClasses[this.type]]
    },
    icon() {
      // Import appropriate icon based on type
      return 'div' // Placeholder
    }
  },
  methods: {
    dismiss() {
      this.visible = false
      this.$emit('dismiss')
    }
  }
}
</script>`,
  },
  {
    id: 4,
    name: "Form Input",
    framework: "Angular",
    category: "Forms",
    preview: "bg-yellow-100",
    code: `// input.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  template: \`
    <div class="form-group">
      <label 
        *ngIf="label" 
        [for]="id" 
        class="block text-sm font-medium text-gray-700 mb-1"
      >
        {{ label }}
      </label>
      <div class="relative">
        <input
          [type]="type"
          [id]="id"
          [value]="value"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [required]="required"
          (input)="onInput($event)"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          [ngClass]="{'border-red-500': error}"
        />
      </div>
      <p *ngIf="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
      <p *ngIf="helpText" class="mt-1 text-sm text-gray-500">{{ helpText }}</p>
    </div>
  \`
})
export class InputComponent {
  @Input() label: string;
  @Input() id: string;
  @Input() type: string = 'text';
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() error: string = '';
  @Input() helpText: string = '';
  
  @Output() valueChange = new EventEmitter<string>();
  
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.valueChange.emit(this.value);
  }
}`,
  },
];

const ComponentsShowcase = () => {
  const [selectedComponent, setSelectedComponent] = useState(components[0]);
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");

  return (
    <section id="components" className="py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Our Component Library
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse hundreds of ready-to-use components for your next project.
            Copy, paste, and customize to your needs.
          </p>
        </div>
        
        <FrameworkFilter />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-medium">Components</h3>
              </div>
              <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
                {components.map((component) => (
                  <button
                    key={component.id}
                    className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                      selectedComponent.id === component.id ? "bg-purple-50" : ""
                    }`}
                    onClick={() => setSelectedComponent(component)}
                  >
                    <p className="font-medium">{component.name}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-500">{component.framework}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-xs text-gray-500">{component.category}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="flex items-center p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-medium flex-1">{selectedComponent.name}</h3>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "preview" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("preview")}
                    className={viewMode === "preview" ? "bg-purple-600" : ""}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button
                    variant={viewMode === "code" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("code")}
                    className={viewMode === "code" ? "bg-purple-600" : ""}
                  >
                    <CodeIcon className="h-4 w-4 mr-1" />
                    Code
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                {viewMode === "preview" ? (
                  <div className="flex items-center justify-center min-h-[300px] border border-dashed border-gray-200 rounded-lg">
                    <div className={`${selectedComponent.preview} p-6 rounded-lg w-full h-full flex items-center justify-center`}>
                      <p className="text-gray-500">Component Preview Area</p>
                    </div>
                  </div>
                ) : (
                  <CodeSnippet code={selectedComponent.code} />
                )}
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                View All Components
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComponentsShowcase;
