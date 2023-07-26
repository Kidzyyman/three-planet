import * as THREE from 'three'

export class Lights {
	addLights() {
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)

		const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
		directionalLight.position.set(1000, 1000, 1000)
		directionalLight.castShadow = true
		directionalLight.shadow.mapSize.width = 4096
		directionalLight.shadow.mapSize.height = 4096
		directionalLight.shadow.camera.left = -1000
		directionalLight.shadow.camera.right = 1000
		directionalLight.shadow.camera.top = 1000
		directionalLight.shadow.camera.bottom = -1000
		directionalLight.shadow.bias = -0.0001
		directionalLight.shadow.radius = 4

		return [ambientLight, directionalLight]
	}
}
