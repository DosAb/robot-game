import * as THREE from 'three'
import Experience from './Experience.js'
import Keyboard from './Keyboard/Keyboard.js'

export default class Robot
{
    constructor(_options)
    {
        //Options
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.debugFolder = this.debug.addFolder({
            title: 'mecha',
            expanded: false,
        })
        
        
        this.keyPressed = {}

        // Debug
        this.setKeyboard()
        this.setMaterial()
        this.setRobot()
        this.setShadow()
        this.setMuzzleFlash()
        this.updateFloor()
       
    }



    
    setMaterial()
    {
        this.color = '#ffffff'
        this.material = new THREE.MeshStandardMaterial()
        this.material.color = new THREE.Color(this.color)
        this.material.roughness = 0.55
        this.material.metalness = 1
        this.material.wireframe = false

        this.basicMaterial = new THREE.MeshBasicMaterial()

        const debugFolder = this.debugFolder.addFolder({
            title: 'robotColor',
            expanded: false,
        })

        debugFolder
        .addInput(
            this,
            'color',
            { view: 'color' }
        )
        .on('change', () =>
        {
            this.material.color.set(this.color)
        })
        debugFolder
        .addInput(
            this.material,
            'roughness',
            { min: 0, max: 1}
        )
        debugFolder
        .addInput(
            this.material,
            'metalness',
            { min: 0, max: 1}
        )
        debugFolder
        .addInput(
            this.material,
            'wireframe',
        )

    }

    setRobot(){
        this.robot = {}
        this.robot.speed = 1
        this.robot.parts = [
            {
                regex: /^shoulder/, 
                name: 'shoulders', 
                axys: 'x',
                objects: [],
                default: -Math.PI * 0.25,
                value: 0,
                easedValue: 0,
                easingMultiplier: 0.02,
                min: - Infinity,
                max: Infinity,
            },
            {
                regex: /^head/, 
                name: 'heads', 
                axys: 'y',
                objects: [],
                value: 0,
                easedValue: 0,
                easingMultiplier: 0.015,
                min: - Infinity,
                max:  Infinity,
            },
            {
                regex: /^upperArm/, 
                name: 'upperArms', 
                axys: 'z',
                objects: [],
                value: 0,
                easedValue: 0,
                easingMultiplier: 0.02,
                min: - Infinity,
                max:  Infinity,
            },
            {
                regex: /^body/, 
                name: 'bodies', 
                axys: 'y',
                objects: [],
                value: 0,
                easedValue: 0,
                easingMultiplier: 0.02,
                min: - Infinity,
                max:  Infinity,
                position: 0
            },
            {
                regex: /^turel/, 
                name: 'turels', 
                axys: 'z',
                objects: [],
                value: 0,
                easedValue: 0,
                easingMultiplier: 0.02,
                min: - Infinity,
                max:  Infinity,
            },
        ]

        for(const _part of this.robot.parts){
            this.robot[_part.name] = _part
        }
       

        this.robot.model = this.resources.items.mecha.scene
        console.log(this.robot.model)

        //Animation
        this.robot.mixer = new THREE.AnimationMixer(this.robot.model)
        const action = this.robot.mixer.clipAction(this.resources.items.mecha.animations[0])
        action.play()


        this.robot.model.traverse((_child) =>{
            if(_child instanceof THREE.Object3D)
            {
                const part = this.robot.parts.find(_part => _child.name.match(_part.regex))

                if(_child instanceof THREE.Mesh)
                {
                   
                    _child.material = this.material
                    if(_child.name.match('Plane'))
                    {
                        _child.material = this.basicMaterial
                        // console.log(_child)
                    }
                    // _child.receiveShadow = true
                    // _child.castShadow = true
                }

                if(part){
                    part.objects.push(_child)
                }
            }
        })


        //Floor
        this.floor = {}

        this.robot.floor = this.robot.model.getObjectByName('floor')
        this.robot.floor.castShadow = false
        this.robot.floor.material = new THREE.MeshPhongMaterial({})
        this.floor.clone = this.robot.floor.clone()
        // this.floor.clone.position.z -= 239
        this.floor.clone.position.y -= 2
        this.scene.add(this.floor.clone)
        // this.floor.clone.scale.setScalar(500)




        //Body
        this.robot.body = this.robot.model.getObjectByName('body')

       

        //ADD to Scene
        this.robot.model.position.set(0, -2, 0)
        this.scene.add(this.robot.model)


        //Speed
        this.robot.speed = 2
        // console.log(this.robot.bod)
    }

