import * as CANNON from 'cannon-es'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { Earth } from './Earth'
import { Ground } from './Ground'
import { Lights } from './Lights'
import { SolarSystemCore } from './SolarSystemCore'
import { Sun } from './Sun'
import { Venera } from './Venera'
import { Wall } from './Wall'

class SolarSystem extends SolarSystemCore {
	constructor(options) {
		super()

		this.sun = options.sun
		this.venera = options.venera
		this.earth = options.earth

		this.wall1 = options.wall1
		this.wall2 = options.wall2
		this.wall3 = options.wall3
		this.wall4 = options.wall4
		this.lights = options.lights
		// this.ground = options.ground
		this.addObjects()
		this.initScene()
		this.animate()
		this.initRendererUtils()
		document.addEventListener('keydown', this.handleKeyDown.bind(this))

		this.timeStep = this.addWorld().timeStep
		this.world = this.addWorld().world
		this.sphereMesh = this.addWorld().sphereMesh
		this.sphereBody = this.addWorld().sphereBody
		this.groundMesh = this.addWorld().groundMesh
		this.groundBody = this.addWorld().groundBody
		this.boxMesh = this.addWorld().boxMesh
		this.boxBody = this.addWorld().boxBody
	}

	addScene(obj) {
		if (Array.isArray(obj)) {
			obj.forEach(obj => {
				this.scene.add(obj)
			})
		} else {
			return this.scene.add(obj)
		}
	}

	initRendererUtils() {
		return (this.renderer.shadowMap.type = THREE.PCFSoftShadowMap)
	}

	initScene() {
		this.addScene(this.sun)
		this.addScene(this.venera)
		this.addScene(this.earth)
		// this.addScene(this.ground)
		this.addScene(this.wall1)
		this.addScene(this.wall2)
		this.addScene(this.wall3)
		this.addScene(this.wall4)
		this.addScene(this.lights)
		this.addScene(this.world)
	}

	addObjects() {
		const objLoader = new OBJLoader()
		objLoader.load('../static/textures/areaMan.obj', object => {
			object.scale.set(25, 25, 25)
			object.rotation.set(0, -Math.PI / 2, Math.PI / 2)
			object.position.set(-3000, 0, 2500)
			object.castShadow = true
			object.receiveShadow = true
			const textureLoader = new THREE.TextureLoader()
			const texture = textureLoader.load(
				'../static/textures/objHouseTexture.jpg'
			)
			const material = new THREE.MeshPhongMaterial({ map: texture })
			object.traverse(child => {
				if (child instanceof THREE.Mesh) {
					child.material = material
				}
			})

			this.scene.add(object)
		})

		objLoader.load('../static/textures/objTreeDude.obj', object => {
			object.scale.set(700, 700, 700)
			object.rotation.set(-Math.PI / 2, -Math.PI / 2, -Math.PI / 1)
			object.position.set(3000, 1000, 2200)
			object.castShadow = true
			object.receiveShadow = true
			const textureLoader = new THREE.TextureLoader()
			const texture = textureLoader.load('../static/textures/razorTexture.jpg')

			texture.minFilter = THREE.LinearFilter
			texture.magFilter = THREE.LinearFilter

			const material = new THREE.MeshPhongMaterial({
				map: texture,

				displacementScale: 300,
				displacementBias: 0.5,
				shininess: 50,
				specular: 0xffffff,
				repeat: new THREE.Vector2(10, 10),
				offset: new THREE.Vector2(-0.5, -0.5),
			})

			object.traverse(child => {
				if (child instanceof THREE.Mesh) {
					child.material = material
				}
			})

			this.scene.add(object)
		})
	}

	displacementBiasChange(sphere) {
		if (sphere) {
			sphere.rotation.z += 0.01
			const sphereMaterial = sphere.material
			if (sphereMaterial.displacementBias < 50) {
				sphereMaterial.displacementBias += 4
			}
			if (sphereMaterial.displacementBias >= 300) {
				sphereMaterial.displacementBias -= 4
			}
			if (sphereMaterial.displacementBias <= 30) {
				sphereMaterial.displacementBias += 2
			}
		}
	}

	spheresRotation() {
		const sphere = this.scene.getObjectByName('sphere')
		this.displacementBiasChange(sphere)

		const veneraPlanet = this.scene.getObjectByName('veneraPlanet')
		if (veneraPlanet) {
			veneraPlanet.rotation.z += 0.02
		}

		const earthPlanet = this.scene.getObjectByName('earthPlanet')
		if (earthPlanet) {
			earthPlanet.rotation.z -= 0.01
		}
	}

	addWorld() {
		const boxGeo = new THREE.BoxGeometry(1000, 1000, 1000)
		const boxMat = new THREE.MeshBasicMaterial({
			color: 0x00ff00,
			wireframe: true,
		})
		const boxMesh = new THREE.Mesh(boxGeo, boxMat)
		this.scene.add(boxMesh)

		const sphereGeo = new THREE.SphereGeometry(2000)
		const sphereMat = new THREE.MeshBasicMaterial({
			color: 0xff0000,
			wireframe: true,
		})
		const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat)
		this.scene.add(sphereMesh)

