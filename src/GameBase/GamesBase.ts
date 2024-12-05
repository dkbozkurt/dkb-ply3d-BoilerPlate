import * as THREE from 'three'
import Sizes from "./Utils/Sizes.ts"
import Time from "./Utils/Time.ts"
import Camera from './Camera.ts'
import Renderer from './Renderer.ts'
import World from './World/World.ts'
import Resources from './Utils/Resources.ts'
import LoadingWindow from './Utils/LoadingWindow.ts';

import sources from './sources.ts'

let instance: GameBase | null = null

export default class GameBase
{
    canvas: HTMLCanvasElement
    
    constructor(canvas)
    {
        // Singleton pattern
        if(instance)
        {
            return instance
        }
        instance = this;

        // Global access
        // Allow us to access game directly through console
        window.gameBase = this

        // Options
        this.canvas = canvas

        // Setup
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources,this.loadingWindow)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        // Sizes resize event
        this.sizes.on('resize',()=>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })

        this.debugPanel()
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()

        if(this.debug.active && this.stats) this.stats.update()
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')
        this.inputManager.destroy()

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                for(const key in child.material)
                {
                    const value = child.material[key]

                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active)
        {
            this.debug.ui.destroy()
        }
    }

    debugPanel()
    {
        if(!this.debug.active) return
        this.statsWindow()
    }

    statsWindow()
    {
        this.stats = new Stats()
        document.body.appendChild(this.stats.dom)
    }
}