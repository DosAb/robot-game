import * as THREE from 'three'
import Experience from './Experience.js'

import Robot from './Robot.js'
import Lights from './Lights.js'
import Background from './Background.js'

export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on('groupEnd', (_group) =>{
            if(_group.name === 'base')
            {
                this.setBackground()
                this.setLights()
                this.setRobot()
            }
        })
    }
    setBackground()
    {
        this.background = new Background()
    }

    setRobot()
    {
        this.mecha = new Robot()
        this.mecha.robot.body.add(this.lights.spot.instance)
        this.mecha.robot.body.add(this.lights.pointLight.instance)
    }

    setLights()
    {
        this.lights = new Lights()
    }




    resize()
    {
    }

    update()
    {
        if(this.mecha){
            this.mecha.update()
        }
        if(this.lights){
            // this.lights.spot.instance.lookAt(this.mecha.robot.bodies.objects[0].position)
            this.lights.spot.instance.target = this.mecha.robot.bodies.objects[0]
            this.lights.pointLight.instance.target = this.mecha.robot.bodies.objects[0]
            // this.lights.spot.instance.updateWorldMatrix()
            // console.log(this.mecha.robot.bodies.objects[0].position)
        }
    }

    destroy()
    {
    }

}