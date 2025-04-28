
import React from 'react';
import { ComponentItem } from "@/types/component";
import KanbanBoardComponent from "./KanbanBoardComponent";

const KanbanBoardComponentItem: ComponentItem = {
  id: 152,
  name: "Kanban Board",
  category: "UI",
  framework: "React",
  description: "A board for visualizing work and workflow with draggable cards and columns.",
  component: KanbanBoardComponent,
  tags: ["ui", "kanban", "drag", "board", "organization"],
  isNew: true,
  fileSize: "3.5 KB",
  complexity: "complex",
  code: `import React, { useState } from 'react';
import { Button } from "./button";
import { Input } from "./input";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";

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

export const KanbanBoard = ({
  columns: externalColumns,
  onColumnAdd,
  onColumnDelete,
  onTaskAdd,
  onTaskDelete,
  onTaskMove,
  className,
  ...props
}) => {
  // Implementation details...
  return (
    <div className={\`w-full \${className}\`} {...props}>
      {/* Board implementation */}
    </div>
  );
};`
};

export default KanbanBoardComponentItem;
