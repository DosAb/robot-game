import Experience from './Experience.js'

export default class Presets
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.keyboard = this.experience.keyboard
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.world = this.experience.world

        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder({
                title: 'fog',
                expanded: false,
            })

            this.color = '#ffffff'

            this.debugFolder
                .addInput(
                    this,
                    'color',
                    { view: 'color' }
                )
                .on('change', () =>
                {
                    this.scene.fog.color.set(this.color)
                })
        }

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
                case 'Digit3': this.apply(2)
                    break;    
                case 'Digit4': this.apply(3)
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
                wireframe: false,

                floorColor: '#ffffff',

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
                backgroundColorA: '#720001',
                backgroundColorB: '#720001',
                robotColor: '#c8ff00',
                robotRoughness: 0.2,
                robotMetalness: 1,
                wireframe: false,

                floorColor: '#ffffff',

                redPass: 0.8,
                greenPass: 0.35,
                bluePass: 0.5,

                pointLightColor: '#ff0000',
                pointLightIntensity: 50,
                pointLightDecay: 2.5,
                pointLightY: 5.0,
                pointLightZ: 3.5,

                spotLightColor: '#ff0042',
                spotLightIntensity: 200,
                spotLightDecay: 1.8,
                spotLightY: 5.5,
                spotLightZ: 8.5,
                fogColor: "#720001"
            },
            {
                backgroundColorA: '#ffffff',
                backgroundColorB: '#ffffff',
                robotColor: '#ffffff',
                robotRoughness: 0.1,
                robotMetalness: 1,
                wireframe: false,

                floorColor: '#ffffff',

                redPass: 0.8,
                greenPass: 0.35,
                bluePass: 0.5,

                pointLightColor: '#ffffff',
                pointLightIntensity: 50,
                pointLightDecay: 2.5,
                pointLightY: 5.0,
                pointLightZ: 3.5,

                spotLightColor: '#ffffff',
                spotLightIntensity: 80,
                spotLightDecay: 2,
                spotLightY: 5.5,
                spotLightZ: 8.5,
                fogColor: "#ffffff"
            },
            {
                backgroundColorA: '#000000',
                backgroundColorB: '#000000',
                robotColor: '#ffb900',
                robotRoughness: 0.1,
                robotMetalness: 1,
                wireframe: true,

                floorColor: '#ffffff',

                redPass: 0.8,
                greenPass: 0.35,
                bluePass: 0.5,

                pointLightColor: '#ffffff',
                pointLightIntensity: 100,
                pointLightDecay: 2.5,
                pointLightY: 2.8,
                pointLightZ: -1.7,

                spotLightColor: '#ffb900',
                spotLightIntensity: 300,
                spotLightDecay: 2.8,
                spotLightY: 5.5,
                spotLightZ: 8.5,
                fogColor: "#000000"
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
        

        this.world.mecha.robot.floor.material.color.set(presetItem.floorColor)



        this.world.mecha.material.color.set(presetItem.robotColor)
        this.world.mecha.material.roughness = presetItem.robotRoughness
        this.world.mecha.material.metalness = presetItem.robotMetalness
        this.world.mecha.material.wireframe = presetItem.wireframe

        this.world.lights.pointLight.instance.color.set(presetItem.pointLightColor)
        this.world.lights.pointLight.instance.intensity = presetItem.pointLightIntensity
        this.world.lights.pointLight.instance.decay = presetItem.pointLightDecay
        this.world.lights.pointLight.instance.position.y = presetItem.pointLightY
        this.world.lights.pointLight.instance.position.z = presetItem.pointLightZ

        this.world.lights.spot.instance.color.set(presetItem.spotLightColor)
        this.world.lights.spot.instance.intensity = presetItem.spotLightIntensity
        this.world.lights.spot.instance.decay = presetItem.spotLightDecay
        this.world.lights.spot.instance.position.y = presetItem.spotLightY
        this.world.lights.spot.instance.position.z = presetItem.spotLightZ
        
    }
}