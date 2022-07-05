import Experience from './Experience.js'
import Keyboard from './Keyboard/Keyboard.js'

export default class Presets
{
    constructor()
    {
        this.experience = new Experience()
        this.keyboard = new Keyboard()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.world = this.experience.world

        this.ready = false
        this.resources.on('groupEnd', (_group) =>{
            if(_group.name === 'base')
            {
                this.ready = true
                this.apply(0)
            }
        })

        this.keyboard.on('pressed', (_name) =>{
            switch (_name) {
                case 'Digit1': this.apply(0)
                    break;    
                case 'Digit2': this.apply(1)
                    break;    
            }
        })

        this.items = [
            {
                backgroundColorA: '#011019',
                backgroundColorB: '#13222c',
                robotColor: '#ffffff',
                robotRoughness: 0.55,
                robotMetalness: 1,

                redPass: 1,
                greenPass: 0.5,
                redPass: 1.5,

                pointLightColor: '#ffffff',
                pointLightIntensity: 80,
                pointLightDecay: 2.5,
                pointLightY: 5.0,
                pointLightZ: -1.8,

                spotLightColor: '#9210c2',
                spotLightIntensity: 200,
                spotLightDecay: 2,
                spotLightY: 5.5,
                spotLightZ: 8.5,
                fogColor: "#13222c",
            },
            {
                backgroundColorA: '#2c0304',
                backgroundColorB: '#ff0000',
                robotColor: '#ff0000',
                robotRoughness: 0.2,
                robotMetalness: 1,

                redPass: 0.8,
                greenPass: 0.35,
                bluePass: 0.5,

                pointLightColor: '#ff0000',
                pointLightIntensity: 50,
                pointLightDecay: 2.5,
                pointLightY: 5.0,
                pointLightZ: 3.5,

                spotLightColor: '#ff0000',
                spotLightIntensity: 200,
                spotLightDecay: 2,
                // spotLightY: 5.5,
                spotLightZ: 8.5,
                fogColor: "#ff0000"
            },
            {
                backgroundColorA: '#df7e00',
                backgroundColorB: '#ff0000',
                robotColor: '#ff0000',
                robotRoughness: 1,
                robotMetalness: 0,

                redPass: 0.8,
                greenPass: 0.35,
                bluePass: 0.5,

                pointLightColor: '#ff0000',
                pointLightIntensity: 50,
                pointLightDecay: 2.5,
                pointLightY: 5.0,
                pointLightZ: 3.5,

                spotLightColor: '#ff0000',
                spotLightIntensity: 200,
                spotLightDecay: 2,
                // spotLightY: 5.5,
                spotLightZ: 8.5,
                fogColor: "#ff0000"
            },
        ]


    }
    apply(index)
    {
        const presetItem = this.items[index]
        this.world.background.material.uniforms.uColorA.value.set(presetItem.backgroundColorA)
        this.world.background.material.uniforms.uColorB.value.set(presetItem.backgroundColorB)
        this.scene.fog.color.set(presetItem.fogColor)

        // this.experience.renderer.postProcess.finalPass.uniforms.redMultiplier.value = presetItem.redPass
        // this.experience.renderer.postProcess.finalPass.uniforms.greenMultiplier.value = presetItem.greenPass
        // this.experience.renderer.postProcess.finalPass.uniforms.blueMultiplier.value = presetItem.bluePass
        

        this.world.mecha.material.color.set(presetItem.robotColor)
        this.world.mecha.material.roughness = presetItem.robotRoughness
        this.world.mecha.material.metalness = presetItem.robotMetalness

        this.world.lights.pointLight.instance.color.set(presetItem.pointLightColor)
        this.world.lights.pointLight.instance.intensity = presetItem.pointLightIntensity
        this.world.lights.pointLight.instance.decay = presetItem.pointLightDecay
        this.world.lights.pointLight.instance.position.y = presetItem.pointLightY
        this.world.lights.pointLight.instance.position.z = presetItem.pointLightZ

        this.world.lights.spot.instance.color.set(presetItem.spotLightColor)
        this.world.lights.spot.instance.intensity = presetItem.spotLightIntensity
        this.world.lights.spot.instance.decay = presetItem.spotLightDecay
        // this.world.lights.spot.instance.position.y = presetItem.spotLightLightY
        // this.world.lights.spot.instance.position.z = presetItem.spotLightLightZ
        
    }
}