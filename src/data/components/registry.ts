
import { ComponentItem } from "@/types/component";

// UI Components
import ButtonComponent from './UI/Button';
import CardComponent from './UI/Card';
import AlertComponent from './UI/Alert';
import ModalComponent from './UI/Modal';
import DropdownComponent from './UI/Dropdown';
import FormComponent from './Form';
import TableComponent from './UI/Table';
import TabsComponent from './UI/Tabs';
import AvatarComponent from './UI/Avatar';
import BadgeComponent from './UI/Badge';
import TooltipComponent from './UI/Tooltip';
import ToggleComponent from './UI/Toggle';
import AccordionComponent from './UI/Accordion';
import BreadcrumbComponent from './UI/Breadcrumb';
import PaginationComponent from './UI/Pagination';
import ProgressComponent from './UI/Progress';
import SliderComponent from './UI/Slider';
import SwitchComponent from './UI/Switch';

// Layout Components
import ContainerComponent from './Layout/Container';
import GridComponent from './Layout/Grid';
import DividerComponent from './Layout/Divider';
import SpacerComponent from './Layout/Spacer';
import AspectRatioComponent from './Layout/AspectRatio';
import CollapsibleComponent from './Layout/Collapsible';
import SplitPaneComponent from './Layout/SplitPane';
import StackComponent from './Layout/Stack';
import ScrollAreaComponent from './Layout/ScrollArea';
import ResizableComponent from './Layout/Resizable';

// Navigation Components
import NavbarComponent from './Navigation/Navbar';
import SidebarComponent from './Navigation/Sidebar';
import MenuComponent from './Navigation/Menu';
import TabNavComponent from './Navigation/TabNav';
import TreeViewComponent from './Navigation/TreeView';
import BreadcrumbsComponent from './Navigation/Breadcrumbs';
import StepperComponent from './Navigation/Stepper';
import DrawerComponent from './Navigation/Drawer';
import BottomNavigationComponent from './Navigation/BottomNavigation';
import LinkComponent from './Navigation/Link';

// Form Components
import TextFieldComponent from './Form/TextField';
import SelectComponent from './Form/Select';
import CheckboxComponent from './Form/Checkbox';
import RadioComponent from './Form/Radio';
import AutocompleteComponent from './Form/Autocomplete';
import DatePickerComponent from './Form/DatePicker';
import FileUploadComponent from './Form/FileUpload';
import SliderInputComponent from './Form/SliderInput';
import RatingComponent from './Form/Rating';
import ColorPickerComponent from './Form/ColorPicker';

// Feedback Components
import ToastComponent from './Feedback/Toast';
import SnackbarComponent from './Feedback/Snackbar';
import DialogComponent from './Feedback/Dialog';
import LoaderComponent from './Feedback/Loader';
import ProgressBarComponent from './Feedback/ProgressBar';
import SkeletonComponent from './Feedback/Skeleton';
import SpinnerComponent from './Feedback/Spinner';
import ErrorBoundaryComponent from './Feedback/ErrorBoundary';
import EmptyStateComponent from './Feedback/EmptyState';
import BannerComponent from './Feedback/Banner';

// Data Display Components
import DataTableComponent from './DataDisplay/DataTable';
import ListComponent from './DataDisplay/List';
import TreeComponent from './DataDisplay/Tree';
import TimelineComponent from './DataDisplay/Timeline';
import StatsCardComponent from './DataDisplay/StatsCard';
import KanbanBoardComponent from './DataDisplay/KanbanBoard';
import CalendarViewComponent from './DataDisplay/CalendarView';
import CodeBlockComponent from './DataDisplay/CodeBlock';
import MarkdownComponent from './DataDisplay/Markdown';
import JSONViewerComponent from './DataDisplay/JSONViewer';

// Chart Components
import LineChartComponent from './Chart/LineChart';
import BarChartComponent from './Chart/BarChart';
import PieChartComponent from './Chart/PieChart';
import AreaChartComponent from './Chart/AreaChart';
import ScatterPlotComponent from './Chart/ScatterPlot';
import HeatmapComponent from './Chart/Heatmap';
import RadarChartComponent from './Chart/RadarChart';
import GaugeComponent from './Chart/Gauge';
import SparklineComponent from './Chart/Sparkline';
import FunnelChartComponent from './Chart/FunnelChart';

