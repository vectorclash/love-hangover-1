// external imports
import * as THREE from 'three'
import TweenMax from 'gsap'
import tinycolor from 'tinycolor2'

// custom component imports
import Renderer from './components/Renderer'
import SoundReactivityController from './components/SoundReactivityController'
import CubeStackGrid from './components/CubeStackGrid'
import WireframeShapeSwirl from './components/WireframeShapeSwirl'
import ParticleField from './components/ParticleField'

let renderer
let scene, camera
let mainContainer
let clock = new THREE.Clock()
let deformationRange = 0.00001
let fftSize = 256
let cubeStackGrid, shapeSwirl, randomShapes, popperParticlesOne, popperParticlesTwo

function init() {
  renderer = new Renderer(0x000000)
  document.body.appendChild(renderer.rendererElement)

  scene = renderer.scene
  camera = renderer.camera

  mainContainer = new THREE.Object3D()
  scene.add(mainContainer)

  let soundReactivityController = new SoundReactivityController(fftSize)

  cubeStackGrid = new CubeStackGrid(fftSize / 2, 20, 40)
  mainContainer.add(cubeStackGrid.container)

  shapeSwirl = new WireframeShapeSwirl(10)
  mainContainer.add(shapeSwirl.container)

  let imageLoaderOne = new THREE.TextureLoader()
  imageLoaderOne.load(
    'images/poppers-one.png',
    (texture) => {
      popperParticlesOne = new ParticleField(50, texture, 50, 0.5)
      mainContainer.add(popperParticlesOne.particleSystem)
    }
  )

  let imageLoaderTwo = new THREE.TextureLoader()
  imageLoaderTwo.load(
    'images/poppers-two.png',
    (texture) => {
      popperParticlesTwo = new ParticleField(50, texture, 50, 0.5)
      mainContainer.add(popperParticlesTwo.particleSystem)
    }
  )

  TweenMax.ticker.addEventListener('tick', loop)
}

function loop() {
  let delta1 = clock.getDelta(), time1 = clock.getElapsedTime() * 0.0005;
  let delta2 = clock.getDelta(), time2 = clock.getElapsedTime() * 0.00045;
  let delta3 = clock.getDelta(), time3 = clock.getElapsedTime() * 0.0006;

  renderer.render()

  let soundTotal = 0
  let soundScaleOne = 0
  let soundScaleTwo = 0

  if(window.total) {
    soundTotal = window.total * 0.000001
    soundScaleOne = 0.9 + window.total * 0.00001
    soundScaleTwo = 0.9 + window.total * 0.00001

    cubeStackGrid.container.scale.x = soundScaleOne
    cubeStackGrid.container.scale.y = soundScaleOne
    cubeStackGrid.container.scale.z = soundScaleOne

    popperParticlesOne.particleSystem.scale.x = soundScaleTwo
    popperParticlesOne.particleSystem.scale.y = soundScaleTwo
    popperParticlesOne.particleSystem.scale.z = soundScaleTwo

    popperParticlesTwo.particleSystem.scale.x = soundScaleTwo
    popperParticlesTwo.particleSystem.scale.y = soundScaleTwo
    popperParticlesTwo.particleSystem.scale.z = soundScaleTwo
  }

  if(popperParticlesOne) {
    popperParticlesOne.particleSystem.rotation.y -= 0.002
  }

  if(popperParticlesTwo) {
    popperParticlesTwo.particleSystem.rotation.y += 0.002
  }

  cubeStackGrid.update()
}

window.addEventListener('load', init)
