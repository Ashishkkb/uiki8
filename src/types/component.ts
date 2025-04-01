
export interface ComponentItem {
  id: number;
  name: string;
  category: string;
  framework: string;
  description: string;
  code: string;
  component?: React.ComponentType<any>; // Actual component implementation
  price?: number | string;
  language?: string;
  previewBg?: string;
  previewHtml?: string;
  tags?: string[];
  isNew?: boolean;
  fileSize?: string;
  is3D?: boolean;
  complexity?: 'simple' | 'medium' | 'complex';
  lastUpdated?: string;
  author?: string;
  license?: string;
  dependencies?: string[];
}

export type ComponentCategory = 
  | 'UI' 
  | '3D'
  | 'Layout'
  | 'Navigation'
  | 'Form'
  | 'Feedback'
  | 'Data Display'
  | 'Chart'
  | 'Animation'
  | 'Media';
