
import React from 'react';
import DummyModel from './DummyModel';
import InteractiveCube from './InteractiveCube';
import ProductViewer from './ProductViewer';
import RotatingCube from './RotatingCube';
import Scene from './Scene';
import TerrainMap from './TerrainMap';
import TerrainMapGeometry from './TerrainMapGeometry';

// Temporary placeholders for new components
// These would be implemented with proper ThreeJS code in a real application
const ParticleSystem = () => <div className="h-full w-full"><RotatingCube /></div>;
const TextGenerator = () => <div className="h-full w-full"><ProductViewer color="#8B5CF6" /></div>;
const ModelViewer = () => <div className="h-full w-full"><TerrainMap /></div>;
const Scene3D = () => <div className="h-full w-full"><Scene /></div>;

export {
  DummyModel,
  InteractiveCube,
  ModelViewer,
  ParticleSystem,
  ProductViewer,
  RotatingCube,
  Scene,
  Scene3D,
  TerrainMap,
  TerrainMapGeometry,
  TextGenerator
};
