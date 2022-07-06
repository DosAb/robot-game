import {Howl, Howler} from 'howler';
import Keyboard from "./Keyboard/Keyboard"
// import sound from '../../static/assets/toyMoveSound.mp3'

export default class Sound
{
    constructor()
    {   
        // this.sfx = {
        //     moveForward: new Howl({
        //         // src: '../static/assets/toyMoveSound.mp3'
        //     })
        // }
        this.moveRobot = false
        this.setKeyboard()
    }

    setKeyboard()
    {
        this.keyboard = new Keyboard()

        this.keyboard.on('pressed', (_name) =>{
            switch (_name) {
                case 'KeyA': this.moveRobot = true
                    break;
            }
        })
        this.keyboard.on('unpressed', (_name) =>{
            switch (_name) {
                case 'KeyA': this.moveRobot = false
                    break;
            }
        })
    }

    update()
    {
        // console.log(1)
    }
}