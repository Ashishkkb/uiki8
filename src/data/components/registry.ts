
import { ComponentItem } from "@/types/component";

// UI Components
import ButtonComponent from './UI/Button';
import CardComponent from './Card';
import AlertComponent from './UI/Alert';
import ModalComponent from './UI/Modal';
import DropdownComponent from './UI/Dropdown';

// Layout Components
import ContainerComponent from './Layout/Container';
import GridComponent from './Layout/Grid';
import DividerComponent from './Layout/Divider';

// Form Components
import TextFieldComponent from './Form/TextField';

// Media Components
import CarouselComponent from './Media/Carousel';
import EnhancedMediaGalleryComponent from './Media/EnhancedMediaGallery';
import AdvancedMediaGalleryComponent from './Media/AdvancedMediaGallery';

// 3D Components
import RotatingCubeComponent from './3d/RotatingCube';
import ProductViewerComponent from './3d/ProductViewer';
import TerrainMapComponent from './3d/TerrainMap';
import ParticleSystemComponent from './3d/ParticleSystem';
import TextGeneratorComponent from './3d/TextGenerator';
import ModelViewerComponent from './3d/ModelViewer';
import Scene3DComponent from './3d/Scene3D';

export const getAllComponents = (): ComponentItem[] => [
  // UI Components
  ButtonComponent,
  CardComponent,
  AlertComponent,
  ModalComponent,
  DropdownComponent,
  
  // Layout Components
  ContainerComponent,
  GridComponent,
  DividerComponent,
  
  // Form Components
  TextFieldComponent,
  
  // Media Components
  CarouselComponent,
  EnhancedMediaGalleryComponent,
  AdvancedMediaGalleryComponent,
  
  // 3D Components
  RotatingCubeComponent,
  ProductViewerComponent,
  TerrainMapComponent,
  ParticleSystemComponent,
  TextGeneratorComponent,
  ModelViewerComponent,
  Scene3DComponent
];

export const getComponentsByCategory = (category: string): ComponentItem[] => {
  return getAllComponents().filter(component => component.category === category);
};

export const getUIComponents = (): ComponentItem[] => getComponentsByCategory('UI');
export const getLayoutComponents = (): ComponentItem[] => getComponentsByCategory('Layout');
export const getNavigationComponents = (): ComponentItem[] => getComponentsByCategory('Navigation');
export const getFormComponents = (): ComponentItem[] => getComponentsByCategory('Form');
export const getFeedbackComponents = (): ComponentItem[] => getComponentsByCategory('Feedback');
export const getDataDisplayComponents = (): ComponentItem[] => getComponentsByCategory('Data Display');
export const getChartComponents = (): ComponentItem[] => getComponentsByCategory('Chart');
export const getAnimationComponents = (): ComponentItem[] => getComponentsByCategory('Animation');
export const getMediaComponents = (): ComponentItem[] => getComponentsByCategory('Media');
export const get3DComponents = (): ComponentItem[] => getComponentsByCategory('3D');