// Animation Components
import FadeComponent from './Animation/Fade';
import SlideComponent from './Animation/Slide';
import ScaleComponent from './Animation/Scale';
import FlipComponent from './Animation/Flip';
import RotateComponent from './Animation/Rotate';
import TypewriterComponent from './Animation/Typewriter';
import ConfettiComponent from './Animation/Confetti';
import ParallaxComponent from './Animation/Parallax';
import LottieComponent from './Animation/Lottie';
import SpringComponent from './Animation/Spring';

// Media Components
import ImageComponent from './Media/Image';
import VideoPlayerComponent from './Media/VideoPlayer';
import AudioPlayerComponent from './Media/AudioPlayer';
import CarouselComponent from './Media/Carousel';
import GalleryComponent from './Media/Gallery';
import MapComponent from './Media/Map';
import IconComponent from './Media/Icon';
import AvatarGroupComponent from './Media/AvatarGroup';
import PDFViewerComponent from './Media/PDFViewer';
import QRCodeComponent from './Media/QRCode';

// 3D Components
import RotatingCubeComponent from './3d/RotatingCube';
import ProductViewerComponent from './3d/ProductViewer';
import TerrainMapComponent from './3d/TerrainMap';
import ParticleSystemComponent from './3d/ParticleSystem';
import TextGeneratorComponent from './3d/TextGenerator';
import ModelViewerComponent from './3d/ModelViewer';
import Scene3DComponent from './3d/Scene3D';
import Globe3DComponent from './3d/Globe3D';
import Chart3DComponent from './3d/Chart3D';
import Animation3DComponent from './3d/Animation3D';

export const getAllComponents = (): ComponentItem[] => [
  // UI Components
  ButtonComponent,
  CardComponent,
  AlertComponent,
  ModalComponent,
  DropdownComponent,
  FormComponent,
  TableComponent,
  TabsComponent,
  AvatarComponent,
  BadgeComponent,
  TooltipComponent,
  ToggleComponent,
  AccordionComponent,
  BreadcrumbComponent,
  PaginationComponent,
  ProgressComponent,
  SliderComponent,
  SwitchComponent,
  
  // Layout Components
  ContainerComponent,
  GridComponent,
  DividerComponent,
  SpacerComponent,
  AspectRatioComponent,
  CollapsibleComponent,
  SplitPaneComponent,
  StackComponent,
  ScrollAreaComponent,
  ResizableComponent,
  
  // Navigation Components
  NavbarComponent,
  SidebarComponent,
  MenuComponent,
  TabNavComponent,
  TreeViewComponent,
  BreadcrumbsComponent,
  StepperComponent,
  DrawerComponent,
  BottomNavigationComponent,
  LinkComponent,
  
  // Form Components
  TextFieldComponent,
  SelectComponent,
  CheckboxComponent,
  RadioComponent,
  AutocompleteComponent,
  DatePickerComponent,
  FileUploadComponent,
  SliderInputComponent,
  RatingComponent,
  ColorPickerComponent,
  
  // Feedback Components
  ToastComponent,
  SnackbarComponent,
  DialogComponent,
  LoaderComponent,
  ProgressBarComponent,
  SkeletonComponent,
  SpinnerComponent,
  ErrorBoundaryComponent,
  EmptyStateComponent,
  BannerComponent,
  
  // Data Display Components
  DataTableComponent,
  ListComponent,
  TreeComponent,
  TimelineComponent,
  StatsCardComponent,
  KanbanBoardComponent,
  CalendarViewComponent,
  CodeBlockComponent,
  MarkdownComponent,
  JSONViewerComponent,
  
  // Chart Components
  LineChartComponent,
  BarChartComponent,
  PieChartComponent,
  AreaChartComponent,
  ScatterPlotComponent,
  HeatmapComponent,
  RadarChartComponent,
  GaugeComponent,
  SparklineComponent,
  FunnelChartComponent,
  
  // Animation Components
  FadeComponent,
  SlideComponent,
  ScaleComponent,
  FlipComponent,
  RotateComponent,
  TypewriterComponent,
  ConfettiComponent,
  ParallaxComponent,
  LottieComponent,
  SpringComponent,
  
  // Media Components
  ImageComponent,
  VideoPlayerComponent,
  AudioPlayerComponent,
  CarouselComponent,
  GalleryComponent,
  MapComponent,
  IconComponent,
  AvatarGroupComponent,
  PDFViewerComponent,
  QRCodeComponent,
  
  // 3D Components
  RotatingCubeComponent,
  ProductViewerComponent,
  TerrainMapComponent,
  ParticleSystemComponent,
  TextGeneratorComponent,
  ModelViewerComponent,
  Scene3DComponent,
  Globe3DComponent,
  Chart3DComponent,
  Animation3DComponent
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
