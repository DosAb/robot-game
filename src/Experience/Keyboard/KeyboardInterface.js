import './interface.styl'

export default class KeyboardInterface
{
    constructor(_inputs)
    {
        this.inputs = _inputs

        this.keys = []
        this.elements ={}

        //Container
        this.elements.container = document.createElement('div')
        this.elements.container.classList.add('keyboard-interface')
        document.body.appendChild(this.elements.container)

        // Keys
        const keys = [
            ['', 'Digit1', 'Digit2', 'Digit3', 'Digit4', '', '', '', '', '', '', '', '', 'Backspace'],
            ['Tab', 'KeyQ', 'KeyW', 'KeyE', '', '', '', '', '', '', '', '', '', 'Enter'],
            ['Caps', 'KeyA', 'KeyS', 'KeyD', '', '', 'KeyH', '', '', '', '', '', ''],
            ['ShiftLeft', '', '', '', '', '', '', '', '', '', '', '', 'ShiftRight'],
            ['Special', 'Special', 'Special', 'Space', 'Special', 'Special', 'Special', 'Special'],
            ['ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'],
        ]

        keys.forEach((_line, _lineIndex) => {
            //Line Element
            const lineElement = document.createElement('div')
            lineElement.classList.add('line', `line${_lineIndex}`)
            this.elements.container.append(lineElement)


            //Each key
            for(const _key of _line)
            {
                //Element
                const keyElement = document.createElement('div')
                keyElement.classList.add('key')
                
                if(_key)
                {
                    keyElement.classList.add(_key)
                }

                lineElement.append(keyElement)

                //Input
                const input = this.inputs.all.find((_input)=> _input.code === _key)

                if(input)
                {
                    keyElement.classList.add('highlight')
                }

                //save
                const key = {}
                key.name = _key
                key.element = keyElement
                this.keys.push(key)
            }
        })
    }

    activate()
    {
        document.body.append(this.elements.container)
    }

    deactivate()
    {
        document.body.removeChild(this.elements.container)
    }

    press(_input)
    {
        const key = this.keys.find(_key => _key.name === _input.code)
        if(key)
        {
            // console.log(key)
            key.element.classList.add('pressed')
        }
    }

    unpress(_input)
    {
        const key = this.keys.find(_key => _key.name === _input.code)

        if(key)
        {
            window.requestAnimationFrame(()=>{
                key.element.classList.remove('pressed')
            })
        }
    }
}