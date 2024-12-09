import * as THREE from 'three'
import GameBase from "../GameBase.ts"

export default class LoadingWindow
{
    constructor()
    {
        this.gameBaseInstance = new GameBase()
        this.scene = this.gameBaseInstance.scene
        this.ctaManager = this.gameBaseInstance.ctaManager
        this.loadingBarElement = document.querySelector('.loading-bar')
        this.loadingTextElement = document.querySelector('.loading-text')

        this.setup()
    }

    setup()
    {
        this.overlay = {}

        this.overlay.geometry = new THREE.PlaneGeometry(2, 2, 1, 1)
        this.overlay.material = new THREE.ShaderMaterial({
            transparent: true,
            uniforms:{
                uAlpha: { value: 1 }
            },
            // wireframe: true,
            vertexShader: `
            void main()
            {
                gl_Position = vec4(position,1.0);
            }
            `,
            fragmentShader:`
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

    updateLoadingBarElement(progressRatio)
    {
        this.loadingBarElement.style.transform = `scaleX(${progressRatio})`
    }

    completed()
    {
        this.loadingBarElement.classList.add('ended')
        this.loadingBarElement.style.transform = ''
        this.loadingTextElement.classList.add('hidden')
    }
}