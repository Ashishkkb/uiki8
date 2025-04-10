
import React, { useState, useRef, useCallback } from 'react';
import { UploadCloud, X, FileText, Image, Film, Package, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FileWithPreview extends File {
  preview?: string;
  id: string;
}

interface DragDropUploadProps {
  maxFiles?: number;
  maxSize?: number; // size in MB
  acceptedFileTypes?: string[];
  onFilesChange?: (files: File[]) => void;
  className?: string;
}

const DragDropUploadComponent: React.FC<DragDropUploadProps> = ({
  maxFiles = 5,
  maxSize = 5, // 5 MB default
  acceptedFileTypes = ["image/*", "application/pdf", ".doc", ".docx", ".xls", ".xlsx", ".txt"],
  onFilesChange,
  className
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxSizeBytes = maxSize * 1024 * 1024; // Convert MB to bytes

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file size
    if (file.size > maxSizeBytes) {
      return { 
        valid: false, 
        error: `File ${file.name} is too large. Maximum size is ${maxSize}MB.` 
      };
    }

    // Check file type
    const fileType = file.type;
    const fileExtension = `.${file.name.split('.').pop()}`;
    
    const isTypeAccepted = acceptedFileTypes.some(type => {
      if (type.startsWith('.')) {
        // Check file extension
        return fileExtension.toLowerCase() === type.toLowerCase();
      } else if (type.endsWith('/*')) {
        // Check file type category (e.g., image/*)
        const category = type.split('/')[0];
        return fileType.startsWith(`${category}/`);
      } else {
        // Check exact type
        return fileType === type;
      }
    });

    if (!isTypeAccepted) {
      return { 
        valid: false, 
        error: `File type ${fileType || fileExtension} is not supported.` 
      };
    }

    return { valid: true };
  };

  const processFiles = useCallback((fileList: FileList | File[]) => {
    setError(null);
    
    const newFiles: FileWithPreview[] = [];
    
    // Check if adding these files would exceed maxFiles
    if (files.length + fileList.length > maxFiles) {
      setError(`You can only upload a maximum of ${maxFiles} files.`);
      return;
    }
    
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const validation = validateFile(file);
      
      if (!validation.valid) {
        setError(validation.error || "Invalid file");
        continue;
      }
      
      // Create a unique ID for the file
      const fileWithId = Object.assign(file, {
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }) as FileWithPreview;
      
      // Generate preview for images
      if (file.type.startsWith('image/')) {
        fileWithId.preview = URL.createObjectURL(file);
      }
      
      newFiles.push(fileWithId);
    }
    
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    
    if (onFilesChange) {
      onFilesChange(updatedFiles);
    }
  }, [files, maxFiles, maxSizeBytes, acceptedFileTypes, onFilesChange]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [processFiles]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      
      // Reset file input value so the same file can be selected again if removed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [processFiles]);

  const removeFile = useCallback((fileId: string) => {
    const updatedFiles = files.filter(file => file.id !== fileId);
    setFiles(updatedFiles);
    
    // Revoke Object URL to prevent memory leaks
    const fileToRemove = files.find(file => file.id === fileId);
    if (fileToRemove && fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    
    if (onFilesChange) {
      onFilesChange(updatedFiles);
    }
  }, [files, onFilesChange]);

  const getFileIcon = (file: FileWithPreview) => {
    const type = file.type;
    
    if (type.startsWith('image/')) return <Image className="h-6 w-6" />;
    if (type.startsWith('video/')) return <Film className="h-6 w-6" />;
    if (type.includes('pdf')) return <FileText className="h-6 w-6" />;
    if (type.includes('word') || type.includes('doc')) return <FileText className="h-6 w-6" />;
    if (type.includes('excel') || type.includes('sheet') || type.includes('xls')) return <FileText className="h-6 w-6" />;
    
    return <Package className="h-6 w-6" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          "transition-colors duration-200",
          "cursor-pointer"
        )}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple={maxFiles > 1}
          accept={acceptedFileTypes.join(',')}
          onChange={handleFileInputChange}
        />
        
        <div className="flex flex-col items-center gap-2">
          <UploadCloud className={cn(
            "h-10 w-10",
            isDragging ? "text-primary" : "text-muted-foreground"
          )} />
          
          <h3 className="text-lg font-medium">
            {isDragging ? "Drop files here" : "Drag and drop files"}
          </h3>
          
          <p className="text-sm text-muted-foreground">
            or <span className="text-primary font-medium">browse</span> to upload
          </p>
          
          <p className="text-xs text-muted-foreground mt-2">
            {acceptedFileTypes.join(', ')} (Max: {maxSize}MB)
          </p>
        </div>
      </div>
      
      {error && (
        <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-2 rounded text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
      
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm font-medium">
            {files.length} file{files.length > 1 ? 's' : ''} selected
          </div>
          
          <ul className="space-y-2">
            {files.map(file => (
              <li 
                key={file.id}
                className="flex items-center gap-3 bg-muted/50 border rounded-lg p-3"
              >
                {file.preview ? (
                  <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={file.preview} 
                      alt={file.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded bg-muted flex items-center justify-center flex-shrink-0">
                    {getFileIcon(file)}
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{file.name}</div>
                  <div className="text-xs text-muted-foreground">{formatFileSize(file.size)}</div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 flex-shrink-0 text-muted-foreground hover:text-foreground"
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
        </div>
      )}
    </div>
  );
};

export default DragDropUploadComponent;
