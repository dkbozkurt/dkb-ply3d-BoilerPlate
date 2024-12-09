import './style.css'
import GameBase from './GameBase/GamesBase';

let gameBase!: GameBase

document.addEventListener("DOMContentLoaded", function () {
	const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement

	if(canvas)
	{
		gameBase = new GameBase(canvas)
	}
});

export function userClickedDownloadButton(url:string) : void
{
    console.log('External API store call!');
}