
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Cloud, X, File, Image, Upload } from "lucide-react";

const FileUploaderComponent = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxSize = 5 * 1024 * 1024; // 5MB

  // Simulate upload progress for demo purposes
  useEffect(() => {
    const progressIntervals: NodeJS.Timeout[] = [];
    
    files.forEach(file => {
      if (uploadProgress[file.name] === undefined) {
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
        
        const interval = setInterval(() => {
          setUploadProgress(prev => {
            const currentProgress = prev[file.name] || 0;
            if (currentProgress >= 100) {
              clearInterval(interval);
              return prev;
            }
            return { ...prev, [file.name]: Math.min(currentProgress + 10, 100) };
          });
        }, 300);
        
        progressIntervals.push(interval);
      }
    });
    
    return () => {
      progressIntervals.forEach(interval => clearInterval(interval));
    };
  }, [files]);

  const handleFilesChange = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    
    const newFiles: File[] = [];
    const newErrors: string[] = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      
      if (file.size > maxSize) {
        newErrors.push(`${file.name} exceeds the maximum file size of 5MB.`);
        continue;
      }
      
      newFiles.push(file);
    }
    
    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles]);
    }
    
    if (newErrors.length > 0) {
      setErrors(newErrors);
    }
  }, []);

  const handleBrowseFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const { files } = e.dataTransfer;
    handleFilesChange(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    handleFilesChange(files);
  };

  // Create a thumbnail preview for images
  const renderThumbnail = (file: File) => {
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      return (
        <div className="relative h-12 w-12 overflow-hidden rounded">
          <img 
            src={url} 
            className="h-full w-full object-cover" 
            alt={file.name}
            onLoad={() => URL.revokeObjectURL(url)}
          />
        </div>
      );
    }
    
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded bg-muted">
        <File className="h-6 w-6" />
      </div>
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* Drag area */}
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-lg border border-dashed p-6 transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/30"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <Cloud className="mb-2 h-10 w-10 text-muted-foreground" />
          <h3 className="text-lg font-medium">
            Drag & drop files here
          </h3>
          <p className="text-sm text-muted-foreground">
            or
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={handleBrowseFiles}
          >
            <Upload className="mr-2 h-4 w-4" /> Browse files
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInputChange}
            className="sr-only"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Max file size: 5MB
          </p>
        </div>
      </div>

      {/* Error messages */}
      {errors.length > 0 && (
        <div className="rounded-md bg-destructive/10 p-3">
          <div className="flex">
            <div className="text-sm text-destructive">
              <ul className="list-disc space-y-1 pl-5">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* File previews */}
      {files.length > 0 && (
        <div className="space-y-3">
          {files.map((file, index) => (
            <div 
              key={index}
              className="flex items-center justify-between rounded-md border p-3"
            >
              <div className="flex items-center space-x-3">
                {renderThumbnail(file)}
                <div className="space-y-1">
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Progress value={uploadProgress[file.name] || 0} className="w-24" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploaderComponent;
