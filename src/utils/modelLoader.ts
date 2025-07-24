
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export interface ModelLoaderProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface LoadModelOptions {
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  enableShadows?: boolean;
  optimizeMaterials?: boolean;
}

export class ModelLoader {
  private gltfLoader: GLTFLoader;
  private fbxLoader: FBXLoader;
  private dracoLoader: DRACOLoader;

  constructor() {
    this.gltfLoader = new GLTFLoader();
    this.fbxLoader = new FBXLoader();
    this.dracoLoader = new DRACOLoader();
    
    // Set the path to the Draco decoder (for compressed models)
    this.dracoLoader.setDecoderPath('/draco/');
    this.gltfLoader.setDRACOLoader(this.dracoLoader);
  }

  async loadModel(
    path: string, 
    options: LoadModelOptions = {},
    onProgress?: (progress: ModelLoaderProgress) => void
  ): Promise<THREE.Group> {
    const {
      scale = 1,
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      enableShadows = true,
      optimizeMaterials = true
    } = options;

    const fileExtension = path.split('.').pop()?.toLowerCase();
    
    return new Promise((resolve, reject) => {
      const progressCallback = (progress: ProgressEvent) => {
        const progressData: ModelLoaderProgress = {
          loaded: progress.loaded,
          total: progress.total,
          percentage: (progress.loaded / progress.total) * 100
        };
        onProgress?.(progressData);
      };

      const successCallback = (object: THREE.Group | THREE.Object3D) => {
        let model: THREE.Group;
        
        if (object instanceof THREE.Group) {
          model = object;
        } else {
          model = new THREE.Group();
          model.add(object);
        }

        // Apply transformations
        model.scale.setScalar(scale);
        model.position.set(...position);
        model.rotation.set(...rotation);
        
        // Optimize the model
        this.optimizeModel(model, { enableShadows, optimizeMaterials });

        resolve(model);
      };

      const errorCallback = (error: unknown) => {
        console.error(`Error loading ${fileExtension?.toUpperCase()} model:`, error);
        reject(error);
      };

      // Choose the appropriate loader based on file extension
      switch (fileExtension) {
        case 'fbx':
          this.fbxLoader.load(path, successCallback, progressCallback, errorCallback);
          break;
        case 'gltf':
        case 'glb':
          this.gltfLoader.load(
            path,
            (gltf) => successCallback(gltf.scene),
            progressCallback,
            errorCallback
          );
          break;
        default:
          reject(new Error(`Unsupported file format: ${fileExtension}`));
      }
    });
  }

  private optimizeModel(
    model: THREE.Group, 
    options: { enableShadows: boolean; optimizeMaterials: boolean }
  ): void {
    const { enableShadows, optimizeMaterials } = options;
    
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Enable shadows
        if (enableShadows) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
        
        // Optimize materials
        if (optimizeMaterials && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(this.optimizeMaterial);
          } else {
            this.optimizeMaterial(child.material);
          }
        }
      }
    });
  }

  private optimizeMaterial(material: THREE.Material): void {
    if (material instanceof THREE.MeshStandardMaterial) {
      material.roughness = Math.max(0.3, material.roughness);
      material.needsUpdate = true;
    }
  }

  dispose() {
    this.dracoLoader.dispose();
  }
}

export const modelLoader = new ModelLoader();
