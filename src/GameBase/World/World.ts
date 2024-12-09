import * as THREE from 'three'
import GameBase from '../GamesBase.ts'
import TestCube from './TestCube.ts'

export default class World
{
    gameBase: GameBase
    scene: THREE.Scene
    resources: any
    testCube: TestCube | undefined

    constructor()
    {
        this.gameBase = new GameBase()

        this.scene = this.gameBase.scene
        this.resources = this.gameBase.resources

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