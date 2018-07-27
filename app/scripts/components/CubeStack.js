import * as THREE from 'three'

export default class CubeStack {
  constructor(size, cubePadding) {
    this.size = size
    this.cubePadding = cubePadding

    this.container = new THREE.Object3D()

    this.geometry = new THREE.BoxGeometry(size, size, size)
    this.material = new THREE.MeshStandardMaterial(
      {
        color : 0xFFFFFF,
        flatShading : true,
        side : THREE.DoubleSide
      }
    )

    return this
  }

  update(cubeNum) {
    // clear children
    for(let i = 0; i < this.container.children.length; i++) {
      this.container.remove(this.container.children[i])
    }

    // add children
    let cubeY = 0

    for (var i = 0; i < cubeNum; i++) {
      let newCube = new THREE.Mesh(this.geometry, this.material)
      this.container.add(newCube)
      newCube.position.y = cubeY
      cubeY += this.size + this.cubePadding
    }
  }
}
