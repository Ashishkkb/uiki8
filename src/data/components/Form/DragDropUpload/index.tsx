
import { ComponentItem } from "@/types/component";
import DragDropUploadComponent from "./DragDropUploadComponent";

const DragDropUploadComponentItem: ComponentItem = {
  id: 204,
  name: "Drag & Drop Upload",
  description: "A file upload component with drag and drop functionality",
  category: "Form",
  component: DragDropUploadComponent,
  code: `import React, { useState, useRef } from 'react';
import { UploadCloud, X, FileText, Image } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const DragDropUpload = ({
  maxFiles = 5,
  maxSize = 5, // 5 MB
  acceptedFileTypes = ["image/*", "application/pdf", ".doc", ".docx"],
  onFilesChange,
  className
}) => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const processFiles = (fileList) => {
    setError(null);
    
    // Check if adding these files would exceed maxFiles
    if (files.length + fileList.length > maxFiles) {
      setError(\`You can only upload a maximum of \${maxFiles} files.\`);
      return;
    }
    
    const newFiles = [];
    const maxSizeBytes = maxSize * 1024 * 1024;
    
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      
      // Validate file size
      if (file.size > maxSizeBytes) {
        setError(\`File \${file.name} is too large. Max size: \${maxSize}MB\`);
        continue;
      }
      
      // Add ID and preview for images
      const fileWithId = Object.assign(file, {
        id: \`\${file.name}-\${Date.now()}\`,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
      });
      
      newFiles.push(fileWithId);
    }
    
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    
    if (onFilesChange) {
      onFilesChange(updatedFiles);
    }
  };

  const removeFile = (fileId) => {
    const updatedFiles = files.filter(file => file.id !== fileId);
    setFiles(updatedFiles);
    
    if (onFilesChange) {
      onFilesChange(updatedFiles);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple={maxFiles > 1}
          accept={acceptedFileTypes.join(',')}
          onChange={(e) => {
            if (e.target.files.length) {
              processFiles(e.target.files);
              e.target.value = '';
            }
          }}
        />
        
        <UploadCloud className="h-10 w-10 mx-auto text-muted-foreground" />
        <h3 className="mt-2">Drag and drop files</h3>
        <p className="text-sm text-muted-foreground">
          or <span className="text-primary">browse</span> to upload
        </p>
      </div>
      
      {error && (
        <div className="text-destructive text-sm">{error}</div>
      )}
      
      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map(file => (
            <li key={file.id} className="flex items-center gap-2 p-2 border rounded">
              {file.preview ? (
                <img src={file.preview} alt={file.name} className="h-10 w-10 object-cover" />
              ) : (
                <FileText className="h-5 w-5" />
              )}
              <span className="text-sm truncate flex-1">{file.name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(file.id);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};`,
  framework: "React",
  isNew: true,
  tags: ["form", "upload", "drag-drop", "files"]
};

export default DragDropUploadComponentItem;
