import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export class SolarSystemCore {
	constructor() {
		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.5,
			10000
		)
		this.camera.position.set(2000, 2400, 3400)
		this.camera.up = new THREE.Vector3(0, 0, 1)
		this.camera.lookAt(new THREE.Vector3(0, 0, 0))

		this.renderer = new THREE.WebGLRenderer()
		this.renderer.shadowMap.enabled = true
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		document.body.appendChild(this.renderer.domElement)

		this.controls = new OrbitControls(this.camera, this.renderer.domElement)
		this.controls.enableDamping = true
		this.controls.dampingFactor = 0.25
		this.controls.enableZoom = true
	}
}
