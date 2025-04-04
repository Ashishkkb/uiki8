
import React, { useState } from 'react';
import { GripVertical, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Item {
  id: string;
  content: string;
}

interface DragDropListProps {
  items: Item[];
  onChange?: (items: Item[]) => void;
  onRemove?: (id: string) => void;
  className?: string;
  removable?: boolean;
  itemClassName?: string;
}

const DragDropList: React.FC<DragDropListProps> = ({
  items: initialItems,
  onChange,
  onRemove,
  className,
  removable = true,
  itemClassName,
}) => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [draggedItem, setDraggedItem] = useState<Item | null>(null);
  const [draggedOverItemId, setDraggedOverItemId] = useState<string | null>(null);

  const handleDragStart = (item: Item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    setDraggedOverItemId(id);
  };

  const handleDrop = () => {
    if (!draggedItem || !draggedOverItemId || draggedItem.id === draggedOverItemId) {
      setDraggedItem(null);
      setDraggedOverItemId(null);
      return;
    }

    const newItems = [...items];
    
    // Remove the dragged item from its current position
    const draggedItemIndex = newItems.findIndex(item => item.id === draggedItem.id);
    newItems.splice(draggedItemIndex, 1);
    
    // Insert the dragged item at its new position
    const dropIndex = newItems.findIndex(item => item.id === draggedOverItemId);
    newItems.splice(dropIndex, 0, draggedItem);
    
    setItems(newItems);
    setDraggedItem(null);
    setDraggedOverItemId(null);
    
    if (onChange) {
      onChange(newItems);
    }
  };

  const handleRemove = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    
    if (onRemove) {
      onRemove(id);
    }
    
    if (onChange) {
      onChange(newItems);
    }
  };

  return (
    <ul className={cn("space-y-2", className)}>
      {items.map(item => (
        <li
          key={item.id}
          className={cn(
            "flex items-center px-4 py-3 bg-card border rounded-md transition-colors",
            draggedOverItemId === item.id && "border-primary bg-primary/5",
            draggedItem?.id === item.id && "opacity-50",
            itemClassName
          )}
          draggable
          onDragStart={() => handleDragStart(item)}
          onDragOver={(e) => handleDragOver(e, item.id)}
          onDrop={handleDrop}
          onDragEnd={() => setDraggedItem(null)}
        >
          <div className="flex-shrink-0 cursor-grab">
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="ml-3 flex-grow">{item.content}</div>
          {removable && (
            <button 
              className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-muted transition-colors"
              onClick={() => handleRemove(item.id)}
              type="button"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default DragDropList;
