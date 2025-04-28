
import React from 'react';
import { ComponentItem } from "@/types/component";
import KanbanBoardComponent from "./KanbanBoardComponent";

const KanbanBoardComponentItem: ComponentItem = {
  id: "kanban-board",
  name: "Kanban Board",
  category: "UI",
  framework: "React",
  description: "Interactive Kanban board with draggable tasks, multiple columns, and task management",
  code: `import React, { useState } from 'react';

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

const KanbanBoard: React.FC<KanbanBoardProps> = ({ initialColumns = [] }) => {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [draggingTask, setDraggingTask] = useState<KanbanTask | null>(null);
  
  // Implement drag and drop functionality
  // Column management (add, edit, delete)
  // Task management (add, edit, delete, move)
  
  return (
    <div className="kanban-board">
      <div className="columns-container">
        {columns.map(column => (
          <div key={column.id} className="column">
            <h3>{column.title}</h3>
            <div className="tasks">
              {column.tasks.map(task => (
                <div
                  key={task.id}
                  className="task"
                  draggable
                >
                  {task.title}
                </div>
              ))}
            </div>
            <button>Add task</button>
          </div>
        ))}
        <button>Add column</button>
      </div>
    </div>
  );
};

export default KanbanBoard;`,
  component: KanbanBoardComponent,
  tags: ["kanban", "drag-and-drop", "task management", "project management"],
  isNew: true,
  fileSize: "7.6 KB",
  price: "0"
};

export default KanbanBoardComponentItem;
