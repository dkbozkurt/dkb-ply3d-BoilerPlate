import * as THREE from 'three'
import GameBase from '../GamesBase'
import { Overlay } from '../Types/models'

export default class LoadingWindow {
    gameBaseInstance: GameBase
    scene: THREE.Scene
    loadingBarElement: HTMLElement | null
    loadingTextElement: HTMLElement | null
    overlay!: Overlay

    constructor() {
        this.gameBaseInstance = GameBase.getInstance()
        this.scene = this.gameBaseInstance.scene
        this.loadingBarElement = document.querySelector('.loading-bar')
        this.loadingTextElement = document.querySelector('.loading-text')

        this.setup()
    }

    setup() {
        this.overlay = {}

        this.overlay.geometry = new THREE.PlaneGeometry(2, 2, 1, 1)
        this.overlay.material = new THREE.ShaderMaterial({
            transparent: true,
            uniforms: {
                uAlpha: { value: 1 }
            },
            // wireframe: true,
            vertexShader: `
            void main()
            {
                gl_Position = vec4(position,1.0);
            }
            `,
            fragmentShader: `
                uniform float uAlpha;

                void main()
                {
                    gl_FragColor = vec4(0.0,0.0,0.0,uAlpha);
                }
            `
        })
        this.overlay.mesh = new THREE.Mesh(
            this.overlay.geometry,
            this.overlay.material,
        )

        this.scene.add(this.overlay.mesh)
    }

    updateLoadingBarElement(progressRatio: number) {
        if (this.loadingBarElement === null) return
        this.loadingBarElement.style.transform = `scaleX(${progressRatio})`
    }

    completed() {
        if (this.loadingBarElement === null || this.loadingTextElement === null) return

        this.loadingBarElement.classList.add('ended')
        this.loadingBarElement.style.transform = ''
        this.loadingTextElement.classList.add('hidden')
    }
}