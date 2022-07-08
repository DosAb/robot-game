import {Howl, Howler} from 'howler';
import Keyboard from "./Keyboard/Keyboard"
import sound from '../../static/assets/robotWalk.mp3'
import soundRotate from '../../static/assets/robotRotate.mp3'
import shootSound from '../../static/assets/shoot.mp3'

export default class Sound
{
    constructor()
    {   
        this.sfx = {
            moveForward: new Howl({
                src: sound,
                volume: 0.3
            }),
            rotate: new Howl({
                src: soundRotate,
                volume: 0.1
            }),
            shoot: new Howl({
                src: shootSound,
                volume: 1.2
            })
        }

        this.setKeyboard()
    }

    setKeyboard()
    {
        this.keyboard = new Keyboard()

        this.keyboard.on('pressed', (_name) =>{
            switch (_name) {
                case 'KeyW': this.moveRobot = true
                    break;
                case 'KeyS': this.moveRobot = true
                    break;
                case 'KeyA': this.rotateRobot = true
                    break;
                case 'KeyD': this.rotateRobot = true
                    break;
                case 'ShiftLeft': this.shoot = true
                    break;
            }
        })
        this.keyboard.on('unpressed', (_name) =>{
            switch (_name) {
                case 'KeyW': this.moveRobot = false
                        setTimeout(()=>{this.sfx.moveForward.pause()}, 150)
                    break;
                case 'KeyS': this.moveRobot = false
                        setTimeout(()=>{this.sfx.moveForward.pause()}, 150)
                    break;
                case 'KeyA': this.rotateRobot = false
                        setTimeout(()=>{this.sfx.rotate.pause()}, 100)
                    break;
                case 'KeyD': this.rotateRobot = false
                        setTimeout(()=>{this.sfx.rotate.pause()}, 100)
                    break;
                case 'ShiftLeft': this.shoot = false
                    break;

            }
        })
    }

    update()
    {
        if(this.moveRobot === true){
            if(!this.sfx.moveForward.playing())
            {
                this.sfx.moveForward.play()
                this.sfx.moveForward.rate(2)
            }
        }
        if(this.rotateRobot === true){
            if(!this.sfx.rotate.playing())
            {
                this.sfx.rotate.play()
                this.sfx.rotate.rate(1.5)
            }
        }
        if(this.shoot === true)
        {
            if(!this.sfx.shoot.playing())
            {
                this.sfx.shoot.play()
                this.sfx.shoot.rate(2)
            }
        }
    }
}