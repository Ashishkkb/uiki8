
import React, { forwardRef } from 'react';
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";

type MessageType = 'sent' | 'received' | 'system';
type MessageStatus = 'sent' | 'delivered' | 'read' | 'error';

export interface MessageProps {
  type?: MessageType;
  status?: MessageStatus;
  content: string;
  timestamp: Date;
  user?: {
    name: string;
    avatar?: string;
    status?: 'online' | 'offline' | 'away' | 'busy';
  };
  reactions?: Array<{
    emoji: string;
    count: number;
    userReacted?: boolean;
  }>;
  attachments?: Array<{
    type: 'image' | 'file';
    url: string;
    name?: string;
    size?: string;
  }>;
  className?: string;
}

interface ChatMessageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof MessageProps> {
  message: MessageProps;
}

const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(({
  message,
  className,
  ...props
}, ref) => {
  const { type = 'received', content, timestamp, user, status, attachments, reactions } = message;
  
  // Format timestamp
  const formattedTime = format(timestamp, 'h:mm a');
  const formattedDate = format(timestamp, 'MMM d');
  const isToday = format(timestamp, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
  
  if (type === 'system') {
    return (
      <div
        ref={ref}
        className={cn(
          "flex justify-center py-2 px-4",
          className
        )}
        {...props}
      >
        <div className="bg-muted/60 text-muted-foreground text-xs px-3 py-1 rounded-full">
          {content}
        </div>
      </div>
    );
  }
  
  const isSent = type === 'sent';
  
  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full",
        isSent ? "justify-end" : "justify-start",
        className
      )}
      {...props}
    >
      <div className={cn(
        "flex gap-2 max-w-[80%]",
        isSent ? "flex-row-reverse" : "flex-row"
      )}>
        {!isSent && user && (
          <Avatar className="h-8 w-8">
            {user.avatar ? (
              <AvatarImage src={user.avatar} alt={user.name} />
            ) : (
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            )}
            {user.status === 'online' && (
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-background" />
            )}
          </Avatar>
        )}
        
        <div className={cn(
          "flex flex-col",
          isSent ? "items-end" : "items-start"
        )}>
          {!isSent && user && (
            <span className="text-xs text-muted-foreground mb-1">{user.name}</span>
          )}
          
          <div className="space-y-2">
            {/* Attachments */}
            {attachments && attachments.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {attachments.map((attachment, index) => (
                  attachment.type === 'image' ? (
                    <div key={index} className="rounded-md overflow-hidden max-w-[240px]">
                      <img 
                        src={attachment.url} 
                        alt={attachment.name || "Attachment"} 
                        className="object-cover w-full h-auto"
                      />
                    </div>
                  ) : (
                    <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded-md">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      <div>
                        <p className="text-xs font-medium">{attachment.name || "File"}</p>
                        {attachment.size && <p className="text-xs text-muted-foreground">{attachment.size}</p>}
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}
            
            {/* Message content */}
            <div
              className={cn(
                "px-4 py-2 rounded-xl break-words",
                isSent ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              )}
            >
              {content}
            </div>
            
            {/* Reactions */}
            {reactions && reactions.length > 0 && (
              <div className="flex gap-1 mt-1">
                {reactions.map((reaction, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full", 
                      reaction.userReacted ? "bg-primary/20" : "bg-muted/60"
                    )}
                  >
                    <span>{reaction.emoji}</span>
                    <span className="text-muted-foreground">{reaction.count}</span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Message info */}
            <div className={cn(
              "flex text-xs text-muted-foreground",
              isSent ? "justify-end" : "justify-start"
            )}>
              <span>{isToday ? formattedTime : `${formattedDate}, ${formattedTime}`}</span>
              
              {isSent && status && (
                <span className="ml-2">
                  {status === 'read' && "✓✓"}
                  {status === 'delivered' && "✓✓"}
                  {status === 'sent' && "✓"}
                  {status === 'error' && "!"}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
