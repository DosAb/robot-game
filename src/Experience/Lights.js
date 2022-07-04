import * as THREE from 'three'
import Experience from './Experience.js'

export default class Lights
{
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        // Debug
        this.debugFolder = this.debug.addFolder({
            title: 'lights',
            expanded: false,
        })

        this.setPointLight()
        this.setSpotLight()
    }

    setPointLight()
    {
        // Setup
        this.pointLight = {}
        this.pointLight.color = '#364f5f'

        // Instance
        this.pointLight.instance = new THREE.PointLight(0xffffff, 5, 0, 2)
        this.pointLight.instance.position.y = 5
        this.pointLight.instance.position.z = 3.5
        // this.pointLight.instance.castShadow = true
        // this.pointLight.instance.shadow.mapSize.set(1024, 1024)
        this.scene.add(this.pointLight.instance)

        // Debug
        const debugFolder = this.debugFolder.addFolder({
            title: 'pointLight',
            expanded: false,
        })

        debugFolder
            .addInput(
                this.pointLight,
                'color',
                { view: 'color' }
            )
            .on('change', () =>
            {
                this.pointLight.instance.color.set(this.pointLight.color)
            })
        debugFolder.addInput(
            this.pointLight.instance,
            'intensity',
            {min: 0, max: 100}
        )
        debugFolder.addInput(
            this.pointLight.instance,
            'decay',
            {min: 0, max: 10}
        )
        debugFolder
        .addInput(
            this.pointLight.instance.position,
            'y',
            { min: - 10, max: 10 }
        )

        debugFolder
            .addInput(
                this.pointLight.instance.position,
                'z',
                { min: - 20, max: 20 }
            )
    }

    setSpotLight()
    {
        this.spot = {}
        this.spot.color = '#2c5d7c'

        // Instance
        this.spot.instance = new THREE.SpotLight(0xffffff, 200, 0, 1, 1, 2)
        this.spot.instance.color = new THREE.Color(this.spot.color)
        this.spot.instance.position.y = 5.5
        this.spot.instance.position.z = 8.5
        // this.spot.instance.castShadow = true
        this.spot.instance.shadow.mapSize.set(512 * 2, 512 * 2)

        this.spot.helper = new THREE.SpotLightHelper(this.spot.instance)
        this.spot.helper.visible = false
        this.scene.add(this.spot.helper)

        const debugFolder = this.debugFolder.addFolder({
            title: 'spotLight',
            expanded: false,
        })
        debugFolder
            .addInput(
                this.spot,
                'color',
                { view: 'color' }
            )
            .on('change', () =>
            {
                this.spot.instance.color.set(this.spot.color)
            })
        debugFolder.addInput(
            this.spot.instance,
            'intensity',
            {min: 0, max: 100}
        )
        debugFolder.addInput(
            this.spot.instance,
            'decay',
            {min: 0, max: 10}
        )
        debugFolder
        .addInput(
            this.spot.instance.position,
            'y',
            { min: - 10, max: 10 }
        )

        debugFolder
            .addInput(
                this.spot.instance.position,
                'z',
                { min: - 20, max: 20 }
            )

        // this.scene.add(this.spot.instance)
    }
}