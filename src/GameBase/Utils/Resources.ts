import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'

import EventEmitter from './EventEmitter.js'

export default class Resources extends EventEmitter
{
    constructor(sources: any,loadingWindow: LoadingWindow)
    {
        super()

        // Options
        this.sources = sources
        this.loadingWindow = loadingWindow

        // Setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        this.loadingManager = new THREE.LoadingManager(
            ()=> {
                gsap.to(
                    this.loadingWindow.overlay.material.uniforms.uAlpha,
                    { duration: 0.5, value:0}
                )
                console.log('Loaded')
                this.trigger('ready')
                this.loadingWindow.completed()
            },
            (itemUrl,itemsLoaded, itemsTotal)=>
            {
                // console.log(itemUrl, itemsLoaded / itemsTotal);
                const progressRatio = itemsLoaded/ itemsTotal
                this.loadingWindow.updateLoadingBarElement(progressRatio)
            }
        )
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader(this.loadingManager)
        this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager)
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(this.loadingManager)
    }

    startLoading()
    {
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source,file)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source,file)
                    }
                )
            }
            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source,file)
                    }
                )
            }
            else if(source.type === 'audio')
            {
                const file = new Audio(source.path)
                this.sourceLoaded(source,file)
            }
        }
    }

    sourceLoaded(source,file)
    {
        this.items[source.name] = file

        // ! Loading process is controlled by LoadingManager
        // this.loaded++

        // if(this.loaded === this.toLoad)
        // {
        //     console.log('Loading finished')
        //     this.trigger('ready')
        // }
    }
}