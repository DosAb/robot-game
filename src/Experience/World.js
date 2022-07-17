import Experience from './Experience.js'

import Robot from './Robot.js'
import Lights from './Lights.js'
import Background from './Background.js'
import Sound from './Sound.js'

export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        this.resources.on('groupEnd', (_group) =>{
            if(_group.name === 'base')
            {
                this.setBackground()
                this.setLights()
                this.setRobot()
                this.setSound()
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
        // this.mecha.robot.body.add(this.lights.pointLight.instance)
    }

    setLights()
    {
        this.lights = new Lights()
    }
    setSound()
    {
        this.sound = new Sound()
    }




    resize()
    {
    }

    update()
    {
        if(this.mecha){
            this.mecha.update()
        }
        if(this.sound){
            this.sound.update()
        }
    }

    destroy()
    {
    }

}