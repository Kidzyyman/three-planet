import * as THREE from 'three'

export class Sun {
	addSpherePlanet() {
		const planetTexture = new THREE.TextureLoader().load(
			'../static/textures/planet.jpg'
		)
		const displacementMap = new THREE.TextureLoader().load(
			'../static/textures/displacementMap.jpg'
		)

		const sphereGeometry = new THREE.SphereGeometry(1000, 640, 640)
		const sphereMaterial = new THREE.MeshPhongMaterial({
			map: planetTexture,
			displacementMap: displacementMap,
			displacementScale: 300,
			displacementBias: 0.5,
			shininess: 50,
			specular: 0xffffff,
			repeat: new THREE.Vector2(2, 2),
			offset: new THREE.Vector2(-0.5, -0.5),
		})

		const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
		sphere.name = 'sphere' // присваиваем имя планете
		sphere.position.set(0, 100, 4500)
		sphere.castShadow = true
		sphere.receiveShadow = true

		return sphere
	}
}
