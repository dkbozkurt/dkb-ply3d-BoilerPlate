import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {
    width: number
    height: number
    pixelRatio: number

    constructor() {
        super()

        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = window.devicePixelRatio

        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = window.devicePixelRatio

            this.trigger('resize')
        })
    }
}