
import DummyModel from './DummyModel';
import InteractiveCube from './InteractiveCube';
import ProductViewer from './ProductViewer';
import RotatingCube from './RotatingCube';
import Scene from './Scene';
import TerrainMap from './TerrainMap';
import TerrainMapGeometry from './TerrainMapGeometry';

// Temporary placeholders for new components
// These would be implemented with proper ThreeJS code in a real application
const ParticleSystem = () => <RotatingCube />;
const TextGenerator = () => <ProductViewer color="#8B5CF6" />;
const ModelViewer = () => <TerrainMap />;

export {
  DummyModel,
  InteractiveCube,
  ModelViewer,
  ParticleSystem,
  ProductViewer,
  RotatingCube,
  Scene,
  TerrainMap,
  TerrainMapGeometry,
  TextGenerator
};
