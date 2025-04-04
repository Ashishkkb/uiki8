
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
import ThreeDCardComponentItem from './UI/ThreeDCard';
import AnimatedCarouselComponentItem from './UI/AnimatedCarousel';
import TimelineComponentItem from './UI/Timeline';
import PricingTableComponentItem from './UI/PricingTable';
import InteractiveCardWallComponentItem from './UI/InteractiveCardWall';

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

// Navigation Components
import BreadcrumbsComponent from './Navigation/Breadcrumbs';
import NavigationMenuComponent from './Navigation/NavigationMenu';

// Animation Components
import TextEffectComponentItem from './Animation/TextEffect';
import ParticleTextComponentItem from './Animation/ParticleText';
import GlobeComponentItem from './Animation/Globe';

// Media Components
import VideoGalleryComponentItem from './Media/VideoGallery';
import ImageComparisonComponentItem from './Media/ImageComparison';

// New Components
import ColorPickerComponentItem from './Form/ColorPicker';
import TagInputComponentItem from './Form/TagInput';
import FileUploadComponentItem from './Form/FileUpload';
import RatingComponentItem from './UI/Rating';
import NotificationComponentItem from './UI/Notification';
import DataTableComponentItem from './DataDisplay/DataTable';
import StatCardComponentItem from './DataDisplay/StatCard';
import ToggleGroupComponentItem from './Form/ToggleGroup';
import CommandPaletteComponentItem from './Navigation/CommandPalette';
import WavyBackgroundComponentItem from './UI/WavyBackground';

// Added 10 New Components
import SwitchComponentItem from './Form/Switch';
import CheckboxComponentItem from './Form/Checkbox';
import RadioGroupComponentItem from './Form/RadioGroup';
import PopoverComponentItem from './UI/Popover';
import AspectRatioComponentItem from './UI/AspectRatio';
import HoverCardComponentItem from './UI/HoverCard';
import CollapsibleComponentItem from './UI/Collapsible';
import ContextualHelpComponentItem from './UI/ContextualHelp';
import CarouselComponentItem from './UI/Carousel';
import PaginationComponentItem from './UI/Pagination';

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
  ThreeDCardComponentItem,
  AnimatedCarouselComponentItem,
  TimelineComponentItem,
  PricingTableComponentItem,
  InteractiveCardWallComponentItem,
  RatingComponentItem,
  NotificationComponentItem,
  WavyBackgroundComponentItem,
  PopoverComponentItem,
  AspectRatioComponentItem,
  HoverCardComponentItem,
  CollapsibleComponentItem,
  ContextualHelpComponentItem,
  CarouselComponentItem,
  PaginationComponentItem,
  
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
  ColorPickerComponentItem,
  TagInputComponentItem,
  FileUploadComponentItem,
  ToggleGroupComponentItem,
  SwitchComponentItem,
  CheckboxComponentItem,
  RadioGroupComponentItem,
  
  // Navigation Components
  BreadcrumbsComponent,
  NavigationMenuComponent,
  CommandPaletteComponentItem,
  
  // Animation Components
  TextEffectComponentItem,
  ParticleTextComponentItem,
  GlobeComponentItem,
  
  // Data Display Components
  DataTableComponentItem,
  StatCardComponentItem,
  
  // Media Components
  VideoGalleryComponentItem,
  ImageComparisonComponentItem
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
