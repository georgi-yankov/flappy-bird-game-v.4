import { Block } from "./Block.js"; 

(function() {

	const game = document.getElementById("game");
	const character = document.getElementById("character");
	let holeHeight = 200;
	let ID = 0;

	newBlock(); // make first block, then every 3s a new one

	let blockInterval = setInterval(newBlock, 3000);

	function newBlock() {
		const hole_yPos = Math.floor(Math.random() * (game.scrollHeight - holeHeight + 1));
		const block = new Block(ID, hole_yPos);		
		game.appendChild(block.draw());

		let blockElem = document.getElementById('block-' + block.id);
		let blockLeft = parseInt(window.getComputedStyle(blockElem).getPropertyValue("left"));
		let blockWidth = parseInt(window.getComputedStyle(blockElem).getPropertyValue("width"));

		block.move();

		let blockInterval = setInterval(() => {
			if(blockLeft < -blockWidth) {
				clearInterval(blockInterval);
			} else if(gameOver(block.id)) {
				// TO DO
				reset();
			}
		}, 10);

		ID++;
	}

	function gameOver(ID) {
		// TO DO
		return false;
	}

	function reset() {
		// TO DO
	}

})();