import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

class SolarSystemCore {
  constructor() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.5,
      30000
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

class Venera {
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
class Earth {
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
class Sun {
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

class Ground {
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

class SolarSystem extends SolarSystemCore {
  constructor(venera, earth, sun) {
    super()

    this.sun = sun
    this.venera = venera
    this.earth = earth
    this.ground = ground

    this.addWalls()
    this.addLights()
    this.initScene()
    this.addObjects()

    this.animate()
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
  }
  addScene(obj) {
    return this.scene.add(obj)
  }

  initScene() {
    this.addScene(this.sun)
    this.addScene(this.venera)
    this.addScene(this.earth)
    this.addScene(this.ground)
  }

  addWalls() {
    const wallTexture = new THREE.TextureLoader().load(
      '../static/textures/brick.jpg'
    )
    const wallMaterial = new THREE.MeshPhongMaterial({ map: wallTexture })

    const wallGeometry1 = new THREE.PlaneGeometry(10000, 1000, 10, 100)
    const wall1 = new THREE.Mesh(wallGeometry1, wallMaterial)
    wall1.position.set(0, 5000, 0)
    wall1.scale.y = 10
    wall1.scale.z = 50
    wall1.rotation.set(Math.PI / 2, 0, -Math.PI / 2)

    this.scene.add(wall1)

    const wallGeometry2 = new THREE.PlaneGeometry(10000, 1000, 1, 1)
    const wall2 = new THREE.Mesh(wallGeometry2, wallMaterial)
    wall2.position.set(-4550, 0, 0)
    wall2.scale.y = 10
    wall2.rotation.set(0, Math.PI / 2, Math.PI / 2)

    this.scene.add(wall2)

    const wallGeometry3 = new THREE.PlaneGeometry(10000, 1000, 1, 1)
    const wall3 = new THREE.Mesh(wallGeometry3, wallMaterial)
    wall3.position.set(4550, 0, 0)
    wall3.scale.y = 10
    wall3.rotation.set(0, -Math.PI / 2, -Math.PI / 2)

    this.scene.add(wall3)

    const wallGeometry4 = new THREE.PlaneGeometry(10000, 1000, 10, 100)
    const wall4 = new THREE.Mesh(wallGeometry4, wallMaterial)
    wall4.position.set(0, -5000, 0)
    wall4.scale.y = 10
    wall4.scale.z = 50
    wall4.rotation.set(-Math.PI / 2, 0, Math.PI / 2)

    this.scene.add(wall4)
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)

    this.scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(100, 100, 100)
    directionalLight.castShadow = true
    directionalLight.shadowMapWidth = 4096
    directionalLight.shadowMapHeight = 4096
    directionalLight.shadow.camera.left = -1000
    directionalLight.shadow.camera.right = 1000
    directionalLight.shadow.camera.top = 1000
    directionalLight.shadow.camera.bottom = -1000
    directionalLight.shadow.bias = -0.0001
    directionalLight.shadow.radius = 4
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.scene.add(directionalLight)
  }

  addObjects() {
    const objLoader = new OBJLoader()
    objLoader.load('../static/textures/areaMan.obj', (object) => {
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
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material
        }
      })

      this.scene.add(object)
    })

    objLoader.load('../static/textures/objTreeDude.obj', (object) => {
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

      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material
        }
      })

      this.scene.add(object)
    })
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))

    const sphere = this.scene.getObjectByName('sphere')
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

    const veneraPlanet = this.scene.getObjectByName('veneraPlanet')
    if (veneraPlanet) {
      veneraPlanet.rotation.z += 0.02
    }

    const earthPlanet = this.scene.getObjectByName('earthPlanet')
    if (earthPlanet) {
      earthPlanet.rotation.z -= 0.01
    }

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

const venera = new Venera().addVeneraPlanet()
const earth = new Earth().addEarth()
const sun = new Sun().addSpherePlanet()
const ground = new Ground().addGround()

const solarSystem = new SolarSystem(venera, earth, sun, ground)
