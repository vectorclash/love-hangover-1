import * as THREE from 'three'
import tinycolor from 'tinycolor2'

export default class CubeStack {
  constructor(size, cubePadding) {
    this.size = size
    this.cubePadding = cubePadding

    this.container = new THREE.Object3D()

    this.geometry = new THREE.BoxGeometry(size, size / 3, size)

    return this
  }

  update(cubeNum, colorOffset) {
    // clear children
    for(let i = this.container.children.length - 1; i >= 0; i--) {
      this.container.remove(this.container.children[i])
    }

    // add children
    let cubeY = 0

    for (var i = 0; i < cubeNum; i++) {
      let color = tinycolor({h: colorOffset - i * 10, s: 100, l: 50})
      let specular = color.complement()
      let material = new THREE.MeshPhongMaterial(
        {
          color : color.toHexString(),
          specular: specular.toHexString(),
          needsUpdate: true
        }
      )

      let newCube = new THREE.Mesh(this.geometry, material)
      this.container.add(newCube)
      newCube.position.y = cubeY
      cubeY += this.size / 3 + this.cubePadding
    }
  }
}
