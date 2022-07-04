import * as THREE from 'three'
import Experience from './Experience.js'

import vertexShader from './shaders/background/vertex.glsl'
import fragmentShader from './shaders/background/fragment.glsl'


export default class Background
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.debugFolder = this.debug.addFolder({
            title: 'background',
            expanded: false
        })

        this.setGeometry()
        this.setMaterila()
        this.setMesh()
    }
    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(2, 2, 1, 1)
    }
    setMaterila()
    {
        this.colorA = '#13222c'
        this.colorB = '#000000'

        this.material = new THREE.ShaderMaterial({
            uniforms:{
                uColorA: {value: new THREE.Color(this.colorA)},
                uColorB: {value: new THREE.Color(this.colorB)},
                uOffest: {value: 0.1},
                uMultiplier: {value: 1.7},
            },
            depthWrite: false,
            depthTest: false,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        })

        this.debugFolder
            .addInput(
                this,
                'colorA',
                {view: 'color'}
            )
            .on('change', () =>{
                this.material.uniforms.uColorA.value.set(this.colorA)
            })
        this.debugFolder
            .addInput(
                this.material.uniforms.uOffest,
                'value',
                {min: -1, max: 1}
            )
        this.debugFolder
            .addInput(
                this.material.uniforms.uMultiplier,
                'value',
                {min: 0, max: 10}
            )
    }
    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.frustumCulled = false
        this.scene.add(this.mesh)
    }

}