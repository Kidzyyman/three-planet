import * as THREE from 'three'
export class Ground {
	addGround() {
		const groundTexture = new THREE.TextureLoader().load(
			'../static/textures/grass.jpg'
		)
		groundTexture.wrapS = THREE.RepeatWrapping
		groundTexture.wrapT = THREE.RepeatWrapping
		groundTexture.repeat.set(70, 70)

		const groundMaterial = new THREE.MeshPhongMaterial({ map: groundTexture })
		const groundGeometry = new THREE.PlaneGeometry(10000, 10000, 1, 1)
		const ground = new THREE.Mesh(groundGeometry, groundMaterial)

		return ground
	}
}