    updateFloor()
    {
        if(Math.abs(this.robot.bodies.objects[0].position.z % 240) > 239 )
        {   
            // console.log('more', (this.robot.bodies.objects[0].position.z))
            // this.robot.floor.position.z = this.robot.bodies.objects[0].position.z
            // console.log(this.robot.floor.position.z)
        }
    }

    setShadow()
    {
                //Shadow
        this.robot.shadow = {}
        this.robot.shadow.texture = this.resources.items.shadow
        this.robot.shadow.texture.flipY = false
        this.robot.shadow.texture.wrapS = THREE.RepeatWrapping;
        this.robot.shadow.texture.wrapT = THREE.RepeatWrapping;
        this.robot.shadow.texture.magFilter = THREE.NearestFilter;
        this.robot.shadow.mesh = this.robot.model.getObjectByName('shadowPlane')
        this.robot.shadow.mesh.material = new THREE.MeshLambertMaterial({
            transparent: true,
            map: this.resources.items.shadow,
            depthWrite: false,
            opacity: 0.6
        })
    }

    setMuzzleFlash()
    {
         //MuzzleFlash
         this.robot.textures = [
            this.resources.items.flash,
            this.resources.items.flashStraight,
        ]
        this.robot.textures.forEach((texture)=>{
            texture.flipY = false
            texture.minFilter = THREE.NearestFilter
        })
        this.muzzleFlash = this.robot.model.getObjectByName('muzzleFlash')
        this.muzzleFlashStraight = this.robot.model.getObjectByName('muzzleFlashStraight')
        this.muzzleFlash2 = this.robot.model.getObjectByName('muzzleFlash2')
        this.muzzleFlashStraight2 = this.robot.model.getObjectByName('muzzleFlashStraight2')
        const muzzleFlashMaterial = new THREE.MeshBasicMaterial({
            transparent: true,
            side: THREE.DoubleSide,
            map: this.robot.textures[0],
            alphaMap: this.robot.textures[0],
            depthWrite: false,
            opacity: 0,
            blending: THREE.AdditiveBlending
        })
        const muzzleFlashMaterialStarght = new THREE.MeshBasicMaterial({
            transparent: true,
            side: THREE.DoubleSide,
            map: this.robot.textures[1],
            alphaMap: this.robot.textures[1],
            depthWrite: false,
            opacity: 1,
            blending: THREE.AdditiveBlending
        })
        this.muzzleFlash.material = muzzleFlashMaterial
        this.muzzleFlashStraight.material = muzzleFlashMaterialStarght
        this.muzzleFlashStraight2.material = muzzleFlashMaterialStarght
        this.muzzleFlash2.material = muzzleFlashMaterial

        //Shadows
        this.muzzleFlash.castShadow = false
        this.muzzleFlash.receiveShadow = false
        this.muzzleFlash2.castShadow = false
        this.muzzleFlash2.receiveShadow = false
        this.muzzleFlashStraight.castShadow = false
        this.muzzleFlashStraight.receiveShadow = false
        this.muzzleFlashStraight2.castShadow = false
        this.muzzleFlashStraight2.receiveShadow = false
        
        //Turel Lights
        this.muzzleLight = this.robot.model.getObjectByName('muzzleLight').children[0]
        this.muzzleLight2 = this.robot.model.getObjectByName('muzzleLight2').children[0]
        this.muzzleLight.intensity = 0
        this.muzzleLight2.intensity = 0
        this.muzzleLight.castShadow = false
        this.muzzleLight2.castShadow = false
    }

