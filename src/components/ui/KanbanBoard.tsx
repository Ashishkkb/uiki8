
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Edit, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  priority?: 'low' | 'medium' | 'high';
}

export interface KanbanColumn {
  id: string;
  title: string;
  tasks: KanbanTask[];
}

interface KanbanBoardProps {
  columns?: KanbanColumn[];
  onColumnAdd?: (title: string) => void;
  onColumnDelete?: (id: string) => void;
  onTaskAdd?: (columnId: string, task: Omit<KanbanTask, 'id'>) => void;
  onTaskDelete?: (columnId: string, taskId: string) => void;
  onTaskMove?: (taskId: string, sourceColumnId: string, targetColumnId: string) => void;
  className?: string;
}

// Helper function to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

const KanbanBoard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & KanbanBoardProps
>(({ 
  columns: externalColumns, 
  onColumnAdd,
  onColumnDelete,
  onTaskAdd,
  onTaskDelete,
  onTaskMove,
  className, 
  ...props 
}, ref) => {
  // Use internal state if no external columns are provided
  const [internalColumns, setInternalColumns] = useState<KanbanColumn[]>([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [],
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      tasks: [],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [],
    },
  ]);
  
  // Use either external or internal columns
  const columns = externalColumns || internalColumns;
  
  // State for drag and drop operations
  const [draggingTask, setDraggingTask] = useState<KanbanTask | null>(null);
  const [dragSourceColumnId, setDragSourceColumnId] = useState<string | null>(null);
  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);
  
  // State for adding new columns
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [isAddingColumn, setIsAddingColumn] = useState(false);

  // Handle drag operations
  const handleDragStart = (task: KanbanTask, columnId: string) => {
    setDraggingTask(task);
    setDragSourceColumnId(columnId);
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDragOverColumnId(columnId);
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    if (!draggingTask || !dragSourceColumnId) return;

    if (onTaskMove) {
      // Use external handler
      onTaskMove(draggingTask.id, dragSourceColumnId, targetColumnId);
    } else {
      // Use internal state management
      setInternalColumns(prevColumns => {
        return prevColumns.map(column => {
          // Remove from source column
          if (column.id === dragSourceColumnId) {
            return {
              ...column,
              tasks: column.tasks.filter(task => task.id !== draggingTask.id)
            };
          }
          
          // Add to target column
          if (column.id === targetColumnId) {
            return {
              ...column,
              tasks: [...column.tasks, draggingTask]
            };
          }
          
          return column;
        });
      });
    }

    // Reset drag state
    setDraggingTask(null);
    setDragSourceColumnId(null);
    setDragOverColumnId(null);
  };

  // Handle column operations
  const handleAddColumn = () => {
    if (!newColumnTitle.trim()) return;
    
    if (onColumnAdd) {
      // Use external handler
      onColumnAdd(newColumnTitle);
    } else {
      // Use internal state management
      setInternalColumns(prev => [
        ...prev,
        {
          id: generateId(),
          title: newColumnTitle.trim(),
          tasks: []
        }
      ]);
    }
    
    setNewColumnTitle('');
    setIsAddingColumn(false);
  };

  const handleDeleteColumn = (columnId: string) => {
    if (onColumnDelete) {
      // Use external handler
      onColumnDelete(columnId);
    } else {
      // Use internal state management
      setInternalColumns(prev => prev.filter(column => column.id !== columnId));
    }
  };

  // Handle task operations
  const handleAddTask = (columnId: string, taskTitle: string) => {
    if (!taskTitle.trim()) return;
    
    const newTask = {
      title: taskTitle.trim()
    };
    
    if (onTaskAdd) {
      // Use external handler
      onTaskAdd(columnId, newTask);
    } else {
      // Use internal state management
      setInternalColumns(prev => prev.map(column => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks: [...column.tasks, { id: generateId(), ...newTask }]
          };
        }
        return column;
      }));
    }
  };

  const handleDeleteTask = (columnId: string, taskId: string) => {
    if (onTaskDelete) {
      // Use external handler
      onTaskDelete(columnId, taskId);
    } else {
      // Use internal state management
      setInternalColumns(prev => prev.map(column => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks: column.tasks.filter(task => task.id !== taskId)
          };
        }
        return column;
      }));
    }
  };

  // Helper function for priority styling
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      <div className="flex justify-between items-center mb-4">
        {isAddingColumn ? (
          <div className="flex gap-2">
            <Input
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              placeholder="Column name"
              className="w-40"
            />
            <Button size="sm" onClick={handleAddColumn}>Save</Button>
            <Button size="sm" variant="ghost" onClick={() => setIsAddingColumn(false)}>Cancel</Button>
          </div>
        ) : (
          <Button onClick={() => setIsAddingColumn(true)}>
            <Plus className="mr-1 h-4 w-4" /> Add Column
          </Button>
        )}
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map(column => (
          <div 
            key={column.id}
            className="flex-shrink-0 w-72"
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <Card 
              className={`h-full ${dragOverColumnId === column.id ? 'ring-2 ring-primary' : ''}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium">{column.title}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
                        onClick={() => handleDeleteColumn(column.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="flex flex-col gap-2">
                {column.tasks.map(task => (
                  <div 
                    key={task.id}
                    className="bg-card border rounded-md p-3 cursor-grab shadow-sm hover:shadow transition-shadow"
                    draggable
                    onDragStart={() => handleDragStart(task, column.id)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-sm">{task.title}</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
                            onClick={() => handleDeleteTask(column.id, task.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    {task.description && (
                      <p className="text-xs text-muted-foreground mt-1">{task.description}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {task.tags?.map(tag => (
                        <Badge key={tag} variant="outline" className="px-1 py-0 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {task.priority && (
                      <div className={`text-xs px-1.5 py-0.5 rounded mt-2 inline-block ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </div>
                    )}
                  </div>
                ))}
                
                <TaskAdder onAdd={(title) => handleAddTask(column.id, title)} />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
});

// Extracted TaskAdder component
const TaskAdder: React.FC<{ onAdd: (title: string) => void }> = ({ onAdd }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  
  const handleSubmit = () => {
    if (title.trim()) {
      onAdd(title);
      setTitle('');
      setIsAdding(false);
    }
  };
  
  if (isAdding) {
    return (
      <div className="mt-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="mb-2"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
        />
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSubmit}>Add</Button>
          <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
        </div>
      </div>
    );
  }
  
  return (
    <Button 
      variant="ghost" 
      className="w-full justify-start text-muted-foreground mt-2"
      onClick={() => setIsAdding(true)}
    >
      <Plus className="mr-2 h-4 w-4" /> Add task
    </Button>
  );
};

KanbanBoard.displayName = "KanbanBoard";

export { KanbanBoard };
