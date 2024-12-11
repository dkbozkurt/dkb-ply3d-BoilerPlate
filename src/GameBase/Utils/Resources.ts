import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import LoadingWindow from './LoadingWindow.js';
import EventEmitter from './EventEmitter.js';

export type Loaders = {
    gltfLoader?: GLTFLoader;
    textureLoader?: THREE.TextureLoader;
    cubeTextureLoader?: THREE.CubeTextureLoader;
};

export default class Resources extends EventEmitter {
    sources: models.Source[];
    loadingWindow: LoadingWindow;
    items: { [key: string]: any } = {};
    toLoad: number;
    loaded = 0;
    loaders!: Loaders;
    loadingManager!: THREE.LoadingManager;

    constructor(sources: models.Source[], loadingWindow: LoadingWindow) {
        super();
        this.sources = sources;
        this.loadingWindow = loadingWindow;

        this.toLoad = this.sources.length;
        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loadingManager = new THREE.LoadingManager(
            () => {
                this.trigger('ready');
                this.loadingWindow.completed();
            },
            (itemUrl, itemsLoaded, itemsTotal) => {
                const progressRatio = itemsLoaded / itemsTotal;
                this.loadingWindow.updateLoadingProgress(progressRatio);
            }
        );
        this.loaders = {
            gltfLoader: new GLTFLoader(this.loadingManager),
            textureLoader: new THREE.TextureLoader(this.loadingManager),
            cubeTextureLoader: new THREE.CubeTextureLoader(this.loadingManager),
        };
    }

    startLoading() {
        for (const source of this.sources) {
            if (source.type === 'gltfModel') {
                this.loaders.gltfLoader!.load(source.path, (file) => {
                    this.sourceLoaded(source, file);
                });
            } else if (source.type === 'texture') {
                this.loaders.textureLoader!.load(source.path, (file) => {
                    this.sourceLoaded(source, file);
                });
            } else if (source.type === 'cubeTexture') {
                this.loaders.cubeTextureLoader!.load([source.path], (file) => {
                    this.sourceLoaded(source, file);
                });
            } else if (source.type === 'audio') {
                const file = new Audio(source.path);
                this.sourceLoaded(source, file);
            }
        }
    }

    sourceLoaded(source: models.Source, file: any) {
        this.items[source.name] = file;
    }
}
