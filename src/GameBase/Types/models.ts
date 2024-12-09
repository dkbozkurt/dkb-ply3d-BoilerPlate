import * as THREE from 'three'
import GameBase from "../GamesBase";
import AudioManager from '../AudioManager';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

declare global {
    interface Window {
        gameBase: GameBase;
        audioManager: AudioManager;
    }
}

export type Source = {
    name: string;
    type: 'texture' | 'gltfModel' | 'material' | 'cubeTexture' | 'audio'; // Enumerate possible types
    path: string; // Replace `string` with the actual type if `path` is not a string
};

// export type AudioResources = {
//     [key: string]: HTMLAudioElement;
// };

export type AudioResources = Record<string, HTMLAudioElement>;

export type Loaders = {
    gltfLoader?: GLTFLoader;
    textureLoader?: THREE.TextureLoader;
    cubeTextureLoader?: THREE.CubeTextureLoader;
};

export type Overlay = {
    geometry?: THREE.PlaneGeometry;
    material?: THREE.ShaderMaterial;
    mesh?: THREE.Mesh;
}