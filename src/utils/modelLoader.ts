
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export class ModelLoader {
  private gltfLoader: GLTFLoader;
  private dracoLoader: DRACOLoader;

  constructor() {
    this.gltfLoader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    
    // Set the path to the Draco decoder (for compressed models)
    this.dracoLoader.setDecoderPath('/draco/');
    this.gltfLoader.setDRACOLoader(this.dracoLoader);
  }

  async loadModel(path: string): Promise<THREE.Group> {
    return new Promise((resolve, reject) => {
      this.gltfLoader.load(
        path,
        (gltf) => {
          const model = gltf.scene;
          
          // Optimize the model
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              // Enable shadows
              child.castShadow = true;
              child.receiveShadow = true;
              
              // Optimize materials
              if (child.material instanceof THREE.MeshStandardMaterial) {
                child.material.roughness = Math.max(0.3, child.material.roughness);
              }
            }
          });

          resolve(model);
        },
        (progress) => {
          console.log('Model loading progress:', (progress.loaded / progress.total * 100) + '%');
        },
        (error) => {
          console.error('Error loading model:', error);
          reject(error);
        }
      );
    });
  }

  dispose() {
    this.dracoLoader.dispose();
  }
}

export const modelLoader = new ModelLoader();
