import * as THREE from 'three'

export class Venera {
	addVeneraPlanet() {
		const veneraTexture = new THREE.TextureLoader().load(
			'../static/textures/venera.jpg'
		)
		const veneraDisplacement = new THREE.TextureLoader().load(
			'../static/textures/displacementVenera.jpg'
		)

		const veneraPlanetGeometry = new THREE.SphereGeometry(700, 340, 340)
		const veneraMaterial = new THREE.MeshPhongMaterial({
			map: veneraTexture,
			displacementMap: veneraDisplacement,
			displacementScale: 100,
			displacementBias: 20,
			shininess: 100,
			specular: 0xfff5fff,
			repeat: new THREE.Vector2(2, 2),
			offset: new THREE.Vector2(-0.5, -0.5),
		})

		const veneraPlanet = new THREE.Mesh(veneraPlanetGeometry, veneraMaterial)
		veneraPlanet.name = 'veneraPlanet'
		veneraPlanet.position.set(2700, -1500, 3000)
		return veneraPlanet
	}
}
