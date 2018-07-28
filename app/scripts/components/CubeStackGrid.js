import * as THREE from 'three'
import CubeStack from './CubeStack'

export default class CubeStackGrid {
  constructor(cubeNum, cubeSize, cubeStackSpacing) {
    this.container = new THREE.Object3D()
    this.container.position.y = -60
    this.container.position.z = -200
    this.container.rotation.z = 0.1
    this.cubeStacks = []

    // build grid

    let gridRowSize = Math.sqrt(cubeNum)
    let width = (gridRowSize * cubeSize) / 2 + cubeStackSpacing * 2

    let gridPositionNum = 0
    let cubeStackX = -width
    let cubeStackZ = -width

    for (let i = 0; i < cubeNum; i++) {
      let cubeStack = new CubeStack(cubeSize, cubeSize * 0.07)
      cubeStack.container.position.x = cubeStackX
      cubeStack.container.position.z = cubeStackZ

      cubeStackX += cubeSize + cubeStackSpacing
      gridPositionNum ++

      if(gridPositionNum > gridRowSize) {
        gridPositionNum = 0
        cubeStackX = -width
        cubeStackZ += cubeSize + cubeStackSpacing
      }

      this.container.add(cubeStack.container)
      this.cubeStacks.push(cubeStack)
      cubeStack.update(Math.round(Math.random() * 10))
    }
  }

  update() {
    if(window.byteArray) {
      let colorOffset = 150

      for (var i = 0; i < this.cubeStacks.length; i++) {
        let num = Math.round(window.byteArray[i] * 0.07)
        this.cubeStacks[i].update(num, colorOffset)
        colorOffset += 1
        if(colorOffset > 255) {
          colorOffset = 0
        }
      }
    }

    this.container.rotation.y += 0.002
  }
}
