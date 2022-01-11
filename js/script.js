import { Block } from "./Block.js";
import { Character } from "./Character.js";

(function() {

	const game = document.getElementById("game");
	let holeHeight = 200;
	let ID = 0;

	let character = new Character();
	game.appendChild(character.draw());
	const charElem = document.getElementById("character");

	newBlock(); // make the first block, then every 3s a new one
	let blockInterval = setInterval(newBlock, 1400);

	setInterval(() => {
	    gameOver() ? gameReset() : character.gravity();
	}, 10);

	document.addEventListener('keydown', character.jump.bind(character));

	/**
	 * 
	 * FUNCTIONS
	 * 
	 */

	function newBlock() {
		const hole_yPos = Math.floor(Math.random() * (game.scrollHeight - holeHeight + 1));
		const block = new Block(ID, hole_yPos);		
		game.appendChild(block.draw());

		let blockElem = document.getElementById('block-' + block.id);
		let blockLeft = parseInt(window.getComputedStyle(blockElem).getPropertyValue("left"));
		let blockWidth = parseInt(window.getComputedStyle(blockElem).getPropertyValue("width"));

		block.move();
		ID++;
	}

	function gameOver() {
		// TO DO
		return false;
	}

	function gameReset(gameInterval) {
		// TO DO
		// to clear the blockInterval and all other intervals
	}

})();