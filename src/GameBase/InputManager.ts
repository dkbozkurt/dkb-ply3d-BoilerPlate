import EventEmitter from "./Utils/EventEmitter";

let instance!: InputManager;

export default class InputManager extends EventEmitter {
    canGetInput!: boolean;
    isFirstClickDetected!: boolean;
    clickCount!: number;

    constructor() {
        super()

        if (instance) {
            return instance
        }
        instance = this;

        this.canGetInput = true
        this.isFirstClickDetected = false
        this.clickCount = 0

        // Bind the methods to ensure proper 'this' context
        // this.handleFirstClick = this.handleFirstClick.bind(this);
        // this.handleClick = this.handleClick.bind(this);

        document.addEventListener('click', () =>
            this.handleClick()
        )
    }

    setCanGetInput(status: boolean) :void{
        this.canGetInput = status
    }

    handleFirstClick() {
        if (this.isFirstClickDetected) return

        console.log('First click detected!')
        this.trigger('firstClick')
        this.isFirstClickDetected = true
    }

    handleClick() {
        if (!this.canGetInput) return

        this.clickCount++
        console.log(`Click detected! Click number: ${this.clickCount} `)
        this.trigger('onClick')
        // Handle the first click if it hasn't been detected yet
        this.handleFirstClick()
    }

    destroy() {
        this.removeClickListener()
    }

    removeClickListener() {
        // Method to remove the click listener if needed
        document.removeEventListener('click', this.handleClick);
    }
}