		const groundGeo = new THREE.PlaneGeometry(10000, 10000)
		const groundMat = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			side: THREE.DoubleSide,
			wireframe: true,
		})
		const groundMesh = new THREE.Mesh(groundGeo, groundMat)
		this.scene.add(groundMesh)

		const world = new CANNON.World({
			gravity: new CANNON.Vec3(0, -9.81, 0),
		})

		const groundPhysMat = new CANNON.Material()

		const groundBody = new CANNON.Body({
			//shape: new CANNON.Plane(),
			//mass: 10
			shape: new CANNON.Box(new CANNON.Vec3(15, 15, 0.1)),
			type: CANNON.Body.STATIC,
			material: groundPhysMat,
		})
		world.addBody(groundBody)
		groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0)

		const boxPhysMat = new CANNON.Material()

		const boxBody = new CANNON.Body({
			mass: 1,
			shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
			position: new CANNON.Vec3(1, 20, 0),
			material: boxPhysMat,
		})
		world.addBody(boxBody)

		boxBody.angularVelocity.set(0, 10, 0)
		boxBody.angularDamping = 0.5

		const groundBoxContactMat = new CANNON.ContactMaterial(
			groundPhysMat,
			boxPhysMat,
			{ friction: 0.04 }
		)

		world.addContactMaterial(groundBoxContactMat)

		const spherePhysMat = new CANNON.Material()

		const sphereBody = new CANNON.Body({
			mass: 4,
			shape: new CANNON.Sphere(2),
			position: new CANNON.Vec3(0, 10, 0),
			material: spherePhysMat,
		})
		world.addBody(sphereBody)

		sphereBody.linearDamping = 0.21

		const groundSphereContactMat = new CANNON.ContactMaterial(
			groundPhysMat,
			spherePhysMat,
			{ restitution: 0.9 }
		)

		world.addContactMaterial(groundSphereContactMat)

		const timeStep = 1 / 60

		//  console.log(world.step())
		return {
			world: world,
			timeStep: timeStep,
			groundBody: groundBody,
			groundMesh: groundMesh,
			boxMesh: boxMesh,
			boxBody: boxBody,
			sphereBody: sphereBody,
			sphereMesh: sphereMesh,
		}
	}

	animate() {
		requestAnimationFrame(this.animate.bind(this))

		// this.world.step(this.timeStep);

		// this.world.groundMesh.quaternion.copy(groundBody.quaternion);

		// this.world.boxMesh.position.copy(boxBody.position);
		// this.world.boxMesh.quaternion.copy(boxBody.quaternion);

		// this.world.sphereMesh.position.copy(sphereBody.position);
		// this.world.sphereMesh.quaternion.copy(sphereBody.quaternion);

		this.spheresRotation()

		this.controls.update()
		this.renderer.render(this.scene, this.camera)
	}

	handleKeyDown(event) {
		event.preventDefault()

		switch (event.code) {
			case 'KeyS':
				this.sun.position.y += 10
				break
			case 'KeyW':
				this.sun.position.y -= 10
				break
			case 'KeyA':
				this.sun.position.x += 10
				break
			case 'KeyD':
				this.sun.position.x -= 10
				break
			default:
				break
		}
	}
}

class CanonWorld extends SolarSystemCore {
	constructor(solarSystem) {
		super()

		this.SOLAR_SYSTEM = solarSystem
		this.animate()
	}

	init() {
		this.SOLAR_SYSTEM
	}

	animate() {
		requestAnimationFrame(this.animate.bind(this))

		this.SOLAR_SYSTEM.world.step(this.SOLAR_SYSTEM.timeStep)

		this.SOLAR_SYSTEM.groundMesh.quaternion.copy(
			this.SOLAR_SYSTEM.groundBody.quaternion
		)

		this.SOLAR_SYSTEM.boxMesh.position.copy(this.SOLAR_SYSTEM.boxBody.position)
		this.SOLAR_SYSTEM.boxMesh.quaternion.copy(
			this.SOLAR_SYSTEM.boxBody.quaternion
		)

		this.SOLAR_SYSTEM.sphereMesh.position.copy(
			this.SOLAR_SYSTEM.sphereBody.position
		)
		this.SOLAR_SYSTEM.sphereMesh.quaternion.copy(
			this.SOLAR_SYSTEM.sphereBody.quaternion
		)
		console.log(this.SOLAR_SYSTEM.step(this.SOLAR_SYSTEM.timeStep))

		this.controls.update()
		this.renderer.render(this.scene, this.camera)
	}
}

const venera = new Venera().addVeneraPlanet()
const earth = new Earth().addEarth()
const sun = new Sun().addSpherePlanet()
const ground = new Ground().addGround()
const lights = new Lights().addLights()
const wall1 = new Wall([0, 5000, 0], 10, 50, [
	Math.PI / 2,
	0,
	-Math.PI / 2,
]).init()
const wall2 = new Wall([-4550, 0, 0], 10, 1, [
	0,
	Math.PI / 2,
	Math.PI / 2,
]).init()
const wall3 = new Wall([4500, 0, 0], 10, 1, [
	0,
	-Math.PI / 2,
	-Math.PI / 2,
]).init()
const wall4 = new Wall([0, -5000, 0], 10, 50, [
	-Math.PI / 2,
	0,
	Math.PI / 2,
]).init()

const options = {
	venera: venera,
	earth: earth,
	sun: sun,
	ground: ground,
	lights: lights,
	wall1: wall1,
	wall2: wall2,
	wall3: wall3,
	wall4: wall4,
}

const solarSystem = new SolarSystem(options)

const world = new CanonWorld(solarSystem)
