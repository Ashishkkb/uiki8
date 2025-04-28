
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
  complexity: "advanced"
};

export default KanbanBoardComponentItem;
