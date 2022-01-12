class Character {
  constructor() {
    this.gravityStep = 2;
    this.jumpingStep = 4;
    this.isJumping = false;
    this.freeze = false;
  }

  draw() {
    const character = document.createElement('div');
    character.setAttribute('id', 'character');
    return character;
  }

  gravity() {
        const character = document.getElementById("character");
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

        // if no jump - gravity
        if(this.isJumping === false) {
            character.style.top = characterTop + this.gravityStep + 'px';
        }
  }

  jump(e) {
    if(this.freeze) {
        return;
    }

    const keyCode = e.keyCode;
    // If "Space" or "ArrowUp" key pressed
    if (keyCode === 32 || keyCode === 38) {
        this.isJumping = true;
        let character = document.getElementById("character");
        let jumpCount = 0;

        let jumpInterval = setInterval(() => {
            let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

            if (jumpCount < 15) {
                character.style.top = characterTop - this.jumpingStep + "px";
            }

            // if jumpCount >= 15 && jumpCount <= 20
            // pause for the character, it stays at the top for a while

            if (jumpCount > 20) {
                clearInterval(jumpInterval);
                this.isJumping = false;
                jumpCount = 0;
            }
            jumpCount++;
        }, 10);
    }
  }

}

export { Character };