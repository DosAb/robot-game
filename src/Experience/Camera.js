import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Keyboard from './Keyboard/Keyboard.js'

export default class Camera
{
    constructor(_options)
    {
        //Options
        this.experience = new Experience()
        this.config = this.experience.config
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.targetElement = this.experience.targetElement
        this.scene = this.experience.scene

        // Set up
        this.mode = 'default'

        //Debug
        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder({
                title: 'camera'
            })
        }

        this.setKeyboard()
        this.setInstance()
        this.setModes()
    }

    setKeyboard()
    {
        this.keyboard = new Keyboard()

        this.keyboard.on('pressed', (_name) =>{
            switch (_name){
                case 'KeyW': this.moveRobot = true
                    break;
                case 'KeyS': this.moveRobotBack = true
                    break;
            }
        })
        this.keyboard.on('unpressed', (_name) =>{
            switch (_name){
                case 'KeyW': this.moveRobot = false
                    break;
                case 'KeyS': this.moveRobotBack = false
                    break;
            }
        })
    }


    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(75, this.config.width / this.config.height, 0.1, 100)
        this.instance.rotation.reorder('YXZ')

        this.scene.add(this.instance)
    }

    setModes()
    {
        this.modes = {}

        //Default
        this.modes.default = {}
        this.modes.default.instance = this.instance.clone()
        this.modes.default.instance.position.set(0, 4, 10)
        this.modes.default.instance.rotation.reorder('YXZ')

        //Debug
        this.modes.debug = {}
        this.modes.debug.instance = this.instance.clone()
        this.modes.debug.instance.rotation.reorder('YXZ')
        this.modes.debug.instance.position.set(0, 2, 10)
        
        this.modes.debug.orbitControls = new OrbitControls(this.modes.debug.instance, this.targetElement)
        this.modes.debug.orbitControls.enabled = this.mode === 'debug'
        // this.modes.debug.orbitControls.screenSpacePanning = true
        this.modes.debug.orbitControls.enableKeys = false
        // this.modes.debug.orbitControls.zoomSpeed = 0.25
        this.modes.debug.orbitControls.enableDamping = true
        // this.modes.debug.orbitControls.target.set(0, 2, 0)
        this.modes.debug.orbitControls.update()

        this.instance.position.copy(this.modes[this.mode].instance.position)
        this.instance.quaternion.copy(this.modes[this.mode].instance.quaternion)



        this.debugFolder
        .addInput(
            this,
            'mode',
            {
                view: 'list',
                label: 'mode',
                options:
                [
                    { text: 'default', value: 'default' },
                    { text: 'debug', value: 'debug' },
                ]
            }
        )
    }


    resize()
    {
        this.instance.aspect = this.config.width / this.config.height
        this.instance.updateProjectionMatrix()

        this.modes.default.instance.aspect = this.config.width / this.config.height
        this.modes.default.instance.updateProjectionMatrix()

        this.modes.debug.instance.aspect = this.config.width / this.config.height
        this.modes.debug.instance.updateProjectionMatrix()
    }

    update()
    {
        //Update debug orbit controls
        this.modes.debug.orbitControls.update()


        if(this.moveRobot === true)
        {
            // this.instance.position.z -= 0.005 * this.time.delta * 6
            // console.log('moving')
        }
        if(this.moveRobotBack === true)
        {
            // this.instance.position.z += 0.005 * this.time.delta * 6
            // console.log('movingBack')
        }
        
        //Apply coordinates
        // this.instance.position.copy(this.modes[this.mode].instance.position)
        // this.instance.quaternion.copy(this.modes[this.mode].instance.quaternion)

        this.instance.updateMatrixWorld() // To be used in projection
        // this.instance.updateProjectionMatrix() // To be used in projection

    }

    destroy()
    {
        this.modes.debug.orbitControls.destroy()
    }
}