import { ComponentItem } from "@/types/component";
import SecureFileUploadComponent from "./SecureFileUploadComponent";

const SecureFileUploadComponentItem: ComponentItem = {
  id: 303,
  name: "Secure File Upload",
  description: "A security-focused file uploader with virus scanning simulation and file validation",
  category: "Security",
  component: SecureFileUploadComponent,
  code: `import React, { useState, useRef } from 'react';
import { Upload, File, AlertCircle, CheckCircle, Trash2, FileSearch } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FileWithPreview extends File {
  preview?: string;
  id: string;
  status: 'uploading' | 'scanning' | 'complete' | 'error';
  progress: number;
  errorMessage?: string;
}

interface SecureFileUploadProps {
  maxSizeInMB?: number;
  maxFiles?: number;
  allowedFileTypes?: string[];
  onUploadComplete?: (files: File[]) => void;
  showPreview?: boolean;
}

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 10);

// Helper function to format file size
const formatFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes < 1024) {
    return \`\${sizeInBytes} B\`;
  } else if (sizeInBytes < 1024 * 1024) {
    return \`\${(sizeInBytes / 1024).toFixed(1)} KB\`;
  } else {
    return \`\${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB\`;
  }
};

export const SecureFileUpload: React.FC<SecureFileUploadProps> = ({
  maxSizeInMB = 5,
  maxFiles = 5,
  allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  onUploadComplete,
  showPreview = true
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const validateFile = (file: File): { valid: boolean; errorMessage?: string } => {
    // Check file type
    if (!allowedFileTypes.includes(file.type)) {
      return {
        valid: false,
        errorMessage: \`File type "\${file.type}" is not allowed. Allowed types: \${allowedFileTypes.join(', ')}\`
      };
    }
    
    // Check file size
    if (file.size > maxSizeInBytes) {
      return {
        valid: false,
        errorMessage: \`File size exceeds the \${maxSizeInMB}MB limit\`
      };
    }
    
    return { valid: true };
  };
  
  const processFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    
    setError(null);
    
    // Check if adding these files would exceed the max files limit
    if (files.length + selectedFiles.length > maxFiles) {
      setError(\`You can only upload a maximum of \${maxFiles} files\`);
      return;
    }
    
    const newFiles: FileWithPreview[] = [];
    
    // Process each file
    Array.from(selectedFiles).forEach(file => {
      const validation = validateFile(file);
      
      if (!validation.valid) {
        setError(validation.errorMessage || "Invalid file");
        return;
      }
      
      // Create a preview URL for images
      let preview = undefined;
      if (showPreview && file.type.startsWith('image/')) {
        preview = URL.createObjectURL(file);
      }
      
      const newFile: FileWithPreview = Object.assign(file, {
        id: generateId(),
        preview,
        status: 'uploading',
        progress: 0,
      });
      
      newFiles.push(newFile);
    });
    
    if (newFiles.length > 0) {
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      
      // Simulate upload process for each file
      newFiles.forEach(file => simulateUploadProcess(file.id));
    }
  };
  
  const simulateUploadProcess = (fileId: string) => {
    let progressInterval: NodeJS.Timeout;
    
    // Simulate upload progress
    progressInterval = setInterval(() => {
      setFiles(currentFiles => {
        const fileIndex = currentFiles.findIndex(f => f.id === fileId);
        if (fileIndex === -1) {
          clearInterval(progressInterval);
          return currentFiles;
        }
        
        const file = currentFiles[fileIndex];
        
        // Handle upload progress
        if (file.status === 'uploading') {
          const newProgress = file.progress + 5;
          
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            
            // After upload complete, start "scanning"
            setTimeout(() => {
              setFiles(prevFiles => {
                const updatedFiles = [...prevFiles];
                const fileIndex = updatedFiles.findIndex(f => f.id === fileId);
                
                if (fileIndex !== -1) {
                  updatedFiles[fileIndex] = {
                    ...updatedFiles[fileIndex],
                    status: 'scanning',
                    progress: 100
                  };
                }
                
                return updatedFiles;
              });
              
              // Simulate virus scan
              setTimeout(() => {
                // Random success or error (90% success rate)
                const isSuccessful = Math.random() > 0.1;
                
                setFiles(prevFiles => {
                  const updatedFiles = [...prevFiles];
                  const fileIndex = updatedFiles.findIndex(f => f.id === fileId);
                  
                  if (fileIndex !== -1) {
                    updatedFiles[fileIndex] = {
                      ...updatedFiles[fileIndex],
                      status: isSuccessful ? 'complete' : 'error',
                      errorMessage: isSuccessful ? undefined : 'Security scan failed. File may be unsafe.'
                    };
                  }
                  
                  return updatedFiles;
                });
                
                if (isSuccessful) {
                  toast.success(\`File \${fileId} uploaded successfully\`);
                } else {
                  toast.error(\`File \${fileId} failed security scan\`);
                }
                
                // Call onUploadComplete callback with successful files
                if (onUploadComplete) {
                  setFiles(prevFiles => {
                    const successfulFiles = prevFiles.filter(f => f.status === 'complete');
                    onUploadComplete(successfulFiles);
                    return prevFiles;
                  });
                }
              }, 1500);
            }, 500);
            
            return [
              ...currentFiles.slice(0, fileIndex),
              { ...file, progress: 100 },
              ...currentFiles.slice(fileIndex + 1)
            ];
          }
          
          return [
            ...currentFiles.slice(0, fileIndex),
            { ...file, progress: newProgress },
            ...currentFiles.slice(fileIndex + 1)
          ];
        }
        
        return currentFiles;
      });
    }, 150);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    processFiles(e.dataTransfer.files);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };
  
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleDelete = (fileId: string) => {
    setFiles(prevFiles => {
      const fileToDelete = prevFiles.find(f => f.id === fileId);
      
      // Revoke object URL for previews to prevent memory leaks
      if (fileToDelete && fileToDelete.preview) {
        URL.revokeObjectURL(fileToDelete.preview);
      }
      
      return prevFiles.filter(file => file.id !== fileId);
    });
    
    toast.info("File removed");
  };
  
  return (
    <div className="w-full space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        className={\`
          border-2 border-dashed rounded-lg p-8 
          transition-colors duration-200 ease-in-out
          text-center cursor-pointer
          \${dragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-300 hover:border-primary/50 bg-muted/30'
          }
        \`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleChange}
          accept={allowedFileTypes.join(',')}
          aria-label="File upload"
        />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="bg-primary/10 rounded-full p-3">
            <FileSearch className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-lg font-medium">
              Drag & Drop files or click to browse
            </p>
            <p className="text-sm text-muted-foreground">
              Upload up to {maxFiles} files (max {maxSizeInMB}MB each)
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Allowed types: {allowedFileTypes.map(type => type.replace('image/', '').replace('application/', '')).join(', ')}
            </p>
          </div>
        </div>
      </div>
      
      {files.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm font-medium">Files ({files.length}/{maxFiles})</p>
          
          <div className="space-y-3">
            {files.map(file => (
              <div
                key={file.id}
                className="flex items-center p-3 border rounded-md bg-muted/30"
              >
                <div className="mr-3">
                  {file.preview ? (
                    <div className="w-10 h-10 rounded overflow-hidden">
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                      <File className="h-5 w-5 text-primary" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <div className="truncate pr-2">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      {file.status === 'complete' && (
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      )}
                      {file.status === 'error' && (
                        <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(file.id);
                        }}
                        aria-label="Delete file"
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  </div>
                  
                  {file.status === 'error' && (
                    <p className="text-xs text-red-500 mt-1">
                      {file.errorMessage || 'Upload failed'}
                    </p>
                  )}
                  
                  {(file.status === 'uploading' || file.status === 'scanning') && (
                    <div className="mt-1 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>
                          {file.status === 'uploading' ? 'Uploading...' : 'Security scanning...'}
                        </span>
                        <span>{file.progress}%</span>
                      </div>
                      <Progress value={file.progress} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};`,
  framework: "React",
  isNew: true,
  tags: ["security", "upload", "file", "scan", "protection", "validation"],
  fileSize: "9.1kb",
  complexity: "complex",
  lastUpdated: "2025-04-27",
  author: "Enchant UI Team"
};

export default SecureFileUploadComponentItem;
