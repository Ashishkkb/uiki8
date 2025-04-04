
import { ComponentItem } from "@/types/component";

// UI Components
import ButtonComponent from './UI/Button';
import CardComponent from './Card';
import AlertComponent from './UI/Alert';
import ModalComponent from './UI/Modal';
import DropdownComponent from './UI/Dropdown';
import ToastComponent from './UI/Toast';
import TooltipComponent from './UI/Tooltip';
import AvatarComponent from './UI/Avatar';
import BadgeComponent from './UI/Badge';
import AccordionComponent from './UI/Accordion';
import TabsComponent from './UI/Tabs';
import ProgressComponent from './UI/Progress';
import SkeletonComponent from './UI/Skeleton';

// Layout Components
import ContainerComponent from './Layout/Container';
import GridComponent from './Layout/Grid';
import DividerComponent from './Layout/Divider';
import SplitLayoutComponent from './Layout/SplitLayout';
import ResponsiveColumnsComponent from './Layout/ResponsiveColumns';
import MasonryLayoutComponent from './Layout/MasonryLayout';
import HeroLayoutComponent from './Layout/HeroLayout';

// Form Components
import TextFieldComponent from './Form/TextField';
import FormBuilderComponent from './Form/FormBuilder';
import MultiStepFormComponent from './Form/MultiStepForm';
import SearchableSelectComponent from './Form/SearchableSelect';
import FormComponent from './Form';
import DatePickerComponent from './Form/DatePicker';
import SliderComponent from './Form/Slider';

// Media Components
import CarouselComponent from './Media/Carousel';
import EnhancedMediaGalleryComponent from './Media/EnhancedMediaGallery';
import AdvancedMediaGalleryComponent from './Media/AdvancedMediaGallery';
import VideoPlayerComponent from './Media/VideoPlayer';

// 3D Components
import RotatingCubeComponent from './3d/RotatingCube';
import ProductViewerComponent from './3d/ProductViewer';
import TerrainMapComponent from './3d/TerrainMap';
import ParticleSystemComponent from './3d/ParticleSystem';
import TextGeneratorComponent from './3d/TextGenerator';
import ModelViewerComponent from './3d/ModelViewer';
import Scene3DComponent from './3d/Scene3D';

// Navigation Components
import BreadcrumbsComponent from './Navigation/Breadcrumbs';
import NavigationMenuComponent from './Navigation/NavigationMenu';

export const getAllComponents = (): ComponentItem[] => [
  // UI Components
  ButtonComponent,
  CardComponent,
  AlertComponent,
  ModalComponent,
  DropdownComponent,
  ToastComponent,
  TooltipComponent,
  AvatarComponent,
  BadgeComponent,
  AccordionComponent,
  TabsComponent,
  ProgressComponent,
  SkeletonComponent,
  
  // Layout Components
  ContainerComponent,
  GridComponent,
  DividerComponent,
  SplitLayoutComponent,
  ResponsiveColumnsComponent,
  MasonryLayoutComponent,
  HeroLayoutComponent,
  
  // Form Components
  TextFieldComponent,
  FormBuilderComponent,
  MultiStepFormComponent,
  SearchableSelectComponent,
  FormComponent,
  DatePickerComponent,
  SliderComponent,
  
  // Media Components
  CarouselComponent,
  EnhancedMediaGalleryComponent,
  AdvancedMediaGalleryComponent,
  VideoPlayerComponent,
  
  // 3D Components
  RotatingCubeComponent,
  ProductViewerComponent,
  TerrainMapComponent,
  ParticleSystemComponent,
  TextGeneratorComponent,
  ModelViewerComponent,
  Scene3DComponent,
  
  // Navigation Components
  BreadcrumbsComponent,
  NavigationMenuComponent
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
