
import { ComponentItem } from "@/types/component";
import FileUploadComponent from "./FileUploadComponent";

const FileUploadComponentItem: ComponentItem = {
  id: 45,
  name: "File Upload",
  category: "Form",
  framework: "React",
  description: "A drag-and-drop file upload component with progress indicators and file preview capabilities.",
  component: FileUploadComponent,
  price: "Free",
  language: "TypeScript",
  previewBg: "light",
  tags: ["form", "upload", "file", "drag-drop", "input"],
  isNew: true,
  fileSize: "5.5kb",
  complexity: "complex",
  lastUpdated: "2025-04-04",
  author: "Lovable UI",
  code: `import React, { useState, useRef } from 'react';
import { cn } from "@/lib/utils";
import { Upload, X, File, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FileUploadProps {
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
  onFilesSelected?: (files: File[]) => void;
}

interface FileWithPreview extends File {
  id: string;
  previewUrl?: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  errorMessage?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  multiple = false,
  accept = "*",
  maxSize = 5, // 5MB default
  className,
  onFilesSelected
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList?.length) return;
    
    const newFiles: FileWithPreview[] = [];
    
    // Convert FileList to array and add preview URLs for images
    Array.from(fileList).forEach(file => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        newFiles.push({
          ...file,
          id: crypto.randomUUID(),
          status: 'error',
          progress: 100,
          errorMessage: \`File exceeds maximum size of \${maxSize}MB\`
        });
        return;
      }
      
      // Create file with preview URL for images
      const newFile: FileWithPreview = {
        ...file,
        id: crypto.randomUUID(),
        status: 'uploading',
        progress: 0
      };
      
      if (file.type.startsWith('image/')) {
        newFile.previewUrl = URL.createObjectURL(file);
      }
      
      newFiles.push(newFile);
      
      // Simulate upload progress
      simulateUpload(newFile);
    });
    
    const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
    setFiles(updatedFiles);
    
    if (onFilesSelected) {
      onFilesSelected(updatedFiles);
    }
    
    // Reset input
    e.target.value = '';
  };
  
  const simulateUpload = (file: FileWithPreview) => {
    const interval = setInterval(() => {
      setFiles(prev => prev.map(f => {
        if (f.id === file.id && f.status === 'uploading') {
          const progress = Math.min(f.progress + 10, 100);
          return {
            ...f,
            progress,
            status: progress === 100 ? 'success' : 'uploading'
          };
        }
        return f;
      }));
      
      // Clear interval when upload is complete
      if (file.progress >= 100) {
        clearInterval(interval);
      }
    }, 300);
  };
  
  const removeFile = (id: string) => {
    setFiles(prev => {
      const updatedFiles = prev.filter(file => file.id !== id);
      if (onFilesSelected) {
        onFilesSelected(updatedFiles);
      }
      return updatedFiles;
    });
  };
  
  const handleClick = () => {
    inputRef.current?.click();
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files?.length) {
      const fileInputEvent = {
        target: { files: e.dataTransfer.files }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleFileChange(fileInputEvent);
    }
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      <div
        className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer"
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="p-3 rounded-full bg-primary/10">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium text-lg">Upload Files</h3>
          <p className="text-sm text-muted-foreground">
            Drag and drop files here or click to browse
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Maximum file size: {maxSize}MB
          </p>
          <Button 
            variant="outline" 
            type="button" 
            className="mt-4"
            onClick={e => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Select Files
          </Button>
        </div>
        
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={handleFileChange}
        />
      </div>
      
      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Selected Files ({files.length})</p>
          <div className="space-y-2">
            {files.map((file) => (
              <div 
                key={file.id} 
                className="p-3 border rounded-md flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 bg-muted rounded">
                    <File className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    
                    {file.status === 'uploading' && (
                      <Progress value={file.progress} className="h-1 mt-2" />
                    )}
                    
                    {file.status === 'error' && (
                      <p className="text-xs text-destructive mt-1">
                        {file.errorMessage}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {file.status === 'success' && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {file.status === 'error' && (
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;`,
};

export default FileUploadComponentItem;
