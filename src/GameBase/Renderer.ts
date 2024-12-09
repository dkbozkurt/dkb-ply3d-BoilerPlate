import * as THREE from 'three'
import GameBase from './GamesBase.ts';
import Debug from './Utils/Debug.ts';
import Sizes from './Utils/Sizes.ts';
import Camera from './Camera.ts';

export default class Renderer {
    gameBase: GameBase
    debug: Debug
    canvas: HTMLCanvasElement
    sizes: Sizes
    scene: THREE.Scene
    camera: Camera
    instance: THREE.WebGLRenderer

    constructor() {
        this.gameBase = GameBase.getInstance()

        this.debug = this.gameBase.debug
        this.canvas = this.gameBase.canvas
        this.sizes = this.gameBase.sizes
        this.scene = this.gameBase.scene
        this.camera = this.gameBase.camera

        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'  // For power saving mode (performance-optimized)
        })

        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor('#211d20')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        if (this.debug.active)
            this.debugPanel()
    }

    debugPanel() {
        const debugObject = {
            LogRendererInfo: () => { this.logRendererInfo() },
        }
        const debugFolder = this.debug.ui.addFolder('Renderer')
        debugFolder.add(debugObject, 'LogRendererInfo')

    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    update() {
        this.instance.render(this.scene, this.camera.instance)
    }

    logRendererInfo() {
        console.log('Renderer.info:', this.instance.info);
        console.log('Draw calls:', this.instance.info.render.calls);
        console.log('Triangles:', this.instance.info.render.triangles);
        console.log('Geometries:', this.instance.info.memory.geometries);
        console.log('Textures:', this.instance.info.memory.textures);
    }

}