import GameBase from "./GamesBase";
import InputManager from "./InputManager";
import { AudioResources } from "./Types/models";

let instance!: AudioManager;


export default class AudioManager {

    gameBase!: GameBase
    resources!: any
    isMuted!: boolean
    isActiveForAudios!: boolean
    audios!: AudioResources
    inputManager!: InputManager

    constructor() {
        if (instance) {
            return instance
        }

        instance = this;

        window.audioManager = this

        this.gameBase = GameBase.getInstance()

        this.resources = this.gameBase.resources
        this.inputManager = this.gameBase.inputManager

        this.audios = {}
        this.audios.hitSound = this.resources.items.hitAudio

        this.isActiveForAudios = false;
        this.isMuted = false

        this.inputManager.on('firstClick', () =>
        {
            this.setIsActiveForAudios(true)
        })
    }

    setIsActiveForAudios(status: boolean)
    {
        this.isActiveForAudios = status;
    }

    playHit(collision: any) {

        if(!this.isActiveForAudios) return

        const impactStrength = collision.contact.getImpactVelocityAlongNormal()

        if (impactStrength < 1.5) return

        this.audios.hitSound.volume = Math.random()
        this.audios.hitSound.currentTime = 0
        this.audios.hitSound.play()
    }

    toggleMute() {
        if (this.isMuted) {
            this.unMuteAudios()
        }
        else {
            this.muteAudios()
        }
    }

    muteAudios() {
        this.setAudios(false)
    }

    unMuteAudios() {
        this.setAudios(true)
    }

    setAudios(status: boolean)
    {
        for (let key in this.audios) {
            if (this.audios.hasOwnProperty(key)) {
                this.audios[key].muted = !status;
            }
        }

        this.isMuted = !status;
    }
}