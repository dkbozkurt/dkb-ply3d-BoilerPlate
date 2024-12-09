import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import GameBase from './GamesBase.ts'
import Sizes from './Utils/Sizes.ts'

export default class Camera {

    gameBase: GameBase
    sizes: Sizes
    scene: THREE.Scene
    canvas!: HTMLCanvasElement
    instance: THREE.Camera
    controls: OrbitControls | null

    constructor() {
        this.gameBase = new GameBase()

        this.sizes = this.gameBase.sizes;
        this.scene = this.gameBase.scene;
        this.canvas = this.gameBase.canvas;
        this.controls = null;

        this.instance = new THREE.PerspectiveCamera(
            60,
            this.sizes.width / this.sizes.height,
            0.1,
            100);

        this.instance.position.set(8, 8, 8);
        const listener = new THREE.AudioListener()
        this.instance.add(listener);
        this.scene.add(this.instance);

        this.setOrbitControls()
    }


    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
    }

    resize() {
        if (this.instance instanceof THREE.PerspectiveCamera) {
            this.instance.aspect = this.sizes.width / this.sizes.height;
            this.instance.updateProjectionMatrix();
        } else if (this.instance instanceof THREE.OrthographicCamera) {
            this.instance.left = -this.sizes.width / 2;
            this.instance.right = this.sizes.width / 2;
            this.instance.top = this.sizes.height / 2;
            this.instance.bottom = -this.sizes.height / 2;
            this.instance.updateProjectionMatrix();
        }
    }

    update() {
        // Necessary for orbit controls
        if(this.controls)
            this.controls.update();
    }
}