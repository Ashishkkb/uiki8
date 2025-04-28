
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Edit, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  priority?: 'low' | 'medium' | 'high';
}

interface KanbanColumn {
  id: string;
  title: string;
  tasks: KanbanTask[];
}

interface KanbanBoardProps {
  initialColumns?: KanbanColumn[];
}

// Helper function to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Default columns if none provided
const defaultColumns: KanbanColumn[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        id: generateId(),
        title: 'Research competitors',
        description: 'Look into what similar products are offering',
        tags: ['research', 'market'],
        priority: 'medium',
      },
      {
        id: generateId(),
        title: 'Design home page',
        tags: ['design', 'ui'],
        priority: 'high',
      }
    ],
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    tasks: [
      {
        id: generateId(),
        title: 'Create component library',
        description: 'Build a collection of reusable UI components',
        tags: ['development', 'ui'],
        priority: 'high',
      }
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        id: generateId(),
        title: 'Project setup',
        description: 'Initialize repository and setup dev environment',
        tags: ['setup'],
        priority: 'low',
      }
    ],
  },
];

const KanbanBoardComponent: React.FC<KanbanBoardProps> = ({ initialColumns = defaultColumns }) => {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [draggingTask, setDraggingTask] = useState<KanbanTask | null>(null);
  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [isAddingColumn, setIsAddingColumn] = useState(false);

  // Task drag and drop handlers
  const handleDragStart = (task: KanbanTask) => {
    setDraggingTask(task);
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDragOverColumnId(columnId);
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    if (!draggingTask) return;

    const sourceColumnId = columns.find(column => 
      column.tasks.some(task => task.id === draggingTask.id)
    )?.id;

    if (!sourceColumnId) return;

    // Clone columns to avoid direct state mutation
    const updatedColumns = columns.map(column => {
      // Remove from source column
      if (column.id === sourceColumnId) {
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

    setColumns(updatedColumns);
    setDraggingTask(null);
    setDragOverColumnId(null);
  };

  // Column management
  const handleAddColumn = () => {
    if (!newColumnTitle.trim()) return;
    
    setColumns([
      ...columns,
      {
        id: generateId(),
        title: newColumnTitle.trim(),
        tasks: []
      }
    ]);
    
    setNewColumnTitle('');
    setIsAddingColumn(false);
  };

  const handleDeleteColumn = (columnId: string) => {
    setColumns(columns.filter(column => column.id !== columnId));
  };

  // Task management
  const handleAddTask = (columnId: string, taskTitle: string) => {
    if (!taskTitle.trim()) return;
    
    const newTask: KanbanTask = {
      id: generateId(),
      title: taskTitle.trim()
    };
    
    setColumns(columns.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: [...column.tasks, newTask]
        };
      }
      return column;
    }));
  };

  const handleDeleteTask = (columnId: string, taskId: string) => {
    setColumns(columns.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== taskId)
        };
      }
      return column;
    }));
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Kanban Board</h2>
        
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
            className="flex-shrink-0 w-80"
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <Card 
              className={`h-full ${dragOverColumnId === column.id ? 'ring-2 ring-primary' : ''}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{column.title}</CardTitle>
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
                <div className="text-xs text-muted-foreground">{column.tasks.length} tasks</div>
              </CardHeader>
              
              <CardContent className="flex flex-col gap-2">
                {column.tasks.map(task => (
                  <div 
                    key={task.id}
                    className="bg-card border rounded-md p-3 cursor-grab shadow-sm hover:shadow transition-shadow"
                    draggable
                    onDragStart={() => handleDragStart(task)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{task.title}</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
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
                      <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                    )}
                    
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex flex-wrap gap-1">
                        {task.tags?.map(tag => (
                          <Badge key={tag} variant="outline" className="px-1 py-0 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      {task.priority && (
                        <div className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </div>
                      )}
                    </div>
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
};

// Extracted TaskAdder component for adding new tasks
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

export default KanbanBoardComponent;
