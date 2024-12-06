import * as THREE from 'three'
import GameBase from '../GameBase.ts'
import TestCube from './TestCube.ts'

export default class World
{
    gameBaseInstance: GameBase
    scene: THREE.Scene
    resources: any
    testCube: TestCube | undefined

    constructor()
    {
        this.gameBaseInstance = new GameBase()

        this.scene = this.gameBaseInstance.scene
        this.resources = this.gameBaseInstance.resources

        // Wait for resources
        this.resources.on('ready', ()=>{

            // Setup
            this.testCube = new TestCube()
        })
    }

    update()
    {
        if(this.testCube)
            this.testCube.update()
    }
}