import * as THREE from 'three'

export class Earth {
	addEarth() {
		const earthTexture = new THREE.TextureLoader().load(
			'../static/textures/earth.jpg'
		)
		const earthDisplacement = new THREE.TextureLoader().load(
			'../static/textures/earthDisplacement.jpg'
		)

		const earthGeometry = new THREE.SphereGeometry(760, 324, 324)
		const earthMaterial = new THREE.MeshPhysicalMaterial({
			map: earthTexture,
			displacementMap: earthDisplacement,
			displacementScale: 50,
			displacementBias: 10,
			shininess: 100,
			specular: 0xfff5fff,
		})

		const earthPlanet = new THREE.Mesh(earthGeometry, earthMaterial)
		earthPlanet.name = 'earthPlanet'
		earthPlanet.position.set(-3500, 1000, 4200)
		earthPlanet.castShadow = true
		earthPlanet.receiveShadow = true
		return earthPlanet
	}
}
