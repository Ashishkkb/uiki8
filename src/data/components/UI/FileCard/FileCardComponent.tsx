
import React from 'react';
import { cn } from "@/lib/utils";
import { 
  FileIcon, 
  FileTextIcon, 
  FileImageIcon, 
  FileVideoIcon, 
  FileAudioIcon, 
  File, 
  Download,
  Trash,
  Eye
} from "lucide-react";

export type FileType = 'generic' | 'document' | 'image' | 'video' | 'audio' | 'pdf' | 'code' | 'archive';

export interface FileDetails {
  name: string;
  size: string;
  type: FileType;
  url?: string;
  uploadDate?: string;
  previewUrl?: string;
  extension?: string;
}

interface FileCardProps {
  file: FileDetails;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  actions?: 'all' | 'download' | 'preview' | 'delete' | 'none' | Array<'download' | 'preview' | 'delete'>;
  onDownload?: (file: FileDetails) => void;
  onPreview?: (file: FileDetails) => void;
  onDelete?: (file: FileDetails) => void;
}

const FileCardComponent: React.FC<FileCardProps> = ({
  file,
  className,
  variant = 'default',
  size = 'md',
  actions = 'all',
  onDownload,
  onPreview,
  onDelete
}) => {
  const getFileIcon = () => {
    switch (file.type) {
      case 'document':
        return <FileTextIcon className="h-full w-full" />;
      case 'image':
        return <FileImageIcon className="h-full w-full" />;
      case 'video':
        return <FileVideoIcon className="h-full w-full" />;
      case 'audio':
        return <FileAudioIcon className="h-full w-full" />;
      case 'pdf':
        return <File className="h-full w-full" />;
      default:
        return <FileIcon className="h-full w-full" />;
    }
  };

  const variantClasses = {
    default: "bg-card border shadow-sm",
    outline: "border-2 border-muted bg-transparent",
    ghost: "bg-muted/30 hover:bg-muted/50"
  };

  const sizeClasses = {
    sm: {
      card: "p-2 text-xs",
      icon: "h-8 w-8",
      actions: "gap-1"
    },
    md: {
      card: "p-3 text-sm",
      icon: "h-10 w-10",
      actions: "gap-2"
    },
    lg: {
      card: "p-4 text-base",
      icon: "h-12 w-12",
      actions: "gap-3"
    }
  };

  const availableActions = actions === 'all' 
    ? ['download', 'preview', 'delete'] 
    : Array.isArray(actions) 
      ? actions 
      : actions === 'none' ? [] : [actions];

  const ActionButton = ({ 
    action, icon, label 
  }: { 
    action: 'download' | 'preview' | 'delete'; 
    icon: React.ReactNode;
    label: string;
  }) => {
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (action === 'download' && onDownload) onDownload(file);
      if (action === 'preview' && onPreview) onPreview(file);
      if (action === 'delete' && onDelete) onDelete(file);
    };

    const buttonColorClasses = action === 'delete' 
      ? "text-red-500 hover:text-red-700" 
      : "text-primary hover:text-primary/80";

    return (
      <button
        type="button"
        className={cn(
          "p-1 rounded-full hover:bg-muted transition-colors",
          buttonColorClasses
        )}
        onClick={handleClick}
        aria-label={label}
        title={label}
      >
        {icon}
      </button>
    );
  };

  return (
    <div className={cn(
      "rounded-lg flex items-center",
      variantClasses[variant],
      sizeClasses[size].card,
      className
    )}>
      <div className={cn(
        "text-muted-foreground mr-3 flex-shrink-0",
        sizeClasses[size].icon
      )}>
        {file.type === 'image' && file.previewUrl ? (
          <img 
            src={file.previewUrl} 
            alt={file.name}
            className="h-full w-full object-cover rounded" 
          />
        ) : (
          getFileIcon()
        )}
      </div>
      
      <div className="min-w-0 flex-1">
        <p className="font-medium truncate" title={file.name}>
          {file.name}
        </p>
        <p className="text-muted-foreground text-xs mt-0.5">
          {file.size} {file.extension && <span className="ml-1 uppercase">{file.extension}</span>}
        </p>
      </div>
      
      {availableActions.length > 0 && (
        <div className={cn(
          "flex items-center ml-2",
          sizeClasses[size].actions
        )}>
          {availableActions.includes('download') && (
            <ActionButton 
              action="download" 
              icon={<Download className="h-4 w-4" />} 
              label="Download" 
            />
          )}
          
          {availableActions.includes('preview') && (
            <ActionButton 
              action="preview" 
              icon={<Eye className="h-4 w-4" />} 
              label="Preview" 
            />
          )}
          
          {availableActions.includes('delete') && (
            <ActionButton 
              action="delete" 
              icon={<Trash className="h-4 w-4" />} 
              label="Delete" 
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FileCardComponent;