    update()
    {
        //Update Animation


        //Arms values
        //Shoulder
        if(this.keyPressed.arrowUp === true){
            this.robot.shoulders.value += 0.005 * this.time.delta
        }
        if(this.keyPressed.arrowDown === true){
            this.robot.shoulders.value -= 0.005 * this.time.delta
        }
        //Chest
        if(this.keyPressed.arrowRight === true){
            this.robot.heads.value += 0.01
        }
        if(this.keyPressed.arrowLeft === true){
            this.robot.heads.value -= 0.01
        }
        //UpperArm
        if(this.keyPressed.bodyRotateRight === true){
            this.robot.bodies.value += 0.0008 * this.time.delta
            this.robot.mixer.update(this.time.delta * 0.0008)
        }
        if(this.keyPressed.bodyRotateLeft === true){
            this.robot.bodies.value -= 0.0008 * this.time.delta
            this.robot.mixer.update(this.time.delta * 0.0008)
        }
        //Animate and move
        if(this.keyPressed.moveRobot === true){
            // this.robot.elbows.value -= 0.005 * this.time.delta
            this.robot.mixer.update(this.time.delta * -0.001 * this.robot.speed)
            this.robot.bodies.position -= 0.005 * this.time.delta * this.robot.speed
        }
        if(this.keyPressed.moveRobotBack === true){
            this.robot.mixer.update(this.time.delta * 0.001 * this.robot.speed)
            this.robot.bodies.position += 0.005 * this.time.delta * this.robot.speed
        }
        // this.robot.bodies.objects[0].position.z = this.robot.bodies.position
        this.robot.floor.position.z = -this.robot.bodies.position % 240
        this.floor.clone.position.z = -this.robot.bodies.position % 240 - 239 



        //Turel
        if(this.keyPressed.turelRotation === true){
            this.robot.turels.value += 0.005 * this.time.delta
            this.muzzleFlash.material.opacity = 1
            this.muzzleFlashStraight.material.opacity = 1
            this.muzzleLight.intensity = 5 - (Math.random()) * 2 
            this.muzzleLight2.intensity = 5 - (Math.random()) * 2
            this.robot.heads.objects[0].position.z = Math.min(Math.max(this.robot.heads.objects[0].position.z + (Math.random()- 0.5) * 0.02, this.robot.heads.objects[0].position.z - 0.5), this.robot.heads.objects[0].position.z + 0.5)
        }else{
            this.muzzleFlash.material.opacity = 0
            this.muzzleFlashStraight.material.opacity = 0
            this.muzzleLight.intensity = 0
            this.muzzleLight2.intensity = 0
        }


        //Easing
        for(const _part of this.robot.parts)
        {
            _part.value = Math.min(Math.max(this.robot[_part.name].value , this.robot[_part.name].min), this.robot[_part.name].max)
            _part.easedValue += (this.robot[_part.name].value - this.robot[_part.name].easedValue) * this.robot[_part.name].easingMultiplier * this.time.delta
        }
        // this.robot.shoulders.easedValue += (this.robot.shoulders.value - this.robot.shoulders.easedValue) * 0.02 * this.time.delta
        //Shouders
        for(const _part of this.robot.parts)
        {
            _part.objects.forEach((_object)=>{
                _object.rotation[_part.axys] = this.robot[_part.name].easedValue * _object.userData.prop
            })

        }

        this.updateFloor()

    }



    setKeyboard()
    {
        this.keyboard = new Keyboard()

        this.keyboard.on('pressed', (_name) =>
        {
            switch (_name) {
                case 'ArrowUp': this.keyPressed.moveRobot = true
                    break;
                case 'ArrowDown': this.keyPressed.moveRobotBack = true
                    break;
                case 'ArrowRight': this.keyPressed.arrowRight = true
                    break;
                case 'ArrowLeft': this.keyPressed.arrowLeft = true
                    break;
                case 'KeyD': this.keyPressed.arrowRight = true
                    break;
                case 'KeyA': this.keyPressed.arrowLeft = true
                    break;
                case 'KeyW': this.keyPressed.moveRobot = true
                    break;
                case 'KeyS': this.keyPressed.moveRobotBack = true
                    break;
                case 'ShiftLeft': this.keyPressed.turelRotation = true
                    break;
            }
        })

        this.keyboard.on('unpressed', (_name) =>{
            switch (_name) {
                case 'ArrowUp': this.keyPressed.moveRobot = false
                    break;
                case 'ArrowDown': this.keyPressed.moveRobotBack = false
                    break;
                case 'ArrowRight': this.keyPressed.arrowRight = false
                    break;
                case 'ArrowLeft': this.keyPressed.arrowLeft = false
                    break;
                case 'KeyD': this.keyPressed.arrowRight = false
                    break;
                case 'KeyA': this.keyPressed.arrowLeft = false
                    break;
                case 'KeyW': this.keyPressed.moveRobot = false
                    break;
                case 'KeyS': this.keyPressed.moveRobotBack = false
                    break;
                case 'ShiftLeft': this.keyPressed.turelRotation = false
                    break;
            }
        })

        window.addEventListener('mousedown', ()=>{
            // this.keyPressed.turelRotation = true
        })
        window.addEventListener('mouseup', ()=>{
            // this.keyPressed.turelRotation = false
        })

    }

}