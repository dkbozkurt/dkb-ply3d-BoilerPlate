import './style.css'
import GameBase from './GameBase/GamesBase';

let gameBase: GameBase | undefined

document.addEventListener("DOMContentLoaded", function () {
	const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement

	if(canvas)
	{
		gameBase = new GameBase(canvas)
		console.log('gameBase: ', gameBase);
	}
});

export function userClickedDownloadButton() : void
{
    console.log('External API store call!');
}