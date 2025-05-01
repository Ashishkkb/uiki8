
import React from 'react';
import ChatMessageComponent, { MessageProps } from './ChatMessageComponent';
import { ComponentItem } from '@/types/component';
import { subMinutes, subHours, subDays } from 'date-fns';

const ChatMessageComponentItem: ComponentItem = {
  id: 113,
  name: "Chat Message",
  category: "UI",
  framework: "React",
  description: "A versatile chat message component for building chat interfaces with support for different message types, attachments, and reactions.",
  component: () => {
    const now = new Date();
    
    const messages: MessageProps[] = [
      {
        type: 'system',
        content: 'Today',
        timestamp: now
      },
      {
        type: 'received',
        content: "Hey there! How's it going?",
        timestamp: subMinutes(now, 45),
        user: {
          name: 'Alex Johnson',
          status: 'online'
        }
      },
      {
        type: 'sent',
        content: "Hi Alex! I'm doing well, thanks for asking. Just working on some new UI components.",
        timestamp: subMinutes(now, 42),
        status: 'read'
      },
      {
        type: 'received',
        content: "That's awesome! Can you share some screenshots?",
        timestamp: subMinutes(now, 30),
        user: {
          name: 'Alex Johnson',
          status: 'online'
        }
      },
      {
        type: 'sent',
        content: "Sure, here's what I've been working on:",
        timestamp: subMinutes(now, 25),
        status: 'read',
        attachments: [
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1618477247222-11e2fd98004a?q=80&w=1000',
            name: 'UI Screenshot'
          }
        ]
      },
      {
        type: 'received',
        content: "Wow, that looks incredible! I really like the design. Could you also send me the documentation?",
        timestamp: subMinutes(now, 23),
        user: {
          name: 'Alex Johnson',
          status: 'online'
        },
        reactions: [
          { emoji: '👍', count: 1, userReacted: true },
          { emoji: '🔥', count: 1 }
        ]
      },
      {
        type: 'sent',
        content: "Thanks! Here's the documentation file:",
        timestamp: subMinutes(now, 20),
        status: 'delivered',
        attachments: [
          {
            type: 'file',
            url: '#',
            name: 'UI_Documentation.pdf',
            size: '2.4 MB'
          }
        ]
      },
      {
        type: 'system',
        content: 'Yesterday',
        timestamp: subDays(now, 1)
      },
      {
        type: 'received',
        content: "Let's catch up on the project tomorrow.",
        timestamp: subDays(subHours(now, 16), 1),
        user: {
          name: 'Alex Johnson',
          status: 'offline'
        }
      },
    ];

    return (
      <div className="bg-background border rounded-lg p-4 w-full max-w-lg space-y-6">
        <h3 className="text-lg font-medium mb-4">Chat Messages</h3>
        
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessageComponent 
              key={index} 
              message={message} 
            />
          ))}
        </div>

        <div className="pt-2 border-t">
          <div className="flex gap-2">
            <div className="flex-1 rounded-full border px-4 py-2 text-sm text-muted-foreground">
              Type a message...
            </div>
            <button className="p-2 rounded-full bg-primary text-primary-foreground">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  },
  code: `import React, { forwardRef } from 'react';
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";

type MessageType = 'sent' | 'received' | 'system';
type MessageStatus = 'sent' | 'delivered' | 'read' | 'error';

interface MessageProps {
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
}

interface ChatMessageProps {
  message: MessageProps;
  className?: string;
}

const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(({
  message,
  className,
  ...props
}, ref) => {
  const { type = 'received', content, timestamp, user, status, attachments, reactions } = message;
  
  const formattedTime = format(timestamp, 'h:mm a');
  const isToday = format(timestamp, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
  const isSent = type === 'sent';
  
  if (type === 'system') {
    return (
      <div className="flex justify-center py-2 px-4">
        <div className="bg-muted/60 text-muted-foreground text-xs px-3 py-1 rounded-full">
          {content}
        </div>
      </div>
    );
  }

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
            {/* Message content */}
            <div
              className={cn(
                "px-4 py-2 rounded-xl break-words",
                isSent ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              )}
            >
              {content}
            </div>
            
            {/* Message info */}
            <div className="flex text-xs text-muted-foreground">
              <span>{formattedTime}</span>
              
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

export default ChatMessage;`,
  tags: ["ui", "chat", "message", "communication"],
  isNew: true,
};

export default ChatMessageComponentItem;
