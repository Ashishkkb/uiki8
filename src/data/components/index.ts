
import ButtonComponent from './Button';
import CardComponent from './Card';
import AlertComponent from './Alert';
import ModalComponent from './Modal';
import DropdownComponent from './Dropdown';
import FormComponent from './Form';
import TableComponent from './Table';
import TabsComponent from './Tabs';

import {
  RotatingCubeComponent,
  ProductViewerComponent,
  TerrainMapComponent,
  ParticleSystemComponent,
  TextGeneratorComponent,
  ModelViewerComponent
} from './3d';

export const getAllComponents = () => [
  // UI Components
  ButtonComponent,
  CardComponent,
  AlertComponent,
  ModalComponent,
  DropdownComponent,
  FormComponent,
  TableComponent,
  TabsComponent,
  
  // 3D Components
  RotatingCubeComponent,
  ProductViewerComponent,
  TerrainMapComponent,
  ParticleSystemComponent,
  TextGeneratorComponent,
  ModelViewerComponent
];

export const getUIComponents = () => [
  ButtonComponent,
  CardComponent,
  AlertComponent,
  ModalComponent,
  DropdownComponent,
  FormComponent,
  TableComponent,
  TabsComponent
];

export const get3DComponents = () => [
  RotatingCubeComponent,
  ProductViewerComponent,
  TerrainMapComponent,
  ParticleSystemComponent,
  TextGeneratorComponent,
  ModelViewerComponent
];
