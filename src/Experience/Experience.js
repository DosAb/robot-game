import * as THREE from 'three'
import { Pane } from 'tweakpane'
import Time from './Utils/Time.js'
import Sizes from './Utils/Sizes.js'
import Stats from './Utils/Stats.js'

import Resources from './Resources.js'
import Renderer from './Renderer.js'
import Camera from './Camera.js'
import World from './World.js'
import Presets from './Presets.js'

import assets from './assets.js'


export default class Experience
{
    static instance 

    constructor(_options = {})
    {   
        if(Experience.instance){
            return Experience.instance
        }
        Experience.instance = this


        // Options
        this.targetElement = _options.targetElement

        if(!this.targetElement){
            console.log('missing \'targetElement\' property')
        }

        this.time = new Time()
        this.sizes = new Sizes()
        this.setConfig()
        this.setStats()
        this.setDebug()
        this.setScene()
        this.setCamera()
        this.setRenderer()
        this.setResources()
        this.setWorld()
        this.setPresets()
        
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        this.update()
    }

    setPresets()
    {
        this.presets = new Presets()
    }

    setConfig()
    {
        this.config = {}

        //Debug
        console.log(window.location)
        window.location.hash = '#debug'
        this.config.debug = window.location.hash === '#debug'

        //PixelRatio 
        this.config.pixelRatio = Math.min(window.devicePixelRatio, 2)

        //Width and height
        const boundings = this.targetElement.getBoundingClientRect()
        this.config.width = boundings.width
        this.config.height = boundings.height || window.innerHeight
    }

    setStats()
    {
        if(this.config.debug)
        {
            this.stats = new Stats(true)
        }
    }

    setDebug()
    {
            this.debug = new Pane()
            this.debug.containerElem_.style.width = '320px'
    }

    setScene()
    {
        this.scene = new THREE.Scene()
        this.scene.fog = new THREE.Fog("#13222c", 10, 100)
    }

    setCamera()
    {
        this.camera = new Camera()
    }

    setRenderer()
    {
        this.renderer = new Renderer({ rendererInstance: this.rendererInstance })

        this.targetElement.appendChild(this.renderer.instance.domElement)
    }


    setResources()
    {
        this.resources = new Resources(assets)
    }

    setWorld()
    {
        this.world = new World()
    }

    update()
    {
        // console.log('first')
        if(this.stats)
            this.stats.update()
        
        this.camera.update()

        if(this.world)
            this.world.update()
        
        if(this.renderer)
            this.renderer.update()

        window.requestAnimationFrame(() =>
        {
            this.update()
        })
    }

    resize()
    {
        console.log(this.renderer.instance.info.render.triangles)
        // Config
        const boundings = this.targetElement.getBoundingClientRect()
        this.config.width = boundings.width
        this.config.height = boundings.height

        this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

        if(this.camera)
            this.camera.resize()

        if(this.renderer)
            this.renderer.resize()

        if(this.world)
            this.world.resize()
    }

    destroy()
    {
        
    }
} 