import * as THREE from 'three'
import GameBase from '../GamesBase'

export default class TestCube {

	gameBase: GameBase
	scene: THREE.Scene
	geometry: THREE.BufferGeometry
	material: THREE.Material
	mesh: THREE.Object3D

	constructor() {
		this.gameBase = GameBase.getInstance()
		this.scene = this.gameBase.scene

		this.geometry = new THREE.BoxGeometry()
		this.material = new THREE.MeshNormalMaterial({ wireframe: true })

		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.scene.add(this.mesh)
	}

	update() {
		this.mesh.rotation.x += 0.01
		this.mesh.rotation.y += 0.01
	}

	destroy() {

	}
}
