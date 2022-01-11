import { Block } from "./Block.js";
import { Character } from "./Character.js";

(function() {

	let character = new Character();
	const game = document.getElementById("game");
	game.appendChild(character.draw());

	const gameHeight = parseInt(window.getComputedStyle(game).getPropertyValue("height"));
	const charElem = document.getElementById("character");
	const characterWidth = parseInt(window.getComputedStyle(charElem).getPropertyValue("width"));
	const characterHeight = parseInt(window.getComputedStyle(charElem).getPropertyValue("height"));
	const characterLeft = parseInt(window.getComputedStyle(charElem).getPropertyValue("left"));
	const characterTop = parseInt(window.getComputedStyle(charElem).getPropertyValue("top"));
	let holeHeight = 200;
	let ID = 0;

	newBlock(); // make the first block, then every 3s a new one
	let blockInterval = setInterval(newBlock, 1400);

	setInterval(() => {
	    gameOver() ? gameReset() : character.gravity();
	}, 10);

	document.addEventListener('keydown', character.jump.bind(character));

	/**
	 * Functions
	 */

	function newBlock() {
		const hole_yPos = Math.floor(Math.random() * (game.scrollHeight - holeHeight + 1));
		const block = new Block(ID, hole_yPos, holeHeight);		
		game.appendChild(block.draw());

		let blockElem = document.getElementById('block-' + block.id);
		let blockLeft = parseInt(window.getComputedStyle(blockElem).getPropertyValue("left"));
		let blockWidth = parseInt(window.getComputedStyle(blockElem).getPropertyValue("width"));

		block.move();
		ID++;
	}

	function gameOver() {
		const characterTop = parseInt(window.getComputedStyle(charElem).getPropertyValue("top"));		
		const hole = game.querySelector('.hole'); // get only the first hole
		const holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
		const holeLeft = parseInt(window.getComputedStyle(hole).getPropertyValue("left"));
		const holeWidth = parseInt(window.getComputedStyle(hole).getPropertyValue("width"));
		const holeHeight = parseInt(window.getComputedStyle(hole).getPropertyValue("height"));

		// Check for top strike
		if(characterTop <= 0 - character.jumpingStep) {
		   return true;
		}

		// Check for bottom strike
		if(characterTop >= (gameHeight - characterHeight)) {
		   return true;
		}

		// Check for block strike
		if (
		    (holeLeft <= characterLeft + characterWidth && holeLeft + holeWidth >= characterLeft) &&
		    (characterTop + character.gravityStep < holeTop || characterTop - character.gravityStep + characterHeight > holeTop + holeHeight)
		    ) {
		    return true;
		}
	}

	function gameReset() {
		alert("Game Over");
		
		ID = 0;
		holeHeight = 200;
		character.isJumping = false;
		charElem.style.top = characterTop + "px";

		game.querySelectorAll('.block').forEach(e => e.remove());
		game.querySelectorAll('.hole').forEach(e => e.remove());
	}

})();