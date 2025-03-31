
export interface ComponentItem {
  id: number;
  name: string;
  category: string;
  framework: string;
  description: string;
  code: string;
  price?: number | string;
  language?: string;
  previewBg?: string;
  previewHtml?: string;
  tags?: string[];
}
