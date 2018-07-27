// external imports
import * as THREE from 'three'
import TweenMax from 'gsap'

// custom component imports
import Renderer from './components/Renderer'
import SoundReactivityController from './components/SoundReactivityController'
import CubeStack from './components/CubeStack'

let renderer
let scene, camera
let mainContainer
let clock = new THREE.Clock()
let deformationRange = 0.00001

function init() {
  renderer = new Renderer(0xCCFF00)
  document.body.appendChild(renderer.rendererElement)

  scene = renderer.scene
  camera = renderer.camera

  mainContainer = new THREE.Object3D()
  scene.add(mainContainer)

  let cubeStack = new CubeStack(10, 1)
  cubeStack.update(10)
  mainContainer.add(cubeStack.container)

  let soundReactivityController = new SoundReactivityController(128)

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
    soundScaleOne = 0.7 + window.total * 0.00001
    soundScaleTwo = 0.6 + window.total * 0.00005
  }

  mainContainer.rotation.x += 0.002
  mainContainer.rotation.y += 0.002
  mainContainer.rotation.z += 0.002
}

window.addEventListener('load', init)
