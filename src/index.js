import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'

class SolarSystem {
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
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.25
    this.controls.enableZoom = true

    this.addGround()
    this.addWalls()
    this.addLights()
    this.addPlanets()

    this.animate()
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

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

    this.scene.add(ground)
  }

  addWalls() {
    const wallTexture = new THREE.TextureLoader().load(
      '../static/textures/brick.jpg'
    )
    const wallMaterial = new THREE.MeshPhongMaterial({ map: wallTexture })

    const wallGeometry1 = new THREE.PlaneGeometry(10000, 1000, 10, 100)
    const wall1 = new THREE.Mesh(wallGeometry1, wallMaterial)
    wall1.position.set(0, 3000, 0)
    wall1.scale.y = 10
    wall1.scale.z = 50
    wall1.rotation.z = -Math.PI / 2
    wall1.rotation.x = Math.PI / 2
    this.scene.add(wall1)

    const wallGeometry2 = new THREE.PlaneGeometry(10000, 1000, 1, 1)
    const wall2 = new THREE.Mesh(wallGeometry2, wallMaterial)
    wall2.position.set(-4550, 0, 0)
    wall2.scale.y = 10
    wall2.rotation.z = Math.PI / 2
    wall2.rotation.y = Math.PI / 2
    this.scene.add(wall2)

    const wallGeometry3 = new THREE.PlaneGeometry(10000, 1000, 1, 1)
    const wall3 = new THREE.Mesh(wallGeometry3, wallMaterial)
    wall3.position.set(4550, 0, 0)
    wall3.scale.y = 10
    wall3.rotation.z = -Math.PI / 2
    wall3.rotation.y = -Math.PI / 2
    this.scene.add(wall3)

    const wallGeometry4 = new THREE.PlaneGeometry(10000, 1000, 10, 100)
    const wall4 = new THREE.Mesh(wallGeometry4, wallMaterial)
    wall4.position.set(0, -3000, 0)
    wall4.scale.y = 10
    wall4.scale.z = 50
    wall4.rotation.z = Math.PI / 2
    wall4.rotation.x = -Math.PI / 2
    this.scene.add(wall4)
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    this.scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(100, 100, 100)
    this.scene.add(directionalLight)
  }

  addPlanets() {
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
    sphere.position.set(0, 100, 2500)
    this.scene.add(sphere)

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
    veneraPlanet.position.set(2700, 1300, 1000)
    this.scene.add(veneraPlanet)

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
    earthPlanet.position.set(-3500, 1000, 1200)
    this.scene.add(earthPlanet)
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
        this.camera.position.z -= 100
        break
      case 'KeyW':
        this.camera.position.z += 100
        break
      case 'KeyA':
        this.camera.position.x += 100
        break
      case 'KeyD':
        this.camera.position.x -= 100
        break
      default:
        break
    }
  }
}

const solarSystem = new SolarSystem()
