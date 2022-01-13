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
	const scoresValue = document.getElementById("scores-value");
	const levelValue = document.getElementById("level-value");
    const popup = document.querySelector('.popup');
    const playBtn = document.getElementById('play-btn');
	let gameOverAudio = new Audio('../audio/game-over.mp3');
    let levelAudio = new Audio('../audio/level.mp3');
	let scores = 0;
	let level = 0;
	let holeHeight = 200;
	let ID = 0;
	let blocks = [];

	newBlock(); // make the first block, then "setInterval"
	let blockInterval = setInterval(newBlock, 1400);

	let mainInterval = setInterval(() => {
	    gameOver() ? gameStop() : character.gravity();
	}, 10);

	document.addEventListener('keydown', character.jump.bind(character));
	playBtn.addEventListener("click", newGame);

	/**
	 * Functions
	 */

	function newBlock() {
		const hole_yPos = Math.floor(Math.random() * (game.scrollHeight - holeHeight + 1));
		const block = new Block(ID, hole_yPos, holeHeight);
		blocks.push(block);

		if(blocks.length > 6) {
			blocks.shift();
		}

		game.appendChild(block.draw());
		block.move();
		ID++;	
	}

	function updateScores() {
	    scores++;
	    scoresValue.innerHTML = scores;

	    if(scores > 0 && !(scores % 5)) {
	        level++;
	        levelValue.innerHTML = level;
	        levelAudio.play();
	        holeHeight -= 15;
	    }
	}

	function gameOver() {
		const characterTop = parseInt(window.getComputedStyle(charElem).getPropertyValue("top"));		
		const hole = game.querySelector('.hole'); // get only the first hole
		const holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
		const holeLeft = parseInt(window.getComputedStyle(hole).getPropertyValue("left"));
		const holeWidth = parseInt(window.getComputedStyle(hole).getPropertyValue("width"));
		const holeHeight = parseInt(window.getComputedStyle(hole).getPropertyValue("height"));

		// Check for top strike
		if(characterTop <= 0) {
		   return true;
		}

		// Check for bottom strike
		if(characterTop >= (gameHeight - characterHeight - character.gravityStep)) {
		   return true;
		}

		// Check for block strike
		if (
		    (holeLeft <= characterLeft + characterWidth && holeLeft + holeWidth >= characterLeft) &&
		    (characterTop - character.gravityStep < holeTop || characterTop + characterHeight >= holeTop + holeHeight)
		    ) {
		    return true;
		}

		// Update scores
		if(characterLeft === holeLeft) {
			updateScores();
		}
	}

	function gameStop() {
		character.freeze = true;
		blocks.forEach(block => block.freeze = true );
		gameOverAudio.play();

		clearInterval(mainInterval);
		clearInterval(blockInterval);

		popup.style.display = 'block';

		document.addEventListener('keydown', onSpaceDownNewGame);
	}

	function onSpaceDownNewGame(e) {
		// if "Space" key pressed
		if(e.keyCode === 32) {
			document.removeEventListener('keydown', onSpaceDownNewGame);
			newGame();
		}
	}

	function newGame() {
		document.removeEventListener('keydown', onSpaceDownNewGame);
		gameOverAudio.pause();
		gameOverAudio.currentTime = 0.0;

		ID = 0;
		holeHeight = 200;
		character.isJumping = false;
		charElem.style.top = characterTop + "px";
		scores = 0;
		level = 0;
		scoresValue.innerHTML = scores;
		levelValue.innerHTML = level;

		game.querySelectorAll('.block').forEach(e => e.remove());
		game.querySelectorAll('.hole').forEach(e => e.remove());

		blocks = [];
		character.freeze = false;

		newBlock(); // make the first block, then "setInterval"
		blockInterval = setInterval(newBlock, 1400);

		mainInterval = setInterval(() => {
			gameOver() ? gameStop() : character.gravity();
		}, 10);

		popup.style.display = 'none';		
	}

})();