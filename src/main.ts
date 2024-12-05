import './style.css'
import GameBase from './GameBase/GameBase.ts'

let gameBase: GameBase | undefined

document.addEventListener("DOMContentLoaded", function () {
	const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement | null

	if(canvas)
	{
		gameBase = new GameBase()
	}
});

export function userClickedDownloadButton() : void
{
    console.log('External API store call!');
}