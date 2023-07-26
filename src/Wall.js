import * as THREE from 'three'

export class Wall {
	constructor(position, scaleY, scaleZ, rotation) {
		this.texture = new THREE.TextureLoader().load(
			'../static/textures/brick.jpg'
		)
		this.material = new THREE.MeshPhongMaterial({ map: this.texture })
		this.geometry = new THREE.PlaneGeometry(10000, 1000, 10, 100)
		this.wall = new THREE.Mesh(this.geometry, this.material)
		this.position = position
		this.rotation = rotation
		this.getPosition(position)
		this.getRotation(rotation)
		this.getScale(scaleY, scaleZ)
	}

	getPosition(coordinates) {
		return this.wall.position.set(
			coordinates[0],
			coordinates[1],
			coordinates[2]
		)
	}

	getRotation(coordinates) {
		return this.wall.rotation.set(
			coordinates[0],
			coordinates[1],
			coordinates[2]
		)
	}
	getScale(scaleY, scaleZ) {
		this.wall.scale.y = scaleY
		this.wall.scale.z = scaleZ
	}

	init() {
		return this.wall
	}
}
