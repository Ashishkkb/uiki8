
import React from 'react';
import { ComponentItem } from "@/types/component";
import HeatMapComponent from "./HeatMapComponent";

const HeatMapComponentItem: ComponentItem = {
  id: 150,
  name: "Heat Map",
  category: "Data Display",
  framework: "React",
  description: "A visual representation of data where values are represented as colors.",
  component: HeatMapComponent,
  tags: ["visualization", "data", "chart", "heatmap"],
  isNew: true,
  fileSize: "2.4 KB",
  complexity: "advanced"
};

export default HeatMapComponentItem;
